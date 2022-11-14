import { artifacts, ethers } from "hardhat";
import { getSigner } from "../scripts/signerManager";

async function deployBox() {
    // console.log(await artifacts.getAllFullyQualifiedNames());
    
    const signer = await getSigner()
    const Box = await ethers.getContractFactory("Box", signer)
    const box = await Box.deploy()
    await box.deployed()
    console.log("box.address = ", box.address);
}

deployBox().catch(error => {
    console.log(error);
    process.exit(1)
})


