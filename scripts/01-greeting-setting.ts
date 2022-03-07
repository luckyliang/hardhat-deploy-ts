import { deployments, getNamedAccounts, network, artifacts, ethers } from "hardhat";
import { Greeter } from "../typechain";

async function greetingSetting() {

    const { deployer, testUser1 } = await getNamedAccounts();

    console.log(`deployer = ${deployer} network = ${network.name} chainId = ${network.config.chainId}`);

    //部署账号设置greting
    const greeterContract: Greeter = await ethers.getContract<Greeter>("Greeter", deployer);
    const result =  await greeterContract.setGreeting("deployer set greeter test").then((tx) => tx.wait());

    //打印交易日志
    // console.log("set result logs = " , result.logs);

    const greetValue = await greeterContract.greet();
    console.log("greetValue = ", greetValue);
    const getGreeting = await greeterContract.getUserSetGreeting(deployer);
    console.log("getGreeting = ", getGreeting);

    //使用测试账号测试合约,connect连接到其他账户， attach(): Re-attach to a different on-chain instance of this contract
    // const contact2 = greeterContract.connect(testUser1); //connect 连接其他用户后调用合约还是原部署账户，暂时还不知道解决方法
    const contact2 = await ethers.getContract<Greeter>("Greeter", testUser1);
    await contact2.setGreeting("use1 set greeting test").then((tx) => tx.wait());
    console.log("set result event = ", result.events)
    
    const newValue = await contact2.greet();
    console.log("newValue = ", newValue);
    const newgetGreeting = await contact2.getUserSetGreeting(testUser1);
    console.log("newgetGreeting = ", newgetGreeting);
}

greetingSetting().catch((error) => {
    process.exit(1);
});