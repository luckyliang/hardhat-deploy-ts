import { deployments, ethers, getNamedAccounts } from "hardhat";
import { governorConfig } from "../test/helper.config";
import { Box, TimeLock } from "../typechain-types";
export default async function deployGovernor () {

    const {MIN_DELAY, QUORUM_PERCENTAGE, VOTING_PERIOD, VOTING_DELAY, ADDRESS_ZERO } = governorConfig;


    const { deployer } = await getNamedAccounts()

    const deployedGovernanceToken = await deployments.deploy("MyToken", {
        from: deployer,
        log: true,
    })
   
    console.log(`GovernanceToken = ${deployedGovernanceToken.address}`);

    const deployedTimeLock = await deployments.deploy("TimeLock", {
        from: deployer,
        log: true,
        args: [MIN_DELAY, [], []]
    })
    console.log(`TimeLock contract = ${deployedTimeLock.address}`);

    const deployedGovernor = await deployments.deploy("GovernorContract",{
        from: deployer,
        log: true,
        args: [deployedGovernanceToken.address, deployedTimeLock.address, QUORUM_PERCENTAGE, VOTING_PERIOD, VOTING_DELAY]
    })

    console.log(`Governor = ${deployedGovernor.address}`);

    const deployedBox = await deployments.deploy("Box", {
        from: deployer,
        log: true
    })

    console.log(`Box = ${deployedBox.address}`);


    //将目标合约（Box）所属权转移给TimeLock合约, TimeLock合约将有权对Box执行操作
    const box = await ethers.getContract<Box>("Box")
    const txRecipt = await box.transferOwnership(deployedGovernor.address).then(tx => tx.wait());
    console.log(`transferOwnership result = ${txRecipt}`);

    //授予Governor合约提案角色，授于零地址执行角色，这意味着任何人都可以执行提案
    const timeLock = await ethers.getContract<TimeLock>("TimeLock");
    const proposeRole = await timeLock.PROPOSER_ROLE()
    const executorRole = await timeLock.EXECUTOR_ROLE()
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

    const proposeTxRecipt = await timeLock.grantRole(proposeRole, deployedGovernor.address).then(tx => tx.wait())
    console.log(`proposeTxRecipt = ${proposeTxRecipt}`);
     
    const executorTxRecipt = await timeLock.grantRole(executorRole, ADDRESS_ZERO).then(tx => tx.wait())
    console.log(`executorTxRecipt = ${executorTxRecipt}`);
    
    const revokeTx = await timeLock.revokeRole(adminRole, deployer).then(tx => tx.wait())
    console.log(`revokeTx = ${revokeTx}`);

}

deployGovernor.tags = ["governor"]
