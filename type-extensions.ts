
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IWalletConnectProviderOptions } from "@walletconnect/types";
import { ethers } from "ethers";


declare module 'hardhat/types/config' {
    interface HardhatUserConfig {
      walletConnectProvider: IWalletConnectProviderOptions
    }
}

declare module 'hardhat/types/runtime' {
    interface HardhatRuntimeEnvironment {
            provider:  WalletConnectProvider
            signer: ethers.providers.JsonRpcSigner
        
    }
}


  

