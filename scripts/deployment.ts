import fs from "fs"
import { readJSONFile, writeFileSyncToFile } from "./common/fileUtils";


export interface ConfigInterface {
    [chainId: number] : {
        [contractName: string]: string
    }
}

const configPath = `./deployments/config.json`

export const write_config =  (chainId: number, contractName: string, address: string) => {

    let config: ConfigInterface
    if(!fs.existsSync(configPath)) {
        let configStr = `{"${chainId}": {"${contractName}": "${address}"}}`
        config = JSON.parse(configStr)
    }else {
        config = readJSONFile<ConfigInterface>(configPath, 'utf-8')
        config[chainId][contractName] = address
    }
    writeFileSyncToFile(configPath, config, 'utf-8')
}

export const read_config = (): ConfigInterface => {
    let config = readJSONFile<ConfigInterface>(configPath, 'utf-8')
    return config 
}


export const read_contract_address = (chainId: number, contractName: string) => {
    if(!fs.existsSync(configPath)) {
        return null
    }

   let config = readJSONFile<ConfigInterface>(configPath, 'utf-8')

   return config[chainId][contractName]

}

