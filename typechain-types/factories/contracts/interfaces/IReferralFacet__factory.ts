/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IReferralFacet,
  IReferralFacetInterface,
} from "../../../contracts/interfaces/IReferralFacet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_claimer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "ClaimReferrerFee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_metaverseRegistry",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "_percentage",
        type: "uint24",
      },
    ],
    name: "SetMetaverseRegistryReferrer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "SetReferralAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "_mainPercentage",
        type: "uint24",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "_secondaryPercentage",
        type: "uint24",
      },
    ],
    name: "SetReferrer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_paymentTokens",
        type: "address[]",
      },
    ],
    name: "claimMultipleReferrerFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_paymentToken",
        type: "address",
      },
    ],
    name: "claimReferrerFee",
    outputs: [
      {
        internalType: "address",
        name: "paymentToken_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_metaverseRegistry",
        type: "address",
      },
    ],
    name: "metaverseRegistryReferrer",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "referrer",
            type: "address",
          },
          {
            internalType: "uint24",
            name: "percentage",
            type: "uint24",
          },
        ],
        internalType: "struct LibReferral.MetaverseRegistryReferrer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "referralAdmin",
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
        internalType: "address",
        name: "_referrer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "referrerFee",
    outputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_referrer",
        type: "address",
      },
    ],
    name: "referrerPercentage",
    outputs: [
      {
        components: [
          {
            internalType: "uint24",
            name: "mainPercentage",
            type: "uint24",
          },
          {
            internalType: "uint24",
            name: "secondaryPercentage",
            type: "uint24",
          },
        ],
        internalType: "struct LibReferral.ReferrerPercentage",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_metaverseRegistries",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_referrers",
        type: "address[]",
      },
      {
        internalType: "uint24[]",
        name: "_percentages",
        type: "uint24[]",
      },
    ],
    name: "setMetaverseRegistryReferrers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "setReferralAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_referrers",
        type: "address[]",
      },
      {
        internalType: "uint24[]",
        name: "_mainPercentages",
        type: "uint24[]",
      },
      {
        internalType: "uint24[]",
        name: "_secondaryPercentages",
        type: "uint24[]",
      },
    ],
    name: "setReferrers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IReferralFacet__factory {
  static readonly abi = _abi;
  static createInterface(): IReferralFacetInterface {
    return new utils.Interface(_abi) as IReferralFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IReferralFacet {
    return new Contract(address, _abi, signerOrProvider) as IReferralFacet;
  }
}
