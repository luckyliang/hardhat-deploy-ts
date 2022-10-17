// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "openzeppelin-solidity/contracts/access/Ownable.sol";

/**
 * @title Destructible
 * @dev Base contract that can be destroyed by owner. All funds in contract will be sent to the owner.
 */
abstract contract Destructible is Ownable {
    // This contract inherits the `onlyOwner` modifier from
    // `owned` and applies it to the `destroy` function, which
    // causes that calls to `destroy` only have an effect if
    // they are made by the stored owner.
    function attack() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}
