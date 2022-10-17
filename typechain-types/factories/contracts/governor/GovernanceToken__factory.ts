/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  GovernanceToken,
  GovernanceTokenInterface,
} from "../../../contracts/governor/GovernanceToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
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
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "pos",
        type: "uint32",
      },
    ],
    name: "checkpoints",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "fromBlock",
            type: "uint32",
          },
          {
            internalType: "uint224",
            name: "votes",
            type: "uint224",
          },
        ],
        internalType: "struct ERC20Votes.Checkpoint",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "delegateBySig",
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
    ],
    name: "delegates",
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
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getPastTotalSupply",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getPastVotes",
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
        name: "account",
        type: "address",
      },
    ],
    name: "getVotes",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
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
        name: "account",
        type: "address",
      },
    ],
    name: "numCheckpoints",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6101406040523480156200001257600080fd5b506040516200253938038062002539833981016040819052620000359162000832565b6040518060400160405280600f81526020016e23b7bb32b93730b731b2aa37b5b2b760891b81525080604051806040016040528060018152602001603160f81b8152506040518060400160405280600f81526020016e23b7bb32b93730b731b2aa37b5b2b760891b8152506040518060400160405280600381526020016247544b60e81b8152508160039080519060200190620000d492919062000796565b508051620000ea90600490602084019062000796565b5050825160208085019190912083518483012060e08290526101008190524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81880181905281830187905260608201869052608082019490945230818401528151808203909301835260c0019052805194019390932091935091906080523060601b60c05261012052506200019193503392508491505062000198565b50620008ea565b620001af8282620001b360201b62000a061760201c565b5050565b620001ca82826200026a60201b62000a961760201c565b6001600160e01b03620001de620003598216565b11156200024b5760405162461bcd60e51b815260206004820152603060248201527f4552433230566f7465733a20746f74616c20737570706c79207269736b73206f60448201526f766572666c6f77696e6720766f74657360801b60648201526084015b60405180910390fd5b62000264600962000b816200035f60201b178362000374565b50505050565b6001600160a01b038216620002c25760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640162000242565b8060026000828254620002d691906200084c565b90915550506001600160a01b03821660009081526020819052604081208054839290620003059084906200084c565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3620001af600083836200052b565b60025490565b60006200036d82846200084c565b9392505050565b825460009081908015620003c657856200039060018362000867565b81548110620003a357620003a3620008d4565b60009182526020909120015464010000000090046001600160e01b0316620003c9565b60005b6001600160e01b03169250620003e083858760201c565b91506000811180156200042457504386620003fd60018462000867565b81548110620004105762000410620008d4565b60009182526020909120015463ffffffff16145b15620004985762000440826200054360201b62000b8d1760201c565b866200044e60018462000867565b81548110620004615762000461620008d4565b9060005260206000200160000160046101000a8154816001600160e01b0302191690836001600160e01b031602179055506200051d565b856040518060400160405280620004ba43620005b260201b62000bfa1760201c565b63ffffffff168152602001620004db856200054360201b62000b8d1760201c565b6001600160e01b0390811690915282546001810184556000938452602093849020835194909301519091166401000000000263ffffffff909316929092179101555b50935093915050565b505050565b620005268383836200061960201b62000c5f1760201c565b60006001600160e01b03821115620005ae5760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20326044820152663234206269747360c81b606482015260840162000242565b5090565b600063ffffffff821115620005ae5760405162461bcd60e51b815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201526532206269747360d01b606482015260840162000242565b620006318383836200052660201b62000c911760201c565b6001600160a01b038381166000908152600760205260408082205485841683529120546200052692918216911683818314801590620006705750600081115b1562000526576001600160a01b03831615620006fd576001600160a01b038316600090815260086020908152604082208291620006ba919062000788901b62000c96178562000374565b91509150846001600160a01b0316600080516020620025198339815191528383604051620006f2929190918252602082015260400190565b60405180910390a250505b6001600160a01b0382161562000526576001600160a01b0382166000908152600860209081526040822082916200074191906200035f901b62000b81178562000374565b91509150836001600160a01b031660008051602062002519833981519152838360405162000779929190918252602082015260400190565b60405180910390a25050505050565b60006200036d828462000867565b828054620007a49062000881565b90600052602060002090601f016020900481019282620007c8576000855562000813565b82601f10620007e357805160ff191683800117855562000813565b8280016001018555821562000813579182015b8281111562000813578251825591602001919060010190620007f6565b50620005ae9291505b80821115620005ae57600081556001016200081c565b6000602082840312156200084557600080fd5b5051919050565b60008219821115620008625762000862620008be565b500190565b6000828210156200087c576200087c620008be565b500390565b600181811c908216806200089657607f821691505b60208210811415620008b857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b60805160a05160c05160601c60e0516101005161012051611bdc6200093d6000396000611098015260006110e7015260006110c20152600061101b015260006110450152600061106f0152611bdc6000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c806370a08231116100b8578063a457c2d71161007c578063a457c2d7146102d5578063a9059cbb146102e8578063c3cda520146102fb578063d505accf1461030e578063dd62ed3e14610321578063f1127ed81461033457600080fd5b806370a082311461026b5780637ecebe00146102945780638e539e8c146102a757806395d89b41146102ba5780639ab24eb0146102c257600080fd5b80633644e5151161010a5780633644e515146101bc57806339509351146101c45780633a46b1a8146101d7578063587cde1e146101ea5780635c19a95c1461022e5780636fcfff451461024357600080fd5b806306fdde0314610147578063095ea7b31461016557806318160ddd1461018857806323b872dd1461019a578063313ce567146101ad575b600080fd5b61014f610371565b60405161015c9190611a89565b60405180910390f35b6101786101733660046119ae565b610403565b604051901515815260200161015c565b6002545b60405190815260200161015c565b6101786101a8366004611908565b61041b565b6040516012815260200161015c565b61018c61043f565b6101786101d23660046119ae565b61044e565b61018c6101e53660046119ae565b610470565b6102166101f83660046118ba565b6001600160a01b039081166000908152600760205260409020541690565b6040516001600160a01b03909116815260200161015c565b61024161023c3660046118ba565b6104ef565b005b6102566102513660046118ba565b6104fc565b60405163ffffffff909116815260200161015c565b61018c6102793660046118ba565b6001600160a01b031660009081526020819052604090205490565b61018c6102a23660046118ba565b610524565b61018c6102b5366004611a70565b610542565b61014f61059e565b61018c6102d03660046118ba565b6105ad565b6101786102e33660046119ae565b610634565b6101786102f63660046119ae565b6106af565b6102416103093660046119d8565b6106bd565b61024161031c366004611944565b6107f3565b61018c61032f3660046118d5565b610957565b610347610342366004611a30565b610982565b60408051825163ffffffff1681526020928301516001600160e01b0316928101929092520161015c565b60606003805461038090611b2f565b80601f01602080910402602001604051908101604052809291908181526020018280546103ac90611b2f565b80156103f95780601f106103ce576101008083540402835291602001916103f9565b820191906000526020600020905b8154815290600101906020018083116103dc57829003601f168201915b5050505050905090565b600033610411818585610ca2565b5060019392505050565b600033610429858285610dc6565b610434858585610e3a565b506001949350505050565b600061044961100e565b905090565b6000336104118185856104618383610957565b61046b9190611ade565b610ca2565b60004382106104c65760405162461bcd60e51b815260206004820152601f60248201527f4552433230566f7465733a20626c6f636b206e6f7420796574206d696e65640060448201526064015b60405180910390fd5b6001600160a01b03831660009081526008602052604090206104e89083611135565b9392505050565b6104f933826111f2565b50565b6001600160a01b03811660009081526008602052604081205461051e90610bfa565b92915050565b6001600160a01b03811660009081526005602052604081205461051e565b60004382106105935760405162461bcd60e51b815260206004820152601f60248201527f4552433230566f7465733a20626c6f636b206e6f7420796574206d696e65640060448201526064016104bd565b61051e600983611135565b60606004805461038090611b2f565b6001600160a01b0381166000908152600860205260408120548015610621576001600160a01b03831660009081526008602052604090206105ef600183611b18565b815481106105ff576105ff611b90565b60009182526020909120015464010000000090046001600160e01b0316610624565b60005b6001600160e01b03169392505050565b600033816106428286610957565b9050838110156106a25760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016104bd565b6104348286868403610ca2565b600033610411818585610e3a565b8342111561070d5760405162461bcd60e51b815260206004820152601d60248201527f4552433230566f7465733a207369676e6174757265206578706972656400000060448201526064016104bd565b604080517fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf60208201526001600160a01b0388169181019190915260608101869052608081018590526000906107879061077f9060a0016040516020818303038152906040528051906020012061126b565b8585856112b9565b9050610792816112e1565b86146107e05760405162461bcd60e51b815260206004820152601960248201527f4552433230566f7465733a20696e76616c6964206e6f6e63650000000000000060448201526064016104bd565b6107ea81886111f2565b50505050505050565b834211156108435760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e6500000060448201526064016104bd565b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886108728c6112e1565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006108cd8261126b565b905060006108dd828787876112b9565b9050896001600160a01b0316816001600160a01b0316146109405760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e6174757265000060448201526064016104bd565b61094b8a8a8a610ca2565b50505050505050505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60408051808201909152600080825260208201526001600160a01b0383166000908152600860205260409020805463ffffffff84169081106109c6576109c6611b90565b60009182526020918290206040805180820190915291015463ffffffff8116825264010000000090046001600160e01b0316918101919091529392505050565b610a108282610a96565b6002546001600160e01b031015610a825760405162461bcd60e51b815260206004820152603060248201527f4552433230566f7465733a20746f74616c20737570706c79207269736b73206f60448201526f766572666c6f77696e6720766f74657360801b60648201526084016104bd565b610a906009610b8183611309565b50505050565b6001600160a01b038216610aec5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104bd565b8060026000828254610afe9190611ade565b90915550506001600160a01b03821660009081526020819052604081208054839290610b2b908490611ade565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3610b7d60008383611482565b5050565b60006104e88284611ade565b60006001600160e01b03821115610bf65760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20326044820152663234206269747360c81b60648201526084016104bd565b5090565b600063ffffffff821115610bf65760405162461bcd60e51b815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201526532206269747360d01b60648201526084016104bd565b6001600160a01b03838116600090815260076020526040808220548584168352912054610c919291821691168361148d565b505050565b60006104e88284611b18565b6001600160a01b038316610d045760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104bd565b6001600160a01b038216610d655760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104bd565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610dd28484610957565b90506000198114610a905781811015610e2d5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016104bd565b610a908484848403610ca2565b6001600160a01b038316610e9e5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104bd565b6001600160a01b038216610f005760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104bd565b6001600160a01b03831660009081526020819052604090205481811015610f785760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104bd565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610faf908490611ade565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610ffb91815260200190565b60405180910390a3610a90848484611482565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561106757507f000000000000000000000000000000000000000000000000000000000000000046145b1561109157507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b8154600090815b8181101561119957600061115082846115ca565b90508486828154811061116557611165611b90565b60009182526020909120015463ffffffff16111561118557809250611193565b611190816001611ade565b91505b5061113c565b81156111dd57846111ab600184611b18565b815481106111bb576111bb611b90565b60009182526020909120015464010000000090046001600160e01b03166111e0565b60005b6001600160e01b031695945050505050565b6001600160a01b038281166000818152600760208181526040808420805485845282862054949093528787166001600160a01b03198416811790915590519190951694919391928592917f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f9190a4610a9082848361148d565b600061051e61127861100e565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60008060006112ca878787876115e5565b915091506112d7816116d2565b5095945050505050565b6001600160a01b03811660009081526005602052604090208054600181018255905b50919050565b8254600090819080156113545785611322600183611b18565b8154811061133257611332611b90565b60009182526020909120015464010000000090046001600160e01b0316611357565b60005b6001600160e01b0316925061137083858763ffffffff16565b91506000811180156113ae5750438661138a600184611b18565b8154811061139a5761139a611b90565b60009182526020909120015463ffffffff16145b1561140e576113bc82610b8d565b866113c8600184611b18565b815481106113d8576113d8611b90565b9060005260206000200160000160046101000a8154816001600160e01b0302191690836001600160e01b03160217905550611479565b85604051806040016040528061142343610bfa565b63ffffffff16815260200161143785610b8d565b6001600160e01b0390811690915282546001810184556000938452602093849020835194909301519091166401000000000263ffffffff909316929092179101555b50935093915050565b610c91838383610c5f565b816001600160a01b0316836001600160a01b0316141580156114af5750600081115b15610c91576001600160a01b0383161561153d576001600160a01b038316600090815260086020526040812081906114ea90610c9685611309565b91509150846001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a7248383604051611532929190918252602082015260400190565b60405180910390a250505b6001600160a01b03821615610c91576001600160a01b0382166000908152600860205260408120819061157390610b8185611309565b91509150836001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a72483836040516115bb929190918252602082015260400190565b60405180910390a25050505050565b60006115d96002848418611af6565b6104e890848416611ade565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561161c57506000905060036116c9565b8460ff16601b1415801561163457508460ff16601c14155b1561164557506000905060046116c9565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611699573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166116c2576000600192509250506116c9565b9150600090505b94509492505050565b60008160048111156116e6576116e6611b7a565b14156116ef5750565b600181600481111561170357611703611b7a565b14156117515760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016104bd565b600281600481111561176557611765611b7a565b14156117b35760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016104bd565b60038160048111156117c7576117c7611b7a565b14156118205760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016104bd565b600481600481111561183457611834611b7a565b14156104f95760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016104bd565b80356001600160a01b03811681146118a457600080fd5b919050565b803560ff811681146118a457600080fd5b6000602082840312156118cc57600080fd5b6104e88261188d565b600080604083850312156118e857600080fd5b6118f18361188d565b91506118ff6020840161188d565b90509250929050565b60008060006060848603121561191d57600080fd5b6119268461188d565b92506119346020850161188d565b9150604084013590509250925092565b600080600080600080600060e0888a03121561195f57600080fd5b6119688861188d565b96506119766020890161188d565b95506040880135945060608801359350611992608089016118a9565b925060a0880135915060c0880135905092959891949750929550565b600080604083850312156119c157600080fd5b6119ca8361188d565b946020939093013593505050565b60008060008060008060c087890312156119f157600080fd5b6119fa8761188d565b95506020870135945060408701359350611a16606088016118a9565b92506080870135915060a087013590509295509295509295565b60008060408385031215611a4357600080fd5b611a4c8361188d565b9150602083013563ffffffff81168114611a6557600080fd5b809150509250929050565b600060208284031215611a8257600080fd5b5035919050565b600060208083528351808285015260005b81811015611ab657858101830151858201604001528201611a9a565b81811115611ac8576000604083870101525b50601f01601f1916929092016040019392505050565b60008219821115611af157611af1611b64565b500190565b600082611b1357634e487b7160e01b600052601260045260246000fd5b500490565b600082821015611b2a57611b2a611b64565b500390565b600181811c90821680611b4357607f821691505b6020821081141561130357634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fdfea26469706673582212200cfda31638a33df91746f3a08881bad8b6b43a477050a78a45f80b900558085864736f6c63430008070033dec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724";

type GovernanceTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GovernanceTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GovernanceToken__factory extends ContractFactory {
  constructor(...args: GovernanceTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _totalSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GovernanceToken> {
    return super.deploy(
      _totalSupply,
      overrides || {}
    ) as Promise<GovernanceToken>;
  }
  override getDeployTransaction(
    _totalSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_totalSupply, overrides || {});
  }
  override attach(address: string): GovernanceToken {
    return super.attach(address) as GovernanceToken;
  }
  override connect(signer: Signer): GovernanceToken__factory {
    return super.connect(signer) as GovernanceToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GovernanceTokenInterface {
    return new utils.Interface(_abi) as GovernanceTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GovernanceToken {
    return new Contract(address, _abi, signerOrProvider) as GovernanceToken;
  }
}
