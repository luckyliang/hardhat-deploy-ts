import { artifacts, ethers, network, upgrades } from "hardhat";
import { write_config } from "../scripts/deployment";
import { getSigner } from "../scripts/signerManager";

async function deployHTLCSwapERC20() {
    
    const signer = await getSigner()    
    const Box = await ethers.getContractFactory("HTLCSwapERC20", signer)
    const box = await upgrades.deployProxy(Box)
    await box.deployed()
    console.log("box.address = ", box.address);
    // write_config(await signer.getChainId(), "Box", box.address)
    
}

deployHTLCSwapERC20().catch(error => {
    console.log(error);
    process.exit(1)
})


