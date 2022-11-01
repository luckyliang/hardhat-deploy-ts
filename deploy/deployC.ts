import { ethers } from "hardhat";


async function deploy() {
    const contract = await ethers.getContractAt("Box","")
    contract.deployed()
}