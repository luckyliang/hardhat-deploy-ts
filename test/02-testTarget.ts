import { assert } from "chai"
import { BytesLike, recoverAddress } from "ethers/lib/utils"
import { deployments, ethers, getChainId, getNamedAccounts, network } from "hardhat"
import { Exchange, TestTarget } from "../typechain-types"
import { domainSeparatorV4, signWithPrivateKey, toTypedDataHash, TYPE_HASH } from "../utils/eip712"
import { orderStructHash } from "./util"

describe("test target sign",async () => {

    let exchange: Exchange
    let target: TestTarget

    
    beforeEach(async () => {
        await deployments.fixture(["exchange", "testTarget"])
        exchange = await ethers.getContract<Exchange>("Exchange")
        target = await ethers.getContract<TestTarget>("TestTarget")
    })

    it("local validate sign",async () => {

        const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

        const { dpeloyer } = await getNamedAccounts()

        const account = dpeloyer

        const structHash = orderStructHash({owner: account, tokenId: "1"})
        console.log(`structHash = ${structHash}`);
        
        const domainSeparator = domainSeparatorV4(TYPE_HASH, "exchange", "1", exchange.address, network.config.chainId || 31137)
        console.log(`domainSeparator = ${domainSeparator}`);
        
        const typeDataHash = toTypedDataHash(domainSeparator, structHash)
        console.log(`typeDataHash = ${typeDataHash}`);

        const sign = signWithPrivateKey(typeDataHash, privateKey);
        console.log(`sign = ${sign as BytesLike}`);


        const signAccount = recoverAddress(typeDataHash, sign)
        console.log("signAccount = ", signAccount);
        
        assert.equal(account, signAccount, "validate sign error")

        // await target.callExchange(typeDataHash, sign)
    })
})