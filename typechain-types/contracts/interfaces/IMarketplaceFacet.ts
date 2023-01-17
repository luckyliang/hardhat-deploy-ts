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
} from "../../common";

export declare namespace LibMarketplace {
  export type AssetStruct = {
    metaverseId: PromiseOrValue<BigNumberish>;
    metaverseRegistry: PromiseOrValue<string>;
    metaverseAssetId: PromiseOrValue<BigNumberish>;
    paymentToken: PromiseOrValue<string>;
    minPeriod: PromiseOrValue<BigNumberish>;
    maxPeriod: PromiseOrValue<BigNumberish>;
    maxFutureTime: PromiseOrValue<BigNumberish>;
    pricePerSecond: PromiseOrValue<BigNumberish>;
    totalRents: PromiseOrValue<BigNumberish>;
    status: PromiseOrValue<BigNumberish>;
  };

  export type AssetStructOutput = [
    BigNumber,
    string,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    number
  ] & {
    metaverseId: BigNumber;
    metaverseRegistry: string;
    metaverseAssetId: BigNumber;
    paymentToken: string;
    minPeriod: BigNumber;
    maxPeriod: BigNumber;
    maxFutureTime: BigNumber;
    pricePerSecond: BigNumber;
    totalRents: BigNumber;
    status: number;
  };
}

export interface IMarketplaceFacetInterface extends utils.Interface {
  functions: {
    "assetAt(uint256)": FunctionFragment;
    "delist(uint256)": FunctionFragment;
    "list(uint256,address,uint256,uint256,uint256,uint256,address,uint256,address)": FunctionFragment;
    "metaverseName(uint256)": FunctionFragment;
    "registryAt(uint256,uint256)": FunctionFragment;
    "setMetaverseName(uint256,string)": FunctionFragment;
    "setRegistry(uint256,address,bool)": FunctionFragment;
    "supportsRegistry(uint256,address)": FunctionFragment;
    "totalRegistries(uint256)": FunctionFragment;
    "updateConditions(uint256,uint256,uint256,uint256,address,uint256)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "assetAt"
      | "delist"
      | "list"
      | "metaverseName"
      | "registryAt"
      | "setMetaverseName"
      | "setRegistry"
      | "supportsRegistry"
      | "totalRegistries"
      | "updateConditions"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "assetAt",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "delist",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "list",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "metaverseName",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "registryAt",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setMetaverseName",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRegistry",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsRegistry",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalRegistries",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateConditions",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "assetAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "delist", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "list", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "metaverseName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "registryAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setMetaverseName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalRegistries",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateConditions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Delist(uint256,address)": EventFragment;
    "List(uint256,uint256,address,uint256,uint256,uint256,uint256,address,uint256)": EventFragment;
    "SetMetaverseName(uint256,string)": EventFragment;
    "SetRegistry(uint256,address,bool)": EventFragment;
    "UpdateConditions(uint256,uint256,uint256,uint256,address,uint256)": EventFragment;
    "Withdraw(uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Delist"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "List"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetMetaverseName"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetRegistry"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateConditions"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface DelistEventObject {
  _assetId: BigNumber;
  _caller: string;
}
export type DelistEvent = TypedEvent<[BigNumber, string], DelistEventObject>;

export type DelistEventFilter = TypedEventFilter<DelistEvent>;

export interface ListEventObject {
  _assetId: BigNumber;
  _metaverseId: BigNumber;
  _metaverseRegistry: string;
  _metaverseAssetId: BigNumber;
  _minPeriod: BigNumber;
  _maxPeriod: BigNumber;
  _maxFutureTime: BigNumber;
  _paymentToken: string;
  _pricePerSecond: BigNumber;
}
export type ListEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    BigNumber
  ],
  ListEventObject
>;

export type ListEventFilter = TypedEventFilter<ListEvent>;

export interface SetMetaverseNameEventObject {
  _metaverseId: BigNumber;
  _name: string;
}
export type SetMetaverseNameEvent = TypedEvent<
  [BigNumber, string],
  SetMetaverseNameEventObject
>;

export type SetMetaverseNameEventFilter =
  TypedEventFilter<SetMetaverseNameEvent>;

export interface SetRegistryEventObject {
  _metaverseId: BigNumber;
  _registry: string;
  _status: boolean;
}
export type SetRegistryEvent = TypedEvent<
  [BigNumber, string, boolean],
  SetRegistryEventObject
>;

export type SetRegistryEventFilter = TypedEventFilter<SetRegistryEvent>;

