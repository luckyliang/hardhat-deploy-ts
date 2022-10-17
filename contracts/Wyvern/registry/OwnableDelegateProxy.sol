// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./proxy/OwnedUpgradeabilityProxy.sol";

/**
 * @title OwnableDelegateProxy
 * @author 7seas Developers
 */
contract OwnableDelegateProxy is OwnedUpgradeabilityProxy {
    constructor(
        address owner,
        address initialImplementation,
        bytes memory data
    ) {
        setUpgradeabilityOwner(owner);
        _upgradeTo(initialImplementation);
        (bool success, ) = initialImplementation.delegatecall(data);
        require(success, "OwnableDelegateProxy failed implementation");
    }
}
