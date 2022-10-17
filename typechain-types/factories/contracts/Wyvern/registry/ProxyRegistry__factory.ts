/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ProxyRegistry,
  ProxyRegistryInterface,
} from "../../../../contracts/Wyvern/registry/ProxyRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "old",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newProxy",
        type: "address",
      },
    ],
    name: "ProxyChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "DELAY_PERIOD",
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
        name: "",
        type: "address",
      },
    ],
    name: "contracts",
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
    inputs: [],
    name: "delegateProxyImplementation",
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
        name: "addr",
        type: "address",
      },
    ],
    name: "endGrantAuthentication",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        name: "",
        type: "address",
      },
    ],
    name: "pending",
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
        name: "",
        type: "address",
      },
    ],
    name: "proxies",
    outputs: [
      {
        internalType: "contract OwnableDelegateProxy",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registerProxy",
    outputs: [
      {
        internalType: "contract OwnableDelegateProxy",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "registerProxyFor",
    outputs: [
      {
        internalType: "contract OwnableDelegateProxy",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registerProxyOverride",
    outputs: [
      {
        internalType: "contract OwnableDelegateProxy",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "revokeAuthentication",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "startGrantAuthentication",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferAccessTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526201518060055534801561001757600080fd5b506000610022610071565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350610075565b3390565b61182a806100846000396000f3fe60806040523480156200001157600080fd5b50600436106200010b5760003560e01c80638da5cb5b11620000a5578063dcfa9222116200006f578063dcfa9222146200029b578063ddd81f8214620002cc578063e71a02e114620002d6578063f2fde38b14620002e0576200010b565b80638da5cb5b146200023557806397204d8e146200023f578063c45527911462000249578063d4e8e0631462000272576200010b565b80635eebea2011620000e75780635eebea2014620001a9578063631d9e3f14620001e457806369dc9ff314620001ee578063715018a6146200022b576200010b565b8062686741146200011057806338b6e407146200015557806353376d1f1462000180575b600080fd5b62000139600480360360208110156200012857600080fd5b50356001600160a01b031662000309565b604080516001600160a01b039092168252519081900360200190f35b6200017e600480360360208110156200016d57600080fd5b50356001600160a01b0316620004ee565b005b6200017e600480360360208110156200019857600080fd5b50356001600160a01b03166200062e565b620001d260048036036020811015620001c157600080fd5b50356001600160a01b0316620006b7565b60408051918252519081900360200190f35b62000139620006c9565b62000217600480360360208110156200020657600080fd5b50356001600160a01b031662000835565b604080519115158252519081900360200190f35b6200017e6200084a565b62000139620008fc565b620001396200090b565b62000139600480360360208110156200026157600080fd5b50356001600160a01b03166200091a565b6200017e600480360360208110156200028a57600080fd5b50356001600160a01b031662000935565b6200017e60048036036040811015620002b357600080fd5b506001600160a01b038135811691602001351662000a36565b6200013962000b95565b620001d262000ba7565b6200017e60048036036020811015620002f857600080fd5b50356001600160a01b031662000bad565b6001600160a01b038181166000908152600260205260408120549091161562000379576040805162461bcd60e51b815260206004820152601860248201527f5573657220616c72656164792068617320612070726f78790000000000000000604482015290519081900360640190fd5b600154604080516001600160a01b0380861660248301523060448084019190915283518084039091018152606490920183526020820180516001600160e01b031663485cc95560e01b179052915185939290921691620003d99062000cbb565b80846001600160a01b03168152602001836001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b838110156200043357818101518382015260200162000419565b50505050905090810190601f168015620004615780820380516001836020036101000a031916815260200191505b50945050505050604051809103906000f08015801562000485573d6000803e3d6000fd5b506001600160a01b03808416600081815260026020908152604080832080549587166001600160a01b031990961686179055805193845290830191909152818101929092529051919250600080516020620016e6833981519152919081900360600190a1919050565b620004f862000cb7565b6001600160a01b03166200050b620008fc565b6001600160a01b03161462000556576040805162461bcd60e51b8152602060048201819052602482015260008051602062001772833981519152604482015290519081900360640190fd5b6001600160a01b03811660009081526004602052604090205460ff161580156200059757506001600160a01b03811660009081526003602052604090205415155b8015620005c057506005546001600160a01b038216600090815260036020526040902054429101105b620005fd5760405162461bcd60e51b81526004018080602001828103825260468152602001806200172c6046913960600191505060405180910390fd5b6001600160a01b0316600090815260036020908152604080832083905560049091529020805460ff19166001179055565b6200063862000cb7565b6001600160a01b03166200064b620008fc565b6001600160a01b03161462000696576040805162461bcd60e51b8152602060048201819052602482015260008051602062001772833981519152604482015290519081900360640190fd5b6001600160a01b03166000908152600460205260409020805460ff19169055565b60036020526000908152604090205481565b6001546040805133602482018190523060448084019190915283518084039091018152606490920183526020820180516001600160e01b031663485cc95560e01b17905291516000936001600160a01b03169190620007289062000cbb565b80846001600160a01b03168152602001836001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b838110156200078257818101518382015260200162000768565b50505050905090810190601f168015620007b05780820380516001836020036101000a031916815260200191505b50945050505050604051809103906000f080158015620007d4573d6000803e3d6000fd5b5033600081815260026020908152604080832080546001600160a01b0387166001600160a01b031990911681179091558151948552918401929092528282015251919250600080516020620016e6833981519152919081900360600190a190565b60046020526000908152604090205460ff1681565b6200085462000cb7565b6001600160a01b031662000867620008fc565b6001600160a01b031614620008b2576040805162461bcd60e51b8152602060048201819052602482015260008051602062001772833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b6001546001600160a01b031681565b6002602052600090815260409020546001600160a01b031681565b6200093f62000cb7565b6001600160a01b031662000952620008fc565b6001600160a01b0316146200099d576040805162461bcd60e51b8152602060048201819052602482015260008051602062001772833981519152604482015290519081900360640190fd5b6001600160a01b03811660009081526004602052604090205460ff16158015620009dd57506001600160a01b038116600090815260036020526040902054155b62000a1a5760405162461bcd60e51b8152600401808060200182810382526033815260200180620017c26033913960400191505060405180910390fd5b6001600160a01b03166000908152600360205260409020429055565b6001600160a01b038083166000908152600260205260409020541633811462000a915760405162461bcd60e51b815260040180806020018281038252602e815260200180620016b8602e913960400191505060405180910390fd5b6001600160a01b03828116600090815260026020526040902054161562000aea5760405162461bcd60e51b8152600401808060200182810382526030815260200180620017926030913960400191505060405180910390fd5b6001600160a01b03808416600081815260026020908152604080832080546001600160a01b0319908116909155878616845281842080549688169690911686179055805193845290830193909352818301529051600080516020620016e68339815191529181900360600190a1604080516001600160a01b038085168252600060208301528316818301529051600080516020620016e68339815191529181900360600190a1505050565b600062000ba23362000309565b905090565b60055481565b62000bb762000cb7565b6001600160a01b031662000bca620008fc565b6001600160a01b03161462000c15576040805162461bcd60e51b8152602060048201819052602482015260008051602062001772833981519152604482015290519081900360640190fd5b6001600160a01b03811662000c5c5760405162461bcd60e51b8152600401808060200182810382526026815260200180620017066026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b6109ee8062000cca8339019056fe608060405234801561001057600080fd5b506040516109ee3803806109ee8339818101604052606081101561003357600080fd5b8151602083015160408085018051915193959294830192918464010000000082111561005e57600080fd5b90830190602082018581111561007357600080fd5b825164010000000081118282018810171561008d57600080fd5b82525081516020918201929091019080838360005b838110156100ba5781810151838201526020016100a2565b50505050905090810190601f1680156100e75780820380516001836020036101000a031916815260200191505b506040525050506100fd836101f060201b60201c565b61010682610212565b6000826001600160a01b0316826040518082805190602001908083835b602083106101425780518252601f199092019160209182019101610123565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d80600081146101a2576040519150601f19603f3d011682016040523d82523d6000602084013e6101a7565b606091505b50509050806101e75760405162461bcd60e51b815260040180806020018281038252602a8152602001806109c4602a913960400191505060405180910390fd5b505050506102a7565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b038281169116141561025f5760405162461bcd60e51b815260040180806020018281038252602681526020018061099e6026913960400191505060405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117825560405190917fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b91a250565b6106e8806102b66000396000f3fe6080604052600436106100745760003560e01c80634f1ef2861161004e5780634f1ef286146101945780635c60da1b1461024a5780636fde82021461025f578063f1739cae146102745761007b565b8063025313a2146101075780633659cfe6146101385780634555d5c91461016d5761007b565b3661007b57005b60006100856102a7565b90506001600160a01b0381166100e2576040805162461bcd60e51b815260206004820152601d60248201527f50726f787920696d706c656d656e746174696f6e207265717569726564000000604482015290519081900360640190fd5b60405136600082376000803683855af43d806000843e818015610103578184f35b8184fd5b34801561011357600080fd5b5061011c6102b6565b604080516001600160a01b039092168252519081900360200190f35b34801561014457600080fd5b5061016b6004803603602081101561015b57600080fd5b50356001600160a01b03166102c5565b005b34801561017957600080fd5b50610182610328565b60408051918252519081900360200190f35b61016b600480360360408110156101aa57600080fd5b6001600160a01b0382351691908101906040810160208201356401000000008111156101d557600080fd5b8201836020820111156101e757600080fd5b8035906020019184600183028401116401000000008311171561020957600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061032d945050505050565b34801561025657600080fd5b5061011c6102a7565b34801561026b57600080fd5b5061011c610489565b34801561028057600080fd5b5061016b6004803603602081101561029757600080fd5b50356001600160a01b0316610498565b6000546001600160a01b031690565b60006102c0610489565b905090565b6102cd6102b6565b6001600160a01b0316336001600160a01b03161461031c5760405162461bcd60e51b815260040180806020018281038252602981526020018061068a6029913960400191505060405180910390fd5b61032581610588565b50565b600290565b6103356102b6565b6001600160a01b0316336001600160a01b0316146103845760405162461bcd60e51b815260040180806020018281038252602981526020018061068a6029913960400191505060405180910390fd5b61038d826102c5565b6000306001600160a01b0316826040518082805190602001908083835b602083106103c95780518252601f1990920191602091820191016103aa565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d8060008114610429576040519150601f19603f3d011682016040523d82523d6000602084013e61042e565b606091505b5050905080610484576040805162461bcd60e51b815260206004820152601f60248201527f43616c6c206661696c65642061667465722070726f7879207570677261646500604482015290519081900360640190fd5b505050565b6001546001600160a01b031690565b6104a06102b6565b6001600160a01b0316336001600160a01b0316146104ef5760405162461bcd60e51b815260040180806020018281038252602981526020018061068a6029913960400191505060405180910390fd5b6001600160a01b0381166105345760405162461bcd60e51b81526004018080602001828103825260248152602001806106666024913960400191505060405180910390fd5b7f5a3e66efaa1e445ebd894728a69d6959842ea1e97bd79b892797106e270efcd961055d6102b6565b604080516001600160a01b03928316815291841660208301528051918290030190a16103258161061d565b6000546001600160a01b03828116911614156105d55760405162461bcd60e51b81526004018080602001828103825260268152602001806106406026913960400191505060405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117825560405190917fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b91a250565b600180546001600160a01b0319166001600160a01b039290921691909117905556fe50726f787920616c72656164792075736573207468697320696d706c656d656e746174696f6e4e6577206f776e65722063616e6e6f7420626520746865206e756c6c20616464726573734f6e6c79207468652070726f7879206f776e65722063616e2063616c6c2074686973206d6574686f64a2646970667358221220ca22dc4c69c700c574d0e19c43b96f8b8267c198c9babe7329c9097229b0548864736f6c6343000705003350726f787920616c72656164792075736573207468697320696d706c656d656e746174696f6e4f776e61626c6544656c656761746550726f7879206661696c656420696d706c656d656e746174696f6e50726f7879207472616e736665722063616e206f6e6c792062652063616c6c6564206279207468652070726f7879ee757cd7f453bd42179bf7f5cdb09db981dddea16af98472000ffe96fbc4f51a4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373436f6e7472616374206973206e6f206c6f6e6765722070656e64696e67206f722068617320616c7265616479206265656e20617070726f7665642062792072656769737472794f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657250726f7879207472616e7366657220686173206578697374696e672070726f78792061732064657374696e6174696f6e436f6e747261637420697320616c726561647920616c6c6f77656420696e2072656769737472792c206f722070656e64696e67a264697066735822122065b70a0867af68feff86422b2178dfcb67ac4439e5f688a830079c1fe9a4fa4964736f6c63430007050033";

type ProxyRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProxyRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProxyRegistry__factory extends ContractFactory {
  constructor(...args: ProxyRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ProxyRegistry> {
    return super.deploy(overrides || {}) as Promise<ProxyRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ProxyRegistry {
    return super.attach(address) as ProxyRegistry;
  }
  override connect(signer: Signer): ProxyRegistry__factory {
    return super.connect(signer) as ProxyRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProxyRegistryInterface {
    return new utils.Interface(_abi) as ProxyRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProxyRegistry {
    return new Contract(address, _abi, signerOrProvider) as ProxyRegistry;
  }
}
