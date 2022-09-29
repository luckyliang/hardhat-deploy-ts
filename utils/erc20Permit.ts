import { BigNumberish } from "ethers";
import { defaultAbiCoder, keccak256, toUtf8Bytes } from "ethers/lib/utils";

const PERMIT_TYPEHASH =
    keccak256(toUtf8Bytes("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"));

interface Approve {
    owner: string,
    spender: string,
    value: BigNumberish
}

export function permitStructHash(approve: Approve, nonce: BigNumberish, deadline: BigNumberish) {
    return keccak256(
        defaultAbiCoder.encode(
            ['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256'],
            [PERMIT_TYPEHASH, approve.owner, approve.spender, approve.value, nonce, deadline]
        )
    );
} 



    