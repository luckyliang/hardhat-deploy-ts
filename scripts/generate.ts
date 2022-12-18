import { artifacts } from "hardhat"
import { writeFileSync } from "fs";


async function main() {
  const jsonOutputDir = "./build/generate/src/js/"
  const abiOutputDir = "./build/generate/src/abi/"
  
  let contractNames = await artifacts.getAllFullyQualifiedNames()
  contractNames = contractNames
  .filter((name) => name.startsWith("contracts"))
  .map((name) => name.split(":")[1])
  
  for (let index = 0; index < contractNames.length; index++) {
    const contractName = contractNames[index];
    const artifact = artifacts.readArtifactSync(contractName)
    const jsonFile = jsonOutputDir + contractName + ".json";
    const abiFile = abiOutputDir + contractName + ".abi"
    
    writeFileSync(jsonFile, JSON.stringify(artifact.abi))
    writeFileSync(abiFile, JSON.stringify(artifact.abi))
  }
}

main()
.catch(error => {
    console.log(error);
    process.exit(1)
    
})