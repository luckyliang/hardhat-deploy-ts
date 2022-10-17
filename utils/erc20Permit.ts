import { BigNumber, BigNumberish, ethers, Signature, TypedDataDomain, TypedDataField } from "ethers";
import { defaultAbiCoder, keccak256, toUtf8Bytes, _TypedDataEncoder } from "ethers/lib/utils";
import { signTypedData, signWithPrivateKey, toTypedDataHash } from "./eip712";
import { SignatureLike } from "@ethersproject/bytes";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const PERMIT_TYPEHASH =
    keccak256(toUtf8Bytes("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"));

export interface ERC20PermitValues {
    owner: string,
    spender: string,
    value: BigNumberish
    nonce: BigNumberish
    deadline: BigNumberish
}

export function permitStructHash(values: ERC20PermitValues): string {
    return keccak256(
        defaultAbiCoder.encode(
            ['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256'],
            [PERMIT_TYPEHASH, values.owner, values.spender, values.value, values.nonce, values.deadline]
        )
    );
} 





/**
 * @param domainSeparator get from ./eip712.ts domainSeparatorV4()
 * @param values values
 * @returns typedatahash
 */
 export function erc20PermitTypeDataHash(domainSeparator: string, values: ERC20PermitValues): string {
    return toTypedDataHash(domainSeparator, permitStructHash(values))
}

export function erc20PermitSignWithPrivateKey(privateKey: string, typeDataHash: string): SignatureLike {
    return signWithPrivateKey(typeDataHash, privateKey);
    
}

export const erc20PermitTypes =  {
    Permit: [
      {name:'owner', type:'address'},
      {name:'spender', type:'address'},
      {name:'value', type:'uint256'},
      {name:'nonce', type:'uint256'},
      {name:'deadline', type:'uint256'},
    ]
}

/**
 * erc20Permit sign
 * @param signer 
 * @param domainSeparator 
 * @param values 
 * @returns 
 */
export async function erc20PermitSignWithSinger(signer: SignerWithAddress, domainSeparator: TypedDataDomain, values: ERC20PermitValues): Promise<string> {

    return signTypedData(signer, domainSeparator, erc20PermitTypes, values)

}


