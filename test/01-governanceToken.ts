import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { latestBlock } from "@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { sign } from "crypto"
import { ethers } from "hardhat"
import { TOTAL_SUPPLY } from "../helper.config"
import { GovernanceToken } from "../typechain-types"
import { moveBlock } from "./util"


describe("GovernanceToken",async () => {

    let governanceToken: GovernanceToken
    let signers: SignerWithAddress[]
    
    beforeEach(async () => {
        signers = await ethers.getSigners()
        governanceToken = await loadFixture(deployToken) as GovernanceToken
    })

    async function deployToken() {
        const GovernanceToken =  await ethers.getContractFactory("GovernanceToken");
        return await GovernanceToken.deploy(TOTAL_SUPPLY)
    }

    it(`votes test`,async () => {
        
        await moveBlock(1)
        //总投票数
        expect((await governanceToken.getPastTotalSupply(await latestBlock() - 1)).toString()).to.be.equal(TOTAL_SUPPLY.toString(), "not equel total supply")

        //转账
        await governanceToken.transfer(signers[1].address, ethers.utils.parseEther("1000")).then(tx => tx.wait())

        //持有该代币账户本身是没有投票权的，只有设置了委托人后，委托人才有相应的投票权， 也可设置自己为委托人
        expect((await governanceToken.balanceOf(signers[1].address)).toString()).to.equal(ethers.utils.parseEther("1000").toString(), "transfer error")
        expect((await governanceToken.getVotes(signers[1].address)).toString()).to.equals("0", "get votes error")

        //设置自己为委托人
        await governanceToken.connect(signers[1]).delegate(signers[1].address).then(tx => tx.wait())
        expect((await governanceToken.getVotes(signers[1].address)).toString()).to.equals(ethers.utils.parseEther("1000"), "get votes error")

        await governanceToken.transfer(signers[2].address, ethers.utils.parseEther("2000")).then(tx => tx.wait())
        await governanceToken.transfer(signers[3].address, ethers.utils.parseEther("500")).then(tx => tx.wait())

        //设置他人为委托人
        await governanceToken.connect(signers[2]).delegate(signers[6].address).then(tx => tx.wait())
        await governanceToken.connect(signers[3]).delegate(signers[6].address).then(tx => tx.wait())

        expect((await governanceToken.balanceOf(signers[2].address)).toString()).to.equal(ethers.utils.parseEther("2000").toString(), "transfer error")
        expect((await governanceToken.balanceOf(signers[3].address)).toString()).to.equal(ethers.utils.parseEther("500").toString(), "transfer error")
        //委托人投票权为所有被委托人余额总额
        expect((await governanceToken.getVotes(signers[6].address)).toString()).to.equals(ethers.utils.parseEther("2500"), "get votes error")

        await moveBlock(1)
        //根据区块号获取投票权
        expect((await governanceToken.getPastVotes(signers[6].address, await latestBlock() - 1)).toString()).to.equals(ethers.utils.parseEther("2500"), "get votes error")

    })



})