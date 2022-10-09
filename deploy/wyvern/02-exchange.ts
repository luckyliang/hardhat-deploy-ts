import { toUtf8Bytes } from "ethers/lib/utils";
import { deployments, getNamedAccounts, network } from "hardhat";


export default  async function deployExchange() {

    const prefixes = toUtf8Bytes("\x19Ethereum Signed Message:\n");
    const chainId = network.config.chainId;
    const registry = (await deployments.get("WyvernRegistry")).address

    const { deployer } = await getNamedAccounts()

    const exchange = await deployments.deploy("WyvernExchange", {
        from: deployer,
        log: true,
        args: [chainId, [registry], prefixes]
    })

    console.log("exchange deployed ", exchange.address);
    
}

deployExchange.tags = ["all", "exchange"]