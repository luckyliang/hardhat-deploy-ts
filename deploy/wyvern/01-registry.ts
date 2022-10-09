import { deployments, getNamedAccounts } from "hardhat";


export default async function deployRegistry() {
    
    const { deployer } = await getNamedAccounts();

    const allowanceAddress = 2;
    
    const registry = await deployments.deploy("WyvernRegistry", {
        from: deployer,
        log: true,
        args: [allowanceAddress]
    })

    console.log("registry deployed ", registry.address);
    
}

deployRegistry.tags = ["all", "registry"]

