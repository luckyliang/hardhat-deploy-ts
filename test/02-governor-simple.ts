import { BigNumberish } from "ethers"
import { ethers } from "hardhat"
import { Address } from "hardhat-deploy/dist/types"
import { ADDRESS_ZERO, MIN_DELAY, PROPOSAL_DESCRIPTION, PROPOSAL_THRESHOLD, QUORUM_PERCENTAGE, TOTAL_SUPPLY, VOTING_DELAY, VOTING_PERIOD } from "../helper.config"
import { GovernanceToken, GovernorContract, TimeLock, Box } from "../typechain-types"
import { loadFixture, mine, mineUpTo } from "@nomicfoundation/hardhat-network-helpers"
import { assert, expect } from "chai"
import { increaseTo, latest, latestBlock } from "@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { moveBlock } from "./util"
import deployGovernorToken from "../deploy/01-deploy-governorToken"


describe("Governor Box",async () => {
    let signers: SignerWithAddress[]
    let governor: GovernorContract
    let governanceToken: GovernanceToken
    let timeLock: TimeLock
    let box: Box
    const voteWay = 1
    const reason = "I like do"

    enum VoteType {
        Against,
        For,
        Abstain
    }


    beforeEach(async () => {
        signers = await ethers.getSigners()
        const { governanceTokenContract, timeLockContract, governorContract, boxContract } = await deployContract(MIN_DELAY, [], [], QUORUM_PERCENTAGE, VOTING_PERIOD, VOTING_DELAY, PROPOSAL_THRESHOLD)
        governanceToken = governanceTokenContract 
        governor = governorContract 
        timeLock = timeLockContract 
        box = boxContract
        await setupContract()
    })

    const deployContract = async (minDelay: number, proposers: string[], executors: string[], quorumPercentage: number, votingPeriod: number, votingDelay: number, proposalThreshold: BigNumberish) => {

        const GovernanceToken = await ethers.getContractFactory("GovernanceToken")
        const governanceTokenContract = (await GovernanceToken.deploy(TOTAL_SUPPLY)) as GovernanceToken

        const TimeLock = await ethers.getContractFactory("TimeLock")
        //提案通过后最小延迟执行时间，这里指定为1hour
        //默认合约部署者为admin Role, 该角色可以管理PROPOSER_ROLE、CANCELLER_ROLE 和 EXECUTOR_ROLE
        //部署时可以指定proposers和executors角色，也可以后面指定
        const timeLockContract = (await TimeLock.deploy(minDelay, proposers ,executors)) as TimeLock

        const Governor = await ethers.getContractFactory("GovernorContract")
        //governanceToken: 治理合约代币
        //timeLock：时间锁，用于提案通过后，执行提案或者取消
        //QUORUM_PERCENTAGE：法定人数投票百分比，这里为4%
        const governorContract = (await Governor.deploy(governanceTokenContract.address, timeLockContract.address, quorumPercentage, votingPeriod, votingDelay, proposalThreshold)) as GovernorContract

        const Box = await ethers.getContractFactory("Box")
        const boxContract = (await Box.deploy()) as Box

        //转移权限只能timelock调用
        await boxContract.transferOwnership(timeLockContract.address).then(tx => tx.wait())

        
        return { governanceTokenContract, timeLockContract, governorContract, boxContract}
    }

    async function setupContract() {
         //委托, 投票必须指定代理
         await governanceToken.delegate(signers[0].address)

        const proposerRole = await timeLock.PROPOSER_ROLE()
        const executorRole = await timeLock.EXECUTOR_ROLE()
        const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

        //timelock设置权限
        await timeLock.grantRole(proposerRole, governor.address).then(tx => tx.wait())
        await timeLock.grantRole(executorRole, ADDRESS_ZERO).then(tx => tx.wait()) //执行权限为zero，代表任何人都可以执行
        await timeLock.revokeRole(adminRole, signers[0].address).then(tx => tx.wait()) //移除部署合约的管理员权限
    }
    
    /**
     *  enum ProposalState {
        Pending,
        Active,
        Canceled,
        Defeated, //投票失败
        Succeeded,
        Queued,
        Expired,
        Executed
    }
     */
    it ("governor simple test",async () => {
        //只能通过governor调用
        await expect(box.store(55)).to.be.revertedWith("Ownable: caller is not the owner")

        //发起提案
        console.log("propose...")
        const encodeFunctionCall = box.interface.encodeFunctionData("store", [77])
        const proposeReceipt = await governor.propose(
            [box.address],
            [0],
            [encodeFunctionCall],
            PROPOSAL_DESCRIPTION
            ).then(tx => tx.wait())

        const proposalId = await proposeReceipt.events![0].args!.proposalId
        
        //提案状态
        let proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);
        
        await mineUpTo(await latestBlock() + VOTING_DELAY + 1)

        proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);

        //投票
        //voteWay: 三种方式  0:反对，1；赞成, 2:弃权
        console.log("castVote...")
        await governor.castVoteWithReason(proposalId, voteWay, reason).then(tx => tx.wait(1))

        proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);

        
        assert.equal(proposalState.toString(), "1")
        
        //结束投票
        await mineUpTo(await latestBlock() + VOTING_PERIOD)

        proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);

        // queue & execute: 加入队列和执行
        // const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))

        console.log("queue...")
        const descriptionHash = ethers.utils.id(PROPOSAL_DESCRIPTION)
        await governor.queue([box.address], [0], [encodeFunctionCall], descriptionHash).then(tx => tx.wait())

        proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);

        await increaseTo(await latest() + MIN_DELAY)
        await mineUpTo(await latestBlock() + 1)

        proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);

        console.log("Executing...")
        await governor.execute([box.address], [0], [encodeFunctionCall], descriptionHash).then(tx => tx.wait())
        console.log((await box.retrieve()).toString());
        
    })

    it("governor propose success", async () => {

        const { governanceTokenContract, timeLockContract, governorContract, boxContract } = await deployContract(MIN_DELAY, [], [], QUORUM_PERCENTAGE, VOTING_PERIOD, VOTING_DELAY, PROPOSAL_THRESHOLD)
        await governanceTokenContract.transfer(signers[1].address, ethers.utils.parseEther("1000"))
        await governanceTokenContract.transfer(signers[2].address, ethers.utils.parseEther("1000"))
        await governanceTokenContract.transfer(signers[3].address, ethers.utils.parseEther("3000"))

        console.log("set delegate");

        await governanceTokenContract.connect(signers[1]).delegate(signers[1].address).then(tx => tx.wait())
        await governanceTokenContract.connect(signers[2]).delegate(signers[6].address).then(tx => tx.wait())
        await governanceTokenContract.connect(signers[3]).delegate(signers[3].address).then(tx => tx.wait())

        console.log("propose...")
        
        await moveBlock(1)//使所有委托人的投票权生效

        const encodeFunctionCall = boxContract.interface.encodeFunctionData("store", [77])

        const proposeReceipt = await governorContract.connect(signers[1]).propose(
                [boxContract.address],
                [0],
                [encodeFunctionCall],
                PROPOSAL_DESCRIPTION, {from: signers[1].address}
                ).then(tx => tx.wait())
        
        const proposalId = await proposeReceipt.events![0].args!.proposalId
        
        //提案状态
        let proposalState = await governorContract.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);
        
        await moveBlock(VOTING_DELAY + 1)

        proposalState = await governorContract.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);
        
        

        //该提案投票开始时的区块号
        let proposalSnapshot = await governorContract.proposalSnapshot(proposalId)
        //验证委托人的投票权
        // 获取在该区块下的投票数/权重（持有的token余额），投票开始后才转入的不计入
        let votes1 = (await governorContract.getVotes(signers[1].address, proposalSnapshot)).toString()
        let votes3 = (await governorContract.getVotes(signers[3].address, proposalSnapshot)).toString()
        let votes6 = (await governorContract.getVotes(signers[6].address, proposalSnapshot)).toString()
        
        expect(votes1).to.be.equal(ethers.utils.parseEther("1000").toString())
        expect(votes3).to.be.equal(ethers.utils.parseEther("3000").toString())
        expect(votes6).to.be.equal(ethers.utils.parseEther("1000").toString())


        //voting
        console.log("cast voting");
        //反对 1000
        await governorContract.connect(signers[1]).castVoteWithReason(proposalId, VoteType.Against, reason).then(tx => tx.wait(1))
        //赞成 3000
        await governorContract.connect(signers[3]).castVoteWithReason(proposalId, VoteType.For, reason).then(tx => tx.wait(1))
        // 弃权 1000
        await governorContract.connect(signers[6]).castVoteWithReason(proposalId, VoteType.Abstain, reason).then(tx => tx.wait(1))

        const {againstVotes, forVotes, abstainVotes} = await governorContract.proposalVotes(proposalId)

        expect(againstVotes.toString()).equal(ethers.utils.parseEther("1000").toString())
        expect(forVotes.toString()).equal(ethers.utils.parseEther("3000").toString())
        expect(abstainVotes.toString()).equal(ethers.utils.parseEther("1000").toString())

        console.log(`againstVotes = ${ethers.utils.formatEther(againstVotes)}, forVotes = ${ethers.utils.formatEther(forVotes)}, abstainVotes = ${ethers.utils.formatEther(abstainVotes)} `);
        

        proposalState = await governorContract.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);

        await moveBlock(VOTING_PERIOD + 1)

        //结束区块号
        // let proposalDeadline = await governorContract.proposalDeadline(proposalId)
        // const quorum = await governorContract.quorum(proposalDeadline)
        // console.log("quorum = ", ethers.utils.formatEther(quorum));
        // let numerator = await governorContract["quorumNumerator(uint256)"](proposalDeadline)
        // console.log("num");

        //投票计算： 计算方式 ： （( totalSupply * quorumNumerator) / quorumDenominator）<= forVotes + abstainVotes) ? Success : Defeated
        
        // 2000000 * 4 / 100 = 80000 
        // foVotes + abstainVotes = 3000 + 1000 = 4000
        //因此该提案未通过
        proposalState = await governorContract.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`);


        // (pastTotalSupply * 3) / 100 <= forVotes + asbtainVotes

    })


    


})