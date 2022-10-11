import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { ethers, network, upgrades } from "hardhat";
import { providers, Signer } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const provider = new WalletConnectProvider({
  rpc: {
    56: "https://bsc-dataseed1.binance.org/"
  },
  qrcodeModal: WalletConnectQRCodeModal,
})



async function main() {

  await connect()

  const web3Provider = new providers.Web3Provider(provider)
  const signer = web3Provider.getSigner()
  
  const Box = await ethers.getContractFactory("Box", signer);
  console.log("Deploying Box ...");
  const box = await upgrades.deployProxy(Box, [42], {initializer: 'store'});
  console.log("Box deployed to: ", box.address);
}

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

main().then(() => process.exit(0)).catch(error => {
  console.log(error);
  process.exit(1)
});
