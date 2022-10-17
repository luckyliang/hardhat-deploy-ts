// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20("test", "TST") {
  
    constructor() {}

    function mint(address to, uint256 value) public returns (bool) {
        _mint(to, value);
        return true;
    }
}
