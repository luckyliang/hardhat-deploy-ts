import { ethers, upgrades } from "hardhat";
import { getSigner } from "../scripts/signerManager";
import { MyTokenUpgradeable } from "../typechain";

async function deployMyToken() {
    const signer = await getSigner()

    const MyToken = await ethers.getContractFactory("MyTokenUpgradeable", signer)
    const myToken = await upgrades.deployProxy(MyToken, ["MyToken", "MTK"]) as MyTokenUpgradeable;
    await myToken.deployed()
    console.log("mytoken address = ", myToken.address);
    console.log(await myToken.name());
}

async function upgradeMyToken() {
    const signer = await getSigner()
    const MyToken = await ethers.getContractFactory("MyTokenUpgradeable", signer)
    const proxy = await upgrades.upgradeProxy("0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1", MyToken)
    console.log(proxy.address);
}

async function main() {
    // await deployMyToken() //部署
    // await upgradeMyToken() //升级
}

main().catch(error => {
    console.log(error);

    
})