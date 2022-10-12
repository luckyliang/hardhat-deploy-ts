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
//请注意，拥有投票权的是受托人:如果代币持有者想要参与，他们可以设置一个受信任的代表作为他们的受托人，或者他们可以通过自行委托他们的投票权来成为受托人。
async function delegate(delegatedAccount: string) {
    const governanceToken = await ethers.getContract<GovernanceToken>("GovernanceToken");
    await governanceToken.delegate(delegatedAccount).then(tx => tx.wait());
    console.log(`checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`);
}

deployGovernorToken.tags = ["all", "GovernorToken"];