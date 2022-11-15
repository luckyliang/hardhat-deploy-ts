import { artifacts, ethers, network } from "hardhat";
import { write_config } from "../scripts/deployment";
import { getSigner } from "../scripts/signerManager";

async function deployBox() {
    
    const signer = await getSigner()    
    const Box = await ethers.getContractFactory("Box", signer)
    const box = await Box.deploy()
    await box.deployed()
    console.log("box.address = ", box.address);
    write_config(await signer.getChainId(), "Box", box.address)
}

deployBox().catch(error => {
    console.log(error);
    process.exit(1)
})


