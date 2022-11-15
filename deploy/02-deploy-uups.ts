import { ethers, upgrades } from "hardhat";
import { getSigner } from "../scripts/signerManager";
import { MyTokenUUPS } from "../typechain";

async function deployMyToken() {
    const signer = await getSigner()

    const MyToken = await ethers.getContractFactory("MyTokenUUPS", signer)
    const myToken = await upgrades.deployProxy(MyToken) as MyTokenUUPS;
    await myToken.deployed()
    console.log("mytoken proxy address  = ", myToken.address);
    console.log(await myToken.name());
}

async function upgradeMyToken() {
    const signer = await getSigner()
    const MyToken = await ethers.getContractFactory("MyTokenUUPS", signer)
    const proxy = await upgrades.upgradeProxy("0x09635F643e140090A9A8Dcd712eD6285858ceBef", MyToken)
    console.log(proxy.address);
}

async function main() {
    // await deployMyToken() //部署
    await upgradeMyToken() //升级
}

main().catch(error => {
    console.log(error);

    
})