
import { defaultAbiCoder, keccak256, recoverAddress, solidityPack, toUtf8Bytes, joinSignature } from "ethers/lib/utils";
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
//domainSeparator: domainSeparatorV4()
//structHash: 自定义签名数据
//返回用于签名的hash
export function toTypedDataHash(domainSeparator: string, structHash: string): string {
    return keccak256(
        solidityPack(
            ["bytes1", "bytes1", "bytes32", "bytes32"],
            ["0x19", "0x01", domainSeparator, structHash]
            )
        )
}

//TUDO
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

/**
 * 通过私钥签名
 * @param _typeDataHash 用于签名的hash
 * @param _privateKey 私钥
 * @returns 用于712验证，SignatureLike.v SignatureLike.r SignatureLike.s
 * function recover(bytes32 hash,uint8 v,bytes32 r,bytes32 s) internal pure returns (address)
 */
export function signWithPrivateKey(_typeDataHash: string, _privateKey: string): SignatureLike {
    
    const typeDataHash = _typeDataHash.startsWith("0x") ? _typeDataHash.slice(2) : _typeDataHash;
    const privateKey = _privateKey.startsWith("0x") ? _privateKey.slice(2) : _privateKey;
    
    const signature = ecsign(Buffer.from(typeDataHash.slice(2), 'hex'), Buffer.from(privateKey.slice(2),'hex'))
    console.log("signature = ", signature);
    
    return {
        r:  "0x" + signature.r.toString('hex'),
        s: "0x" + signature.s.toString('hex'),
        v: signature.v
    }
}


/**
 * 
 * @param signatureLike 签名SignatureLike类型
 * @returns bytes 用于712 验证 时传入signature
 * @openzeppelin/contract/utils/cryptography/ECDSA.sol 以下方法传入的signature
 * function recover(bytes32 hash, bytes memory signature) internal pure returns (address)
 */
export function signatureLikeToBytesString(signatureLike: SignatureLike): string {
    return joinSignature(signatureLike)
}




