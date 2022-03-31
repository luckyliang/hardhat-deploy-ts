import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import fs from "fs";


dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const accounts = fs.readFileSync(".secret").toString().trim().split(",");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
// const defaultNetwork = "bsctest";
const defaultNetwork = "bsctest";

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: defaultNetwork,
  networks: { 
    localhost:{
      url: "http://127.0.0.1:8545/" 
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: accounts,
      //live: false, //指定是否是一个线上的链，localhost and hardhat where the default is false
      //tags: ["bsctest"] //设置网络别名，可通过hre.network.tags获得
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      live: true,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      // 97:0 //chainId: accounts[0], 指定链
      // 1: 0xA296a3d5F026953e17F472B497eC29a5631FB51B //指定账户
      //指定网络
      bsctest: 0
    },
    user1: {
      default: 1
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
