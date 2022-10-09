import { deployments, ethers, getNamedAccounts } from "hardhat";
import { ADDRESS_ZERO } from "../../helper.config";
import { GovernanceToken, GovernorContract, TimeLock } from "../../typechain-types";


export default async function setupContracts() {
    const { deployer } = await getNamedAccounts()
    const { log } = deployments

    const governanceToken = await ethers.getContract<GovernanceToken>("GovernanceToken")
    const timeLock = await ethers.getContract<TimeLock>("TimeLock")
    const governor = await ethers.getContract<GovernorContract>("GovernorContract")

    log("\n---------------------\n")
    log("Setting up contracts for roles...")
    const proposeRole = await timeLock.PROPOSER_ROLE() //提案角色
    const executorRole = await timeLock.EXECUTOR_ROLE() //执行角色
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE() //admin role

    await timeLock.grantRole(proposeRole, governor.address).then(tx => tx.wait(1))
    await timeLock.grantRole(executorRole, ADDRESS_ZERO).then(tx => tx.wait(1)) //执行角色为zero，、任何人都拥有执行权限
    await timeLock.grantRole(adminRole, deployer).then(tx => tx.wait(1))
    log("Setting up contracts for roles completed")

}

setupContracts.tags = ["all", "setup"]

