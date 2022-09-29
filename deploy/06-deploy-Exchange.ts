import { deployments, getNamedAccounts } from "hardhat"


export default async function deployExchange() {
    
    const {  deployer } = await getNamedAccounts()
    const exchange = await deployments.deploy("Exchange", {
        from: deployer,
        log: true
    })

    console.log("exchange address = ", exchange.address);
    
}

deployExchange.tags = ["all", "exchange"]