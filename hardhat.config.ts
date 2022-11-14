import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import '@openzeppelin/hardhat-upgrades';
import "@nomiclabs/hardhat-ethers";
dotenv.config({path:"./env"})

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
const defaultNetwork = "localhost";

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
  defaultNetwork: defaultNetwork,
  networks: { 
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337
      //使用本地测试账户：通过npx hardhat node --network hardhat --no-deploy 命令可查看
    },
    bsctest:{
      url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      chainId: 97
    },
    bsc:{
      url: "https://bsc-dataseed1.binance.org/",
      chainId: 56
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.infuraKey}`,
      chainId: 1
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.infuraKey}`,
      chainId: 5,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.infuraKey}`,
      chainId: 11155111,
    },
  },
  
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.apiKey || undefined
  },
};

export default config;
