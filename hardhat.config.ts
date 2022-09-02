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

// const accounts = fs.readFileSync(".secret").toString().trim().split(",");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const defaultNetwork = "localhost";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: defaultNetwork,
  networks: { 
    localhost:{
      url: "http://127.0.0.1:8545/",
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: {
        mnemonic: process.env.mnemonic
      }
      //live: false, //指定是否是一个线上的链，localhost and hardhat where the default is false
      //tags: ["bsctest"] //设置网络别名，可通过hre.network.tags获得
    },
    bsc: {
      allowUnlimitedContractSize: true,
      url: "https://bsc-dataseed1.binance.org/",
      chainId: 56,
      accounts: {
        mnemonic: process.env.mnemonic
      }
    },
    Rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.infuraKey}`
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3//${process.env.infuraKey}`,
      live: true,
      accounts:{
        mnemonic: process.env.mnemonic,
      }
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
    enabled: true,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      bsc: process.env.bscApiKey,
      rinkeby: process.env.infuraKey,
      mainnet: process.env.infuraKey,
      ropsten: process.env.infuraKey
    }
  },
};

export default config;
