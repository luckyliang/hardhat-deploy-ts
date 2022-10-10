import { ethers, upgrades } from "hardhat";

async function main() {

    const proxyAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"

    const signers = await ethers.getSigners()
    
    //upgrade
    const BoxV2 = await ethers.getContractFactory("BoxV2", signers[1]);
    console.log("upgrade...");
    
    const upgrade = await upgrades.upgradeProxy(proxyAddress, BoxV2);
    console.log("upgrade at:", upgrade.address);
  
  }
  
  
  main().then(() => process.exit(0)).catch(error => {
    console.log(error);
    process.exit(1)
  });