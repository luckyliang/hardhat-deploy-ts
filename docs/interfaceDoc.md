## 市场

### 用户行为

1. 上架NFT

   上架前需要先调用ERC721授权，最好一次性授权所有，上架会将原NFT质押到市场，然后铸造一个新的NFT

   - _metaverseId：元宇宙Id，标识，metaverseId需要与metaverseRegistry相对应，管理员需要提前设置
   - _metaverseRegistry：支持的NFT合约地址，只有管理员设置了的NFT合约才能上架
   - _metaverseAssetId：tokenId
   - _minPeriod：最小租赁时间（秒）
   - _maxPeriod：最大租赁时间（秒）
   - _maxFutureTime：最大未来时间 block.timestamp + asset.maxFutureTime >= rentEnd(租赁结束时间)
   - _paymentToken：支付Token，管理员设置的token列表中需要包含改token
   - _pricePerSecond：每秒价格
   - _referrer：推荐者，推荐者由管理员设置，没有则为address(0)
   - 返回值：新铸造的tokenId

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

2. 获取新铸造的tokenId对应的信息

   

   ```solidity
   struct Asset {
           uint256 metaverseId;            //元宇宙id
           address metaverseRegistry;      //Token合约地址
           uint256 metaverseAssetId;       //tokenId
           address paymentToken;           //支付token合约地址
           uint256 minPeriod;              //最小租用周期 每次租赁的最小时间
           uint256 maxPeriod;              //最大租用周期 每次租赁的最长时间
           uint256 maxFutureTime;          //最大未来时间 block.timestamp + asset.maxFutureTime >= rentEnd,
           uint256 pricePerSecond;         //每秒租用价格
           uint256 totalRents;             //总租赁次数，可根据次数索引获取租赁相关信息，比如开始和结束时间
           AssetStatus status;             //资产状态
       }
   
   function assetAt(uint256 _assetId) internal view returns (Asset memory)
   ```

3. 租NFT

   返回值：

   - rentId_：租赁id
   - rentStartsNow_：否从当前时间开始租用，如果最后一人租用的结束时间 > 当前时间 为false

   ```solidity
   function rent(
           uint256 _assetId, 				//tokenId
           uint256 _period,					//租用时间，出租者设置的最小时间 <= _period <= 出租者设置的最大时间
           uint256 _maxRentStart,		//最大租用开始时间
           address _paymentToken,		//支付Token与出租者设置的相对应
           uint256 _amount,					//支付金额，金额最好提前计算不然容易出错
           address _referrer					//租用推荐者
       ) external payable returns (uint256 rentId_, bool rentStartsNow_)
   ```

   

### 管理设置

1. 添加或删除

   - _metaverseId：id，一个id对应一个登记列表，同一个id下不能重复添加NFT合约地址
   - _registry：登记的NFT合约地址
   - _status：状态：yes：添加，NO：删除

   ```solidity
   function setRegistry(
           uint256 _metaverseId,
           address _registry,
           bool _status
       )
   ```

2. 设置名称

   设置_metaverseId对应的名称

   ```solidity
   function setMetaverseName(uint256 _metaverseId, string memory _name)
   ```

3. 获取是否支持

   - _metaverseId：id
   - _registry：合约地址

   ```solidity
   function supportsRegistry(uint256 _metaverseId, address _registry)
           internal
           view
           returns (bool)
   ```

