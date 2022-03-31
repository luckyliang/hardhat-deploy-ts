import { network, ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Greeter } from "../typechain";

//使用hardhat-deploy
//使用命令：npx hardhat deploy --tags Greeting
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

    console.log(`greeter address = ${greeterResult.address} gas used = ${greeterResult.receipt?.gasUsed}`);

    //    //部署账号设置greting
    //    const greeterContract: Greeter  = await ethers.getContract<Greeter>("Greeter", deployer);
    //    const result = await greeterContract.setGreeting("deployer set greeter");
    //    await result.wait();

    //    const greetValue = await greeterContract.greet();
    //    console.log("greetValue = ", greetValue);
    //    const getGreeting = await greeterContract.getUserSetGreeting(deployer);
    //    console.log("getGreeting = ", getGreeting);

    //    //使用测试账号测试合约,connect连接到其他账户， attach(): Re-attach to a different on-chain instance of this contract
    //    greeterContract.connect(testUser1);
    //    const retuslt2 = await greeterContract.setGreeting("use1 set greeting");
    //    await retuslt2.wait();

    //    const newValue = await greeterContract.greet();
    //    console.log("newValue = ", newValue);
    //    const newgetGreeting = await greeterContract.getUserSetGreeting(deployer);
    //    console.log("newgetGreeting = ", newgetGreeting);
}

deployGreeting.tags = ["Greeting"];

export default deployGreeting;
