import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumberish, TypedDataDomain, TypedDataField } from "ethers"
import { BytesLike, verifyTypedData, _TypedDataEncoder } from "ethers/lib/utils"
import { WyvernExchange } from "../typechain-types"
import { domainSeparatorV4, toTypedDataHash } from "../utils/eip712"
import { SignatureLike } from "@ethersproject/bytes";

export const personalSignPrefix = "\x19Ethereum Signed Message:\n"

const eip712Order = {
    Order: [
      { name: 'registry', type: 'address' },
      { name: 'maker', type: 'address' },
      { name: 'staticTarget', type: 'address' },
      { name: 'staticSelector', type: 'bytes4' },
      { name: 'staticExtradata', type: 'bytes' },
      { name: 'maximumFill', type: 'uint256' },
      { name: 'listingTime', type: 'uint256' },
      { name: 'expirationTime', type: 'uint256' },
      { name: 'salt', type: 'uint256' }
    ]
  }

interface Order {
    registry: string,
    maker: string,
    staticTarget: string,
    staticSelector: BytesLike,
    staticExtradata: BytesLike,
    maximumFill: BigNumberish,
    listingTime: BigNumberish,
    expirationTime: BigNumberish,
    salt: BigNumberish
}


//   const hashORder = _TypedDataEncoder.hashStruct()

export const hashOrder = (order: Order) => {
    return _TypedDataEncoder.hashStruct("Order", eip712Order, order);
}

export const hashToSign = (order: Order, exchange: string, chainId: number) => {
    const domain: TypedDataDomain = {
        name: "Wyvern Exchange",
        version: "1.0.0",
        chainId: chainId,
        verifyingContract: exchange
    }
    return _TypedDataEncoder.hash(domain, eip712Order, order)
}

//验证签名
export function verifySignature(order: Order, exchange: string, chainId: number ,signature: SignatureLike): string {

    return verifyTypedData({
        name: "Wyvern Exchange",
        version: "1.0.0",
        chainId: chainId,
        verifyingContract: exchange
    }, eip712Order, order, signature)
    
}


export const wrap = (inst: WyvernExchange) => {

    var obj = {
        inst: inst,
        hashOrder: (order: Order) =>  inst.hashOrder_(order.registry, order.maker, order.staticTarget, order.staticSelector, order.staticExtradata, order.maximumFill, order.listingTime, order.expirationTime, order.salt),
        hashToSign: (order: Order) => {
            return inst.hashOrder_(order.registry, order.maker, order.staticTarget, order.staticSelector, order.staticExtradata, order.maximumFill, order.listingTime, order.expirationTime, order.salt).then( hash => {
                return  inst.hashToSign_(hash)
            })
        },
        validateOrderParameters: (order: Order) => inst.validateOrderParameters_(order.registry, order.maker, order.staticTarget, order.staticSelector, order.staticExtradata, order.maximumFill, order.listingTime, order.expirationTime, order.salt),
        validateOrderAuthorization: (hash: string, maker: string, sig: string) => inst.validateOrderAuthorization_(hash, maker, sig),
        sign: (order: Order, signer: SignerWithAddress, chainId: number) => { 
            return signer._signTypedData(
                {
                    name: "Wyvern Exchange",
                    version: "1.0.0",
                    chainId: chainId,
                    verifyingContract: inst.address
                },
                eip712Order,
                order
            )
        }
    }



    return obj
}
