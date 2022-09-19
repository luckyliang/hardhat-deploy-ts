import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers"
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
import "solidity-coverage";

import { readJSONFile } from "./utils/utils";

dotenv.config({path: `${__dirname}/accounts/.env`}); //load env

const defaultNetwork = "localhost";
const privateKeys = readJSONFile<string[]>(`${__dirname}/accounts/secret.json`)

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
        optimizer: {
          enabled: true,
          runs: 200
          }
        }
      },
      {
        version: "0.8.7",
        settings: {
        optimizer: {
          enabled: true,
          runs: 200
          }
        }
      }
    ]
  },
  defaultNetwork: defaultNetwork,
  networks: { 
    localhost:{
      url: "http://127.0.0.1:8545/",
    },
    bsc: {
      allowUnlimitedContractSize: true,
      url: "https://bsc-dataseed1.binance.org/",
      chainId: 56,
      accounts: {
        mnemonic: process.env.mnemonic
      }
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
    rinkeby: {
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
      default: 0,
      // 97:0 //chainId: accounts[0], 指定链
      // 1: 0xA296a3d5F026953e17F472B497eC29a5631FB51B //指定账户
      //指定网络
      bscTestnet: 0
    },
    user1: {
      default: 1
    }
  },
  etherscan: {
    apiKey: {
      bsc: process.env.bscApiKey as string,
      rinkeby: process.env.infuraKey as string,
      mainnet: process.env.infuraKey as string,
      ropsten: process.env.infuraKey as string
    }
  },
  gasReporter: {
    enabled: true,
    currency: 'USD'
  }
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

export default config;
