
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";


contract TestERC20Token is ERC20,  ERC20Permit, Ownable {
    
    constructor() ERC20("TEST TOKEN", "TTK") ERC20Permit("TEST TOKEN") {
        _mint(_msgSender(), 100000000 * 10 ** decimals());
    }

    
    
}