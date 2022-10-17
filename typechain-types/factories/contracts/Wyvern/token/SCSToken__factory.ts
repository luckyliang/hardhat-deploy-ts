/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  SCSToken,
  SCSTokenInterface,
} from "../../../../contracts/Wyvern/token/SCSToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "registryAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
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
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "approveFor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "attack",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "burnBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "creators",
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
        name: "operator",
        type: "address",
      },
    ],
    name: "isApproveFor",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "members",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mintBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
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
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newuri",
        type: "string",
      },
    ],
    name: "setURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60e06040526026608081815290620033b560a0398051620000299160039160209091019062000199565b503480156200003757600080fd5b50604051620033db380380620033db833981810160405260208110156200005d57600080fd5b505160006200006b6200010d565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350620000c76301ffc9a760e01b62000111565b600480546001600160a01b0319166001600160a01b038316179055620000f4636cdb3d1360e11b62000111565b620001066303a24d0760e21b62000111565b5062000245565b3390565b6001600160e01b0319808216141562000171576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152600160208190526040909120805460ff19169091179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620001d157600085556200021c565b82601f10620001ec57805160ff19168380011785556200021c565b828001600101855582156200021c579182015b828111156200021c578251825591602001919060010190620001ff565b506200022a9291506200022e565b5090565b5b808211156200022a57600081556001016200022f565b61316080620002556000396000f3fe608060405234801561001057600080fd5b506004361061014c5760003560e01c8063715018a6116100c3578063cd53d08e1161007c578063cd53d08e14610a9f578063e985e9c514610abc578063f242432a14610aea578063f2fde38b14610bb3578063f5298aca14610bd9578063fb4c4bcd14610c0b5761014c565b8063715018a614610975578063731133e91461097d5780638da5cb5b14610a3d57806395d89b4114610a615780639e5faafc14610a69578063a22cb46514610a715761014c565b80630e461a10116101155780630e461a10146103135780630e89341c146103395780631f7fdffa146103565780632eb2c2d61461050e5780634e1273f4146106cf5780636b20c454146108425761014c565b8062fdd58e1461015157806301ffc9a71461018f57806302fe5305146101ca57806306fdde031461027057806308ae4b0c146102ed575b600080fd5b61017d6004803603604081101561016757600080fd5b506001600160a01b038135169060200135610c39565b60408051918252519081900360200190f35b6101b6600480360360208110156101a557600080fd5b50356001600160e01b031916610cab565b604080519115158252519081900360200190f35b61026e600480360360208110156101e057600080fd5b810190602081018135600160201b8111156101fa57600080fd5b82018360208201111561020c57600080fd5b803590602001918460018302840111600160201b8311171561022d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610cce945050505050565b005b610278610d7b565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102b257818101518382015260200161029a565b50505050905090810190601f1680156102df5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101b66004803603602081101561030357600080fd5b50356001600160a01b0316610d97565b6101b66004803603602081101561032957600080fd5b50356001600160a01b0316610dac565b6102786004803603602081101561034f57600080fd5b5035610dca565b61026e6004803603608081101561036c57600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561039657600080fd5b8201836020820111156103a857600080fd5b803590602001918460208302840111600160201b831117156103c957600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561041857600080fd5b82018360208201111561042a57600080fd5b803590602001918460208302840111600160201b8311171561044b57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561049a57600080fd5b8201836020820111156104ac57600080fd5b803590602001918460018302840111600160201b831117156104cd57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610f07945050505050565b61026e600480360360a081101561052457600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b81111561055757600080fd5b82018360208201111561056957600080fd5b803590602001918460208302840111600160201b8311171561058a57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156105d957600080fd5b8201836020820111156105eb57600080fd5b803590602001918460208302840111600160201b8311171561060c57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561065b57600080fd5b82018360208201111561066d57600080fd5b803590602001918460018302840111600160201b8311171561068e57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506111f4945050505050565b6107f2600480360360408110156106e557600080fd5b810190602081018135600160201b8111156106ff57600080fd5b82018360208201111561071157600080fd5b803590602001918460208302840111600160201b8311171561073257600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561078157600080fd5b82018360208201111561079357600080fd5b803590602001918460208302840111600160201b831117156107b457600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506114f7945050505050565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561082e578181015183820152602001610816565b505050509050019250505060405180910390f35b61026e6004803603606081101561085857600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561088257600080fd5b82018360208201111561089457600080fd5b803590602001918460208302840111600160201b831117156108b557600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561090457600080fd5b82018360208201111561091657600080fd5b803590602001918460208302840111600160201b8311171561093757600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506115e3945050505050565b61026e611953565b61026e6004803603608081101561099357600080fd5b6001600160a01b038235169160208101359160408201359190810190608081016060820135600160201b8111156109c957600080fd5b8201836020820111156109db57600080fd5b803590602001918460018302840111600160201b831117156109fc57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506119ff945050505050565b610a45611b8e565b604080516001600160a01b039092168252519081900360200190f35b610278611b9e565b61026e611bbe565b61026e60048036036040811015610a8757600080fd5b506001600160a01b0381351690602001351515611c33565b610a4560048036036020811015610ab557600080fd5b5035611d22565b6101b660048036036040811015610ad257600080fd5b506001600160a01b0381358116916020013516611d3d565b61026e600480360360a0811015610b0057600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a081016080820135600160201b811115610b3f57600080fd5b820183602082011115610b5157600080fd5b803590602001918460018302840111600160201b83111715610b7257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550611e0a945050505050565b61026e60048036036020811015610bc957600080fd5b50356001600160a01b0316611fc6565b61026e60048036036060811015610bef57600080fd5b506001600160a01b0381351690602081013590604001356120c8565b61026e60048036036040811015610c2157600080fd5b506001600160a01b03813516906020013515156122e4565b60006001600160a01b038316610c805760405162461bcd60e51b815260040180806020018281038252602b815260200180612e83602b913960400191505060405180910390fd5b5060008181526005602090815260408083206001600160a01b03861684529091529020545b92915050565b6001600160e01b0319811660009081526001602052604090205460ff165b919050565b60026000610cda61239d565b6001600160a01b0316815260208101919091526040016000205460ff1680610d215750610d0561239d565b6001600160a01b0316610d16611b8e565b6001600160a01b0316145b610d6f576040805162461bcd60e51b815260206004820152601a602482015279456d706c6f7961626c653a204e6f742061636365737369626c6560301b604482015290519081900360640190fd5b610d78816123a1565b50565b604051806060016040528060238152602001612fc66023913981565b60026020526000908152604090205460ff1681565b6001600160a01b031660009081526002602052604090205460ff1690565b6000818152600760205260409020546060906001600160a01b0316610e36576040805162461bcd60e51b815260206004820152601760248201527f455243313135353a20746f6b656e206e6f74206d696e74000000000000000000604482015290519081900360640190fd5b6003610e41836123b8565b6040516020018083805460018160011615610100020316600290048015610e9f5780601f10610e7d576101008083540402835291820191610e9f565b820191906000526020600020905b815481529060010190602001808311610e8b575b5050825160208401908083835b60208310610ecb5780518252601f199092019160209182019101610eac565b6001836020036101000a038019825116818451168082178552505050505050905001925050506040516020818303038152906040529050919050565b6001600160a01b038416610f4c5760405162461bcd60e51b815260040180806020018281038252602181526020018061310a6021913960400191505060405180910390fd5b8151835114610f8c5760405162461bcd60e51b81526004018080602001828103825260288152602001806130e26028913960400191505060405180910390fd5b6000610f9661239d565b9050610fa7816000878787876114ef565b60005b84518110156111035760056000868381518110610fc357fe5b602002602001015181526020019081526020016000206000876001600160a01b03166001600160a01b0316815260200190815260200160002054600014611051576040805162461bcd60e51b815260206004820152601e60248201527f455243313135353a20746f6b656e20686173206265656e206d696e7465640000604482015290519081900360640190fd5b83818151811061105d57fe5b60200260200101516005600087848151811061107557fe5b602002602001015181526020019081526020016000206000886001600160a01b03166001600160a01b031681526020019081526020016000208190555081600760008784815181106110c357fe5b602090810291909101810151825281019190915260400160002080546001600160a01b0319166001600160a01b0392909216919091179055600101610faa565b50846001600160a01b031660006001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b8381101561118a578181015183820152602001611172565b50505050905001838103825284818151815260200191508051906020019060200280838360005b838110156111c95781810151838201526020016111b1565b5050505090500194505050505060405180910390a46111ed816000878787876126ae565b5050505050565b81518351146112345760405162461bcd60e51b81526004018080602001828103825260288152602001806130e26028913960400191505060405180910390fd5b6001600160a01b0384166112795760405162461bcd60e51b8152600401808060200182810382526025815260200180612f6f6025913960400191505060405180910390fd5b61128161239d565b6001600160a01b0316856001600160a01b031614806112ac57506112ac856112a761239d565b611d3d565b6112e75760405162461bcd60e51b8152600401808060200182810382526032815260200180612f946032913960400191505060405180910390fd5b60006112f161239d565b90506113018187878787876114ef565b60005b845181101561140757600085828151811061131b57fe5b60200260200101519050600085838151811061133357fe5b602002602001015190506113a0816040518060600160405280602a815260200161300c602a91396005600086815260200190815260200160002060008d6001600160a01b03166001600160a01b031681526020019081526020016000205461296b9092919063ffffffff16565b60008381526005602090815260408083206001600160a01b038e811685529252808320939093558a16815220546113d790826129c5565b60009283526005602090815260408085206001600160a01b038c1686529091529092209190915550600101611304565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b8381101561148d578181015183820152602001611475565b50505050905001838103825284818151815260200191508051906020019060200280838360005b838110156114cc5781810151838201526020016114b4565b5050505090500194505050505060405180910390a46114ef8187878787876126ae565b505050505050565b606081518351146115395760405162461bcd60e51b815260040180806020018281038252602981526020018061307f6029913960400191505060405180910390fd5b6060835167ffffffffffffffff8111801561155357600080fd5b5060405190808252806020026020018201604052801561157d578160200160208202803683370190505b50905060005b84518110156115db576115bc85828151811061159b57fe5b60200260200101518583815181106115af57fe5b6020026020010151610c39565b8282815181106115c857fe5b6020908102919091010152600101611583565b509392505050565b600260006115ef61239d565b6001600160a01b0316815260208101919091526040016000205460ff1680611636575061161a61239d565b6001600160a01b031661162b611b8e565b6001600160a01b0316145b611684576040805162461bcd60e51b815260206004820152601a602482015279456d706c6f7961626c653a204e6f742061636365737369626c6560301b604482015290519081900360640190fd5b6001600160a01b0383166116c95760405162461bcd60e51b8152600401808060200182810382526023815260200180612fe96023913960400191505060405180910390fd5b80518251146117095760405162461bcd60e51b81526004018080602001828103825260288152602001806130e26028913960400191505060405180910390fd5b600061171361239d565b9050611733818560008686604051806020016040528060008152506114ef565b60005b83518110156118725782818151811061174b57fe5b6020026020010151611763868684815181106115af57fe5b10156117a05760405162461bcd60e51b815260040180806020018281038252604e815260200180612ef8604e913960600191505060405180910390fd5b6118298382815181106117af57fe5b6020026020010151604051806060016040528060248152602001612ed460249139600560008886815181106117e057fe5b602002602001015181526020019081526020016000206000896001600160a01b03166001600160a01b031681526020019081526020016000205461296b9092919063ffffffff16565b6005600086848151811061183957fe5b602090810291909101810151825281810192909252604090810160009081206001600160a01b038a168252909252902055600101611736565b5060006001600160a01b0316846001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8686604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b838110156118f95781810151838201526020016118e1565b50505050905001838103825284818151815260200191508051906020019060200280838360005b83811015611938578181015183820152602001611920565b5050505090500194505050505060405180910390a450505050565b61195b61239d565b6001600160a01b031661196c611b8e565b6001600160a01b0316146119b5576040805162461bcd60e51b81526020600482018190526024820152600080516020613036833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6001600160a01b038416611a445760405162461bcd60e51b815260040180806020018281038252602181526020018061310a6021913960400191505060405180910390fd5b6000611a4e61239d565b6000858152600760205260409020549091506001600160a01b03161580611a8e57506000848152600760205260409020546001600160a01b038281169116145b611adf576040805162461bcd60e51b815260206004820152601e60248201527f455243313135353a20746f6b656e20686173206265656e206d696e7465640000604482015290519081900360640190fd5b611afe81600087611aef88612a26565b611af888612a26565b876114ef565b60008481526005602090815260408083206001600160a01b038981168086529184528285208890558885526007845282852080546001600160a01b03191691871691821790558251898152938401889052825191949390927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292918290030190a46111ed81600087878787612a6a565b6000546001600160a01b03165b90565b604051806040016040528060048152602001630dd0d4d560e21b81525081565b611bc661239d565b6001600160a01b0316611bd7611b8e565b6001600160a01b031614611c20576040805162461bcd60e51b81526020600482018190526024820152600080516020613036833981519152604482015290519081900360640190fd5b611c28611b8e565b6001600160a01b0316ff5b816001600160a01b0316611c4561239d565b6001600160a01b03161415611c8b5760405162461bcd60e51b81526004018080602001828103825260298152602001806130566029913960400191505060405180910390fd5b8060066000611c9861239d565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155611cdc61239d565b6001600160a01b03167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b6007602052600090815260409020546001600160a01b031681565b600480546040805163c455279160e01b81526001600160a01b0386811694820194909452905160009392831692851691839163c455279191602480820192602092909190829003018186803b158015611d9557600080fd5b505afa158015611da9573d6000803e3d6000fd5b505050506040513d6020811015611dbf57600080fd5b50516001600160a01b03161415611dda576001915050610ca5565b50506001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b6001600160a01b038416611e4f5760405162461bcd60e51b8152600401808060200182810382526025815260200180612f6f6025913960400191505060405180910390fd5b611e5761239d565b6001600160a01b0316856001600160a01b03161480611e7d5750611e7d856112a761239d565b611eb85760405162461bcd60e51b8152600401808060200182810382526029815260200180612f466029913960400191505060405180910390fd5b6000611ec261239d565b9050611ed3818787611aef88612a26565b611f1a836040518060600160405280602a815260200161300c602a913960008781526005602090815260408083206001600160a01b038d168452909152902054919061296b565b60008581526005602090815260408083206001600160a01b038b81168552925280832093909355871681522054611f5190846129c5565b60008581526005602090815260408083206001600160a01b03808b168086529184529382902094909455805188815291820187905280518a8416938616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a46114ef818787878787612a6a565b611fce61239d565b6001600160a01b0316611fdf611b8e565b6001600160a01b031614612028576040805162461bcd60e51b81526020600482018190526024820152600080516020613036833981519152604482015290519081900360640190fd5b6001600160a01b03811661206d5760405162461bcd60e51b8152600401808060200182810382526026815260200180612eae6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b600260006120d461239d565b6001600160a01b0316815260208101919091526040016000205460ff168061211b57506120ff61239d565b6001600160a01b0316612110611b8e565b6001600160a01b0316145b612169576040805162461bcd60e51b815260206004820152601a602482015279456d706c6f7961626c653a204e6f742061636365737369626c6560301b604482015290519081900360640190fd5b6001600160a01b0383166121ae5760405162461bcd60e51b8152600401808060200182810382526023815260200180612fe96023913960400191505060405180910390fd5b806121b98484610c39565b10156121f65760405162461bcd60e51b815260040180806020018281038252604e815260200180612ef8604e913960600191505060405180910390fd5b600061220061239d565b90506122308185600061221287612a26565b61221b87612a26565b604051806020016040528060008152506114ef565b61227782604051806060016040528060248152602001612ed46024913960008681526005602090815260408083206001600160a01b038b168452909152902054919061296b565b60008481526005602090815260408083206001600160a01b03808a16808652918452828520959095558151888152928301879052815193949093908616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a450505050565b6122ec61239d565b6001600160a01b03166122fd611b8e565b6001600160a01b031614612346576040805162461bcd60e51b81526020600482018190526024820152600080516020613036833981519152604482015290519081900360640190fd5b6001600160a01b03821660009081526002602052604090205460ff161515811515141561237257600080fd5b6001600160a01b03919091166000908152600260205260409020805460ff1916911515919091179055565b3390565b80516123b4906003906020840190612cda565b5050565b6060816123dd57506040805180820190915260018152600360fc1b6020820152610cc9565b60606040518060600160405280603a81526020016130a8603a9139805160408051600280825281830190925292935090916604da0f161e93419160609190602082018180368337019050509050601260f81b8160008151811061243c57fe5b60200101906001600160f81b031916908160001a905350602060f81b8160018151811061246557fe5b60200101906001600160f81b031916908160001a90535060606124908261248b89612bdb565b612c50565b80519091506000908190600166038d7ea4c680006fffffffffffffffffffffffffffffffff88168302040160608167ffffffffffffffff811180156124d457600080fd5b506040519080825280601f01601f1916602001820160405280156124ff576020820181803683370190505b5090505b82841461260957600086858151811061251857fe5b016020015160f81c9050600060001984015b8215158061253757508782105b156125b65783818151811061254857fe5b602001015160f81c60f81b60f81c60ff166101000261ffff16830192508b60ff16838161257157fe5b0660f81b84828151811061258157fe5b60200101906001600160f81b031916908160001a9053508b60ff1683816125a457fe5b0492506001909101906000190161252a565b5081156125fb576040805162461bcd60e51b815260206004820152600e60248201526d4e6f6e2d7a65726f20636172727960901b604482015290519081900360640190fd5b955050600190930192612503565b60408051602e8082526060828101909352600096508785039291906020820181803683370190505090505b8382101561269d578b83838151811061264957fe5b0160200151815160f89190911c90811061265f57fe5b602001015160f81c60f81b81878151811061267657fe5b60200101906001600160f81b031916908160001a9053506001958601959190910190612634565b9d9c50505050505050505050505050565b6126c0846001600160a01b0316612cd4565b156114ef57836001600160a01b031663bc197c8187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b03168152602001806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b8381101561274e578181015183820152602001612736565b50505050905001848103835286818151815260200191508051906020019060200280838360005b8381101561278d578181015183820152602001612775565b50505050905001848103825285818151815260200191508051906020019080838360005b838110156127c95781810151838201526020016127b1565b50505050905090810190601f1680156127f65780820380516001836020036101000a031916815260200191505b5098505050505050505050602060405180830381600087803b15801561281b57600080fd5b505af192505050801561284057506040513d602081101561283b57600080fd5b505160015b6129135761284c612d81565b8061285757506128dc565b8060405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156128a1578181015183820152602001612889565b50505050905090810190601f1680156128ce5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b60405162461bcd60e51b8152600401808060200182810382526034815260200180612e276034913960400191505060405180910390fd5b6001600160e01b0319811663bc197c8160e01b146129625760405162461bcd60e51b8152600401808060200182810382526028815260200180612e5b6028913960400191505060405180910390fd5b50505050505050565b600081848411156129bd5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156128a1578181015183820152602001612889565b505050900390565b600082820183811015612a1f576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b604080516001808252818301909252606091829190602080830190803683370190505090508281600081518110612a5957fe5b602090810291909101015292915050565b612a7c846001600160a01b0316612cd4565b156114ef57836001600160a01b031663f23a6e6187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b0316815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015612b0b578181015183820152602001612af3565b50505050905090810190601f168015612b385780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b158015612b5b57600080fd5b505af1925050508015612b8057506040513d6020811015612b7b57600080fd5b505160015b612b8c5761284c612d81565b6001600160e01b0319811663f23a6e6160e01b146129625760405162461bcd60e51b8152600401808060200182810382526028815260200180612e5b6028913960400191505060405180910390fd5b6040805160208082528183019092526060918391839160208201818036833701905050905060005b81518110156115db5760008360ff1690508060f81b838381518110612c2457fe5b60200101906001600160f81b031916908160001a90535061010060ff8216850304935050600101612c03565b8151815160609190810160006020601f8401049050600060208651601f0181612c7557fe5b04905060405183815260005b83811015612c9d57600101602081028981015190830152612c81565b5060005b82811015612cbf576001016020810288810151908701830152612ca1565b50928301602001604052509095945050505050565b3b151590565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282612d105760008555612d56565b82601f10612d2957805160ff1916838001178555612d56565b82800160010185558215612d56579182015b82811115612d56578251825591602001919060010190612d3b565b50612d62929150612d66565b5090565b5b80821115612d625760008155600101612d67565b60e01c90565b600060443d1015612d9157611b9b565b600481823e6308c379a0612da58251612d7b565b14612daf57611b9b565b6040513d600319016004823e80513d67ffffffffffffffff8160248401118184111715612ddf5750505050611b9b565b82840192508251915080821115612df95750505050611b9b565b503d83016020828401011115612e1157505050611b9b565b601f01601f191681016020016040529150509056fe455243313135353a207472616e7366657220746f206e6f6e2045524331313535526563656976657220696d706c656d656e746572455243313135353a204552433131353552656365697665722072656a656374656420746f6b656e73455243313135353a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373455243313135353a206275726e20616d6f756e7420657863656564732062616c616e6365455243313135353a206661696c656420746f206275726e4261746368206174206163636f756e7420666f7220746f6b656e49642c206f7665727374657020616d6f756e7420617574686f72697479455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a207472616e7366657220746f20746865207a65726f2061646472657373455243313135353a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564377365617320436f6e7374616e74205368617265642053746f726566726f6e74207631455243313135353a206275726e2066726f6d20746865207a65726f2061646472657373455243313135353a20696e73756666696369656e742062616c616e636520666f72207472616e736665724f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572455243313135353a2073657474696e6720617070726f76616c2073746174757320666f722073656c66455243313135353a206163636f756e747320616e6420696473206c656e677468206d69736d6174636831323334353637383941424344454647484a4b4c4d4e505152535455565758595a6162636465666768696a6b6d6e6f707172737475767778797a455243313135353a2069647320616e6420616d6f756e7473206c656e677468206d69736d61746368455243313135353a206d696e7420746f20746865207a65726f2061646472657373a264697066735822122059039bea33914d6ae4924afa314caaecf9093ab4a3544611cb28d37c60ed65e564736f6c6343000705003368747470733a2f2f736576656e736561732e6d7970696e6174612e636c6f75642f697066732f";

type SCSTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SCSTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SCSToken__factory extends ContractFactory {
  constructor(...args: SCSTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    registryAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SCSToken> {
    return super.deploy(registryAddress, overrides || {}) as Promise<SCSToken>;
  }
  override getDeployTransaction(
    registryAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(registryAddress, overrides || {});
  }
  override attach(address: string): SCSToken {
    return super.attach(address) as SCSToken;
  }
  override connect(signer: Signer): SCSToken__factory {
    return super.connect(signer) as SCSToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SCSTokenInterface {
    return new utils.Interface(_abi) as SCSTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SCSToken {
    return new Contract(address, _abi, signerOrProvider) as SCSToken;
  }
}
