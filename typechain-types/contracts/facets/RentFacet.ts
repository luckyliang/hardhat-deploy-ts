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
  PayableOverrides,
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
  export type RentStruct = {
    renter: PromiseOrValue<string>;
    start: PromiseOrValue<BigNumberish>;
    end: PromiseOrValue<BigNumberish>;
  };

  export type RentStructOutput = [string, BigNumber, BigNumber] & {
    renter: string;
    start: BigNumber;
    end: BigNumber;
  };
}

export interface RentFacetInterface extends utils.Interface {
  functions: {
    "calculateRentFee(uint256,uint256,address)": FunctionFragment;
    "rent(uint256,uint256,uint256,address,uint256,address)": FunctionFragment;
    "rentAt(uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "calculateRentFee" | "rent" | "rentAt"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "calculateRentFee",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "rent",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "rentAt",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "calculateRentFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rent", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rentAt", data: BytesLike): Result;

  events: {
    "AccrueReferralFee(uint256,uint256,address,address,uint256)": EventFragment;
    "Rent(uint256,uint256,address,uint256,uint256,address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AccrueReferralFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Rent"): EventFragment;
}

export interface AccrueReferralFeeEventObject {
  _assetId: BigNumber;
  _rentId: BigNumber;
  _referrer: string;
  _paymentToken: string;
  _fee: BigNumber;
}
export type AccrueReferralFeeEvent = TypedEvent<
  [BigNumber, BigNumber, string, string, BigNumber],
  AccrueReferralFeeEventObject
>;

export type AccrueReferralFeeEventFilter =
  TypedEventFilter<AccrueReferralFeeEvent>;

export interface RentEventObject {
  _assetId: BigNumber;
  _rentId: BigNumber;
  _renter: string;
  _start: BigNumber;
  _end: BigNumber;
  _paymentToken: string;
  _rent: BigNumber;
  _protocolFee: BigNumber;
}
export type RentEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber
  ],
  RentEventObject
>;

export type RentEventFilter = TypedEventFilter<RentEvent>;

export interface RentFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RentFacetInterface;

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
    calculateRentFee(
      _assetId: PromiseOrValue<BigNumberish>,
      _period: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { paymentToken_: string; amount_: BigNumber }
    >;

    rent(
      _assetId: PromiseOrValue<BigNumberish>,
      _period: PromiseOrValue<BigNumberish>,
      _maxRentStart: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rentAt(
      _assetId: PromiseOrValue<BigNumberish>,
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[LibMarketplace.RentStructOutput]>;
  };

  calculateRentFee(
    _assetId: PromiseOrValue<BigNumberish>,
    _period: PromiseOrValue<BigNumberish>,
    _referrer: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber] & { paymentToken_: string; amount_: BigNumber }
  >;

  rent(
    _assetId: PromiseOrValue<BigNumberish>,
    _period: PromiseOrValue<BigNumberish>,
    _maxRentStart: PromiseOrValue<BigNumberish>,
    _paymentToken: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _referrer: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rentAt(
    _assetId: PromiseOrValue<BigNumberish>,
    _rentId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<LibMarketplace.RentStructOutput>;

  callStatic: {
    calculateRentFee(
      _assetId: PromiseOrValue<BigNumberish>,
      _period: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { paymentToken_: string; amount_: BigNumber }
    >;

    rent(
      _assetId: PromiseOrValue<BigNumberish>,
      _period: PromiseOrValue<BigNumberish>,
      _maxRentStart: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & { rentId_: BigNumber; rentStartsNow_: boolean }
    >;

    rentAt(
      _assetId: PromiseOrValue<BigNumberish>,
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<LibMarketplace.RentStructOutput>;
  };

  filters: {
    "AccrueReferralFee(uint256,uint256,address,address,uint256)"(
      _assetId?: PromiseOrValue<BigNumberish> | null,
      _rentId?: null,
      _referrer?: PromiseOrValue<string> | null,
      _paymentToken?: PromiseOrValue<string> | null,
      _fee?: null
    ): AccrueReferralFeeEventFilter;
    AccrueReferralFee(
      _assetId?: PromiseOrValue<BigNumberish> | null,
      _rentId?: null,
      _referrer?: PromiseOrValue<string> | null,
      _paymentToken?: PromiseOrValue<string> | null,
      _fee?: null
    ): AccrueReferralFeeEventFilter;

    "Rent(uint256,uint256,address,uint256,uint256,address,uint256,uint256)"(
      _assetId?: PromiseOrValue<BigNumberish> | null,
      _rentId?: null,
      _renter?: PromiseOrValue<string> | null,
      _start?: null,
      _end?: null,
      _paymentToken?: PromiseOrValue<string> | null,
      _rent?: null,
      _protocolFee?: null
    ): RentEventFilter;
    Rent(
      _assetId?: PromiseOrValue<BigNumberish> | null,
      _rentId?: null,
      _renter?: PromiseOrValue<string> | null,
      _start?: null,
      _end?: null,
      _paymentToken?: PromiseOrValue<string> | null,
      _rent?: null,
      _protocolFee?: null
    ): RentEventFilter;
  };

  estimateGas: {
    calculateRentFee(
      _assetId: PromiseOrValue<BigNumberish>,
      _period: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rent(
      _assetId: PromiseOrValue<BigNumberish>,
      _period: PromiseOrValue<BigNumberish>,
      _maxRentStart: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rentAt(
      _assetId: PromiseOrValue<BigNumberish>,
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    calculateRentFee(
      _assetId: PromiseOrValue<BigNumberish>,
      _period: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rent(
      _assetId: PromiseOrValue<BigNumberish>,
      _period: PromiseOrValue<BigNumberish>,
      _maxRentStart: PromiseOrValue<BigNumberish>,
      _paymentToken: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rentAt(
      _assetId: PromiseOrValue<BigNumberish>,
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
