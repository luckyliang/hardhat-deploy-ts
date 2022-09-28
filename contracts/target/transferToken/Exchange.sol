// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract Exchange is EIP712 {

    bool public validate;

    bytes4 internal constant EIP_1271_MAGICVALUE = 0x1626ba7e;

    // solhint-disable-next-line var-name-mixedcase
    bytes32 private constant _PERMIT_TYPEHASH =
        keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");



    constructor() EIP712("exchange", "1") {

    }

    //验证签名转代币
    


    function validateContractAuthorization(
        bytes32 hash,
        address maker,
        bytes memory signature

    ) public view returns (bool) {
        if (isContract(maker) && IERC1271(maker).isValidSignature(hash, signature) == EIP_1271_MAGICVALUE) {
            return true;
        }
        return false;
    }

    function isContract(address what) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(what)
        }
        return size > 0;
    }
        
    
}