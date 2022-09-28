

`makerDao`:  https://makerdao.com/zh-CN/



## `GovernanceToken`

继承于`ERC20Votes合约`，用于投票的TokenERC20代币，持有该Token越多，拥有的投票数越多，也可以设置代理投票，设置代理后所拥有的投票数转移到代理地址

`Checkpoint`；结构体储存用户某个区块号的拥有的投票数

## TimelockController

用于记录提案进度：pending、Ready、Done

使用`timestamps`储存提案和投票延迟时间，在延迟时间内可以进行投票，延迟时间后才能由执行角色执行

1. 拥有提案角色（`PROPOSER_ROLE`）的用户调用`function _schedule(bytes32 id, uint256 delay) private` 方法储存提案延迟时间
2. 拥有执行权限角色的用户最终调用`function _execute( address target, uint256 value, bytes calldata data ) internal virtual` 方法调用目标合约，提案id必须在`Ready`状态， 执行完成后会修改状态为`Done`状态

## GovernorContract

治理合约

相关合约

1. GovernorSettings：设置投票时间和最低持有`token`数量
   GovernorCountingSimple：计算投票权重，没人只能投票一次
   GovernorVotes：连接token，获取投票权重
   GovernorVotesQuorumFraction：获取投票人百分比
   GovernorTimelockControl：Governor时间控制器, 构造函数中传入时间控制器（`TimelockController`），将提案加入队列和执型

核心合约`Governor`

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
