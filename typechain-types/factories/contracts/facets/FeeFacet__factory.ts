/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  FeeFacet,
  FeeFacetInterface,
} from "../../../contracts/facets/FeeFacet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "ClaimProtocolFee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_assetId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "ClaimRentFee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "SetFee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "SetTokenPayment",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assetId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "assetRentFeesFor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_assetIds",
        type: "uint256[]",
      },
    ],
    name: "claimMultipleRentFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "claimProtocolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
    ],
    name: "claimProtocolFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assetId",
        type: "uint256",
      },
    ],
    name: "claimRentFee",
    outputs: [
      {
        internalType: "address",
        name: "paymentToken_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rentFee_",
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
        name: "_token",
        type: "address",
      },
    ],
    name: "feePercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feePrecision",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "protocolFeeFor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_feePercentage",
        type: "uint256",
      },
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_feePercentage",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "setTokenPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "supportsTokenPayment",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "tokenPaymentAt",
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
    inputs: [],
    name: "totalTokenPayments",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506113cd806100206000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063a0a1f0981161008c578063d792f7af11610066578063d792f7af146101c6578063e55156b5146101d9578063ecc63957146101ec578063f9738d42146101ff57600080fd5b8063a0a1f0981461015e578063acc9be3c14610171578063c969f057146101a357600080fd5b8063186813d8146100d457806335ff1e28146100fa5780633e59282614610103578063859049d31461012e5780639a2e5ceb146101435780639ea901ca14610156575b600080fd5b6100e76100e23660046110fb565b610212565b6040519081526020015b60405180910390f35b620186a06100e7565b610116610111366004611127565b61025e565b6040516001600160a01b0390911681526020016100f1565b61014161013c36600461118c565b610269565b005b6101416101513660046111df565b6102b5565b6100e7610325565b6100e761016c36600461121f565b610334565b61018461017f366004611127565b610371565b604080516001600160a01b0390931683526020830191909152016100f1565b6101b66101b136600461121f565b610408565b60405190151581526020016100f1565b6101416101d436600461118c565b610413565b6101416101e736600461123a565b610454565b6100e76101fa36600461121f565b61046a565b61014161020d36600461121f565b6104a7565b60008281527f3edf7e48c941a251579fc686bc2f4eca23df9bf60f08e5fe8ad25af5660cca21602090815260408083206001600160a01b03851684529091528120545b90505b92915050565b60006102588261057e565b60005b818110156102b05761029e83838381811061028957610289611264565b905060200201602081019061020d919061121f565b806102a881611290565b91505061026c565b505050565b6001600160a01b0383166103095760405162461bcd60e51b815260206004820152601660248201527505f746f6b656e206d757374206e6f74206265203078360541b60448201526064015b60405180910390fd5b610311610598565b61031b838261060f565b6102b08383610709565b600061032f6107d1565b905090565b6001600160a01b03811660009081527f3edf7e48c941a251579fc686bc2f4eca23df9bf60f08e5fe8ad25af5660cca206020526040812054610258565b60008061037e33846107ea565b8061038e575061038e33846108f3565b6103f65760405162461bcd60e51b815260206004820152603360248201527f63616c6c6572206d75737420626520636f6e73756d65722c20617070726f766560448201527219081bdc881bdddb995c881bd988185cdcd95d606a1b6064820152608401610300565b6103ff8361091a565b91509150915091565b600061025882610a29565b60005b818110156102b05761043f83838381811061043357610433611264565b90506020020135610371565b5050808061044c90611290565b915050610416565b61045c610598565b6104668282610709565b5050565b6001600160a01b03811660009081527f3edf7e48c941a251579fc686bc2f4eca23df9bf60f08e5fe8ad25af5660cca226020526040812054610258565b6001600160a01b03811660009081527f3edf7e48c941a251579fc686bc2f4eca23df9bf60f08e5fe8ad25af5660cca22602052604081208054919055806104ec575050565b600061051f7faba9fab218e99d82c4cdc7f8050a7ec15e88f8ccb78565ad22c8882d1563dfda546001600160a01b031690565b905061052c838284610a43565b806001600160a01b0316836001600160a01b03167f90ff273c8872c6a7b31f5cbf4ae7fc687882a2e0cf594008753be8e828f17f928460405161057191815260200190565b60405180910390a3505050565b600061025860008051602061137883398151915283610aa5565b7faba9fab218e99d82c4cdc7f8050a7ec15e88f8ccb78565ad22c8882d1563dfd6600401546001600160a01b0316331461060d5760405162461bcd60e51b815260206004820152601660248201527526bab9ba1031329031b7b73a3930b1ba1037bbb732b960511b6044820152606401610300565b565b60008051602061137883398151915281156106765761062e8184610ab1565b6106715760405162461bcd60e51b815260206004820152601460248201527317dd1bdad95b88185b1c9958591e48185919195960621b6044820152606401610300565b6106bf565b6106808184610ac6565b6106bf5760405162461bcd60e51b815260206004820152601060248201526f17dd1bdad95b881b9bdd08199bdd5b9960821b6044820152606401610300565b826001600160a01b03167f5f6d177efdd744fbcb8626ad662c013a6e0792cb7e7f0f85effdeed5d5ef80cc836040516106fc911515815260200190565b60405180910390a2505050565b600080516020611378833981519152620186a082106107825760405162461bcd60e51b815260206004820152602f60248201527f5f66656550657263656e746167652065786365656473206f7220657175616c2060448201526e3a37903332b2a83932b1b4b9b4b7b760891b6064820152608401610300565b6001600160a01b038316600081815260028301602052604090819020849055517f01fe2943baee27f47add82886c2200f910c749c461c9b63c5fe83901a53bdb49906106fc9085815260200190565b600061032f600080516020611378833981519152610adb565b60006107f582610ae5565b6108565760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610300565b600061086183610b21565b9050806001600160a01b0316846001600160a01b0316148061089c5750836001600160a01b031661089184610bb7565b6001600160a01b0316145b806108eb57506001600160a01b0380821660009081527fead7485caf5f3be13698f775d295954588c5e11a5dad4f8c6640595d9a0cc472602090815260408083209388168352929052205460ff165b949350505050565b60006108fe82610c5e565b6001600160a01b0316836001600160a01b031614905092915050565b60008181527f0a9d4881d6513ea484cc5630de44314cca750c9a2c1407addd3eebd4cb38205560209081526040808320600301547f3edf7e48c941a251579fc686bc2f4eca23df9bf60f08e5fe8ad25af5660cca2183528184206001600160a01b03909116808552925282208054908390558291908061099e579094909350915050565b60006109a986610c5e565b90506001600160a01b0381166109c5576109c286610b21565b90505b6109d0838284610a43565b806001600160a01b0316836001600160a01b0316877f3d5971fa9da202801ea7b636399b6d073418176344e3de9134cebd23432db9d285604051610a1691815260200190565b60405180910390a4509094909350915050565b600061025860008051602061137883398151915283610d0d565b6001600160a01b03831660011415610a91576040516001600160a01b0383169082156108fc029083906000818181858888f19350505050158015610a8b573d6000803e3d6000fd5b50505050565b6102b06001600160a01b0384168383610d2f565b60006102558383610d81565b6000610255836001600160a01b038416610dab565b6000610255836001600160a01b038416610dfa565b6000610258825490565b60009081527fead7485caf5f3be13698f775d295954588c5e11a5dad4f8c6640595d9a0cc46f60205260409020546001600160a01b0316151590565b60008181527fead7485caf5f3be13698f775d295954588c5e11a5dad4f8c6640595d9a0cc46f60205260408120546001600160a01b0316806102585760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610300565b6000610bc282610ae5565b610c235760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610300565b5060009081527fead7485caf5f3be13698f775d295954588c5e11a5dad4f8c6640595d9a0cc47160205260409020546001600160a01b031690565b6000610c6982610ae5565b610cd25760405162461bcd60e51b815260206004820152603460248201527f455243373231436f6e73756d65723a20636f6e73756d6572207175657279206660448201527337b9103737b732bc34b9ba32b73a103a37b5b2b760611b6064820152608401610300565b5060009081527fead7485caf5f3be13698f775d295954588c5e11a5dad4f8c6640595d9a0cc47360205260409020546001600160a01b031690565b6001600160a01b03811660009081526001830160205260408120541515610255565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526102b0908490610eed565b6000826000018281548110610d9857610d98611264565b9060005260206000200154905092915050565b6000818152600183016020526040812054610df257508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610258565b506000610258565b60008181526001830160205260408120548015610ee3576000610e1e6001836112ab565b8554909150600090610e32906001906112ab565b9050818114610e97576000866000018281548110610e5257610e52611264565b9060005260206000200154905080876000018481548110610e7557610e75611264565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610ea857610ea86112c2565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610258565b6000915050610258565b6000610f42826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610fbf9092919063ffffffff16565b8051909150156102b05780806020019051810190610f6091906112d8565b6102b05760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610300565b60606108eb848460008585600080866001600160a01b03168587604051610fe69190611328565b60006040518083038185875af1925050503d8060008114611023576040519150601f19603f3d011682016040523d82523d6000602084013e611028565b606091505b509150915061103987838387611044565b979650505050505050565b606083156110b05782516110a9576001600160a01b0385163b6110a95760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610300565b50816108eb565b6108eb83838151156110c55781518083602001fd5b8060405162461bcd60e51b81526004016103009190611344565b80356001600160a01b03811681146110f657600080fd5b919050565b6000806040838503121561110e57600080fd5b8235915061111e602084016110df565b90509250929050565b60006020828403121561113957600080fd5b5035919050565b60008083601f84011261115257600080fd5b50813567ffffffffffffffff81111561116a57600080fd5b6020830191508360208260051b850101111561118557600080fd5b9250929050565b6000806020838503121561119f57600080fd5b823567ffffffffffffffff8111156111b657600080fd5b6111c285828601611140565b90969095509350505050565b80151581146111dc57600080fd5b50565b6000806000606084860312156111f457600080fd5b6111fd846110df565b9250602084013591506040840135611214816111ce565b809150509250925092565b60006020828403121561123157600080fd5b610255826110df565b6000806040838503121561124d57600080fd5b611256836110df565b946020939093013593505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006000198214156112a4576112a461127a565b5060010190565b6000828210156112bd576112bd61127a565b500390565b634e487b7160e01b600052603160045260246000fd5b6000602082840312156112ea57600080fd5b81516112f5816111ce565b9392505050565b60005b838110156113175781810151838201526020016112ff565b83811115610a8b5750506000910152565b6000825161133a8184602087016112fc565b9190910192915050565b60208152600082518060208401526113638160408501602087016112fc565b601f01601f1916919091016040019291505056fe3edf7e48c941a251579fc686bc2f4eca23df9bf60f08e5fe8ad25af5660cca1ea26469706673582212208d76c986511298977523c913aa36478aaa6de31277496f34eea1def74ef400d664736f6c634300080a0033";

type FeeFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FeeFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FeeFacet__factory extends ContractFactory {
  constructor(...args: FeeFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FeeFacet> {
    return super.deploy(overrides || {}) as Promise<FeeFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FeeFacet {
    return super.attach(address) as FeeFacet;
  }
  override connect(signer: Signer): FeeFacet__factory {
    return super.connect(signer) as FeeFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FeeFacetInterface {
    return new utils.Interface(_abi) as FeeFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FeeFacet {
    return new Contract(address, _abi, signerOrProvider) as FeeFacet;
  }
}
