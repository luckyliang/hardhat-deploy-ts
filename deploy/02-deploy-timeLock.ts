import { getNamedAccounts, deployments, ethers } from "hardhat";
import { GovernanceToken } from "../typechain-types";
import verify from "../utils/helper-verify";


export default async function deployTimeLock() {

    const { deployer } = await getNamedAccounts()
    const { log, deploy } =  deployments

    log("Deploying TimeLock ...")
    const timeLock = await deploy("TimeLock", {
        from: deployer,
        log: true,
        args: [],
    })
   
    log(`timeLock at ${timeLock.address}`);

    await verify(timeLock.address, [])
}

deployTimeLock.tags = ["timeLock"];