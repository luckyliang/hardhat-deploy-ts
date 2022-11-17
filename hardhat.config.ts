import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers"
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
import "solidity-coverage";
import fs from  "fs";
import { utils } from "ethers";
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";

const { isAddress, getAddress, formatUnits, parseUnits } = utils;

dotenv.config({path: `${__dirname}/.env`}); //load env

const defaultNetwork = "localhost";

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (error) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
}

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
  defaultNetwork,
  networks: { 
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    },
  },
  
  etherscan: {
    apiKey: {
      bsc: process.env.bscApiKey as string,
      rinkeby: process.env.infuraKey as string,
      mainnet: process.env.infuraKey as string,
      ropsten: process.env.infuraKey as string
    }
  },

};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


task("blockNumber", "Prints the block number", async (_, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log(blockNumber);
});

async function addr(ethers: HardhatEthersHelpers, addr: string) {
  if (isAddress(addr)) {
    return getAddress(addr);
  }
  const accounts = await ethers.provider.listAccounts();
  if (accounts.includes(addr)) {
    return accounts[accounts.indexOf(addr)];
  }
  throw `Could not normalize address: ${addr}`;
}

task("balance", "Prints an account's balance")
  .addPositionalParam("account", "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(
      await addr(ethers, taskArgs.account)
    );
    console.log(formatUnits(balance, "ether"), "ETH");
  });

export default config;