export interface UpdateConditionsEventObject {
  _assetId: BigNumber;
  _minPeriod: BigNumber;
  _maxPeriod: BigNumber;
  _maxFutureTime: BigNumber;
  _paymentToken: string;
  _pricePerSecond: BigNumber;
}
export type UpdateConditionsEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber, string, BigNumber],
  UpdateConditionsEventObject
>;

export type UpdateConditionsEventFilter =
  TypedEventFilter<UpdateConditionsEvent>;

export interface WithdrawEventObject {
  _assetId: BigNumber;
  _caller: string;
}
export type WithdrawEvent = TypedEvent<
  [BigNumber, string],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface IMarketplaceFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IMarketplaceFacetInterface;

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
    assetAt(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[LibMarketplace.AssetStructOutput]>;

    delist(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    list(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _metaverseRegistry: PromiseOrValue<string>,
      _metaverseAssetId: PromiseOrValue<BigNumberish>,
      _minPeriod: PromiseOrValue<BigNumberish>,
      _maxPeriod: PromiseOrValue<BigNumberish>,
      _maxFutureTime: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _pricePerSecond: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    metaverseName(
      _metaverseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    registryAt(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    setMetaverseName(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setRegistry(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _registry: PromiseOrValue<string>,
      _status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsRegistry(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _registry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    totalRegistries(
      _metaverseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    updateConditions(
      _assetId: PromiseOrValue<BigNumberish>,
      _minPeriod: PromiseOrValue<BigNumberish>,
      _maxPeriod: PromiseOrValue<BigNumberish>,
      _maxFutureTime: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _pricePerSecond: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  assetAt(
    _assetId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<LibMarketplace.AssetStructOutput>;

  delist(
    _assetId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  list(
    _metaverseId: PromiseOrValue<BigNumberish>,
    _metaverseRegistry: PromiseOrValue<string>,
    _metaverseAssetId: PromiseOrValue<BigNumberish>,
    _minPeriod: PromiseOrValue<BigNumberish>,
    _maxPeriod: PromiseOrValue<BigNumberish>,
    _maxFutureTime: PromiseOrValue<BigNumberish>,
    _paymentToken: PromiseOrValue<string>,
    _pricePerSecond: PromiseOrValue<BigNumberish>,
    _referrer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  metaverseName(
    _metaverseId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  registryAt(
    _metaverseId: PromiseOrValue<BigNumberish>,
    _index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  setMetaverseName(
    _metaverseId: PromiseOrValue<BigNumberish>,
    _name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setRegistry(
    _metaverseId: PromiseOrValue<BigNumberish>,
    _registry: PromiseOrValue<string>,
    _status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsRegistry(
    _metaverseId: PromiseOrValue<BigNumberish>,
    _registry: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  totalRegistries(
    _metaverseId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  updateConditions(
    _assetId: PromiseOrValue<BigNumberish>,
    _minPeriod: PromiseOrValue<BigNumberish>,
    _maxPeriod: PromiseOrValue<BigNumberish>,
    _maxFutureTime: PromiseOrValue<BigNumberish>,
    _paymentToken: PromiseOrValue<string>,
    _pricePerSecond: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    _assetId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    assetAt(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<LibMarketplace.AssetStructOutput>;

    delist(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    list(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _metaverseRegistry: PromiseOrValue<string>,
      _metaverseAssetId: PromiseOrValue<BigNumberish>,
      _minPeriod: PromiseOrValue<BigNumberish>,
      _maxPeriod: PromiseOrValue<BigNumberish>,
      _maxFutureTime: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _pricePerSecond: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    metaverseName(
      _metaverseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    registryAt(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    setMetaverseName(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setRegistry(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _registry: PromiseOrValue<string>,
      _status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsRegistry(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _registry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    totalRegistries(
      _metaverseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateConditions(
      _assetId: PromiseOrValue<BigNumberish>,
      _minPeriod: PromiseOrValue<BigNumberish>,
      _maxPeriod: PromiseOrValue<BigNumberish>,
      _maxFutureTime: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _pricePerSecond: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Delist(uint256,address)"(
      _assetId?: PromiseOrValue<BigNumberish> | null,
      _caller?: PromiseOrValue<string> | null
    ): DelistEventFilter;
    Delist(
      _assetId?: PromiseOrValue<BigNumberish> | null,
      _caller?: PromiseOrValue<string> | null
    ): DelistEventFilter;

    "List(uint256,uint256,address,uint256,uint256,uint256,uint256,address,uint256)"(
      _assetId?: null,
      _metaverseId?: null,
      _metaverseRegistry?: PromiseOrValue<string> | null,
      _metaverseAssetId?: PromiseOrValue<BigNumberish> | null,
      _minPeriod?: null,
      _maxPeriod?: null,
      _maxFutureTime?: null,
      _paymentToken?: PromiseOrValue<string> | null,
      _pricePerSecond?: null
    ): ListEventFilter;
    List(
      _assetId?: null,
      _metaverseId?: null,
      _metaverseRegistry?: PromiseOrValue<string> | null,
      _metaverseAssetId?: PromiseOrValue<BigNumberish> | null,
      _minPeriod?: null,
      _maxPeriod?: null,
      _maxFutureTime?: null,
      _paymentToken?: PromiseOrValue<string> | null,
      _pricePerSecond?: null
    ): ListEventFilter;

    "SetMetaverseName(uint256,string)"(
      _metaverseId?: PromiseOrValue<BigNumberish> | null,
      _name?: null
    ): SetMetaverseNameEventFilter;
    SetMetaverseName(
      _metaverseId?: PromiseOrValue<BigNumberish> | null,
      _name?: null
    ): SetMetaverseNameEventFilter;

    "SetRegistry(uint256,address,bool)"(
      _metaverseId?: PromiseOrValue<BigNumberish> | null,
      _registry?: null,
      _status?: null
    ): SetRegistryEventFilter;
    SetRegistry(
      _metaverseId?: PromiseOrValue<BigNumberish> | null,
      _registry?: null,
      _status?: null
    ): SetRegistryEventFilter;

    "UpdateConditions(uint256,uint256,uint256,uint256,address,uint256)"(
      _assetId?: PromiseOrValue<BigNumberish> | null,
      _minPeriod?: null,
      _maxPeriod?: null,
      _maxFutureTime?: null,
      _paymentToken?: PromiseOrValue<string> | null,
      _pricePerSecond?: null
    ): UpdateConditionsEventFilter;
    UpdateConditions(
      _assetId?: PromiseOrValue<BigNumberish> | null,
      _minPeriod?: null,
      _maxPeriod?: null,
      _maxFutureTime?: null,
      _paymentToken?: PromiseOrValue<string> | null,
      _pricePerSecond?: null
    ): UpdateConditionsEventFilter;

    "Withdraw(uint256,address)"(
      _assetId?: PromiseOrValue<BigNumberish> | null,
      _caller?: PromiseOrValue<string> | null
    ): WithdrawEventFilter;
    Withdraw(
      _assetId?: PromiseOrValue<BigNumberish> | null,
      _caller?: PromiseOrValue<string> | null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    assetAt(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    delist(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    list(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _metaverseRegistry: PromiseOrValue<string>,
      _metaverseAssetId: PromiseOrValue<BigNumberish>,
      _minPeriod: PromiseOrValue<BigNumberish>,
      _maxPeriod: PromiseOrValue<BigNumberish>,
      _maxFutureTime: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _pricePerSecond: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    metaverseName(
      _metaverseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registryAt(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setMetaverseName(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setRegistry(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _registry: PromiseOrValue<string>,
      _status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsRegistry(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _registry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalRegistries(
      _metaverseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateConditions(
      _assetId: PromiseOrValue<BigNumberish>,
      _minPeriod: PromiseOrValue<BigNumberish>,
      _maxPeriod: PromiseOrValue<BigNumberish>,
      _maxFutureTime: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _pricePerSecond: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    assetAt(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    delist(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    list(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _metaverseRegistry: PromiseOrValue<string>,
      _metaverseAssetId: PromiseOrValue<BigNumberish>,
      _minPeriod: PromiseOrValue<BigNumberish>,
      _maxPeriod: PromiseOrValue<BigNumberish>,
      _maxFutureTime: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _pricePerSecond: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    metaverseName(
      _metaverseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registryAt(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setMetaverseName(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setRegistry(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _registry: PromiseOrValue<string>,
      _status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsRegistry(
      _metaverseId: PromiseOrValue<BigNumberish>,
      _registry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalRegistries(
      _metaverseId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateConditions(
      _assetId: PromiseOrValue<BigNumberish>,
      _minPeriod: PromiseOrValue<BigNumberish>,
      _maxPeriod: PromiseOrValue<BigNumberish>,
      _maxFutureTime: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _pricePerSecond: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
