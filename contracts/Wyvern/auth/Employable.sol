// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Employable is Ownable {
    mapping(address => bool) public members;

    function approveFor(address operator, bool approved) public onlyOwner {
        require(members[operator] != approved);
        members[operator] = approved;
    }

    function isApproveFor(address operator) public view returns (bool) {
        return members[operator];
    }

    modifier onlyEmployerOrOwner() {
        require(
            members[_msgSender()] || owner() == _msgSender(),
            "Employable: Not accessible"
        );
        _;
    }
}
