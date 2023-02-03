## landWorks

LandWorks 是一个基于以太坊的虚拟土地租赁市场， 它可以在 Web3 元宇宙游戏中租用土地。文档地址：https://docs.landworks.xyz/

该协议支持在元宇宙中按期租用土地。该协议支持[Decentraland](https://decentraland.org/)作为入门，然后逐渐扩展以支持其他著名的 metaverse。它使土地所有者能够从他们的资产中赚取被动收入，而希望利用 metaverses 的租户将能够轻松地出租而不是购买土地财产。

- 智能合约
- 市场 Marketplace
- 去中性化土地 Decentraland
- 费用 Fees

### 使用协议

[EIP-2535: Diamonds, Multi-Facet Proxy](https://eips.ethereum.org/EIPS/eip-2535)：钻石协议

### ILandWorks协议

```solidity
interface ILandWorks is
    IDiamondCut,						//用于添加、替换、删除面				
    IDiamondLoupe,					//用于验证
    IERC165,		
    IERC173,
    IERC721Consumable,			//721扩展,授权使用/消费，如土地的operator/contributor角色,让土地的所有者可以授权其他地址为他们部署场景（fe委托服务公司开发场景
    IERC721Facet,
    IFeeFacet,
    IMarketplaceFacet,
    IDecentralandFacet,
    IRentPayout,
    IMetaverseConsumableAdapterFacet,
    IReferralFacet,
    IRentFacet
{
    /// @notice Initialises the ERC721's name, symbol and base URI.
    /// @param _name The target name
    /// @param _symbol The target symbol
    /// @param _baseURI The target base URI
    function initERC721(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) external;
}
```



### LandWorks 合约

所有的刻面合约都通过该合约来进行操作，数据都存储在同一个地方

```solidity

constructor(IDiamondCut.FacetCut[] memory _diamondCut, address _owner) {
}
```

### LibDiamond库

该库封装了Diamond的储存，和钻石刻面的相关操作

`bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("com.enterdao.landworks.storage");`

使用改固定储存槽储存DiamondStorage

```solidity
 struct FacetAddressAndPosition {
        address facetAddress;   //刻面合约地址
        // position in facetFunctionSelectors.functionSelectors array
        //记录selector在FacetFunctionSelectors.functionSelectors数组中的的位置
        uint96 functionSelectorPosition;
    }

 struct FacetFunctionSelectors {
        bytes4[] functionSelectors; //刻面函数选择器数组
				// position of facetAddress in facetAddresses array
        //记录刻面合约在facetAddresses数组中的位置
        uint256 facetAddressPosition; 
    }

struct DiamondStorage {
        // maps function selector to the facet address and
        // the position of the selector in the facetFunctionSelectors.selectors array
        // 根据selector储存刻面合约地址和selector在facetFunctionSelectors.selectors中的下标位置
        mapping(bytes4 => FacetAddressAndPosition) selectorToFacetAndPosition;
        // maps facet addresses to function selectors
        //根据合约地址储存selectors和刻面地址在facetAddresses数组下标中的位置
        mapping(address => FacetFunctionSelectors) facetFunctionSelectors;
        // facet addresses 储存刻面数组
        address[] facetAddresses;
        // Used to query if a contract implements an interface.
        // Used to implement ERC-165.
        mapping(bytes4 => bool) supportedInterfaces;
        // owner of the contract 
        address contractOwner;
    }
```

#### 主要方法

##### 获取Storage实例

```solidity
function diamondStorage() internal pure returns (DiamondStorage storage ds)
```

##### 钻石切割方法, 

 主要处理钻石刻面的增、删、改。内部根据FacetCut.FacetCutAction枚举的只进行相关的操作

**入口函数**

```solidity
function diamondCut(
        IDiamondCut.FacetCut[] memory _diamondCut,
        address _init,
        bytes memory _calldata
    ) internal
```

**添加方法**，

`_facetAddress != address(0) && oldFacetAddress == address(0`

```solidity
function addFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal 
```

**替换**

使用新的合约地址，相同函数签名即可替换

`_facetAddress != address(0) && oldFacetAddress != _facetAddress`

```
    function replaceFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal

```

删除

`_facetAddress = address(0) && _facetAddress != address(this)`

```solidity
    function removeFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal
```



### DiamondCutFacet

切割管理合约

### DiamondLoupeFacet

获取刻面相关信息的合约

### MarketplaceFacet

租赁市场合约，继承：ERC721Holder, RentPayout

1. 设置id和名称 权限owner

   ```solidity
   function setMetaverseName(uint256 _metaverseId, string memory _name)
   ```

2. 设置ERC721登记地址，只有登记了的ERC721合约地址才能在市场进行租赁，权限：owner

   - _metaverseId：第一步操作设置的Id
   - _registry：ERC721合约地址
   - _status：状态

   ```solidity
   function setRegistry(uint256 _metaverseId, address _registry, bool _status) external
   ```

3. 出租

   出租NFT，只有合约拥有者设置的特定的NFT才能进行出租，出租会锁定原token，铸造一个新的token进行出租

   1. _metaverseId：上面设置了的元宇宙ID
   2. _metaverseRegistry：NFT登记地址，必须与metaverseId对应
   3. _metaverseAssetId：tokenId
   4. _minPeriod：最小租用周期
   5. _maxPeriod：最大租用周期
   6. _maxFutureTime：有效期？
   7. _paymentToken：支付租金的token，address(1)为主币种，其他只有通过`landWorks.setTokenPayment(mockERC20Registry.address, 0, true);`设置过的才支持
   8. _pricePerSecond：每秒价格
   9. _referrer：推荐人，可有奖励，在`ReferralFacet.sol`合约中管理， 在该方法中会判断mainPercentages 是否 > 0 , 需要预先设置推荐者。

   ```solidity
   function list(
           uint256 _metaverseId,
           address _metaverseRegistry,
           uint256 _metaverseAssetId,
           uint256 _minPeriod,
           uint256 _maxPeriod,
           uint256 _maxFutureTime,
           address _paymentToken,
           uint256 _pricePerSecond,
           address _referrer
       ) external returns (uint256)
   ```

4. 移除出租的资产

   - _assetId：市场新铸造的tokenId

   ```solidity
   function delist(uint256 _assetId) external
   ```

### RentFacet

租用合约

```solidity
function rent(
        uint256 _assetId,
        uint256 _period,
        uint256 _maxRentStart,
        address _paymentToken,
        uint256 _amount,
        address _referrer
    ) external payable returns (uint256 rentId_, bool rentStartsNow_)
```



### ReferralFacet

推荐人奖励合约

两种推荐者

1. 元宇宙合约推荐者

   ```solidity
   struct MetaverseRegistryReferrer {
           // address of the referrer 
           address referrer; //推荐人地址
           // percentage from the rent protocol fee, which will be
           // accrued to the referrer
           //租金协议费的百分比，这将是归于推荐人
           uint24 percentage;
       }
   ```

   设置方法

   ```solidity
   function setMetaverseRegistryReferrers(					//设置元宇宙NFT合约推荐者
           address[] memory _metaverseRegistries,  //目标NFT合约地址
           address[] memory _referrers,            //推荐人
           uint24[] memory _percentages            //百分比，_percentage <= 100_000
       ) external
   ```

   

2. 推荐者

   ```solidity
   function setReferrers(
           address[] memory _referrers,
           uint24[] memory _mainPercentages, //<= 50_000
           uint24[] memory _secondaryPercentages // <= 100_000
       ) external
   ```

   

### FeeFacet

费用管理合约

#### 设置支付token、百分比、状态

_token：代币地址，0x0000000000000000000000000000000000000001为主币地址

status为true，token会被添加进支付列表，false：会移除

_feePercentage < (FEE_PRECISION = 100_000)

```solidity
 function setTokenPayment(
        address _token,
        uint256 _feePercentage,
        bool _status
    )
```



### DecentralandFacet

去中心化土地，锁定、铸造等



## 主要流程

### 租用平台

1. 设置id和名称

   ```solidity
   function setMetaverseName(uint256 _metaverseId, string memory _name)
   ```

2. 设置支持租赁的NFT合约地址

   ```solidity
   function setRegistry(uint256 _metaverseId, address _registry, bool _status) external
   ```

3. 设置支付token，主币种为address(1)，FeeFacet合约管理

   ```solidity
   function setTokenPayment(
           address _token,
           uint256 _feePercentage,
           bool _status
       ) external
   ```

4. 授权NFT给市场合约，然后再出租，如果需要推荐人_referrer，则需要先通过ReferralFacet合约的`setMetaverseRegistryReferrers`方法设置

   ```solidity
   function list(
           uint256 _metaverseId,
           address _metaverseRegistry,
           uint256 _metaverseAssetId,
           uint256 _minPeriod,
           uint256 _maxPeriod,
           uint256 _maxFutureTime,
           address _paymentToken,
           uint256 _pricePerSecond,
           address _referrer
       ) external returns (uint256)
   ```

   

   ### Consumer

   消费者，可以帮助NFT所有者管理上市后的assetId（如更新出租条件），如果设置了consumer则租金会打给consumer

   
   
   
   
   ## 费用及奖励计算公式
   
   FEE_PRECISION = 100_000 分母
   
   1. 协议总费用：租金 * 协议费用占的百分比
   
      `feePercentage < 100_000`
   
      `protocolFee = rentPayment * feePercentage / FEE_PRECISION(100_000)`
   
   2. 元宇宙推荐者奖励：协议费用 * 元宇宙推荐者得百分比 
   
      metaverseReferralAmount = (protocolFee * percentage) / FEE_PRECISION;
   
   3. 上市奖励计算
   
      剩余协议费用 = 协议总费用  -  元宇宙推荐者奖励
   
      上市总奖励 ： 剩余协议费用 * 上市推荐者的 mainPercentage  / FEE_PRECISION
   
      上市者奖励：上市总奖励数 * 上市推荐者的secondaryPercentage / FEE_PRECISION
   
      推荐者奖励：上市总奖励 - 上市者奖励
   
   4. 租赁奖励
   
      剩余协议费用 = 协议总费用  -  元宇宙推荐者奖励
   
      租赁总奖励 ： 剩余协议费用 * 租赁推荐者的 mainPercentage / FEE_PRECISION
   
      租赁者奖励：租赁总奖励 * 租赁推荐者的secondaryPercentage / FEE_PRECISION
   
      租赁推荐者奖励：租赁总奖励 - 租赁者奖励
   
   5. 租赁者应该支付费用
   
      总的应付租金 = 租用时间（秒）* 每秒价格
   
      实际支付租金 = 总的应付租金 - 租赁者奖励

