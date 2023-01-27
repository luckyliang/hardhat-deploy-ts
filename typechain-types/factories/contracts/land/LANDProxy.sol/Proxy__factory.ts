/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  Proxy,
  ProxyInterface,
} from "../../../../contracts/land/LANDProxy.sol/Proxy";

const _abi = [
  {
    constant: true,
    inputs: [],
    name: "proxyOwner",
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
    name: "currentContract",
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
    inputs: [],
    name: "owner",
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
    constant: false,
    inputs: [
      {
        name: "newContract",
        type: "address",
      },
      {
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgrade",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
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
  {
    constant: false,
    inputs: [
      {
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "newContract",
        type: "address",
      },
      {
        indexed: false,
        name: "initializedWith",
        type: "bytes",
      },
    ],
    name: "Upgrade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "_prevOwner",
        type: "address",
      },
      {
        indexed: false,
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "OwnerUpdate",
    type: "event",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610e03806100e36000396000f3006080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063025313a2146101f057806307ecec3e146102475780631e375901146102c257806329ffab3b146103195780636087de1b14610374578063721d7d8e146103cf57806384b80004146104265780638da5cb5b1461047d5780639d40b850146104d4578063c987336c14610541578063e387d31a146105ca578063f2fde38b14610621575b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151515610190576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602d8152602001807f49662061707020636f646520686173206e6f74206265656e207365742079657481526020017f2c20646f206e6f742063616c6c0000000000000000000000000000000000000081525060400191505060405180910390fd5b6101ee6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000368080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050610664565b005b3480156101fc57600080fd5b50610205610731565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561025357600080fd5b506102a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610757565b604051808215151515815260200191505060405180910390f35b3480156102ce57600080fd5b50610303600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610786565b6040518082815260200191505060405180910390f35b34801561032557600080fd5b5061035a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061079e565b604051808215151515815260200191505060405180910390f35b34801561038057600080fd5b506103b5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506107be565b604051808215151515815260200191505060405180910390f35b3480156103db57600080fd5b506103e46107de565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561043257600080fd5b5061043b610803565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561048957600080fd5b50610492610829565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156104e057600080fd5b506104ff6004803603810190808035906020019092919050505061084f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561054d57600080fd5b506105c8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610882565b005b3480156105d657600080fd5b506105df610b2a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561062d57600080fd5b50610662600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b50565b005b61066d82610dc4565b1515610707576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260298152602001807f5468652064657374696e6174696f6e2061646472657373206973206e6f74206181526020017f20636f6e7472616374000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600080825160208401856127105a03f43d604051816000823e826000811461072d578282f35b8282fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60126020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b600d6020528060005260406000206000915090505481565b60116020528060005260406000206000915054906101000a900460ff1681565b60146020528060005260406000206000915054906101000a900460ff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b601360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600f6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610947576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f556e617574686f72697a6564207573657200000000000000000000000000000081525060200191505060405180910390fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503073ffffffffffffffffffffffffffffffffffffffff1663439fab91826040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610a0f5780820151818401526020810190506109f4565b50505050905090810190601f168015610a3c5780820380516001836020036101000a031916815260200191505b5092505050600060405180830381600087803b158015610a5b57600080fd5b505af1158015610a6f573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff167fe74baeef5988edac1159d9177ca52f0f3d68f624a1996f77467eb3ebfb316537826040518080602001828103825283818151815260200191508051906020019080838360005b83811015610aec578082015181840152602081019050610ad1565b50505050905090810190601f168015610b195780820380516001836020036101000a031916815260200191505b509250505060405180910390a25050565b601060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c15576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f556e617574686f72697a6564207573657200000000000000000000000000000081525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610cba576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f456d70747920616464726573730000000000000000000000000000000000000081525060200191505060405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610d80576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f416c726561647920617574686f72697a6564000000000000000000000000000081525060200191505060405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600080823b9050600081119150509190505600a165627a7a72305820058d5d97988877b59703c4387441158887e740bce6ccbcfcab80baa5c55f46f50029";

type ProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Proxy__factory extends ContractFactory {
  constructor(...args: ProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Proxy> {
    return super.deploy(overrides || {}) as Promise<Proxy>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Proxy {
    return super.attach(address) as Proxy;
  }
  override connect(signer: Signer): Proxy__factory {
    return super.connect(signer) as Proxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProxyInterface {
    return new utils.Interface(_abi) as ProxyInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Proxy {
    return new Contract(address, _abi, signerOrProvider) as Proxy;
  }
}
