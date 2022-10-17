/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface StaticAuctionInterface extends utils.Interface {
  functions: {
    "decodeERC20Amount(uint256[6],uint256,uint256)": FunctionFragment;
    "transferForBuyer(bytes,address[7],uint8[2],uint256[6],bytes,bytes)": FunctionFragment;
    "transferForSeller(bytes,address[7],uint8[2],uint256[6],bytes,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "decodeERC20Amount"
      | "transferForBuyer"
      | "transferForSeller"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "decodeERC20Amount",
    values: [
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferForBuyer",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>[],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferForSeller",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>[],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "decodeERC20Amount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferForBuyer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferForSeller",
    data: BytesLike
  ): Result;

  events: {};
}

export interface StaticAuction extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StaticAuctionInterface;

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
    decodeERC20Amount(
      extraUints: PromiseOrValue<BigNumberish>[],
      hightestBid: PromiseOrValue<BigNumberish>,
      floorPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[[BigNumber, BigNumber, BigNumber, BigNumber]]>;

    transferForBuyer(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    transferForSeller(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  decodeERC20Amount(
    extraUints: PromiseOrValue<BigNumberish>[],
    hightestBid: PromiseOrValue<BigNumberish>,
    floorPrice: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;

  transferForBuyer(
    extra: PromiseOrValue<BytesLike>,
    addresses: PromiseOrValue<string>[],
    howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    uints: PromiseOrValue<BigNumberish>[],
    data: PromiseOrValue<BytesLike>,
    counterdata: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  transferForSeller(
    extra: PromiseOrValue<BytesLike>,
    addresses: PromiseOrValue<string>[],
    howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    uints: PromiseOrValue<BigNumberish>[],
    data: PromiseOrValue<BytesLike>,
    counterdata: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    decodeERC20Amount(
      extraUints: PromiseOrValue<BigNumberish>[],
      hightestBid: PromiseOrValue<BigNumberish>,
      floorPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;

    transferForBuyer(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferForSeller(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    decodeERC20Amount(
      extraUints: PromiseOrValue<BigNumberish>[],
      hightestBid: PromiseOrValue<BigNumberish>,
      floorPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferForBuyer(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferForSeller(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    decodeERC20Amount(
      extraUints: PromiseOrValue<BigNumberish>[],
      hightestBid: PromiseOrValue<BigNumberish>,
      floorPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferForBuyer(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferForSeller(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
