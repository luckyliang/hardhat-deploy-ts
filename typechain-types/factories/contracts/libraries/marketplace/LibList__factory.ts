/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  LibList,
  LibListInterface,
} from "../../../../contracts/libraries/marketplace/LibList";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_assetId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_metaverseId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_metaverseRegistry",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_metaverseAssetId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_minPeriod",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_maxPeriod",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_maxFutureTime",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_pricePerSecond",
        type: "uint256",
      },
    ],
    name: "List",
    type: "event",
  },
] as const;

const _bytecode =
  "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220b5d5bae5dc8aa809ceae496f8ef0682f2ed5be1230edda2034de97ce500f987e64736f6c634300080a0033";

type LibListConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LibListConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LibList__factory extends ContractFactory {
  constructor(...args: LibListConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LibList> {
    return super.deploy(overrides || {}) as Promise<LibList>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LibList {
    return super.attach(address) as LibList;
  }
  override connect(signer: Signer): LibList__factory {
    return super.connect(signer) as LibList__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LibListInterface {
    return new utils.Interface(_abi) as LibListInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibList {
    return new Contract(address, _abi, signerOrProvider) as LibList;
  }
}
