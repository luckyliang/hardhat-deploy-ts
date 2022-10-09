// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./registry/ProxyRegistry.sol";
import "./registry/AuthenticatedProxy.sol";
import "./auth/Destructible.sol";

/**
 * @title Proxy Registry
* @author 7seas Developers
 */
contract WyvernRegistry is ProxyRegistry, Destructible {
    string public constant name = "Wyvern Registry";

    /* Whether the initial auth address has been set. */
    bool public initialAddressSet = false;
    uint8 public allowanceAddress = 3;

    constructor(uint8 _allowanceAddress) {
        AuthenticatedProxy impl = new AuthenticatedProxy();
        impl.initialize(address(this), this);
        impl.setRevoke(true);
        delegateProxyImplementation = address(impl);
        allowanceAddress = _allowanceAddress;
    }

    /**
     * Grant authentication to the initial Wyvern Exchange protocol contract
     *
     * @dev No delay, can only be called once - after that the standard registry process with a delay must be used
     * @param authAddress Address of the contract to grant authentication
     */
    function grantInitialAuthentication(address authAddress) public onlyOwner {
        require(
            !initialAddressSet,
            "Wyvern Protocol Proxy Registry initial address already set"
        );
        allowanceAddress -= 1;
        if (allowanceAddress == 0) {
            initialAddressSet = true;
        }
        contracts[authAddress] = true;
    }
}
