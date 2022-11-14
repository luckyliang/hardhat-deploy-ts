import { ethers, upgrades } from "hardhat";
import { Box, BoxV2 } from "../typechain";


async function deployBox() {

    const Box = await ethers.getContractFactory("Box")
    const box = (await upgrades.deployProxy(Box)) as Box
    await box.deployed()
    console.log(box.address);

    await box.store(100).then(tx => tx.wait())
    console.log(await box.retrieve());
    
    const BoxV2 = await ethers.getContractFactory("BoxV2")
    const boxv2 = (await upgrades.upgradeProxy(box, BoxV2)) as BoxV2
    console.log(boxv2.address);
    
    console.log("upgrad value = ", await box.retrieve());
    await boxv2.store(100).then(tx => tx.wait())
    console.log(await boxv2.retrieve());

    
}

deployBox().catch(error => {
    console.log(error);
    process.exit(1)
})