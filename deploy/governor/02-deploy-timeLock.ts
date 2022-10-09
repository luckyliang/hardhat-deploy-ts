import { getNamedAccounts, deployments, ethers } from "hardhat";
import { MIN_DELAY } from "../../helper.config";
import { GovernanceToken } from "../../typechain-types";
import verify from "../../utils/helper-verify";


export default async function deployTimeLock() {

    const { deployer } = await getNamedAccounts()
    const { log, deploy } =  deployments

    log("\n---------------------\n")
    log("Deploying TimeLock ...")
    const timeLock = await deploy("TimeLock", {
        from: deployer,
        log: true,
        args: [MIN_DELAY,[],[]],
    })
   
    log(`timeLock at ${timeLock.address}`);

    await verify(timeLock.address, [])
}

deployTimeLock.tags = ["all", "timeLock"];