import * as dotenv from "dotenv";
import { HardhatUserConfig, task, types } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import '@openzeppelin/hardhat-upgrades';
import "@nomiclabs/hardhat-ethers";
import fs from "fs";

import "./tasks/commonTask"

dotenv.config({path:"./env"})

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("networks", "Prints the list of networks",async () => {
  const networks = config.networks;
  console.log(networks);
})

const accounts = () => {
  try {
    let data = fs.readFileSync("secret.json", 'utf8');
    return JSON.parse(data) as string[]
  } catch (e) {
    return [] as string[]
  }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
// const defaultNetwork = "bsctest";
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "localhost",
  networks: {
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    },
    bsctest:{
      url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      chainId: 97,
      accounts: accounts()

    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/92983deb8689407bb1736bdf82bf9c9c",
      chainId: 1,
      accounts: accounts()
    },
    goerli: {
      url: "https://goerli.infura.io/v3/92983deb8689407bb1736bdf82bf9c9c",
      chainId: 5,
      accounts: accounts()
    }
  },
  gasReporter: {
    // enabled: process.env.REPORT_GAS !== undefined,
    enabled: true,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.apiKey || undefined
  },
};

export default config;
