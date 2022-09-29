
import { defaultAbiCoder, keccak256, recoverAddress, solidityPack, toUtf8Bytes } from "ethers/lib/utils";
import { ecsign } from "ethereumjs-util";
import {  ethers } from "hardhat";
import { Signature } from "ethers";
import { SignatureLike } from "@ethersproject/bytes";

//openzeppelin eip712 solidity ^0.8.0 

export const TYPE_HASH = keccak256(
    toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")
);


// Gets the EIP712 domain separator
export function domainSeparatorV4(
    typehash: string = TYPE_HASH,
    name: string, 
    version: string = "1",
    contractAddress: string, 
    chainId: number): string {

        return keccak256(
            defaultAbiCoder.encode(
                ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
                [
                    typehash,
                    keccak256(toUtf8Bytes(name)),
                    keccak256(toUtf8Bytes(version)),
                    chainId,
                    contractAddress,
                ]
            )
        )
}

// typeDataHash
export function toTypedDataHash(domainSeparator: string, structHash: string): string {
    return keccak256(
        solidityPack(
            ["bytes1", "bytes1", "bytes32", "bytes32"],
            ["0x19", "0x01", domainSeparator, structHash]
            )
        )
}

export async function signWithAddress(typeDataHash: string, address: string): Promise<Signature> {

    // 获取hardhat 中的signer
    const signer = await ethers.getSigner(address)

    //签名消息
    const message = await signer.signMessage(typeDataHash);

    const sign = ethers.utils.splitSignature(message)
    console.log(`sign = ${sign}`);
    
    console.log(message);
    
    const signatureLike = ethers.utils.joinSignature(sign)
    // console.log(`signatureLike = ${signatureLike}`);
    
    return sign;
    
}

// 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
export function signWithPrivateKey(typeDataHash: string, privateKey: string): SignatureLike {
    
    const signature = ecsign(Buffer.from(typeDataHash.slice(2), 'hex'), Buffer.from(privateKey.slice(2),'hex'))
    console.log("signature = ", signature);
    
    return {
        r:  "0x" + signature.r.toString('hex'),
        s: "0x" + signature.s.toString('hex'),
        v: signature.v
    }
}



