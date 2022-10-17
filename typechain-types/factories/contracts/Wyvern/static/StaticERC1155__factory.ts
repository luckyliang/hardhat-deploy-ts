/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  StaticERC1155,
  StaticERC1155Interface,
} from "../../../../contracts/Wyvern/static/StaticERC1155";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "extra",
        type: "bytes",
      },
      {
        internalType: "address[7]",
        name: "addresses",
        type: "address[7]",
      },
      {
        internalType: "enum AuthenticatedProxy.HowToCall[2]",
        name: "howToCalls",
        type: "uint8[2]",
      },
      {
        internalType: "uint256[6]",
        name: "uints",
        type: "uint256[6]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "counterdata",
        type: "bytes",
      },
    ],
    name: "swapOneForOneERC1155",
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
        internalType: "bytes",
        name: "extra",
        type: "bytes",
      },
      {
        internalType: "address[7]",
        name: "addresses",
        type: "address[7]",
      },
      {
        internalType: "enum AuthenticatedProxy.HowToCall[2]",
        name: "howToCalls",
        type: "uint8[2]",
      },
      {
        internalType: "uint256[6]",
        name: "uints",
        type: "uint256[6]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "counterdata",
        type: "bytes",
      },
    ],
    name: "swapOneForOneERC1155Decoding",
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
        internalType: "bytes",
        name: "extra",
        type: "bytes",
      },
      {
        internalType: "address[7]",
        name: "addresses",
        type: "address[7]",
      },
      {
        internalType: "enum AuthenticatedProxy.HowToCall",
        name: "howToCall",
        type: "uint8",
      },
      {
        internalType: "uint256[6]",
        name: "",
        type: "uint256[6]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "transferERC1155Exact",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610e03806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632e0b69db146100465780634563928f146101d85780637557ef981461041a575b600080fd5b6101d6600480360361020081101561005d57600080fd5b810190602081018135600160201b81111561007757600080fd5b82018360208201111561008957600080fd5b803590602001918460018302840111600160201b831117156100aa57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250506040805160e08181019092529396959481810194935091506007908390839080828437600092019190915250506040805160c0818101909252929560ff853516959094909360e08201935091602090910190600690839083908082843760009201919091525091949392602081019250359050600160201b81111561016257600080fd5b82018360208201111561017457600080fd5b803590602001918460018302840111600160201b8311171561019557600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061064a945050505050565b005b61040860048036036102408110156101ef57600080fd5b810190602081018135600160201b81111561020957600080fd5b82018360208201111561021b57600080fd5b803590602001918460018302840111600160201b8311171561023c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250506040805160e081810190925293969594818101949350915060079083908390808284376000920191909152505060408051808201825292959493818101939250906002908390839080828437600092019190915250506040805160c08181019092529295949381810193925090600690839083908082843760009201919091525091949392602081019250359050600160201b81111561030f57600080fd5b82018360208201111561032157600080fd5b803590602001918460018302840111600160201b8311171561034257600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561039457600080fd5b8201836020820111156103a657600080fd5b803590602001918460018302840111600160201b831117156103c757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610744945050505050565b60408051918252519081900360200190f35b610408600480360361024081101561043157600080fd5b810190602081018135600160201b81111561044b57600080fd5b82018360208201111561045d57600080fd5b803590602001918460018302840111600160201b8311171561047e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250506040805160e081810190925293969594818101949350915060079083908390808284376000920191909152505060408051808201825292959493818101939250906002908390839080828437600092019190915250506040805160c08181019092529295949381810193925090600690839083908082843760009201919091525091949392602081019250359050600160201b81111561055157600080fd5b82018360208201111561056357600080fd5b803590602001918460018302840111600160201b8311171561058457600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b8111156105d657600080fd5b8201836020820111156105e857600080fd5b803590602001918460018302840111600160201b8311171561060957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610a22945050505050565b600080600087806020019051606081101561066457600080fd5b508051602082015160409092015190945090925090506001600160a01b03831687600260200201516001600160a01b03161461069f57600080fd5b60008660018111156106ad57fe5b146106b757600080fd5b6020878101516080890151604080516001600160a01b039384166024820152929091166044830152606482018590526084820184905260a060a4830152600060c4830152805180830360e4018152610104909201905290810180516001600160e01b0316637921219560e11b179052610731908590610baa565b61073a57600080fd5b5050505050505050565b82516000901561075357600080fd5b61075b610c92565b610763610c92565b61076b610c92565b8980602001905160c081101561078057600080fd5b50805160408b810151929550850193506080850192506001600160a01b039182169116146107df5760405162461bcd60e51b8152600401808060200182810382526038815260200180610d3c6038913960400191505060405180910390fd5b805161081c5760405162461bcd60e51b815260040180806020018281038252602d815260200180610d74602d913960400191505060405180910390fd5b8751600090600181111561082c57fe5b146108685760405162461bcd60e51b8152600401808060200182810382526023815260200180610cef6023913960400191505060405180910390fd5b6108f9868a600160200201518b60045b602002015185518560005b60209081029190910151604080516001600160a01b0396871660248201529490951660448501526064840192909252608483019190915260a060a4830152600060c4830152825180830360e401815261010490920190925290810180516001600160e01b0316637921219560e11b179052610baa565b61090257600080fd5b602083015160a08a01516001600160a01b039081169116146109555760405162461bcd60e51b815260040180806020018281038252603e815260200180610cb1603e913960400191505060405180910390fd5b60208101516109955760405162461bcd60e51b815260040180806020018281038252602d815260200180610da1602d913960400191505060405180910390fd5b602088015160009060018111156109a857fe5b146109e45760405162461bcd60e51b815260040180806020018281038252602a815260200180610d12602a913960400191505060405180910390fd5b610a09858a600460200201518b60015b60200201518560016020020151856001610883565b610a1257600080fd5b5060019998505050505050505050565b604080516004808252602482019092526020810180516001600160e01b0316637921219560e11b179052600091606091610a5b91610c0e565b855190915015610a6a57600080fd5b610a72610c92565b610a7a610c92565b610a82610c92565b8a80602001905160c0811015610a9757600080fd5b50805160408c810151929550850193506080850192506001600160a01b03918216911614610af65760405162461bcd60e51b8152600401808060200182810382526038815260200180610d3c6038913960400191505060405180910390fd5b88516000906001811115610b0657fe5b14610b425760405162461bcd60e51b8152600401808060200182810382526023815260200180610cef6023913960400191505060405180910390fd5b610b5684610b51896004610c0e565b610baa565b610b5f57600080fd5b610b73878b600160200201518c6004610878565b610b7c57600080fd5b610b90868b600460200201518c60016109f4565b610b9957600080fd5b5060019a9950505050505050505050565b815181516000916001918114808314610bc65760009250610c04565b600160208701838101602088015b600284838510011415610bff578051835114610bf35760009650600093505b60209283019201610bd4565b505050505b5090949350505050565b6060610c1c83600084610c23565b9392505050565b60608082158015610c3f57604051915060208201604052610c89565b6040519150601f8416801560200281840101858101878315602002848b0101015b81831015610c78578051835260209283019201610c60565b5050858452601f01601f1916604052505b50949350505050565b6040518060400160405280600290602082028036833750919291505056fe455243313135353a20636f756e74657263616c6c20746172676574206d75737420657175616c2061646472657373206f6620746f6b656e20746f20676574455243313135353a2063616c6c206d7573742062652061206469726563742063616c6c455243313135353a20636f756e74657263616c6c206d7573742062652061206469726563742063616c6c455243313135353a2063616c6c20746172676574206d75737420657175616c2061646472657373206f6620746f6b656e20746f2067697665455243313135353a206769766520616d6f756e74206d757374206265206c6172676572207468616e207a65726f455243313135353a2074616b6520616d6f756e74206d757374206265206c6172676572207468616e207a65726fa2646970667358221220d8058c341caab2f5396de2d8bf39b211aba9d793c7ac4fd1035fe01ffa9bd29764736f6c63430007050033";

type StaticERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StaticERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StaticERC1155__factory extends ContractFactory {
  constructor(...args: StaticERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StaticERC1155> {
    return super.deploy(overrides || {}) as Promise<StaticERC1155>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): StaticERC1155 {
    return super.attach(address) as StaticERC1155;
  }
  override connect(signer: Signer): StaticERC1155__factory {
    return super.connect(signer) as StaticERC1155__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StaticERC1155Interface {
    return new utils.Interface(_abi) as StaticERC1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StaticERC1155 {
    return new Contract(address, _abi, signerOrProvider) as StaticERC1155;
  }
}
