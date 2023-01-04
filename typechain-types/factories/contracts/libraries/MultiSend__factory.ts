/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MultiSend,
  MultiSendInterface,
} from "../../../contracts/libraries/MultiSend";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "transactions",
        type: "bytes",
      },
    ],
    name: "multiSend",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5030606081901b6080526102536100316000396000604301526102536000f3fe60806040526004361061001e5760003560e01c80638d80ff0a14610023575b600080fd5b610036610031366004610156565b610038565b005b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156100ce5760405162461bcd60e51b815260206004820152603060248201527f4d756c746953656e642073686f756c64206f6e6c792062652063616c6c65642060448201526f1d9a584819195b1959d85d1958d85b1b60821b606482015260840160405180910390fd5b805160205b81811015610151578083015160f81c6001820184015160601c601583018501516035840186015160558501870160008560008114610118576001811461012857610133565b6000808585888a5af19150610133565b6000808585895af491505b508061013e57600080fd5b50508060550185019450505050506100d3565b505050565b60006020828403121561016857600080fd5b813567ffffffffffffffff8082111561018057600080fd5b818401915084601f83011261019457600080fd5b8135818111156101a6576101a6610207565b604051601f8201601f19908116603f011681019083821181831017156101ce576101ce610207565b816040528281528760208487010111156101e757600080fd5b826020860160208301376000928101602001929092525095945050505050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220a1c41b79841103329508b672f1ba0af16b4c4a5bce6e120e1e7ed94d86231e2764736f6c63430008070033";

type MultiSendConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MultiSendConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MultiSend__factory extends ContractFactory {
  constructor(...args: MultiSendConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MultiSend> {
    return super.deploy(overrides || {}) as Promise<MultiSend>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MultiSend {
    return super.attach(address) as MultiSend;
  }
  override connect(signer: Signer): MultiSend__factory {
    return super.connect(signer) as MultiSend__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MultiSendInterface {
    return new utils.Interface(_abi) as MultiSendInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MultiSend {
    return new Contract(address, _abi, signerOrProvider) as MultiSend;
  }
}
