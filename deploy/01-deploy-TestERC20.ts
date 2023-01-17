import { artifacts, ethers, network } from "hardhat";
import { write_config } from "../scripts/deployment";
import { getSigner } from "../scripts/helper";
import hre from "hardhat"

async function deployBox() {
    
    const signer = await getSigner(hre, true)    
    const TestERC20 = await ethers.getContractFactory("TestERC20", signer)
    const testERC20 = await TestERC20.deploy()
    await testERC20.deployed()
    console.log("TestERC20.address = ", testERC20.address);
    write_config(await signer.getChainId(), "TestERC20", testERC20.address)
}

deployBox().catch(error => {
    console.log(error);
    process.exit(1)
})


