import { deployments, getNamedAccounts } from "hardhat"


export default async function deployTestTarget() {
    
    const {  deployer } = await getNamedAccounts()
    const exchange = (await deployments.get("Exchange")).address;

    const testTarget = await deployments.deploy("TestTarget", {
        from: deployer,
        log: true,
        args: [exchange]
    })

    console.log(`testTarget address = ${testTarget.address}`);
    
}

deployTestTarget.tags = ["all", "testTarget"]