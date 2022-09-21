import { getNamedAccounts, deployments, ethers } from "hardhat";
import { GovernanceToken } from "../typechain-types";
import verify from "../utils/helper-verify";


export default async function deployGovernorToken() {

    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments;

    log("\n---------------------\n")
    log("Deploying Governanace Token ...")

    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        log: true,
        args: [],
    })
   
    log(`GovernanceToken = ${governanceToken.address}`);

    
    await verify(governanceToken.address, [])

    log(`Delegating to ${deployer}`);
    await delegate(deployer);
    log("Delegated!")

}

async function delegate(delegatedAccount: string) {
    const governanceToken = await ethers.getContract<GovernanceToken>("GovernanceToken");
    await governanceToken.delegate(delegatedAccount).then(tx => tx.wait());
    console.log(`checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`);
}

deployGovernorToken.tags = ["all", "GovernorToken"];