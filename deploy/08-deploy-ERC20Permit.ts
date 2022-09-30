import { deployments, getNamedAccounts } from "hardhat"


export default async function deployERC20Permit() {
    const { deployer } = await getNamedAccounts()
    const erc20Permit = await deployments.deploy("TestERC20Permit", {
        from: deployer,
        log: true
    })

    console.log("erc20Permit address = ", erc20Permit.address);
    
}

deployERC20Permit.tags = ["all", "erc20Permit"]