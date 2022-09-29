// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract Exchange is EIP712 {

    bool public success;

    bytes4 internal constant EIP_1271_MAGICVALUE = 0x1626ba7e;

    // solhint-disable-next-line var-name-mixedcase
    bytes32 private constant _PERMIT_TYPEHASH =
        keccak256("order(address owner,uint256 tokenId)");
    
    constructor() EIP712("exchange", "1") {

    }

    function structHash(address owner, uint256 tokenId) public pure returns(bytes32) {
        return keccak256(abi.encode(_PERMIT_TYPEHASH, owner, tokenId));
    }

    function sigHash(address owner, uint256 tokenId) public view returns(bytes32) {
        return _hashTypedDataV4((structHash(owner, tokenId)));
    }

    function DOMAIN_SEPARATOR() external view returns (bytes32) {
        return _domainSeparatorV4();
    }
    
    function exchange(address maker, bytes32 hash, bytes memory signature) public {
        require(validateContractAuthorization(maker, hash, signature), "signature invalidate");
        success = true;
        
    }

    //验证签名转代币
    function validateContractAuthorization(
        address maker,
        bytes32 hash,
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