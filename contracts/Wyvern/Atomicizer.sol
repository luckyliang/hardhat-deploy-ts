// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

/**
 * @title Atomicizer
 * @author 7seas Developers
 */
library Atomicizer {
    function atomicize(
        address[] calldata addrs,
        uint256[] calldata values,
        uint256[] calldata calldataLengths,
        bytes calldata calldatas
    ) external {
        require(
            addrs.length == values.length &&
                addrs.length == calldataLengths.length,
            "Addresses, calldata lengths, and values must match in quantity"
        );

        uint256 j = 0;
        for (uint256 i = 0; i < addrs.length; i++) {
            bytes memory cd = new bytes(calldataLengths[i]);
            for (uint256 k = 0; k < calldataLengths[i]; k++) {
                cd[k] = calldatas[j];
                j++;
            }
            (bool success, bytes memory result) = addrs[i].call{
                value: values[i]
            }(cd);

            if (!success) {
                assembly {
                    revert(add(result, 32), mload(result))
                }
            }
            require(success, string(result));
        }
    }
}
