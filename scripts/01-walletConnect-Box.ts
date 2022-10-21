
import { artifacts, ethers } from "hardhat";
import { getConnectSigner } from "./walletconnectProvider";


async function main() {

  const signer = await getConnectSigner()

  const address = await signer.getAddress()
  console.log(address);
  
  const artifact = await artifacts.readArtifact("Box")
  const Box = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer)
  
  console.log("Deploying Box ...");
  const box = await Box.deploy()
  await box.deployed()

  console.log("Box deployed to: ", box.address);

}


main().then(() => process.exit(0)).catch(error => {
  console.log(error);
  process.exit(1)
});
