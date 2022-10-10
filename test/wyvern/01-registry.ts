import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { deployments, ethers } from "hardhat"
import { AuthenticatedProxy, OwnableDelegateProxy, WyvernRegistry } from "../../typechain-types"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert, Assertion, expect } from "chai";
import { increaseTo, latest } from "@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time";

describe("WyvernRegistry test", function () {

    let signers: SignerWithAddress[]
    let registry: WyvernRegistry

    this.beforeEach(async () => {
        signers = await ethers.getSigners()
        registry = await loadFixture(deployContract)
    })

    const deployContract = async () => {
        const Registry = await ethers.getContractFactory("WyvernRegistry")
        const registry = (await Registry.deploy(1)) as WyvernRegistry
        return registry
    }

    //初始受信任合约，受信任的合约可以调用 proxies
    it("grant initital Authentication", async () => {
        console.log(registry.address);
        
        await registry.grantInitialAuthentication(registry.address)
        //初始化受信任地址超过数量, 后面只能通过startGrantAuthentication来延迟受信任
        await expect(registry.grantInitialAuthentication(signers[1].address)).to.be.revertedWith("Wyvern Protocol Proxy Registry initial address already set")
    })

    //初始化受信任地址后，只能调用startGrantAuthentication来设置受地址，有1天的延迟（DELAY_PERIOD = 1 days）
    it ("grant Authentication",async () => {
        console.log(registry.address);
        //开始受信任
        await registry.startGrantAuthentication(signers[1].address)
        assert.isFalse(await registry.contracts(signers[1].address), "start the process to enable access for specified contract error")

        //进入peeding 状态
        const DELAY_PERIOD = 1 * 24 * 60 * 60

        // > 0
        assert.isAbove((await registry.pending(signers[1].address)).toNumber(), 0 , "registry delay period error")

        //重复受信任
        await expect(registry.startGrantAuthentication(signers[1].address)).to.be.rejectedWith("Contract is already allowed in registry, or pending");

        //在DELAY_PERIOD 内不允许endGrantAuthentication
        await expect(registry.endGrantAuthentication(signers[1].address)).to.be.rejectedWith("Contract is no longer pending or has already been approved by registry")
        
        await expect(registry.endGrantAuthentication(signers[2].address)).to.be.rejectedWith("Contract is no longer pending or has already been approved by registry")

        const moveToTime = await latest() + DELAY_PERIOD
        await increaseTo(moveToTime)
        //一天后可结束
        await registry.endGrantAuthentication(signers[1].address)
        assert.equal(0, (await registry.pending(signers[1].address)).toNumber(), "pedding error")

        assert.isTrue(await registry.contracts(signers[1].address), "end grant authentication error")

        //revokeAuthentication
        await registry.revokeAuthentication(signers[1].address)
        assert.isFalse(await registry.contracts(signers[1].address), "revoke authenticatio error")
    })


    // 代理实现地址
    it("has a delegateproxyimpl", async () => {
       
        let impl = await registry.delegateProxyImplementation()
        assert.equal(42, impl.length, "delegateProxyImplementation not impl")
    })


    it("proxy registration",async () => {
        // 注册
        await registry.registerProxyFor(signers[1].address)
        //用户代理合约地址
        const signer1ProxyAddr = await registry.proxies(signers[1].address)
        console.log(signer1ProxyAddr);
        
        //代理合约(这里使用代理合约地址，初始化实现合约调用， 不然会报错找不到方法)
        const signer1Proxy = await ethers.getContractAt<AuthenticatedProxy>("AuthenticatedProxy", signer1ProxyAddr)
        
        //验证代理合约的用户
        assert.equal(signers[1].address, await signer1Proxy.user(), "register proxy for error")

        await registry.registerProxyFor(signers[2].address)
        const signer2ProxyAddr = await registry.proxies(signers[2].address)
        const signer2Proxy = await ethers.getContractAt<AuthenticatedProxy>("AuthenticatedProxy", signer2ProxyAddr)

        assert.equal(signers[2].address, await signer2Proxy.user(), "register proxy for error")

        //registerProxyOverride
        registry =  registry.connect(signers[2])
        await registry.registerProxyOverride()

        assert.notEqual(signer2ProxyAddr, await registry.proxies(signers[2].address), "registerProxyOverride error")


        //不允许重复注册
        await expect(registry.registerProxyFor(signers[2].address)).to.be.revertedWith("User already has a proxy")

    })



})