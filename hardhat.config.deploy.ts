import * as dotenv from "dotenv";

import { HardhatUserConfig, task, types } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import '@openzeppelin/hardhat-upgrades';
import "@nomiclabs/hardhat-ethers";
import "./config-extensions"

dotenv.config({path:"./env"})

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
    }
    
  },
  isWalletConnect: true,
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.apiKey || undefined
  },
};

export default config;

// const TASK_DEPLOY = 'deploy'

// task(TASK_DEPLOY, 'Deploy contracts')
// .addParam(
//     'name',
//     'Smart contract name',
//     undefined,
//     types.string
//   )
// .addOptionalParam(
//     'args',
//     'Deploy Smart contract args',
//     undefined,
//     types.string
// )
// .addFlag('nocompile', 'disable pre compilation')

// .setAction(async (params, hre) => {

// }
