

`makerDao`:  https://makerdao.com/zh-CN/

## DAO
1. 如何确定投票权，

使用**GovernorVotes** 模块，该模块与IVotes 实例挂钩，以在提案生效时根据委托账户持有的代币投票数来确定。该模块需要`Token`的地址作为构造函数参数。

持有代币的账户本身是没有投票权的，只有设置了委托人后，委托人才有相应的投票权， 也可设置自己为委托人

2. 法定人数需要多少票，

与 ERC20Votes 一起使用的**GovernorVotesQuorumFraction** 将法定人数定义为检索提案投票权的区块总供应量的百分比。这需要一个构造函数参数来设置百分比。现在大多数Governors使用4%，所以我们将使用参数4初始化模块（这表示百分比，导致4%）。

3. 在投票时有哪些选择以及这些选票如何计数

使用 **GovernorCountingSimple**，该模块为选民提供 3 个选项：赞成、反对和弃权，其中只有赞成和弃权票计入法定人数。

4. 使用什么类型的令牌进行投票
   使用ERC20Votes 模块的 TokenERC20 进行投标 

除了这些模块之外，Governor 本身还有一些必须设置的参数。

5. **GovernorSettings**

   用于初始化投票延迟`votingDelay`、投票周期`votingPeriod`，投票最小阀值`proposalThreshold`

   ``votingDelay`：提案创建后多长时间应该固定投票权。较大的投票延迟使用户有时间在必要时取消抵押代币。

   `votingPeriod`：提案保持开放投票的时间。

   ​	这些参数以块数(`blocknumber`)指定。假设出块时间约为 13.14 秒，我们将设置votingDelay = 1 天 = 6570 个块，votingPeriod = 1 周 = 45992 个块。

   `proposalThreshold`：设置提案阈值。这将提案创建限制为具有足够投票权的帐户。

## Dao 执行流程

### 创建提案

假设我们要创建一个提案，以来自治理库的 ERC20 代币的形式向团队提供资助。该提案将包含一个动作，其中目标是 ERC20 代币，calldata 是编码函数调用 transfer(<team wallet>, <grant amount>)，并附加 0 ETH。

### 投票

一旦提案生效，代表就可以投票。请注意，拥有投票权的是受托人：如果代币持有者想要参与，他们可以设置一个受信任的代表作为他们的受托人，或者可以通过自行委托他们自己的投票权来成为受托人。

投票是通过 castVote 系列函数进行交互来进行的。

### 执行提案

投票期结束后，如果达到法定人数（参与了足够的投票权）并且多数人投票赞成，则该提案被视为成功并可以继续执行。

## 合约解析

### GovernanceToken

继承于`ERC20Votes合约`，用于投票的`TokenERC20`代币，持有该`Token`越多，拥有的投票数越多，需要设置委托人才能进行投票，设置委托人后所拥有的投票数转移到委托地址，也可以设置自己为委托人进行投票

记录一次提案开始投票时的的票数/权重（token持有数量），超过开始投票时的区块不计入本次票数

转账操作也会转移投票权

```solidity
function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._afterTokenTransfer(from, to, amount);
        _moveVotingPower(delegates(from), delegates(to), amount);
    }
