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

