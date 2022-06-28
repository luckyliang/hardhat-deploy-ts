import { network, ethers, getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

//使用hardhat-deploy
// 使用命令：npx hardhat deploy --tags Greeting
const deployGreeting: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const deployments = hre.deployments;
    //必须在hardhat.config.ts 中 配置 namedAccounts
    const { deployer, user1 } = await hre.getNamedAccounts();

    console.log("deployer = " + deployer + " testUser1 = " + user1);

    console.log(`deployer = ${deployer} network = ${network.name} chainId = ${network.config.chainId}`);

    const deploy = deployments.deploy;

    const greeterResult = await deploy("Greeter", {
        from: deployer,
        args: ["deployer greeting"],
        log: true
    });

}

deployGreeting.tags = ["Greeting"];

//hardhat 原生部署方法，不会储存，每次调用该方法都会创建一个新合约
// async function commonDeploy() {
//     const { deployer, user1 } = await getNamedAccounts();
    
//     const Greeter = await ethers.getContractFactory("Greeter", deployer)
//     const greeter = await Greeter.deploy("hello gretter");
//     await greeter.deployed();
//     console.log("greeter deployed to: ", greeter.address);
// }

// commonDeploy.tags = ["Greeting"];

export default deployGreeting;
