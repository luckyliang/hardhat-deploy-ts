import { artifacts } from "hardhat";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Artifact } from "hardhat/types";
import { Transaction } from "@ethereumjs/tx";
import inquirer from "inquirer";



async function deploy(web3: Web3, artifact: Artifact, account: string, args: any[]) {
    console.log("deploy...");
    
    const contract = new web3.eth.Contract(artifact.abi)
    const contractSendMethod = contract.deploy({
        data: artifact.bytecode,
        arguments: []
    })
    const gas = await contractSendMethod.estimateGas()
    const result = await contractSendMethod.send({
        from: account,
        gasPrice: web3.utils.toWei("20","Gwei"),
        gas: gas
    })

    //0x3075E6C72Bb1af7aA80a1BA18789920B2bfC0327
    return result.options.address
}

async function store(web3: Web3, address: string, artifact: Artifact, account: string, newValue: string) {

    const contract = new web3.eth.Contract(artifact.abi, address)

    const tx = await contract.methods.store(newValue).send({
        from: account,
        gasPrice: "30000000000",
        gas: 0xFFFFFF,
    })
    console.log(tx);
}

async function retrieve(web3: Web3, address: string, artifact: Artifact, account: string,) {
    const contract = new web3.eth.Contract(artifact.abi, address)

    const result = await contract.methods.retrieve().call({
        from: account
    })
    console.log(result);
}

const contractAddress = "0x3075E6C72Bb1af7aA80a1BA18789920B2bfC0327"

async function usingWalletConnect() {

    const web3 = new Web3("https://data-seed-prebsc-1-s3.binance.org:8545/")
    const accounts = await web3.eth.getAccounts()
    const artifact = artifacts.readArtifactSync("Box")
    
    // const addrsss = await deploy(web3, artifact, accounts[0], [])

    // await store(web3, addrsss, artifact, accounts[0], web3.utils.toWei("2000", "ether"))
    await retrieve(web3, contractAddress, artifact, accounts[0])

}

async function getPrivatKey() {
    const rs = await inquirer.prompt([{
        type: 'string',
        name: 'receiver',
        message: `What's the USDT receiver?`,
    }]);
    return rs.receiver;
}

async function usingPrivate() {

    const web3 = new Web3("https://data-seed-prebsc-1-s3.binance.org:8545/")

    const artifact = artifacts.readArtifactSync("Box")
    const contract = new web3.eth.Contract(artifact.abi, contractAddress)
    
    const privateKey = await getPrivatKey()

    const signedTx = await web3.eth.accounts.signTransaction({
            from: "0x819f499c770D291d9E8f9537eEb48C72a071a165",
            to: contractAddress,
            data: contract.methods.store(500).encodeABI(),
            gasPrice: "30000000000",
        gas: 0xFFFFFF,
    }, 
        privateKey)
   
    console.log(signedTx.rawTransaction);
    
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction!)
    .on('receipt', receipt => {
        console.log(receipt);
        
    }).on("error", err => {
        console.log(err);
        
        // do something on transaction error
    });
    
    const result = await web3.eth.call({
            from: "0x819f499c770D291d9E8f9537eEb48C72a071a165",
            to: contractAddress,
            data: contract.methods.retrieve().encodeABI(),
            gasPrice: "30000000000",
        gas: 0xFFFFFF,
    })
    
    console.log(`log = ${result}`);

}

async function main() {
    await usingPrivate()
    // await usingWalletConnect()
}


  
  main().then(() => process.exit(0)).catch(error => {
    console.log(error);
    process.exit(1)
  });