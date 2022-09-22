

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

核心合约`Governor`

提案方法

```solidity
function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public virtual override returns (uint256)
```









相关链接

[如何在 Solidity 中构建 DAO？](https://learnblockchain.cn/article/3997)

[openzeppelin **governance**](https://docs.openzeppelin.com/contracts/4.x/api/governance)


PatrickDao

[github](https://github.com/PatrickAlphaC/dao-template.git)

Makerdao

[官网](https://makerdao.com/zh-CN/)

[MakerDAO Technical Docs](https://docs.makerdao.com/)
