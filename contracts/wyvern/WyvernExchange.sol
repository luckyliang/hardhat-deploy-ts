// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./exchange/Exchange.sol";
import "./auth/Destructible.sol";

/**
 * @title Wyvern Exchange
 * @author 7seas Developers
 */
contract WyvernExchange is Exchange, Destructible {
    string public constant name = "Wyvern Exchange";

    string public constant version = "1.0.0";

    constructor(
        uint256 chainId,
        address[] memory registryAddrs,
        bytes memory customPersonalSignPrefix
    ) {
        DOMAIN_SEPARATOR = hash(
            EIP712Domain({
                name: name,
                version: version,
                chainId: chainId,
                verifyingContract: address(this)
            })
        );
        for (uint256 ind = 0; ind < registryAddrs.length; ind++) {
            registries[registryAddrs[ind]] = true;
        }
        if (customPersonalSignPrefix.length > 0) {
            personalSignPrefix = customPersonalSignPrefix;
        }
    }

    function approveFor(address registry, bool approved) public onlyOwner {
        require(registries[registry] != approved);
        registries[registry] = approved;
    }
}
