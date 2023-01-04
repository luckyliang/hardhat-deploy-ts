import { expect } from "chai"
import { ethers } from "hardhat"

describe("Proxy", async () => {
    describe("constructor", async () => {
        
        it("should revert invalid singleton address", async () => {
            const Proxy = await ethers.getContractFactory("GnosisSafeProxy")
            await expect(Proxy.deploy(ethers.constants.AddressZero)).to.be.revertedWith("Invalid singleton address provided")
        })
    })
})