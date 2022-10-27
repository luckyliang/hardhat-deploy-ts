import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { extendEnvironment, HardhatUserConfig, task, types } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import '@openzeppelin/hardhat-upgrades';
import "@nomiclabs/hardhat-ethers";
import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "./type-extensions"

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
  walletConnectProvider: {
    rpc: {
      56: "https://bsc-dataseed1.binance.org/",
      97: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      2480: "https://rpc.test.lixb.org/"
    },
    qrcodeModal: WalletConnectQRCodeModal,
  },
  
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.apiKey || undefined
  },
};

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  const provider = walletProvider()   
  // console.log(provider);
   
  hre.provider = provider
  const web3Provider = new ethers.providers.Web3Provider(provider)
  hre.signer = web3Provider.getSigner()   
})

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

    await hre.provider.enable() //等待provider连接

    const factory =  new ethers.ContractFactory(artifact.abi, artifact.bytecode, hre.signer)
    const instance = await factory.deploy(...args)
    console.log(`contractAddress = `, instance.address);
    console.log(`deploy tx Hash = `, instance.deployTransaction.hash);
    await instance.deployed()    
})

const walletProvider = () => {
  const provider =  new WalletConnectProvider(config.walletConnectProvider)
  provider.on("connect", (error: Error) => {
    if (error) {
      console.log(error);
    }
  });

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

  return provider

 }




