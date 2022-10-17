/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Migrations,
  MigrationsInterface,
} from "../../../contracts/Wyvern/Migrations";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "last_completed_migration",
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
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "completed",
        type: "uint256",
      },
    ],
    name: "setCompleted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "new_address",
        type: "address",
      },
    ],
    name: "upgrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b031916331790556101b4806100326000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80630900f01014610051578063445df0ac146100795780638da5cb5b14610093578063fdacd576146100b7575b600080fd5b6100776004803603602081101561006757600080fd5b50356001600160a01b03166100d4565b005b610081610151565b60408051918252519081900360200190f35b61009b610157565b604080516001600160a01b039092168252519081900360200190f35b610077600480360360208110156100cd57600080fd5b5035610166565b6000546001600160a01b031633141561014e576000819050806001600160a01b031663fdacd5766001546040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561013457600080fd5b505af1158015610148573d6000803e3d6000fd5b50505050505b50565b60015481565b6000546001600160a01b031681565b6000546001600160a01b031633141561014e5760015556fea26469706673582212209744cbfd4716e178e1bb754240916a851eb80982b529d4651f85333075fc034264736f6c63430007050033";

type MigrationsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MigrationsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Migrations__factory extends ContractFactory {
  constructor(...args: MigrationsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Migrations> {
    return super.deploy(overrides || {}) as Promise<Migrations>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Migrations {
    return super.attach(address) as Migrations;
  }
  override connect(signer: Signer): Migrations__factory {
    return super.connect(signer) as Migrations__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MigrationsInterface {
    return new utils.Interface(_abi) as MigrationsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Migrations {
    return new Contract(address, _abi, signerOrProvider) as Migrations;
  }
}
