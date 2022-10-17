
// import { WyvernRegistry } from "../typechain-types";

import { ethers } from "hardhat"

describe('LibraAution', async () => {
    const WyvernExchange = await ethers.getContractFactory("WyvernExchange")
    const WyvernRegistry = await ethers.getContractFactory("WyvernRegistry")
    const Atomicizer = await ethers.getContractFactory("Atomicizer")
    const LibraAuction = await ethers.getContractFactory("LibraAuction")
    
    const deployContract =async () => {
         let [registry, atomicizer] = await Promise.all([WyvernRegistry.deploy(2), Atomicizer.deploy])
         let [ssauction] = await Promise.all([LibraAuction.deploy(registry.address)])
         let [exchange] = await Promise.all([WyvernExchange.deploy()])
    }
})