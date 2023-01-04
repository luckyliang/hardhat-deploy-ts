import hre, { ethers } from "hardhat"
import { GnosisSafeProxyFactory, TestSingleton } from "../../typechain-types"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { calculateProxyAddress } from "../utils/proxies";
import { expect } from "chai";

describe("ProxyFactory", async () => {


    async function deployContractFixture() {
        const Singleton = await ethers.getContractFactory("TestSingleton")
        const singleton = await Singleton.deploy() as TestSingleton
        await singleton.deployed()

        const ProxyFactory = await ethers.getContractFactory("GnosisSafeProxyFactory")
        const factory = await ProxyFactory.deploy() as GnosisSafeProxyFactory
        await factory.deployed()
        
        return { singleton, factory }
    }

    describe("createProxyWithNonce",  async () => {

        const saltNonce = 42

        it("should emit event without initializing", async () => {
            const { singleton, factory } = await loadFixture(deployContractFixture)
            console.log(singleton.address);

            const initCode = "0x"
            const proxyAddress = await calculateProxyAddress(factory, singleton.address, initCode, saltNonce)
            await expect(factory.createProxyWithNonce(singleton.address, initCode, saltNonce)).to.emit(factory, "ProxyCreation").withArgs(proxyAddress, singleton.address)

            const proxy = singleton.attach(proxyAddress)

            expect(await proxy.creator()).to.be.eq(ethers.constants.AddressZero) //代理合约不会走constructor
            expect(await proxy.isInitialized()).to.be.eq(false)
            expect(await proxy.masterCopy()).to.be.eq(singleton.address)
            expect(await singleton.masterCopy()).to.be.eq(ethers.constants.AddressZero)
            expect(await hre.ethers.provider.getCode(proxyAddress)).to.be.eq(await factory.proxyRuntimeCode())
        })

        it('should emit event with initializing', async () => {
            const { singleton, factory } = await loadFixture(deployContractFixture)
            console.log(singleton.address);
            
            const initCode = singleton.interface.encodeFunctionData("init")
            const proxyAddress = await calculateProxyAddress(factory, singleton.address, initCode, saltNonce)
            await expect(
                factory.createProxyWithNonce(singleton.address, initCode, saltNonce)
            ).to.emit(factory, "ProxyCreation").withArgs(proxyAddress, singleton.address)
            const proxy = singleton.attach(proxyAddress)
            expect(await proxy.creator()).to.be.eq(factory.address)
            expect(await proxy.isInitialized()).to.be.eq(true)
            expect(await proxy.masterCopy()).to.be.eq(singleton.address)
            expect(await singleton.masterCopy()).to.be.eq(ethers.constants.AddressZero)
            expect(await hre.ethers.provider.getCode(proxyAddress)).to.be.eq(await factory.proxyRuntimeCode())
        })

    })

    
})