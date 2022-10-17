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
} from "../../../common";

export interface ExchangeInterface extends utils.Interface {
  functions: {
    "approveOrderHash_(bytes32)": FunctionFragment;
    "approveOrder_(address,address,address,bytes4,bytes,uint256,uint256,uint256,uint256,bool)": FunctionFragment;
    "approved(address,bytes32)": FunctionFragment;
    "atomicMatch_(uint256[16],bytes4[2],bytes,bytes,bytes,bytes,uint8[2],bytes32,bytes)": FunctionFragment;
    "fills(address,bytes32)": FunctionFragment;
    "hashOrder_(address,address,address,bytes4,bytes,uint256,uint256,uint256,uint256)": FunctionFragment;
    "hashToSign_(bytes32)": FunctionFragment;
    "registries(address)": FunctionFragment;
    "setOrderFill_(bytes32,uint256)": FunctionFragment;
    "validateOrderAuthorization_(bytes32,address,bytes)": FunctionFragment;
    "validateOrderParameters_(address,address,address,bytes4,bytes,uint256,uint256,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "approveOrderHash_"
      | "approveOrder_"
      | "approved"
      | "atomicMatch_"
      | "fills"
      | "hashOrder_"
      | "hashToSign_"
      | "registries"
      | "setOrderFill_"
      | "validateOrderAuthorization_"
      | "validateOrderParameters_"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approveOrderHash_",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveOrder_",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "approved",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "atomicMatch_",
    values: [
      PromiseOrValue<BigNumberish>[],
      [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "fills",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hashOrder_",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "hashToSign_",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "registries",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setOrderFill_",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "validateOrderAuthorization_",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "validateOrderParameters_",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveOrderHash_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveOrder_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approved", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "atomicMatch_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fills", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hashOrder_", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hashToSign_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "registries", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setOrderFill_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateOrderAuthorization_",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateOrderParameters_",
    data: BytesLike
  ): Result;

  events: {
    "OrderApproved(bytes32,address,address,address,bytes4,bytes,uint256,uint256,uint256,uint256,bool)": EventFragment;
    "OrderFillChanged(bytes32,address,uint256)": EventFragment;
    "OrdersMatched(bytes32,bytes32,address,address,uint256,uint256,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OrderApproved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderFillChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrdersMatched"): EventFragment;
}

export interface OrderApprovedEventObject {
  hash: string;
  registry: string;
  maker: string;
  staticTarget: string;
  staticSelector: string;
  staticExtradata: string;
  maximumFill: BigNumber;
  listingTime: BigNumber;
  expirationTime: BigNumber;
  salt: BigNumber;
  orderbookInclusionDesired: boolean;
}
export type OrderApprovedEvent = TypedEvent<
  [
    string,
    string,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    boolean
  ],
  OrderApprovedEventObject
>;

export type OrderApprovedEventFilter = TypedEventFilter<OrderApprovedEvent>;

export interface OrderFillChangedEventObject {
  hash: string;
  maker: string;
  newFill: BigNumber;
}
export type OrderFillChangedEvent = TypedEvent<
  [string, string, BigNumber],
  OrderFillChangedEventObject
>;

export type OrderFillChangedEventFilter =
  TypedEventFilter<OrderFillChangedEvent>;

export interface OrdersMatchedEventObject {
  firstHash: string;
  secondHash: string;
  firstMaker: string;
  secondMaker: string;
  newFirstFill: BigNumber;
  newSecondFill: BigNumber;
  metadata: string;
}
export type OrdersMatchedEvent = TypedEvent<
  [string, string, string, string, BigNumber, BigNumber, string],
  OrdersMatchedEventObject
>;

export type OrdersMatchedEventFilter = TypedEventFilter<OrdersMatchedEvent>;

export interface Exchange extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ExchangeInterface;

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
    approveOrderHash_(
      hash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approveOrder_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      orderbookInclusionDesired: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approved(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    atomicMatch_(
      uints: PromiseOrValue<BigNumberish>[],
      staticSelectors: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      firstExtradata: PromiseOrValue<BytesLike>,
      firstCalldata: PromiseOrValue<BytesLike>,
      secondExtradata: PromiseOrValue<BytesLike>,
      secondCalldata: PromiseOrValue<BytesLike>,
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      metadata: PromiseOrValue<BytesLike>,
      signatures: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fills(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    hashOrder_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { hash: string }>;

    hashToSign_(
      orderHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { hash: string }>;

    registries(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    setOrderFill_(
      hash: PromiseOrValue<BytesLike>,
      fill: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    validateOrderAuthorization_(
      hash: PromiseOrValue<BytesLike>,
      maker: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    validateOrderParameters_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  approveOrderHash_(
    hash: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approveOrder_(
    registry: PromiseOrValue<string>,
    maker: PromiseOrValue<string>,
    staticTarget: PromiseOrValue<string>,
    staticSelector: PromiseOrValue<BytesLike>,
    staticExtradata: PromiseOrValue<BytesLike>,
    maximumFill: PromiseOrValue<BigNumberish>,
    listingTime: PromiseOrValue<BigNumberish>,
    expirationTime: PromiseOrValue<BigNumberish>,
    salt: PromiseOrValue<BigNumberish>,
    orderbookInclusionDesired: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approved(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  atomicMatch_(
    uints: PromiseOrValue<BigNumberish>[],
    staticSelectors: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
    firstExtradata: PromiseOrValue<BytesLike>,
    firstCalldata: PromiseOrValue<BytesLike>,
    secondExtradata: PromiseOrValue<BytesLike>,
    secondCalldata: PromiseOrValue<BytesLike>,
    howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    metadata: PromiseOrValue<BytesLike>,
    signatures: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fills(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  hashOrder_(
    registry: PromiseOrValue<string>,
    maker: PromiseOrValue<string>,
    staticTarget: PromiseOrValue<string>,
    staticSelector: PromiseOrValue<BytesLike>,
    staticExtradata: PromiseOrValue<BytesLike>,
    maximumFill: PromiseOrValue<BigNumberish>,
    listingTime: PromiseOrValue<BigNumberish>,
    expirationTime: PromiseOrValue<BigNumberish>,
    salt: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  hashToSign_(
    orderHash: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  registries(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setOrderFill_(
    hash: PromiseOrValue<BytesLike>,
    fill: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  validateOrderAuthorization_(
    hash: PromiseOrValue<BytesLike>,
    maker: PromiseOrValue<string>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  validateOrderParameters_(
    registry: PromiseOrValue<string>,
    maker: PromiseOrValue<string>,
    staticTarget: PromiseOrValue<string>,
    staticSelector: PromiseOrValue<BytesLike>,
    staticExtradata: PromiseOrValue<BytesLike>,
    maximumFill: PromiseOrValue<BigNumberish>,
    listingTime: PromiseOrValue<BigNumberish>,
    expirationTime: PromiseOrValue<BigNumberish>,
    salt: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    approveOrderHash_(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    approveOrder_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      orderbookInclusionDesired: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    approved(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    atomicMatch_(
      uints: PromiseOrValue<BigNumberish>[],
      staticSelectors: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      firstExtradata: PromiseOrValue<BytesLike>,
      firstCalldata: PromiseOrValue<BytesLike>,
      secondExtradata: PromiseOrValue<BytesLike>,
      secondCalldata: PromiseOrValue<BytesLike>,
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      metadata: PromiseOrValue<BytesLike>,
      signatures: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    fills(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashOrder_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    hashToSign_(
      orderHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    registries(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setOrderFill_(
      hash: PromiseOrValue<BytesLike>,
      fill: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    validateOrderAuthorization_(
      hash: PromiseOrValue<BytesLike>,
      maker: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    validateOrderParameters_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "OrderApproved(bytes32,address,address,address,bytes4,bytes,uint256,uint256,uint256,uint256,bool)"(
      hash?: PromiseOrValue<BytesLike> | null,
      registry?: null,
      maker?: PromiseOrValue<string> | null,
      staticTarget?: null,
      staticSelector?: null,
      staticExtradata?: null,
      maximumFill?: null,
      listingTime?: null,
      expirationTime?: null,
      salt?: null,
      orderbookInclusionDesired?: null
    ): OrderApprovedEventFilter;
    OrderApproved(
      hash?: PromiseOrValue<BytesLike> | null,
      registry?: null,
      maker?: PromiseOrValue<string> | null,
      staticTarget?: null,
      staticSelector?: null,
      staticExtradata?: null,
      maximumFill?: null,
      listingTime?: null,
      expirationTime?: null,
      salt?: null,
      orderbookInclusionDesired?: null
    ): OrderApprovedEventFilter;

    "OrderFillChanged(bytes32,address,uint256)"(
      hash?: PromiseOrValue<BytesLike> | null,
      maker?: PromiseOrValue<string> | null,
      newFill?: null
    ): OrderFillChangedEventFilter;
    OrderFillChanged(
      hash?: PromiseOrValue<BytesLike> | null,
      maker?: PromiseOrValue<string> | null,
      newFill?: null
    ): OrderFillChangedEventFilter;

    "OrdersMatched(bytes32,bytes32,address,address,uint256,uint256,bytes32)"(
      firstHash?: null,
      secondHash?: null,
      firstMaker?: PromiseOrValue<string> | null,
      secondMaker?: PromiseOrValue<string> | null,
      newFirstFill?: null,
      newSecondFill?: null,
      metadata?: PromiseOrValue<BytesLike> | null
    ): OrdersMatchedEventFilter;
    OrdersMatched(
      firstHash?: null,
      secondHash?: null,
      firstMaker?: PromiseOrValue<string> | null,
      secondMaker?: PromiseOrValue<string> | null,
      newFirstFill?: null,
      newSecondFill?: null,
      metadata?: PromiseOrValue<BytesLike> | null
    ): OrdersMatchedEventFilter;
  };

  estimateGas: {
    approveOrderHash_(
      hash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approveOrder_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      orderbookInclusionDesired: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approved(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    atomicMatch_(
      uints: PromiseOrValue<BigNumberish>[],
      staticSelectors: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      firstExtradata: PromiseOrValue<BytesLike>,
      firstCalldata: PromiseOrValue<BytesLike>,
      secondExtradata: PromiseOrValue<BytesLike>,
      secondCalldata: PromiseOrValue<BytesLike>,
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      metadata: PromiseOrValue<BytesLike>,
      signatures: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fills(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashOrder_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashToSign_(
      orderHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registries(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setOrderFill_(
      hash: PromiseOrValue<BytesLike>,
      fill: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    validateOrderAuthorization_(
      hash: PromiseOrValue<BytesLike>,
      maker: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    validateOrderParameters_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approveOrderHash_(
      hash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approveOrder_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      orderbookInclusionDesired: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approved(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    atomicMatch_(
      uints: PromiseOrValue<BigNumberish>[],
      staticSelectors: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      firstExtradata: PromiseOrValue<BytesLike>,
      firstCalldata: PromiseOrValue<BytesLike>,
      secondExtradata: PromiseOrValue<BytesLike>,
      secondCalldata: PromiseOrValue<BytesLike>,
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      metadata: PromiseOrValue<BytesLike>,
      signatures: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fills(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hashOrder_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hashToSign_(
      orderHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registries(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setOrderFill_(
      hash: PromiseOrValue<BytesLike>,
      fill: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    validateOrderAuthorization_(
      hash: PromiseOrValue<BytesLike>,
      maker: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    validateOrderParameters_(
      registry: PromiseOrValue<string>,
      maker: PromiseOrValue<string>,
      staticTarget: PromiseOrValue<string>,
      staticSelector: PromiseOrValue<BytesLike>,
      staticExtradata: PromiseOrValue<BytesLike>,
      maximumFill: PromiseOrValue<BigNumberish>,
      listingTime: PromiseOrValue<BigNumberish>,
      expirationTime: PromiseOrValue<BigNumberish>,
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
