import {  deployments, ethers, getNamedAccounts, network } from "hardhat";
import { orderStructHash } from "../test/util";
import { domainSeparatorV4, signWithPrivateKey, toTypedDataHash, TYPE_HASH } from "../utils/eip712";
import { BytesLike, isBytesLike, joinSignature, recoverAddress } from "ethers/lib/utils"
import { Exchange, TestTarget } from "../typechain-types";

async function main() {

    
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

    const { deployer } = await getNamedAccounts()

    const account = deployer
    console.log("account = ", account);
    

    const exchangeAddress = (await deployments.get("Exchange")).address

    const structHash = orderStructHash({owner: account, tokenId: "1"})
    console.log(`structHash = ${structHash}`);
    
    const domainSeparator = domainSeparatorV4(TYPE_HASH, "exchange", "1", exchangeAddress, network.config.chainId || 31137)

    console.log(`domainSeparator = ${domainSeparator}`);
    
    const typeDataHash = toTypedDataHash(domainSeparator, structHash)

    console.log(`typeDataHash = ${typeDataHash}`);

    const sign = signWithPrivateKey(typeDataHash, privateKey);
    
    console.log(joinSignature(sign));
    
    console.log(`sign = ${sign as BytesLike}`);


    const signAccount = recoverAddress(typeDataHash, sign)
    console.log("signAccount = ", signAccount);

    const target = await ethers.getContract<TestTarget>("TestTarget")
    
    const adr = await target.exchange();
    console.log(adr);
    
    // const result = await target.callExchange(typeDataHash, joinSignature(sign)).then(tx => tx.wait())
    // console.log(result);

    const exchange = await ethers.getContract<Exchange>("Exchange");
    const isValidate = await exchange.validateContractAuthorization(target.address, typeDataHash, joinSignature(sign))
    console.log(isValidate);
    
    
}

main().catch(error => {
    console.log(error);
    process.exit(1)
    
})