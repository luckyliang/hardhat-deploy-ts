import { deployments, getNamedAccounts } from "hardhat"


export default async function deployERC1271Caller() {
    
    const {  deployer } = await getNamedAccounts()
    const exchange = (await deployments.get("Exchange")).address;

    const erc1271Caller = await deployments.deploy("ERC1271Caller", {
        from: deployer,
        log: true,
        args: [exchange]
    })

    console.log(`testTarget address = ${erc1271Caller.address}`);
    
}

deployERC1271Caller.tags = ["all", "erc1271Caller"]