import { it } from "mocha";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { Greeter } from "../typechain";
import { expect } from "chai";
/**
 * Tests can use the hre.deployments.fixture function to run the deployment 
 * and snapshot it so that tests don't need to perform all the deployment transactions every time. T
 * hey can simply reuse the snapshot for every test (this leverages evm_snapshot and evm_revert provided by both hardhat and ganache). You can for example set them in a beforeEach.
 */

//hardhat-deploy 测试文档：https://github.com/wighawag/hardhat-deploy/tree/master#testing-deployed-contracts
const TestContractName = "Greeter";

//npx hardhat test test/01-greeting-test.ts

describe("Greeter", () => {
    it("test set GreetContract", async function () {

        // await deployments.fixture([TestContractName]);

        const GreeterDeploment = await deployments.get(TestContractName);
        const { deployer, testUser1 } = await getNamedAccounts();

        const greeterContract = await ethers.getContractAt<Greeter>(TestContractName, GreeterDeploment.address, deployer);
        await greeterContract.setGreeting("owner set Greeting").then((tx) => tx.wait());
        
        expect(await greeterContract.greet()).to.equal("owner set Greeting");

        greeterContract.connect(testUser1);
        await greeterContract.setGreeting("user1 set greeting").then((tx) => tx.wait());

        expect(await greeterContract.greet()).to.equal("user1 set greeting");
    })
});

