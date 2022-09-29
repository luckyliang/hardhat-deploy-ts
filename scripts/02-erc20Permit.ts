import { deployments, ethers } from "hardhat";
import { toTypedDataHash } from "../utils/eip712";
import { permitStructHash } from "../utils/erc20Permit";


async function main() {

    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    const target = await deployments.get("TestTarget");

    const structHash = permitStructHash(
        {owner: account, spender: target.address, value: ethers.utils.parseEther("10000")}, 
        1,
        Date.now() + 30 * 60 * 1000
        )
    console.log(`structHash = ${structHash}`);
    
    // const typeDataHash = toTypedDataHash()
}

main().catch(error => {
    console.log(error);
    process.exit(1)
    
})