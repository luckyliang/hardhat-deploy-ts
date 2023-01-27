/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  Storage,
  StorageInterface,
} from "../../../../contracts/land/LANDProxy.sol/Storage";

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
  "0x608060405233600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506105f4806100546000396000f3006080604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063025313a2146100a957806307ecec3e146101005780631e3759011461017b57806329ffab3b146101d25780636087de1b1461022d578063721d7d8e1461028857806384b80004146102df5780638da5cb5b146103365780639d40b8501461038d578063e387d31a146103fa575b600080fd5b3480156100b557600080fd5b506100be610451565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561010c57600080fd5b50610161600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610477565b604051808215151515815260200191505060405180910390f35b34801561018757600080fd5b506101bc600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104a6565b6040518082815260200191505060405180910390f35b3480156101de57600080fd5b50610213600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104be565b604051808215151515815260200191505060405180910390f35b34801561023957600080fd5b5061026e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104de565b604051808215151515815260200191505060405180910390f35b34801561029457600080fd5b5061029d6104fe565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102eb57600080fd5b506102f4610523565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561034257600080fd5b5061034b610549565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561039957600080fd5b506103b86004803603810190808035906020019092919050505061056f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561040657600080fd5b5061040f6105a2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60126020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b600d6020528060005260406000206000915090505481565b60116020528060005260406000206000915054906101000a900460ff1681565b60146020528060005260406000206000915054906101000a900460ff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b601360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600f6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b601060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a7230582087c0f3e596bacb4715c5fd62c33095064a13e2ec5236e4cda6526d2c5df4c1710029";

type StorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Storage__factory extends ContractFactory {
  constructor(...args: StorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Storage> {
    return super.deploy(overrides || {}) as Promise<Storage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Storage {
    return super.attach(address) as Storage;
  }
  override connect(signer: Signer): Storage__factory {
    return super.connect(signer) as Storage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StorageInterface {
    return new utils.Interface(_abi) as StorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Storage {
    return new Contract(address, _abi, signerOrProvider) as Storage;
  }
}
