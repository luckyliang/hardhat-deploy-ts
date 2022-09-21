import { deployments, ethers, getNamedAccounts } from "hardhat";
import { Box, TimeLock } from "../typechain-types";
import verify from "../utils/helper-verify";


export default async function deployBox() {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("Deploying Box ")
    const box = await deploy("Box", {
        from: deployer,
        log: true,
        args:[]
    })

    log(`Box at ${box.address}`)

    await verify(box.address, [])

    const boxContract = await ethers.getContract<Box>("Box")
    const timeLock = await ethers.getContract<TimeLock>("TimeLock")
    await boxContract.transferOwnership(timeLock.address).then(tx => tx.wait())
}

deployBox.tags = ["box"]