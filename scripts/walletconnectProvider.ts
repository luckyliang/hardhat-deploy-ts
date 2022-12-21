import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { providers } from "ethers";
import Web3 from "web3";

export const getConnectProvider = () => {

    const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed1.binance.org/",
          97: "https://data-seed-prebsc-1-s3.binance.org:8545/",
          2888: "https://test.lixb.io"
        },
        qrcodeModal: WalletConnectQRCodeModal,
        clientMeta: {
          description: "Smart constract Migration",
          url: "https://github.com/hurry-sea/ss-contract",
          icons: ["https://sevensea.s3.ap-southeast-1.amazonaws.com/sevensea/hideoutWallet/token/ETH_2.svg"],
          name: "Migration"
      }
    })

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

export const getConnectSigner = async () => {
    
    const provider = getConnectProvider()

    if(!provider.isConnecting) {
      await provider.enable()

    }

    const web3Provider = new providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()

    return signer

}

export const web3Connect = async () => {

  const provider = getConnectProvider()
    await provider.enable()
  
  const web3 = new Web3(<any>provider);
  web3.eth.transactionPollingTimeout = 1200;

  return web3
}


export const web3WithPrivate =  (privateKey: string) => {
    const web3 = new Web3("https://data-seed-prebsc-1-s3.binance.org:8545/")
    web3.eth.accounts.privateKeyToAccount(privateKey)
    return  web3
}



  

