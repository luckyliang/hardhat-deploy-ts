// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./static/StaticERC20.sol";
import "./static/StaticERC721.sol";
import "./static/StaticERC1155.sol";
import "./static/StaticUtil.sol";
import "./auth/Destructible.sol";
import "./auth/Employable.sol";

/**
 * @title LibraStatic
 * @author 7seas Developers
 */
contract LibraStatic is
    StaticERC20,
    StaticERC721,
    StaticERC1155,
    StaticUtil
{
    string public constant name = "Libra Static v1";

    constructor(address atomicizerAddress) {
        atomicizer = atomicizerAddress;
    }
}
