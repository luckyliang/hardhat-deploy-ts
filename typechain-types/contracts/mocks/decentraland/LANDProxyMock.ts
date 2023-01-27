/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface LANDProxyMockInterface extends utils.Interface {
  functions: {
    "proxyOwner()": FunctionFragment;
    "updateManager(address,address)": FunctionFragment;
    "latestPing(address)": FunctionFragment;
    "authorizedDeploy(address)": FunctionFragment;
    "registeredBalance(address)": FunctionFragment;
    "currentContract()": FunctionFragment;
    "landBalance()": FunctionFragment;
    "owner()": FunctionFragment;
    "updateOperator(uint256)": FunctionFragment;
    "upgrade(address,bytes)": FunctionFragment;
    "estateRegistry()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "proxyOwner"
      | "updateManager"
      | "latestPing"
      | "authorizedDeploy"
      | "registeredBalance"
      | "currentContract"
      | "landBalance"
      | "owner"
      | "updateOperator"
      | "upgrade"
      | "estateRegistry"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "proxyOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateManager",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "latestPing",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "authorizedDeploy",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registeredBalance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "currentContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "landBalance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updateOperator",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgrade",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "estateRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "proxyOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "latestPing", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "authorizedDeploy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registeredBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "landBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgrade", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "estateRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "Upgrade(address,bytes)": EventFragment;
    "OwnerUpdate(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Upgrade"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerUpdate"): EventFragment;
}

export interface UpgradeEventObject {
  newContract: string;
  initializedWith: string;
}
export type UpgradeEvent = TypedEvent<[string, string], UpgradeEventObject>;

export type UpgradeEventFilter = TypedEventFilter<UpgradeEvent>;

export interface OwnerUpdateEventObject {
  _prevOwner: string;
  _newOwner: string;
}
export type OwnerUpdateEvent = TypedEvent<
  [string, string],
  OwnerUpdateEventObject
>;

export type OwnerUpdateEventFilter = TypedEventFilter<OwnerUpdateEvent>;

export interface LANDProxyMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LANDProxyMockInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    proxyOwner(overrides?: CallOverrides): Promise<[string]>;

    updateManager(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    latestPing(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    authorizedDeploy(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    registeredBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    currentContract(overrides?: CallOverrides): Promise<[string]>;

    landBalance(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    updateOperator(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    upgrade(
      newContract: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    estateRegistry(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      _newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  proxyOwner(overrides?: CallOverrides): Promise<string>;

  updateManager(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  latestPing(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  authorizedDeploy(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  registeredBalance(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  currentContract(overrides?: CallOverrides): Promise<string>;

  landBalance(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  updateOperator(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  upgrade(
    newContract: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  estateRegistry(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    _newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    proxyOwner(overrides?: CallOverrides): Promise<string>;

    updateManager(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    latestPing(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    authorizedDeploy(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    registeredBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    currentContract(overrides?: CallOverrides): Promise<string>;

    landBalance(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    updateOperator(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    upgrade(
      newContract: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    estateRegistry(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      _newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Upgrade(address,bytes)"(
      newContract?: PromiseOrValue<string> | null,
      initializedWith?: null
    ): UpgradeEventFilter;
    Upgrade(
      newContract?: PromiseOrValue<string> | null,
      initializedWith?: null
    ): UpgradeEventFilter;

    "OwnerUpdate(address,address)"(
      _prevOwner?: null,
      _newOwner?: null
    ): OwnerUpdateEventFilter;
    OwnerUpdate(_prevOwner?: null, _newOwner?: null): OwnerUpdateEventFilter;
  };

  estimateGas: {
    proxyOwner(overrides?: CallOverrides): Promise<BigNumber>;

    updateManager(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    latestPing(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    authorizedDeploy(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registeredBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentContract(overrides?: CallOverrides): Promise<BigNumber>;

    landBalance(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    updateOperator(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    upgrade(
      newContract: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    estateRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      _newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    proxyOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateManager(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    latestPing(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    authorizedDeploy(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registeredBalance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    landBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateOperator(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    upgrade(
      newContract: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    estateRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      _newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
