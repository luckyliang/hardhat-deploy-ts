import { BigNumberish, Contract } from "ethers"
import { AbiCoder, BytesLike, defaultAbiCoder, hexlify, keccak256, ParamType, randomBytes, solidityKeccak256, solidityPack } from "ethers/lib/utils"

export const nowSeconds = () => Math.floor(Date.now() / 1000)

export const random32 = () => randomBytes(32)

export const newSecretHashPair = () => {

    const secret = random32()
    const hash = keccak256(secret)
    return {
        secret: hexlify(secret),
        secretHash: hash
    }
}

export const swapId = (sender: string, receiver: string, erc20Address: string, amount: BigNumberish, hashlock: BytesLike, timelock: BigNumberish) => {

    return solidityKeccak256([
        "address",
        "address",
        "address",
        "uint256",
        "bytes32",
        "uint256"
    ], [
        sender,
        receiver,
        erc20Address,
        amount,
        hashlock,
        timelock
    ])
}



