import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { ethers, VoidSigner, Wallet, providers, ContractInterface } from "ethers";
import { Box, BoxV2, Box__factory } from "../typechain";
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

  async function deployContract(abi: ContractInterface,bytecode: string, sginer: ethers.providers.JsonRpcSigner) {
    let factory = new ethers.ContractFactory(abi, bytecode, sginer)
    let contractObj = await factory.deploy()

    console.log('contractAddress=',contractObj.address)
    console.log('deploy txHash=',contractObj.deployTransaction.hash)

    await contractObj.deployed()   
}


async function main() {
    await connect()

    const web3Provider = new providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()
    console.log(await signer.getAddress());
    console.log("box_bytecode = ", Box__factory.bytecode);
    await deployContract(Box__factory.abi, Box__factory.bytecode, signer)
    await provider.disconnect()
}

main().then(() => process.exit(0)).catch(error => {
    console.log(error);
    process.exit(1)
  });