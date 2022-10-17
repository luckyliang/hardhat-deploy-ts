import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import '@openzeppelin/hardhat-upgrades';
import "@nomiclabs/hardhat-ethers";
import fs from "fs";
import "@walletconnect/web3-provider";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
// const defaultNetwork = "bsctest";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: { 
    
    hardhat: {},
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337
      //使用本地测试账户：通过npx hardhat node --network hardhat --no-deploy 命令可查看
    },
    bsctest: {
        url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
        allowUnlimitedContractSize:true,
        chainId: 97,
        // accounts: "remote"
        //live: false, //指定是否是一个线上的链，localhost and hardhat where the default is false
        //tags: ["bsctest"] //设置网络别名，可通过hre.network.tags获得
      },
  },
  
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    
    apiKey: "VJ946Q4WM5W4J8NYQUKK7M121HJC5U314D",
  },
};

export default config;
