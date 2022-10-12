import { deployments, getNamedAccounts } from "hardhat";
import { QUORUM_PERCENTAGE, VOTING_PERIOD, VOTING_DELAY, PROPOSAL_THRESHOLD } from "../helper.config";
import verify from "../utils/helper-verify";

export default async function deployGovernor() {
    const { deployer } = await getNamedAccounts()
    const { get,  log, deploy } = deployments

    const governanceToken = await get("GovernanceToken")
    const timeLock = await get("TimeLock")

    log("\n---------------------\n")
    log("Deploying Governor Contract...")

    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        log: true,
        args: [
            governanceToken.address, 
            timeLock.address, 
            QUORUM_PERCENTAGE,
            VOTING_PERIOD,
            VOTING_DELAY
        ]
    })

    log(`governorContract at ${governorContract.address}`)

    await verify(
        governorContract.address, 
        [
            governanceToken.address,
            timeLock.address,
            QUORUM_PERCENTAGE,
            VOTING_PERIOD,
            VOTING_DELAY,
            PROPOSAL_THRESHOLD
        ])
}

deployGovernor.tags = ["all", "governor"]