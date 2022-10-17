import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { defaultAbiCoder, keccak256, recoverAddress, toUtf8Bytes } from "ethers/lib/utils";
import { ethers } from "hardhat"
import { ADDRESS_ZERO } from "../helper.config";
import { WyvernExchange, WyvernRegistry } from "../typechain-types";
import { hashOrder, hashToSign, personalSignPrefix, verifySignature, wrap } from "./wyvernUtils";

describe("WyvernExchange", async () => {
    
    
    let signers: SignerWithAddress[]
    let chainId: number

    beforeEach(async () => {
        signers = await ethers.getSigners()
        chainId = await signers[0].getChainId()
    })

    const withExchangeAndRegistry = async () => {
        const WyvernExchange = await ethers.getContractFactory("WyvernExchange")
        const WyvernRegistry = await ethers.getContractFactory("WyvernRegistry")

        let registry = await WyvernRegistry.deploy(2) as WyvernRegistry
        let exchange = await WyvernExchange.deploy(chainId, [registry.address], toUtf8Bytes(personalSignPrefix)) as WyvernExchange
        
        return {exchange: wrap(exchange), registry}
    }
    
    it('correctly hashes order', async () => {
        let { exchange, registry } = await withExchangeAndRegistry()
        let example = { registry: registry.address, maker: signers[0].address, staticTarget: ADDRESS_ZERO, staticSelector: '0x00000000', staticExtradata: '0x', maximumFill: '1', listingTime: '0', expirationTime: '0', salt: '0' }
        let hash = await exchange.hashOrder(example)
        assert.equal(hashOrder(example), hash, 'Incorrect order hash')
    })

    it('correctly hashes order to sign', async () => {
        let { exchange, registry } = await withExchangeAndRegistry()
        let example = { registry: registry.address, maker: signers[0].address, staticTarget: ADDRESS_ZERO, staticSelector: '0x00000000', staticExtradata: '0x', maximumFill: '1', listingTime: '0', expirationTime: '0', salt: '0' }
        let hash = await exchange.hashToSign(example)
        assert.equal(hashToSign(example, exchange.inst.address, chainId), hash, 'Incorrect order hash')
    })

    it('validates valid order parameters', async () => {
        let { exchange, registry } = await withExchangeAndRegistry()
        let example = { registry: registry.address, maker: signers[0].address, staticTarget: exchange.inst.address, staticSelector: '0x00000000', staticExtradata: '0x', maximumFill: '1', listingTime: '0', expirationTime: '1000000000000', salt: '0' }
        assert.isTrue(await exchange.validateOrderParameters(example), 'Should have validated')
    })

    it('validates valid authorization by signature (sign_typed_data)', async () => {
        let { exchange, registry } = await withExchangeAndRegistry()
        let example = { registry: registry.address, maker: signers[1].address, staticTarget: exchange.inst.address, staticSelector: '0x00000000', staticExtradata: '0x', maximumFill: '1', listingTime: '0', expirationTime: '1000000000000', salt: '100230' }
        let signature = await exchange.sign(example, signers[1], chainId)
        console.log(`signature = , ${signature}, lenght = ${signature.length}`);
        
        let hash = hashOrder(example)
        let signHash = await exchange.inst.hashToSign_(hash)
        console.log("hash = ", hash);

        //本地验证签名者
        assert.equal(signers[1].address, verifySignature(example, exchange.inst.address, chainId, signature), "signature error") 

        const sig = ethers.utils.splitSignature(signature)
        console.log(sig);

        const account = recoverAddress(signHash, sig)
        console.log("account = ", account);
        
        


        // assert.isTrue(await exchange.validateOrderAuthorization(hash, signers[1].address, signature), 'Should have validated')
        // const result = await exchange.inst.validateOrderAuthorization_(hash, signers[1].address, signature)
        // console.log(result);
        
    })







})