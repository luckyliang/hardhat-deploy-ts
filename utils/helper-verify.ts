import { run, network } from "hardhat"


export const developmentChains = ["hardhat", "localhost"]
 

const verify = async (contractAddress: string, args: any[]) => {

  if (!developmentChains.includes(network.name) && (process.env.infuraKey || process.env.bacApiKey)) {
    console.log("Verifying contract...")

    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      })
    } catch (e: any) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already verified!")
      } else {
        console.log(e)
      }
    }
  }
  
}

export default verify
