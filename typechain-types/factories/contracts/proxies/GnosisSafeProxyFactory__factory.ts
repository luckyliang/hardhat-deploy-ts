/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  GnosisSafeProxyFactory,
  GnosisSafeProxyFactoryInterface,
} from "../../../contracts/proxies/GnosisSafeProxyFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract GnosisSafeProxy",
        name: "proxy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "singleton",
        type: "address",
      },
    ],
    name: "ProxyCreation",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_singleton",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "initializer",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "saltNonce",
        type: "uint256",
      },
    ],
    name: "calculateCreateProxyWithNonceAddress",
    outputs: [
      {
        internalType: "contract GnosisSafeProxy",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "singleton",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "createProxy",
    outputs: [
      {
        internalType: "contract GnosisSafeProxy",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_singleton",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "initializer",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "saltNonce",
        type: "uint256",
      },
      {
        internalType: "contract IProxyCreationCallback",
        name: "callback",
        type: "address",
      },
    ],
    name: "createProxyWithCallback",
    outputs: [
      {
        internalType: "contract GnosisSafeProxy",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_singleton",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "initializer",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "saltNonce",
        type: "uint256",
      },
    ],
    name: "createProxyWithNonce",
    outputs: [
      {
        internalType: "contract GnosisSafeProxy",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxyCreationCode",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "proxyRuntimeCode",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610a17806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80631688f0b9146100675780632500510e1461009757806353e5d935146100aa57806361b69abd146100bf578063addacc0f146100d2578063d18af54d146100da575b600080fd5b61007a61007536600461062a565b6100ed565b6040516001600160a01b0390911681526020015b60405180910390f35b61007a6100a536600461054f565b610169565b6100b26101fe565b60405161008e919061073d565b61007a6100cd3660046105da565b610228565b6100b26102d2565b61007a6100e8366004610683565b6102e4565b60006100fa8484846103ba565b83519091501561011f5760008060008551602087016000865af1141561011f57600080fd5b604080516001600160a01b038084168252861660208201527f4f51faf6c4561ff95f067657e43439f0f856d97c04d9ec9070a6199ad418e235910160405180910390a19392505050565b60006101ad8585858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506103ba915050565b6040516bffffffffffffffffffffffff19606083901b16602082015290915060340160408051601f198184030181529082905262461bcd60e51b82526101f59160040161073d565b60405180910390fd5b606060405180602001610210906104a9565b601f1982820381018352601f90910116604052919050565b600082604051610237906104a9565b6001600160a01b039091168152602001604051809103906000f080158015610263573d6000803e3d6000fd5b508251909150156102895760008060008451602086016000865af1141561028957600080fd5b604080516001600160a01b038084168252851660208201527f4f51faf6c4561ff95f067657e43439f0f856d97c04d9ec9070a6199ad418e235910160405180910390a192915050565b606060405180602001610210906104b6565b600080838360405160200161031592919091825260601b6bffffffffffffffffffffffff1916602082015260340190565b6040516020818303038152906040528051906020012060001c905061033b8686836100ed565b91506001600160a01b038316156103b1576040516303ca56a360e31b81526001600160a01b03841690631e52b5189061037e9085908a908a908a90600401610757565b600060405180830381600087803b15801561039857600080fd5b505af11580156103ac573d6000803e3d6000fd5b505050505b50949350505050565b6000808380519060200120836040516020016103e0929190918252602082015260400190565b60405160208183030381529060405280519060200120905060006040518060200161040a906104a9565b601f1982820381018352601f90910116604081905261043791906001600160a01b0389169060200161071b565b6040516020818303038152906040529050818151826020016000f592506001600160a01b0383166104a05760405162461bcd60e51b815260206004820152601360248201527210dc99585d194c8818d85b1b0819985a5b1959606a1b60448201526064016101f5565b50509392505050565b610173806107f383390190565b607c8061096683390190565b600082601f8301126104d357600080fd5b813567ffffffffffffffff808211156104ee576104ee6107c4565b604051601f8301601f19908116603f01168101908282118183101715610516576105166107c4565b8160405283815286602085880101111561052f57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000806060858703121561056557600080fd5b8435610570816107da565b9350602085013567ffffffffffffffff8082111561058d57600080fd5b818701915087601f8301126105a157600080fd5b8135818111156105b057600080fd5b8860208285010111156105c257600080fd5b95986020929092019750949560400135945092505050565b600080604083850312156105ed57600080fd5b82356105f8816107da565b9150602083013567ffffffffffffffff81111561061457600080fd5b610620858286016104c2565b9150509250929050565b60008060006060848603121561063f57600080fd5b833561064a816107da565b9250602084013567ffffffffffffffff81111561066657600080fd5b610672868287016104c2565b925050604084013590509250925092565b6000806000806080858703121561069957600080fd5b84356106a4816107da565b9350602085013567ffffffffffffffff8111156106c057600080fd5b6106cc878288016104c2565b9350506040850135915060608501356106e4816107da565b939692955090935050565b60008151808452610707816020860160208601610794565b601f01601f19169290920160200192915050565b6000835161072d818460208801610794565b9190910191825250602001919050565b60208152600061075060208301846106ef565b9392505050565b6001600160a01b03858116825284166020820152608060408201819052600090610783908301856106ef565b905082606083015295945050505050565b60005b838110156107af578181015183820152602001610797565b838111156107be576000848401525b50505050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146107ef57600080fd5b5056fe608060405234801561001057600080fd5b5060405161017338038061017383398101604081905261002f916100b9565b6001600160a01b0381166100945760405162461bcd60e51b815260206004820152602260248201527f496e76616c69642073696e676c65746f6e20616464726573732070726f766964604482015261195960f21b606482015260840160405180910390fd5b600080546001600160a01b0319166001600160a01b03929092169190911790556100e9565b6000602082840312156100cb57600080fd5b81516001600160a01b03811681146100e257600080fd5b9392505050565b607c806100f76000396000f3fe6080604052600080546001600160a01b0316813563530ca43760e11b1415602857808252602082f35b3682833781823684845af490503d82833e806041573d82fd5b503d81f3fea2646970667358221220b7c9efdc65fa3a8f983b4194d06b6a8c60493bd21719770950ac676e47832b0364736f6c634300080700336080604052600080546001600160a01b0316813563530ca43760e11b1415602857808252602082f35b3682833781823684845af490503d82833e806041573d82fd5b503d81f3fea2646970667358221220b7c9efdc65fa3a8f983b4194d06b6a8c60493bd21719770950ac676e47832b0364736f6c63430008070033a2646970667358221220a71dadd0af2cc1c43cbd15e65aaa1a7e43995893b938968a6adef01821f33efa64736f6c63430008070033";

type GnosisSafeProxyFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GnosisSafeProxyFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GnosisSafeProxyFactory__factory extends ContractFactory {
  constructor(...args: GnosisSafeProxyFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GnosisSafeProxyFactory> {
    return super.deploy(overrides || {}) as Promise<GnosisSafeProxyFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GnosisSafeProxyFactory {
    return super.attach(address) as GnosisSafeProxyFactory;
  }
  override connect(signer: Signer): GnosisSafeProxyFactory__factory {
    return super.connect(signer) as GnosisSafeProxyFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GnosisSafeProxyFactoryInterface {
    return new utils.Interface(_abi) as GnosisSafeProxyFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GnosisSafeProxyFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as GnosisSafeProxyFactory;
  }
}
