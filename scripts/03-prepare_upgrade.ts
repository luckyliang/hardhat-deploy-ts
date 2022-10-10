import { ethers, upgrades } from "hardhat";

//准备升级
async function main() {

  const proxyAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"

  const BoxV2 = await ethers.getContractFactory("BoxV2");

  console.log("Preparing upgrade...");

  const boxV2Address = await upgrades.prepareUpgrade(proxyAddress, BoxV2);
  console.log("BoxV2 at:", boxV2Address);

}


main().then(() => process.exit(0)).catch(error => {
  console.log(error);
  process.exit(1)
});
