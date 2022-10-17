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

export interface StaticERC1155Interface extends utils.Interface {
  functions: {
    "swapOneForOneERC1155(bytes,address[7],uint8[2],uint256[6],bytes,bytes)": FunctionFragment;
    "swapOneForOneERC1155Decoding(bytes,address[7],uint8[2],uint256[6],bytes,bytes)": FunctionFragment;
    "transferERC1155Exact(bytes,address[7],uint8,uint256[6],bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "swapOneForOneERC1155"
      | "swapOneForOneERC1155Decoding"
      | "transferERC1155Exact"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "swapOneForOneERC1155",
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
    functionFragment: "swapOneForOneERC1155Decoding",
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
    functionFragment: "transferERC1155Exact",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "swapOneForOneERC1155",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapOneForOneERC1155Decoding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferERC1155Exact",
    data: BytesLike
  ): Result;

  events: {};
}

export interface StaticERC1155 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StaticERC1155Interface;

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
    swapOneForOneERC1155(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    swapOneForOneERC1155Decoding(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    transferERC1155Exact(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCall: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[void]>;
  };

  swapOneForOneERC1155(
    extra: PromiseOrValue<BytesLike>,
    addresses: PromiseOrValue<string>[],
    howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    uints: PromiseOrValue<BigNumberish>[],
    data: PromiseOrValue<BytesLike>,
    counterdata: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  swapOneForOneERC1155Decoding(
    extra: PromiseOrValue<BytesLike>,
    addresses: PromiseOrValue<string>[],
    howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    uints: PromiseOrValue<BigNumberish>[],
    data: PromiseOrValue<BytesLike>,
    counterdata: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  transferERC1155Exact(
    extra: PromiseOrValue<BytesLike>,
    addresses: PromiseOrValue<string>[],
    howToCall: PromiseOrValue<BigNumberish>,
    arg3: PromiseOrValue<BigNumberish>[],
    data: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<void>;

  callStatic: {
    swapOneForOneERC1155(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapOneForOneERC1155Decoding(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferERC1155Exact(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCall: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    swapOneForOneERC1155(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapOneForOneERC1155Decoding(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferERC1155Exact(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCall: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    swapOneForOneERC1155(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    swapOneForOneERC1155Decoding(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCalls: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      uints: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      counterdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferERC1155Exact(
      extra: PromiseOrValue<BytesLike>,
      addresses: PromiseOrValue<string>[],
      howToCall: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
