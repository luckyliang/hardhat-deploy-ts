import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { time } from "console";
import { loadFixture } from "ethereum-waffle";
import { BigNumberish } from "ethers";
import { AbiCoder, defaultAbiCoder, Interface, ParamType } from "ethers/lib/utils";
import { ethers, upgrades } from "hardhat"
import { HTLCSwapERC20, TestERC20 } from "../typechain";
import { newSecretHashPair, nowSeconds, swapId } from "./help";


describe("HTLCSwapERC20 test", ()  => {
    
    // it("upgrade",async () => {
    //     const HTLCSwapERC20 = await ethers.getContractFactory("HTLCSwapERC20");
    //     const HTLCSwapERC20V2 = await ethers.getContractFactory("HTLCSwapERC20");

    //     const instance = await upgrades.deployProxy(HTLCSwapERC20)
    //     const upgraded = await upgrades.upgradeProxy(instance.address, HTLCSwapERC20V2);
        
    //     expect(instance.address).to.equal(upgraded.address)
    // })

    let signers: SignerWithAddress[]

    const senderInitialBalance = 100


    beforeEach(async () => {
        signers =  await ethers.getSigners()
    })


    async function deploySwapERC20Fixture() {
        
        const SwapERC20 = await ethers.getContractFactory("HTLCSwapERC20")
        const swapERC20 = await upgrades.deployProxy(SwapERC20) as HTLCSwapERC20
        await swapERC20.deployed()

        const ERC20 = await ethers.getContractFactory("TestERC20")
        const mainERC20 = await ERC20.deploy("Main Token", "MT") as TestERC20
        await mainERC20.deployed()

        const privateERC20 = await ERC20.deploy("Private Token", "PT")  as TestERC20
        await privateERC20.deployed()

        return { swapERC20, mainERC20, privateERC20}
    }

    async function mintToken(erc20: TestERC20,to :string, amount: BigNumberish) {
        await erc20.connect(signers[0]).mint(to, amount).then(tx => tx.wait())
    }
    

    it("swap test", async () => {
        const {swapERC20, mainERC20, privateERC20} = await loadFixture(deploySwapERC20Fixture)
        
        await mintToken(mainERC20, signers[1].address, senderInitialBalance)

        expect(await mainERC20.balanceOf(signers[1].address)).equal(senderInitialBalance, "mint error")

        await mainERC20.connect(signers[1]).approve(swapERC20.address, senderInitialBalance).then(tx => tx.wait())

        await mintToken(privateERC20, signers[2].address, senderInitialBalance)
        await privateERC20.connect(signers[1]).approve(swapERC20.address, senderInitialBalance).then(tx => tx.wait())

        const { secret, secretHash } = newSecretHashPair()
        const timeLock = nowSeconds() + 10 * 60;
        
        const sid = swapId(signers[1].address, signers[2].address, mainERC20.address, senderInitialBalance, secretHash, timeLock) 

        await expect(swapERC20.connect(signers[1]).newSwap(signers[2].address, secretHash, timeLock, mainERC20.address, senderInitialBalance))
        .to.emit(swapERC20, "HTLCERC20New").withArgs(sid, signers[1].address, signers[2].address, mainERC20.address, senderInitialBalance, secretHash, timeLock)
        
        await expect(swapERC20.connect(signers[1]).refund(sid)).to.be.revertedWith("HTLCSwapERC20 refundable: timelock not yet passed")

        expect(await mainERC20.balanceOf(signers[2].address)).equal(0)

        await expect(swapERC20.connect(signers[2]).withdraw(sid, secret)).to.be.emit(swapERC20, "HTLCERC20Withdraw").withArgs(sid)

        expect(await mainERC20.balanceOf(signers[2].address)).equal(senderInitialBalance)

    })

})