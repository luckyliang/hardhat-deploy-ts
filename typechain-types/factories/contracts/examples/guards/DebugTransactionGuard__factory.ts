/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  DebugTransactionGuard,
  DebugTransactionGuardInterface,
} from "../../../../contracts/examples/guards/DebugTransactionGuard";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "safe",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    name: "GasUsage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "safe",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "safeTxGas",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "usesRefund",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "TransactionDetails",
    type: "event",
  },
  {
    stateMutability: "nonpayable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    name: "checkAfterExecution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "safeTxGas",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "baseGas",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gasPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "gasToken",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "refundReceiver",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "checkTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "txNonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061070b806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806301ffc9a71461004e57806375f0bb52146100765780639327136814610089578063ddbdba631461009c575b005b61006161005c366004610530565b6100ca565b60405190151581526020015b60405180910390f35b61004c6100843660046103e4565b610101565b61004c6100973660046104fb565b610286565b6100bc6100aa3660046104c9565b60006020819052908152604090205481565b60405190815260200161006d565b60006001600160e01b0319821663736bd41d60e11b14806100fb57506001600160e01b031982166301ffc9a760e01b145b92915050565b60008060003390506001816001600160a01b031663affed0e06040518163ffffffff1660e01b815260040160206040518083038186803b15801561014457600080fd5b505afa158015610158573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061017c91906104e2565b610186919061069a565b9250806001600160a01b031663d8d11f788f8f8f8f8f8f8f8f8f8d6040518b63ffffffff1660e01b81526004016101c69a99989796959493929190610624565b60206040518083038186803b1580156101de57600080fd5b505afa1580156101f2573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021691906104e2565b91505080336001600160a01b03167f1b68334da83afaffd8348d6c85c5146d8e7de31a6c034d2d522be12d615c4f7b8f8f8f8f8f60008f118a60405161026297969594939291906105d0565b60405180910390a36000908152602081905260409020555050505050505050505050565b600082815260208190526040902054806102dc5760405162461bcd60e51b8152602060048201526013602482015272436f756c64206e6f7420676574206e6f6e636560681b604482015260640160405180910390fd5b60008381526020818152604080832092909255905183151581528291859133917f0dcc0fb56a30b6fe6b188f45b47369bc7f3c928a9748e245a79fc3f54ddd0568910160405180910390a4505050565b80356001600160a01b038116811461034357600080fd5b919050565b600082601f83011261035957600080fd5b813567ffffffffffffffff80821115610374576103746106bf565b604051601f8301601f19908116603f0116810190828211818310171561039c5761039c6106bf565b816040528381528660208588010111156103b557600080fd5b836020870160208301376000602085830101528094505050505092915050565b80356002811061034357600080fd5b60008060008060008060008060008060006101608c8e03121561040657600080fd5b61040f8c61032c565b9a5060208c0135995067ffffffffffffffff8060408e0135111561043257600080fd5b6104428e60408f01358f01610348565b995061045060608e016103d5565b985060808d0135975060a08d0135965060c08d0135955061047360e08e0161032c565b94506104826101008e0161032c565b9350806101208e0135111561049657600080fd5b506104a88d6101208e01358e01610348565b91506104b76101408d0161032c565b90509295989b509295989b9093969950565b6000602082840312156104db57600080fd5b5035919050565b6000602082840312156104f457600080fd5b5051919050565b6000806040838503121561050e57600080fd5b823591506020830135801515811461052557600080fd5b809150509250929050565b60006020828403121561054257600080fd5b81356001600160e01b03198116811461055a57600080fd5b9392505050565b6000815180845260005b818110156105875760208185018101518683018201520161056b565b81811115610599576000602083870101525b50601f01601f19169290920160200192915050565b600281106105cc57634e487b7160e01b600052602160045260246000fd5b9052565b60018060a01b038816815286602082015260e0604082015260006105f760e0830188610561565b905061060660608301876105ae565b608082019490945291151560a083015260c090910152949350505050565b6001600160a01b038b81168252602082018b9052610140604083018190526000916106518483018d610561565b9250610660606085018c6105ae565b60808401999099525060a082019690965260c081019490945291851660e08401529093166101008201526101200191909152949350505050565b6000828210156106ba57634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220e4f90513e662b83060927eedf4833730e058c44f809e39d20003ca503ab1238864736f6c63430008070033";

type DebugTransactionGuardConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DebugTransactionGuardConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DebugTransactionGuard__factory extends ContractFactory {
  constructor(...args: DebugTransactionGuardConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DebugTransactionGuard> {
    return super.deploy(overrides || {}) as Promise<DebugTransactionGuard>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DebugTransactionGuard {
    return super.attach(address) as DebugTransactionGuard;
  }
  override connect(signer: Signer): DebugTransactionGuard__factory {
    return super.connect(signer) as DebugTransactionGuard__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DebugTransactionGuardInterface {
    return new utils.Interface(_abi) as DebugTransactionGuardInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DebugTransactionGuard {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DebugTransactionGuard;
  }
}
