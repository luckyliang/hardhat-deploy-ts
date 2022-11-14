import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import "../config-extensions"

import { IRPCMap } from "@walletconnect/types";
import { config, ethers, userConfig } from "hardhat";
import { HttpNetworkUserConfig } from "hardhat/types";

export async function getSigner() {
    
    if (userConfig.isWalletConnect == true) {
        console.log("is wallet connect");
        const walletConnectProvider = await getWalletConnectProvider()
        await walletConnectProvider.enable()
        const web3Provider = new ethers.providers.Web3Provider(walletConnectProvider)
        return web3Provider.getSigner()
    }else {        
        const signers = await ethers.getSigners()
        return signers[0]
    }
}

async function getWalletConnectProvider() {
    const provider =  new WalletConnectProvider(
        {
            rpc: walletConnectRPC(),
            qrcodeModal: WalletConnectQRCodeModal,
            pollingInterval: 100000
        }
    )
    provider.on("connect", (error: Error) => {
      if (error) {
        console.log(error);
      }
    });
  
    provider.on("accountsChanged", (accounts: string[]) => {
      console.log("连接 accounts = ", accounts);
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

export function walletConnectRPC() {    
    let networks = userConfig.networks;
    let rpc : IRPCMap = {}
    console.log(networks);
    for (const key in networks) {
        const element = networks[key] as HttpNetworkUserConfig;
        const chainId = element.chainId
        if (chainId != null && element.url != null) {
            rpc[chainId] = element.url          
        }
    }
    return rpc
}