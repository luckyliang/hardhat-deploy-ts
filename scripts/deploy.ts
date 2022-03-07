// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

//使用hardhat部署的方式
async function nomalDeploy() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile'); //部署前编译

  const [deployer, user] = await ethers.getSigners(); //获取账户

  // We get the contract to deploy, deployer：指定部署账户
  const Greeter = await ethers.getContractFactory("Greeter", deployer);
  
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
nomalDeploy().catch((error) => {
  console.log(error);
  process.exit(1);
})
