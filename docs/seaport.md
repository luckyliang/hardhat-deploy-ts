# Seaport

[Seaport Github](https://github.com/ProjectOpenSea/seaport.git)

## Seaport 协议的 6 大关键点，以及它对` NFT `领域的意义：

**1. 开源代码**：
有了 Seaport 协议，任何人都可以使用该协议构建一个 `NFT `市场，因为它是去中心化和开源的。在未来几年，我们应该会看到更多的 `NFT` 市场建立起来。更多的竞争=更好+更快的创新
**2. 去中心化：**
`OpenSea` 说这个协议没有合约所有者，任何人都可以更新或生成代码。
**3. 交易新范式**：
与一些平台只能用加密货币换取 `NFT` 不同，Seaport 协议允许用户以一系列新方式获取 `NFT`，投标人（或报价者）可以捆绑不同的资产（如提供 `ETH/ERC20/ERC721/ERC1155` 资产）以换取 `NFT`。
**4. 交易特定的` NFT`：**
当交易 `NFT` 时，你也可以设置 `NFT `必须具备的特定“条件”。
**5. 荷兰式拍卖列表：**
在` Seaport `协议中，你可以设置一个开始和结束价格，表明你希望拍卖持续多长时间。该列表将降低（或提高）价格，直到找到买家（或拍卖时间到）。
**6. 更高的安全性：**
`OpenSea `正在进行为期两周的协议审计竞赛，奖金总额为 100 万美元。任何开发人员都可以审核代码，提交他们发现的评审和错误，并获得奖励。

## diagram

![](./Seaport.drawio.svg)



## 合约

### Seaport

执行合约入口

继承`Consideration`合约

### Conduit

`contracts/conduit/Conduit.sol`

该合约充当“代理”转账的发起人。 每个管道都由一个“管道控制器（`ConduitController`）”部署和控制，该控制器可以添加和删除， 可以指示管道传输已批准的 ERC20/721/1155 代币的“通道”或合约。

 *重要提示：每个管道都有一个可以任意添加或删除通道的所有者，恶意或疏忽的所有者可以添加一个通道，允许立即获取任何已批准的 ERC20/721/1155 代币 — 对您使用的管道非常谨慎 给予令牌批准！*

### ConduitController

`contracts/conduit/ConduitController.sol`

用于传输已批准的 ERC20/721/1155 代币的管道控制器合约，在部署`Seport`合约时传入

主要方法：

1. `createConduit(bytes32 conduitKey, address initialOwner)`

    创建管道(`Conduit`)合约，通过`create2`方式创建`Conduit`合约

   **`conduitKey`**：用于部署`Conduit`(管道)的`key`，前20个字节必须是调用者的地址，如： 	`${owner.address}000000000000000000000000`

   **`initialOwner`**: `conduit`合约拥有者

   `Conduit`合约相关属性储存在`ConduitProperties`结构体中

   ```solidity
   // Register keys, owners, new potential owners, and channels by conduit
   mapping(address => ConduitProperties) internal _conduits;
   struct ConduitProperties {
           bytes32 key; 		//conduitKey
           address owner;		//拥有者
           address potentialOwner; //
           address[] channels;		//传输通道 
           mapping(address => uint256) channelIndexesPlusOne; //储存channel索引
       }
   ```

2. `function updateChannel( address conduit, address channel, bool isOpen )`

   

3. `function transferOwnership(address conduit, address newPotentialOwner)`

4. `function cancelOwnershipTransfer(address conduit)`

5. ` function acceptOwnership(address conduit)`



### TestZone

order验证合约

### ConsiderationStructs

`contracts/lib/ConsiderationStructs`

相关结构体定义

### ConsiderationEnums

`contracts/lib/ConsiderationEnums`

相关枚举定义

### Consideration

`contracts/lib/Consideration`

定义Order执行的相关方法