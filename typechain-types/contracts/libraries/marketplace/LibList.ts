/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  Signer,
  utils,
} from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface LibListInterface extends utils.Interface {
  functions: {};

  events: {
    "List(uint256,uint256,address,uint256,uint256,uint256,uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "List"): EventFragment;
}

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

export interface LibList extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LibListInterface;

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

  functions: {};

  callStatic: {};

  filters: {
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
  };

  estimateGas: {};

  populateTransaction: {};
}
