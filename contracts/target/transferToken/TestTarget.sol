// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";

import "./Exchange.sol";

contract TestTarget is Ownable, IERC1271 {
    bool public isValidate;
    address public exchange;

    constructor(address _exchange) {
        exchange = _exchange;
    }

    function callExchange(bytes32 hash, bytes calldata signature)
        external
        view
        returns (bool)
    {
        return
            Exchange(exchange).validateContractAuthorization(
                hash,
                address(this),
                signature
            );
    }

    // 实际上还是外部账户进行签名， 然后验证签名者是否是某个特定的账户，验证合约会调用该合约进行验证
    function isValidSignature(bytes32 hash, bytes memory signature)
        external
        view
        override
        returns (bytes4 magicValue)
    {
         // Validate signatures
        if (ECDSA.recover(hash, signature) == owner()) {
            return 0x1626ba7e;
        } else {
            return 0xffffffff;
        }
    }

    
}