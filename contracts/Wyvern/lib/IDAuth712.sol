// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

contract IDAuth712 {
    struct EIP712Domain {
        string name;
        string version;
        uint256 chainId;
        address verifyingContract;
    }

    bytes32 constant EIP712DOMAIN_TYPEHASH =
        keccak256(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        );

    bytes constant personalSignPrefix = "\x19Ethereum Signed Message:\n";

    bytes32 constant TYPEHASH =
        keccak256("Identity(address user,uint256 nonce,string tip)");

    struct Identity {
        address user;
        uint256 nonce;
        string tip;
    }

    bytes32 DOMAIN_SEPARATOR;

    function hashDomain(EIP712Domain memory eip712Domain)
        internal
        pure
        returns (bytes32)
    {
        return
            keccak256(
                abi.encode(
                    EIP712DOMAIN_TYPEHASH,
                    keccak256(bytes(eip712Domain.name)),
                    keccak256(bytes(eip712Domain.version)),
                    eip712Domain.chainId,
                    eip712Domain.verifyingContract
                )
            );
    }

    function hashIdentity(Identity memory identity)
        internal
        pure
        returns (bytes32 hash)
    {
        /* Per EIP 712. */
        return keccak256(abi.encode(TYPEHASH, identity.user, identity.nonce, keccak256(bytes(identity.tip))));
    }

    function hashToSign(bytes32 hashValue)
        internal
        view
        returns (bytes32 hash)
    {
        /* Calculate the string a user must sign. */
        return
            keccak256(
                abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, hashValue)
            );
    }
}
