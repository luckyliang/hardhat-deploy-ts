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

```solidity

//_diamondCut：s
function diamondCut(
        IDiamondCut.FacetCut[] memory _diamondCut,
        address _init,
        bytes memory _calldata
    ) internal
```

### DiamondCutFacet

切割管理合约

### DiamondLoupeFacet

获取刻面相关信息的合约

### MarketplaceFacet

市场

### RentFacetc

出租

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

