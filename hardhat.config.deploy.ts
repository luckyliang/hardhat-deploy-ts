import * as dotenv from "dotenv";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { HardhatUserConfig, subtask, task, types } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import '@openzeppelin/hardhat-upgrades';
import "@nomiclabs/hardhat-ethers";
import { ethers, providers } from "ethers";
// import "./deploy_plugin/index"

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

const TASK_DEPLOY = 'deploy'

task(TASK_DEPLOY, 'Deploy contracts')
.addParam(
    'name',
    'Smart contract name',
    undefined,
    types.string
  )
.addOptionalParam(
    'args',
    'Deploy Smart contract args',
    undefined,
    types.string
)
.addFlag('nocompile', 'disable pre compilation')

.setAction(async (params, hre) => {

    if (!params.nocompile) {      
        await hre.run('compile');
    }

    let args = new Array();
    
    if(params.args === types.string) {
        args = params.split(',')
    }
    // await runDeploy(params.name, params.args)
    console.log(`name = ${params.name}, args = ${args} noCompile = ${params.nocompile}`);
    const artifact = await hre.artifacts.readArtifact(params.name)

    await connect()
    const factory =  new ethers.ContractFactory(artifact.abi, artifact.bytecode, await getSigner())
    const instance = await factory.deploy(...args)
    console.log(`contractAddress = `, instance.address);
    console.log(`deploy tx Hash = `, instance.deployTransaction.hash);
    await instance.deployed()
      // hre.run(TASK_DEPLOY_MAIN, params)
    
})

async function getSigner() {
  const web3Provider = new providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()
    console.log(await signer.getAddress());
    return signer
}

const provider = new WalletConnectProvider({
  rpc: {
    56: "https://bsc-dataseed1.binance.org/",
    97: "https://data-seed-prebsc-1-s3.binance.org:8545/",
    2480: "https://rpc.test.lixb.org/"
  },
  qrcodeModal: WalletConnectQRCodeModal,
})

const connect = async () => {

  provider.on("connect", (error: Error) => {
    if (error) {
      console.log(error);
    }
  });
    // Subscribe to accounts change
  provider.on("accountsChanged", (accounts: string[]) => {
    console.log(accounts);
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId: number) => {
    console.log(chainId);
  });

  // Subscribe to session disconnection
  provider.on("disconnect", (code: number, reason: string) => {
    console.log(code, reason);
  });

  await provider.enable();
}

// async function runDeploy(name: string, args?: string | string[]) {
    
//     // await ethers.ContractFactory("name")
// }


