
import { BigNumberish } from "ethers";
import { defaultAbiCoder, keccak256, toUtf8Bytes } from "ethers/lib/utils";

export interface Order {
    owner: string,
    tokenId: BigNumberish
}

const ORDER_TYPEHASH =
    keccak256(toUtf8Bytes("order(address owner,uint256 tokenId)"));

export function orderStructHash(order: Order) {
    return keccak256(defaultAbiCoder.encode(
        ["bytes32", "address", "uint256"],
        [ORDER_TYPEHASH, order.owner, order.tokenId]
    ))
}