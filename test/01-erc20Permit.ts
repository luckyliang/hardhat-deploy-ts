import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { BigNumberish, TypedDataDomain } from "ethers";
import {  ethers } from "hardhat";
import { TestERC20Permit } from "../typechain-types"
import { signatureWithTypeDataHash, verifySignature } from "../utils/eip712";
import { erc20PermitSignWithSinger, erc20PermitTypes, ERC20PermitValues } from "../utils/erc20Permit";
import { increase, increaseTo, latest } from "@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time";
describe("ERC20Permit 712 signature", async () => {

    let erc20Permit: TestERC20Permit;
    let signers: SignerWithAddress[]

    const getSignTypeDataHash = async (owner: string, spender: string, approveValue: BigNumberish, nonce: BigNumberish, deadline: BigNumberish) : Promise<string> => {

        const signer = await ethers.getSigner(owner)

        const domainSeparator: TypedDataDomain = {
            name: "TEST TOKEN",
            version: "1",
            chainId: await signer.getChainId(),
            verifyingContract: erc20Permit.address
        }

        const signValues: ERC20PermitValues = {
            owner: owner,
            spender: spender,
            value: approveValue,
            nonce: nonce,
            deadline: deadline
        }

        const signTypeDataHash = await erc20PermitSignWithSinger(
            signer, 
            domainSeparator,
            signValues
        )
        return signTypeDataHash
    }

    beforeEach(async () => {
        const TestERC20Permit = await ethers.getContractFactory("TestERC20Permit")

        erc20Permit = await  TestERC20Permit.deploy() as TestERC20Permit
        signers = await ethers.getSigners()
    })

    it("ERC20Permit signature",async () => {
        
        const owner = signers[0].address
        const spender = signers[1].address
        const approveValue = ethers.utils.parseEther("100")
        const nonce = await erc20Permit.nonces(owner)

        //获取最新区块的时间戳 + 30 * 60
        const deadline = await latest() + 30 * 60

        const signTypeDataHash = await getSignTypeDataHash(owner, spender, approveValue, nonce, deadline)
        
        const signature =  signatureWithTypeDataHash(signTypeDataHash)
            
        //本地验证签名者
        assert.equal(owner, verifySignature({
            name: "TEST TOKEN",
            version: "1",
            chainId: await signers[0].getChainId(),
            verifyingContract: erc20Permit.address
        }, 
        erc20PermitTypes, 
        {
            owner: owner,
            spender: spender,
            value: approveValue,
            nonce: nonce,
            deadline: deadline
        },
         signature), "signer not owner")

        
        erc20Permit = erc20Permit.connect(signers[1])
        
        //拿到签名进行授权
        await erc20Permit.permit(owner, spender, approveValue, deadline, signature.v, signature.r, signature.s).then(tx => tx.wait())
        
        //验证授权金额
        const allowance = await erc20Permit.allowance(owner, spender)
        
        assert.equal(approveValue.toString(), allowance.toString(), "not equal approve value")

        //转账
        await erc20Permit.transferFrom(owner, spender, approveValue).then(tx => tx.wait())
        assert.equal(approveValue.toString(), (await erc20Permit.balanceOf(spender)).toString())
          
    })

    // 签名超时
    it("ERC20Permit expired deadline",async () => {

        const owner = signers[0].address
        const spender = signers[1].address
        let approveValue = ethers.utils.parseEther("100")
        let nonce = await erc20Permit.nonces(owner)

        //获取最新区块的时间戳 + 30 * 60
        let deadline = await latest() + 30 * 60

        let signTypeDataHash = await getSignTypeDataHash(owner, spender, approveValue, nonce, deadline)
        
        let signature =  signatureWithTypeDataHash(signTypeDataHash)

        // increase(30 * 60) //在最新区块的时间戳之后挖掘一个时间戳为30 * 60 的新区块
        increaseTo(deadline)
        await expect(erc20Permit.permit(owner, spender, approveValue, deadline, signature.v, signature.r, signature.s)).to.be.revertedWith("ERC20Permit: expired deadline")
      
    })

    // 错误的签名
    it("ERC20Permit signature Incorrect", async () => {

        const owner = signers[0].address
        const spender = signers[1].address
        let approveValue = ethers.utils.parseEther("100")
        let nonce = await erc20Permit.nonces(owner)

        //获取最新区块的时间戳 + 30 * 60
        let deadline = await latest() + 30 * 60

        let signTypeDataHash = await getSignTypeDataHash(owner, signers[2].address, approveValue, nonce, deadline)
        
        let signature =  signatureWithTypeDataHash(signTypeDataHash)

        //错误的签名
        await expect(erc20Permit.permit(owner, spender, approveValue, deadline, signature.v, signature.r, signature.s)).to.be.revertedWith("ERC20Permit: invalid signature")
         //验证授权金额
         let allowance = await erc20Permit.allowance(owner, spender)
         console.log("授权金额 = ", ethers.utils.formatEther(allowance));
    })

})