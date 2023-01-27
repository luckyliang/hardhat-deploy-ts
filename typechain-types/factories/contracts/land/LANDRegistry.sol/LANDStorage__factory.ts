/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  LANDStorage,
  LANDStorageInterface,
} from "../../../../contracts/land/LANDRegistry.sol/LANDStorage";

const _abi = [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "address",
      },
    ],
    name: "updateManager",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
    ],
    name: "latestPing",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
    ],
    name: "authorizedDeploy",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
    ],
    name: "registeredBalance",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "landBalance",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "updateOperator",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "estateRegistry",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061045d806100206000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806307ecec3e146100885780631e3759011461010357806329ffab3b1461015a5780636087de1b146101b557806384b80004146102105780639d40b85014610267578063e387d31a146102d4575b600080fd5b34801561009457600080fd5b506100e9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061032b565b604051808215151515815260200191505060405180910390f35b34801561010f57600080fd5b50610144600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061035a565b6040518082815260200191505060405180910390f35b34801561016657600080fd5b5061019b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610372565b604051808215151515815260200191505060405180910390f35b3480156101c157600080fd5b506101f6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610392565b604051808215151515815260200191505060405180910390f35b34801561021c57600080fd5b506102256103b2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561027357600080fd5b50610292600480360381019080803590602001909291905050506103d8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102e057600080fd5b506102e961040b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60056020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b60006020528060005260406000206000915090505481565b60046020528060005260406000206000915054906101000a900460ff1681565b60076020528060005260406000206000915054906101000a900460ff1681565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60026020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820412efc902540c511a993fa5926d480e5b38419efecb8e8c0f238ee7b2e8c5a990029";

type LANDStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LANDStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LANDStorage__factory extends ContractFactory {
  constructor(...args: LANDStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LANDStorage> {
    return super.deploy(overrides || {}) as Promise<LANDStorage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LANDStorage {
    return super.attach(address) as LANDStorage;
  }
  override connect(signer: Signer): LANDStorage__factory {
    return super.connect(signer) as LANDStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LANDStorageInterface {
    return new utils.Interface(_abi) as LANDStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LANDStorage {
    return new Contract(address, _abi, signerOrProvider) as LANDStorage;
  }
}
