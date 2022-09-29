import { expect, assert } from "chai"
import { deployments, ethers } from "hardhat"
import { FUNC, MIN_DELAY, NEW_STORE_VALUE, PROPOSAL_DESCRIPTION, VOTING_DELAY, VOTING_PERIOD } from "../helper.config"
import { Box, GovernanceToken, GovernorContract, TimeLock } from "../typechain-types"
import { moveBlocks } from "../utils/move-block";
import { moveTime } from "../utils/move-time";

describe("Governor Flow", async () => {
    let governor: GovernorContract
    let governanceToken: GovernanceToken
    let timeLock: TimeLock
    let box: Box
    const voteWay = 1
    const resason = "I lika do da cha cha"

    beforeEach(async () => {
        await deployments.fixture("all")
        governor = await ethers.getContract<GovernorContract>("GovernorContract")
        timeLock = await ethers.getContract<TimeLock>("TimeLock")
        governanceToken = await ethers.getContract<GovernanceToken>("GovernanceToken")
        box = await ethers.getContract<Box>("Box")
    })

    it("can only be changed through governance",async () => {
        await expect(box.store(55)).to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("proposes, votes, waits, queues, and then executes",async () => {

        //box sotre 方法编码
        const encodeFunctionCall = box.interface.encodeFunctionData(FUNC, [NEW_STORE_VALUE])

        //提案
        const proposeReceipt = await governor.propose(
            [box.address],
            [0],
            [encodeFunctionCall],
            PROPOSAL_DESCRIPTION
            ).then(tx => tx.wait(1))
        
        const proposalId = proposeReceipt.events![0].args!.proposalId
        let proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);
        
        await moveBlocks(VOTING_DELAY + 1)
        
        //Vote
        await governor.castVoteWithReason(proposalId, voteWay, resason).then(tx => tx.wait(1))
        proposalState = await governor.state(proposalId)
        assert.equal(proposalState.toString(), "1")
        console.log(`Current Proposal State: ${proposalState}`);
        await moveBlocks(VOTING_PERIOD + 1)

        //queue & execute
        // const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))
        const descriptionHash = ethers.utils.id(PROPOSAL_DESCRIPTION)
        await governor.queue([box.address], [0], [encodeFunctionCall], descriptionHash).then(tx => tx.wait(1))
        await moveTime(MIN_DELAY + 1)
        await moveBlocks(1)
        
        proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);
        
        console.log(`Executing...`);
        await governor.execute([box.address], [0], [encodeFunctionCall], descriptionHash)
        console.log((await box.retrieve()).toString());
        
    })

})