
import { defaultAbiCoder, keccak256, recoverAddress, solidityPack, toUtf8Bytes, joinSignature } from "ethers/lib/utils";
import { ecsign } from "ethereumjs-util";
import { BigNumberish, ethers,  Signature, TypedDataField } from "ethers";
import { SignatureLike } from "@ethersproject/bytes";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

//openzeppelin eip712 solidity ^0.8.0 

export const TYPE_HASH = keccak256(
    toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")
);

export interface DomainSeparator {
    name: string,
    version: string,
    chainId: BigNumberish,
    verifyingContract: string
}

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

/**
 * 通过私钥签名
 * @param _typeDataHash 用于签名的hash
 * @param _privateKey 私钥
 * @returns 用于712验证，SignatureLike.v SignatureLike.r SignatureLike.s
 * function recover(bytes32 hash,uint8 v,bytes32 r,bytes32 s) internal pure returns (address)
 */
export function signWithPrivateKey(_privateKey: string, _typeDataHash: string): SignatureLike {
    
    const typeDataHash = _typeDataHash.startsWith("0x") ? _typeDataHash.slice(2) : _typeDataHash;
    const privateKey = _privateKey.startsWith("0x") ? _privateKey.slice(2) : _privateKey;
    
    const signature = ecsign(Buffer.from(typeDataHash.slice(2), 'hex'), Buffer.from(privateKey.slice(2),'hex'))
    console.log("signature = ", signature);

    const signatureLike: SignatureLike = {
        r:  "0x" + signature.r.toString('hex'),
        s: "0x" + signature.s.toString('hex'),
        v: signature.v
    }

    return  signatureLike
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

/**
 * 
 * @param signer SignerWithAddress
 * @param domainSeparator DomainSeparator
 * @param types messageTypes
 *  example ERC20PermitTypes: `Permit: [
      {name:'owner', type:'address'},
      {name:'spender', type:'address'},
      {name:'value', type:'uint256'},
      {name:'nonce', type:'uint256'},
      {name:'deadline', type:'uint256'},
    ]`
 * 
 * @param values messageValues
 * @returns typeDataHash (signFlag)用于签名的数据hash
 */
export async function signTypedData(signer: SignerWithAddress, domainSeparator: DomainSeparator, types: Record<string, TypedDataField[]>, values: Record<string, any>): Promise<string> {
    return signer._signTypedData(domainSeparator, types, values)
}


export async function signWithSigner(signer: SignerWithAddress, signTypeDataHash: string): Promise<Signature> {
    const sign = ethers.utils.splitSignature(signTypeDataHash)
    return sign;
}


