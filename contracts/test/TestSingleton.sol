// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

contract TestSingleton {
    address _singleton;
    address public creator;
    bool public isInitialized;

    constructor() payable {
        creator = msg.sender;
    }

    function init() public {
        require(!isInitialized, "Is initialized");
        creator = msg.sender;
        isInitialized = true;
    }

    function masterCopy() public pure returns (address) {
        return address(0);
    }

    function forward(
        address to,
        bytes memory data
    ) public returns (bytes memory result) {
        (, result) = to.call(data);
    }
}
