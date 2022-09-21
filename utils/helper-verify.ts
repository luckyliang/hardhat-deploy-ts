import { run, network } from "hardhat"


export const developmentChains = ["hardhat", "localhost"]
 

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...")

  if (!developmentChains.includes(network.name) && (process.env.infuraKey || process.env.bacApiKey)) {
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