```

### GovernorSettings

设置投票延迟区块 `votingDelay,` 投票结束区块`votingPeriod`、最低持有投票数阀值`proposalThreshold`

投票开始区块 = 提案区块号 + `votingDelay`

投票结束区块 = 投票开始区块 + `votingPeriod`

### GovernorCountingSimple

统计投票（赞成，反对，弃权）数量，`_countVote()`

通过`proposalVotes(uint256 proposalId)`返回3中投票数量

### GovernorVotesQuorumFraction

计算投票是否成功

计算方式 ： （( totalSupply * quorumNumerator) / quorumDenominator）<= forVotes + abstainVotes) ? Success : Defeated

案例计算：（totalSupply * 4  / 100）  <=  forVotes + abstainVotes ) ? Success : Defeated

quorumNumerator： 设置的比例

投票成功状态： 赞成票 + 弃权票 >= 总发行量 * 设置的比例 / 100 && 赞成票 > 反对票 && 投票结束

反之失败

### GovernorTimelockControl

为治理决策添加时间锁。 如果用户在执行之前不同意某个决定，这允许用户退出系统。 结合使用 OpenZeppelin 的 TimelockController 和GovernorTimelockControl 模块。

1. 投票成功后，调用`queue()`加入队列, 加入队列时会判断提案是否投票成功，然后调用`TimelockController`的`queue()`方法加入队列
2. 加入执行`queue`后，会有一个最小延迟执行（`minDelay`）时间，主要目的是如果发现提案有问题，可以取消该提案，达到最小延长后才可以调用`execute()`方法来执行提案，在`TimelockController`合约中的`execute`会判断`EXECUTOR_ROLE`角色，如果设置为`address(0)`代表任何人都可以执行该提案

注意：**使用时间锁时，执行提案的是时间锁，因此时间锁应该持有任何资金、所有权和访问控制角色。 在 4.5 版本之前，当使用时间锁时，无法在合约中收回资金！ 在 4.3 版本之前，当使用 Compound Timelock 时，时间锁中的 ETH 是不容易获取的。**



## TimelockController

用于记录提案执行进度：pending、Ready、Done

使用`timestamps`储存提案和投票延迟时间，在延迟时间内可以进行投票，延迟时间后才能由执行角色执行

1. 拥有提案角色（`PROPOSER_ROLE`）的用户调用`function _schedule(bytes32 id, uint256 delay) private` 方法储存提案延迟时间
2. 拥有执行权限角色的用户最终调用`function _execute( address target, uint256 value, bytes calldata data ) internal virtual` 方法调用目标合约，提案id必须在`Ready`状态， 执行完成后会修改状态为`Done`状态

TimelockController 需要了解的 AccessControl 设置来设置角色。

Proposer 角色负责 排队操作：这是应该授予Governor 实例的角色，并且它应该可能是系统中唯一的提议者。

Executor 角色负责执行 已经可用的操作：我们可以将此角色分配给特殊的零地址以允许任何人执行（如果操作对时间特别敏感，则应将Governor 设为Executor）。

最后是 Admin 角色，它可以授予和撤销之前的两个角色：这是一个非常敏感的角色，将自动授予部署者和时间锁本身，但部署者应在设置后放弃。

## GovernorContract

相关合约

1. GovernorSettings：设置投票时间和委托人最低持有`token`票数（注意不是余额）
   GovernorCountingSimple：计算投票权重，每人只能投票一次
   GovernorVotes：连接token，获取投票权重
   GovernorVotesQuorumFraction：获取投票人百分比， 计算提案投票结果
   GovernorTimelockControl：Governor时间控制器, 构造函数中传入时间控制器（`TimelockController`），将提案加入队列和执行

核心合约`Governor`执行流程

构造方法

```solidity
    constructor(
        IVotes _token, //投票或者发起提案所持有的Token
        TimelockController _timelock, //投票时间控制器
        uint256 _quorumPercentage, //投票人数百分比，只有投票人数比例 >= 该比例才生效
        uint256 _votingPeriod,  //投票周期（区块号）
        uint256 _votingDelay    //投票延迟（区块号） 开始区块 = block.number + _votingDelay, 结束区块 = 开始区块 + _votingPeriod 
    )
```

提案方法

持有人持有投票Token必须 >= 设定的`proposalThreshold`值

```solidity
//提案状态：
enum ProposalState {
        Pending, 				//开始区块 >= block.number
        Active, 				//结束区块 >= block.number
        Canceled, 			
        Defeated,			// 投票人数比例未达标 || 投票未成功
        Succeeded,		//投票人数比例达标 && 投票成功
        Queued,
        Expired,
        Executed	
    }   

function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public virtual override returns (uint256)
```

发起投票核心方法, 内部会进行权重和投票占比等计算

```solidity
  enum VoteType {
      Against,	//反对
      For,			//赞成
      Abstain  //弃权
  }

//内部会调用_countVote()方法，计算每个类型的投票权重
function _castVote(
        uint256 proposalId,	//提案id
        address account, //账户
        uint8 support, //对应VoteType
        string memory reason, //投票理由
        bytes memory params //其他信息，默认为""
    ) internal virtual returns (uint256) 
```

当投票状态为`Succeeded`就可以将提案加入队列中

```solidity
function queue(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) public virtual override returns (uint256)
```

最终会调用`TimelockController.sol`合约里面的`scheduleBatch`方法, 该方法会储存 ready 时间 = block.timestamp + reply(部署合约时传入的最小延迟时间) 

```solidity
function scheduleBatch(
        address[] calldata targets,
        uint256[] calldata values,
        bytes[] calldata payloads,
        bytes32 predecessor,
        bytes32 salt,
        uint256 delay
    ) public virtual onlyRole(PROPOSER_ROLE) {
```

当前时间 >= 上面方法储存的 ready 时间时才可以执行目标合约相关方法

先调用`GovernorTimelockControl`合约中的`_execute()`方法，内部会调用`TimeLockControl`合约的`executeBatch()`方法

```solidity
unction executeBatch(
        address[] calldata targets,
        uint256[] calldata values,
        bytes[] calldata payloads,
        bytes32 predecessor,
        bytes32 salt
    ) public payable virtual onlyRoleOrOpenRole(EXECUTOR_ROLE) {
        require(targets.length == values.length, "TimelockController: length mismatch");
        require(targets.length == payloads.length, "TimelockController: length mismatch");

        bytes32 id = hashOperationBatch(targets, values, payloads, predecessor, salt);

        _beforeCall(id, predecessor);
        for (uint256 i = 0; i < targets.length; ++i) {
            address target = targets[i];
            uint256 value = values[i];
            bytes calldata payload = payloads[i];
            _execute(target, value, payload);
            emit CallExecuted(id, i, target, value, payload);
        }
        _afterCall(id);
    }
```



相关链接

[如何在 Solidity 中构建 DAO？](https://learnblockchain.cn/article/3997)

[openzeppelin **governance**](https://docs.openzeppelin.com/contracts/4.x/api/governance)


PatrickDao

[github](https://github.com/PatrickAlphaC/dao-template.git)

Makerdao

[官网](https://makerdao.com/zh-CN/)

[MakerDAO Technical Docs](https://docs.makerdao.com/)
