
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert } from "chai";
import { BigNumberish, TypedDataDomain } from "ethers";
import { defaultAbiCoder, hashMessage, joinSignature, keccak256, recoverAddress, toUtf8Bytes, _TypedDataEncoder } from "ethers/lib/utils";
import { deployments, ethers } from "hardhat";
import { type } from "os";
import { ERC1271Caller, Exchange } from "../typechain-types";
import { domainSeparatorV4, signatureLikeToBytesString, signatureWithTypeDataHash, signTypedData, signWithPrivateKey, toTypedDataHash, TYPE_HASH, verifySignature } from "../utils/eip712";
import { erc20PermitSignWithSinger } from "../utils/erc20Permit";

describe("eip1271 contract signature", async () => {

    let erc1271Caller: ERC1271Caller;
    let exchange: Exchange;
    let signers: SignerWithAddress[]

    const types =  {
        order: [
          {name:'owner', type:'address'},
          {name:'tokenId', type:'uint256'},
        ]
    }

    const getSignTypeData = async (owner: string, tokenId: BigNumberish) : Promise<string> => {

        const signer = await ethers.getSigner(owner)

        const domainSeparator: TypedDataDomain = {
            name: "exchange",
            version: "1",
            chainId: await signer.getChainId(),
            verifyingContract: exchange.address
        }

        const signValues = {
            owner: owner,
            tokenId: tokenId,
        }

        return await signTypedData(signers[0], domainSeparator, types, signValues)
    }

    const getTypeDataHash = async (owner: string, tokenId: BigNumberish): Promise<string> => {
        const signer = await ethers.getSigner(owner)
        const domainSeparator = domainSeparatorV4(TYPE_HASH, "exchange", "1", exchange.address, await signer.getChainId())
        const type_hash = keccak256(toUtf8Bytes("order(address owner, uint256 tokenId)"))

        const structHash = keccak256(defaultAbiCoder.encode(
            ['bytes32', 'address', 'uint256'],
            [type_hash, owner, tokenId]
        ))

        const typeDataHash = toTypedDataHash(domainSeparator, structHash);
         
        return typeDataHash;
    }

    beforeEach(async () => {
        await deployments.fixture(["erc1271Caller", "exchange"])
        erc1271Caller = await ethers.getContract<ERC1271Caller>("ERC1271Caller")
        exchange = await ethers.getContract<Exchange>("Exchange")

        signers = await ethers.getSigners()
    })

    //使用signer 签名
    it("verify ERC1271 with signer",   async () => {

        const owner = signers[0].address

        assert.equal(owner, await erc1271Caller.owner(), "contract owner error")

        const sigTypeData = await getSignTypeData(owner, 1)
        console.log("sigTypeData = ", sigTypeData);

        //本地验证
        const signature =  signatureWithTypeDataHash(sigTypeData)
        console.log("signature = ", signature);

        const signatureAddress = verifySignature(
            {
                name: "exchange",
                version: "1",
                chainId: await signers[0].getChainId(),
                verifyingContract: exchange.address
            },
            types,
            {
                owner: owner,
                tokenId: 1,
            },
            signature
        )

        console.log(signatureAddress);

        //线上验证
        const hash = _TypedDataEncoder.hash(
            {
                name: "exchange",
                version: "1",
                chainId: await signers[0].getChainId(),
                verifyingContract: exchange.address
            },
            types,
            {
                owner: owner,
                tokenId: 1,
            },
        )

        console.log("hash = ", hash);
        
        
        await erc1271Caller.callExchange(hash, sigTypeData)

        assert.isTrue(await exchange.success(), "signature invalidate");
        
    })

     //eip1271   合约签名实际上还是用户进行签名，然后在发起签名的合约中进行验证
     it("verify ERC1271 with privateKey",async () => {
        const owner = signers[0].address
        console.log("owner = ", owner);
        
        assert.equal(owner, await erc1271Caller.owner(), "contract owner error")
        
        //hash
        const typedatahash = await getTypeDataHash(owner, 1)
        console.log("typedataHash = ", typedatahash);
        const signatureLike = signWithPrivateKey("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", typedatahash)
        //本地验证
        console.log("验证签名者：", recoverAddress(typedatahash, signatureLike));

        const signature = joinSignature(signatureLike)
        console.log("signature = ", signature);
        
        //hash
        //0xb08f1815524b03adc2beea45b6d21d38e71d9ce3e16e9d8a959a51a5de72742c
        //signature
        //0xc674754a8bf260c571bdd22aea4233d13bf1f268b5f99f35f5143e3179162fcd3bc8ebb3fca7adeaa9445966e7b2b400b3e068823c1e1d1ae30add5801a5436a1c
        await erc1271Caller.callExchange(typedatahash, signature)

        assert.isTrue(await exchange.success(), "signature invalidate");

    })
    

})