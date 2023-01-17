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

export interface IFeeFacetInterface extends utils.Interface {
  functions: {
    "assetRentFeesFor(uint256,address)": FunctionFragment;
    "claimMultipleRentFees(uint256[])": FunctionFragment;
    "claimProtocolFee(address)": FunctionFragment;
    "claimProtocolFees(address[])": FunctionFragment;
    "claimRentFee(uint256)": FunctionFragment;
    "feePercentage(address)": FunctionFragment;
    "feePrecision()": FunctionFragment;
    "protocolFeeFor(address)": FunctionFragment;
    "setFee(address,uint256)": FunctionFragment;
    "setTokenPayment(address,uint256,bool)": FunctionFragment;
    "supportsTokenPayment(address)": FunctionFragment;
    "tokenPaymentAt(uint256)": FunctionFragment;
    "totalTokenPayments()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "assetRentFeesFor"
      | "claimMultipleRentFees"
      | "claimProtocolFee"
      | "claimProtocolFees"
      | "claimRentFee"
      | "feePercentage"
      | "feePrecision"
      | "protocolFeeFor"
      | "setFee"
      | "setTokenPayment"
      | "supportsTokenPayment"
      | "tokenPaymentAt"
      | "totalTokenPayments"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "assetRentFeesFor",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimMultipleRentFees",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimProtocolFee",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimProtocolFees",
    values: [PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimRentFee",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "feePercentage",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "feePrecision",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "protocolFeeFor",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setFee",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenPayment",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsTokenPayment",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenPaymentAt",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalTokenPayments",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "assetRentFeesFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimMultipleRentFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimProtocolFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimRentFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "feePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "feePrecision",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "protocolFeeFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTokenPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsTokenPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenPaymentAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalTokenPayments",
    data: BytesLike
  ): Result;

  events: {
    "ClaimProtocolFee(address,address,uint256)": EventFragment;
    "SetFee(address,uint256)": EventFragment;
    "SetTokenPayment(address,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimProtocolFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetTokenPayment"): EventFragment;
}

export interface ClaimProtocolFeeEventObject {
  _token: string;
  _recipient: string;
  _amount: BigNumber;
}
export type ClaimProtocolFeeEvent = TypedEvent<
  [string, string, BigNumber],
  ClaimProtocolFeeEventObject
>;

export type ClaimProtocolFeeEventFilter =
  TypedEventFilter<ClaimProtocolFeeEvent>;

export interface SetFeeEventObject {
  _token: string;
  _fee: BigNumber;
}
export type SetFeeEvent = TypedEvent<[string, BigNumber], SetFeeEventObject>;

export type SetFeeEventFilter = TypedEventFilter<SetFeeEvent>;

export interface SetTokenPaymentEventObject {
  _token: string;
  _status: boolean;
}
export type SetTokenPaymentEvent = TypedEvent<
  [string, boolean],
  SetTokenPaymentEventObject
>;

export type SetTokenPaymentEventFilter = TypedEventFilter<SetTokenPaymentEvent>;

export interface IFeeFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IFeeFacetInterface;

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
    assetRentFeesFor(
      _assetId: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    claimMultipleRentFees(
      _assetIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimProtocolFee(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimProtocolFees(
      _tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimRentFee(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    feePercentage(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    feePrecision(overrides?: CallOverrides): Promise<[BigNumber]>;

    protocolFeeFor(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    setFee(
      _token: PromiseOrValue<string>,
      _feePercentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTokenPayment(
      _token: PromiseOrValue<string>,
      _feePercentage: PromiseOrValue<BigNumberish>,
      _status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsTokenPayment(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    tokenPaymentAt(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    totalTokenPayments(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  assetRentFeesFor(
    _assetId: PromiseOrValue<BigNumberish>,
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  claimMultipleRentFees(
    _assetIds: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimProtocolFee(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimProtocolFees(
    _tokens: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimRentFee(
    _assetId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  feePercentage(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  feePrecision(overrides?: CallOverrides): Promise<BigNumber>;

  protocolFeeFor(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setFee(
    _token: PromiseOrValue<string>,
    _feePercentage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTokenPayment(
    _token: PromiseOrValue<string>,
    _feePercentage: PromiseOrValue<BigNumberish>,
    _status: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsTokenPayment(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  tokenPaymentAt(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  totalTokenPayments(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    assetRentFeesFor(
      _assetId: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimMultipleRentFees(
      _assetIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    claimProtocolFee(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimProtocolFees(
      _tokens: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    claimRentFee(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { paymentToken_: string; rentFee_: BigNumber }
    >;

    feePercentage(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    feePrecision(overrides?: CallOverrides): Promise<BigNumber>;

    protocolFeeFor(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setFee(
      _token: PromiseOrValue<string>,
      _feePercentage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenPayment(
      _token: PromiseOrValue<string>,
      _feePercentage: PromiseOrValue<BigNumberish>,
      _status: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsTokenPayment(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    tokenPaymentAt(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    totalTokenPayments(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "ClaimProtocolFee(address,address,uint256)"(
      _token?: PromiseOrValue<string> | null,
      _recipient?: PromiseOrValue<string> | null,
      _amount?: null
    ): ClaimProtocolFeeEventFilter;
    ClaimProtocolFee(
      _token?: PromiseOrValue<string> | null,
      _recipient?: PromiseOrValue<string> | null,
      _amount?: null
    ): ClaimProtocolFeeEventFilter;

    "SetFee(address,uint256)"(
      _token?: PromiseOrValue<string> | null,
      _fee?: null
    ): SetFeeEventFilter;
    SetFee(
      _token?: PromiseOrValue<string> | null,
      _fee?: null
    ): SetFeeEventFilter;

    "SetTokenPayment(address,bool)"(
      _token?: PromiseOrValue<string> | null,
      _status?: null
    ): SetTokenPaymentEventFilter;
    SetTokenPayment(
      _token?: PromiseOrValue<string> | null,
      _status?: null
    ): SetTokenPaymentEventFilter;
  };

  estimateGas: {
    assetRentFeesFor(
      _assetId: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimMultipleRentFees(
      _assetIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimProtocolFee(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimProtocolFees(
      _tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimRentFee(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    feePercentage(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    feePrecision(overrides?: CallOverrides): Promise<BigNumber>;

    protocolFeeFor(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setFee(
      _token: PromiseOrValue<string>,
      _feePercentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTokenPayment(
      _token: PromiseOrValue<string>,
      _feePercentage: PromiseOrValue<BigNumberish>,
      _status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsTokenPayment(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenPaymentAt(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalTokenPayments(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    assetRentFeesFor(
      _assetId: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimMultipleRentFees(
      _assetIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimProtocolFee(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimProtocolFees(
      _tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimRentFee(
      _assetId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    feePercentage(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    feePrecision(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    protocolFeeFor(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setFee(
      _token: PromiseOrValue<string>,
      _feePercentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTokenPayment(
      _token: PromiseOrValue<string>,
      _feePercentage: PromiseOrValue<BigNumberish>,
      _status: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsTokenPayment(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenPaymentAt(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalTokenPayments(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
