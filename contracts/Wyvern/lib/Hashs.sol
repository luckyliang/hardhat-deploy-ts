// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./ArrayUtils.sol";

library Hashs {
    function toBytes(uint256 x) internal pure returns (bytes memory b) {
        uint256 value = x;
        bytes memory rs = new bytes(32);
        for (uint256 index = 0; index < rs.length; index++) {
            uint8 bt = uint8(value & 0xFF);
            rs[index] = bytes1(bt);
            value = (value - bt) / 256;
        }

        return rs;
    }

    function uintHashV0(uint256 value)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (value == 0) return "0";

        bytes memory ALPHABET = bytes(
            "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
        );
        // 58
        uint8 BASE = uint8(ALPHABET.length);
        uint128 iFACTOR = 1365658237309761;

        bytes memory head = new bytes(2);
        head[0] = 0x12;
        head[1] = 0x20;

        bytes memory source = ArrayUtils.mergeBytes(head, toBytes(value));

        uint256 length = 0;
        uint256 pbegin = 0;
        // 96
        uint256 pend = source.length;
        // Allocate enough space in big-endian base58 representation.
        uint256 size = ((pend - pbegin) * iFACTOR) / 1000000000000000 + 1;

        bytes memory b58 = new bytes(size);
        // Process the bytes.
        while (pbegin != pend) {
            uint256 carry = uint8(source[pbegin]);
            // Apply "b58 = b58 * 256 + ch".
            uint256 i = 0;
            for (uint256 it1 = size - 1; (carry != 0 || i < length); it1--) {
                carry += (256 * uint8(b58[it1]));
                b58[it1] = bytes1(uint8(carry % BASE));
                carry /= BASE;

                i++;
            }
            require(carry == 0, "Non-zero carry");
            length = i;
            pbegin++;
        }

        // Skip leading zeroes in base58 result.
        uint256 it2 = size - length;
        // Translate the result into a string.
        pbegin = 0;
        bytes memory str = new bytes(46);
        for (; it2 < size; ++it2) {
            str[pbegin] = ALPHABET[uint8(b58[it2])];
            pbegin++;
        }
        return string(str);
    }
}
