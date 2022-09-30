import { deployments, ethers } from "hardhat";
import { ERC20Permit, TestERC20Permit } from "../typechain-types";
import { DomainSeparator, signTypedData, signWithSigner } from "../utils/eip712";
import { erc20PermitSignWithPrivateKey, erc20PermitSignWithSinger, erc20PermitTypeDataHash, ERC20PermitValues, permitStructHash } from "../utils/erc20Permit";


async function main() {

    

    const accounts = await ethers.getSigners()

    const owner = accounts[0].address
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" //hardhat network private key, accounts[0] privateKey

    const spender = accounts[1].address
    const approveValue =  ethers.utils.parseEther("10000")

    let erc20Permit = await ethers.getContract<TestERC20Permit>("TestERC20Permit", owner)

    //使用ERC20Permit nonce， 不用自己维护
    let nonce = await erc20Permit.nonces(owner)

    const deadline = (Date.now() + 30 * 60 * 1000)/1000; //截止时间秒
    
    const domainSeparator: DomainSeparator = {
        name: await erc20Permit.name(),
        version: "1",
        chainId: await accounts[1].getChainId(),
        verifyingContract: erc20Permit.address
    }


    const signValues: ERC20PermitValues = {
        owner: owner,
        spender: spender,
        value: approveValue,
        nonce: nonce,
        deadline: deadline
    }
    
    //需要签名的数据
    const signTypeDataHash = await erc20PermitSignWithSinger(
        accounts[0], 
        domainSeparator,
        signValues
    )

    const signature = await signWithSigner(accounts[1], signTypeDataHash)
    
    
    const result = await erc20Permit.permit(owner, spender, approveValue, deadline, signature.v, signature.r, signature.s).then(tx => tx.wait())
    console.log(result);
    
}

main().catch(error => {
    console.log(error);
    process.exit(1)
    
})