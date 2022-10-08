import { BigNumberish } from "ethers";
import { defaultAbiCoder, keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { domainSeparatorV4, signWithPrivateKey, toTypedDataHash, TYPE_HASH } from "../utils/eip712";

const getTypeDataHash =async (owner: string, tokenId: BigNumberish): Promise<string> => {
    const signer = await ethers.getSigner(owner)
    const domainSeparator = domainSeparatorV4(TYPE_HASH, "exchange", "1", "0x5FbDB2315678afecb367f032d93F642f64180aa3", await signer.getChainId())
    const type_hash = keccak256(toUtf8Bytes("order(address owner, uint256 tokenId)"))

    const structHash = keccak256(defaultAbiCoder.encode(
        ['bytes32', 'address', 'uint256'],
        [type_hash, owner, tokenId]
    ))

    const typeDataHash = toTypedDataHash(domainSeparator, structHash);
     
    return typeDataHash;
}


async function main() {
    const signers = await ethers.getSigners()

    const owenr = signers[0].address
    console.log("owner = ", owenr);
    
    // assert.equal(owenr, await erc1271Caller.owner(), "contract owner error")
    
    const typedatahash = await getTypeDataHash(owenr, 1)
    console.log("typedataHash = ", typedatahash);

    // const sigTypeData = await getSignTypeDataHash(owenr, 1)
    // console.log(sigTypeData);

    // const verifyHash = keccak256(sigTypeData)
    // console.log(verifyHash);
    // 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
    
    // const signatureStr =  signatureWithTypeDataHash(sigTypeData).compacts
    const signatureLike = signWithPrivateKey("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", typedatahash)
    console.log("signatureLike = ", signatureLike);
    
    
}


main().catch(error => {
    console.log(error);
    process.exit(1)
})