// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./lib/ArrayUtils.sol";
import "./registry/AuthenticatedProxy.sol";
import "./static/StaticAuction.sol";
import "./static/FixPriceStatic.sol";

/**
 * @title StaticMarket
 * @author 7seas Developers
 */
contract StaticMarket is StaticAuction, FixPriceStatic {
    
    string public constant name = "Static Market v1";

    constructor() {}
}
