import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers } from "hardhat";
import { WyvernExchange, WyvernRegistry, TestERC20Token, TestERC721Token } from "../../typechain-types";
import { increaseTo, latest } from "@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("WyvernExchange test", function () {
    let signers: SignerWithAddress[]
    let registry: WyvernRegistry
    let exchange: WyvernExchange
    let erc20Token: TestERC20Token
    let erc721Token: TestERC721Token

    this.beforeEach(async () => {
        signers = await ethers.getSigners()
        registry = (await loadFixture(deployContract)).registry
        exchange = (await loadFixture(deployContract)).exchange
        erc20Token = (await loadFixture(deployContract)).erc20Token
        erc721Token = (await loadFixture(deployContract)).erc721Token
    })

    const deployContract = async () => {

        const Registry = await ethers.getContractFactory("WyvernRegistry")
        const registry = (await Registry.deploy(1)) as WyvernRegistry

        const Exchange = await ethers.getContractFactory("WyvernExchange")
        const exchange = (await Exchange.deploy()) as WyvernExchange
        
        const ERC20Token = await ethers.getContractFactory("TestERC20Token")
        const erc20Token = (await ERC20Token.deploy()) as TestERC20Token

        const ERC721Token = await ethers.getContractFactory("TestERC20Token")
        const erc721Token = (await ERC721Token.deploy()) as TestERC721Token

        return {registry, exchange, erc20Token, erc721Token}
    }


    




})