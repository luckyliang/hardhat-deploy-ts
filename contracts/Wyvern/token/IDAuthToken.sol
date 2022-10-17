// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;
pragma abicoder v2;

import "../lib/IDAuth712.sol";
import "../auth/Destructible.sol";
import "../auth/Employable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

/**
 * @author Sevenseas Developer
 * @title NFT Auth v2.0
 * @dev see https://eips.ethereum.org/EIPS/eip-721
 */
contract IDAuthToken is
    ERC721("NFT Auth", "NFTA"),
    IDAuth712,
    Destructible,
    Employable
{
    constructor(uint256 chainId, string memory version) {
        DOMAIN_SEPARATOR = hashDomain(
            EIP712Domain({
                name: name(),
                version: version,
                chainId: chainId,
                verifyingContract: address(this)
            })
        );
    }

    /**
     * @dev Set base uri for all tokens
     * @param uri The base uri
     */
    function setBaseURI(string memory uri) public onlyEmployerOrOwner {
        _setBaseURI(uri);
    }

    /**
     * @dev Mints some amount of tokens to an address
     * @param to Address of the future owner of the token
     * @param id Token ID to mint
     */
    function mint(address to, uint256 id) public onlyEmployerOrOwner {
        _mint(to, id);
    }

    /**
     * @dev Mints some amount of tokens to an address with IPFS URI
     * @param to Address of the future owner of the token
     * @param id Token ID to mint
     * @param tokenURI IPFS URI
     */
    function mintWithURI(
        address to,
        uint256 id,
        string memory tokenURI
    ) public onlyEmployerOrOwner {
        _mint(to, id);
        _setTokenURI(id, tokenURI);
    }

    /**
     * @dev Mint tokens for each id in ids
     * @param accounts Array of address to mint tokens to
     * @param ids Array of ids to mint
     */
    function batchMint(address[] memory accounts, uint256[] memory ids)
        public
        onlyEmployerOrOwner
    {
        require(
            accounts.length == ids.length,
            "ERC721: accounts and ids length mismatch"
        );

        for (uint256 i = 0; i < accounts.length; ++i) {
            mint(accounts[i], ids[i]);
        }
    }

    /**
     * @dev Mint tokens for each id in ids with IPFS URI
     * @param accounts Array of address to mint tokens to
     * @param ids Array of ids to mint
     */
    function batchMintWithURI(
        address[] memory accounts,
        uint256[] memory ids,
        string[] memory uris
    ) public onlyEmployerOrOwner {
        require(
            accounts.length == ids.length,
            "ERC721: accounts and ids length mismatch"
        );
        require(
            ids.length == uris.length,
            "ERC721: uris and ids length mismatch"
        );

        for (uint256 i = 0; i < accounts.length; ++i) {
            mintWithURI(accounts[i], ids[i], uris[i]);
        }
    }

    /**
     * @dev Burn a token
     * @param tokenId the burn of token
     */
    function burn(uint256 tokenId) public onlyEmployerOrOwner {
        _burn(tokenId);
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override onlyEmployerOrOwner {
        //solhint-disable-next-line max-line-length
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override onlyEmployerOrOwner {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override onlyEmployerOrOwner {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Verification for a identity with signature
     * @param identity Identity info
     * @param tokenId the verification tokenId, matched owner of #identity.user
     * @param signature the verification of signature
     * @return bool if sign with self and has balanceOf in the NFT return true, otherwise false
     */
    function verify(
        Identity memory identity,
        uint256 tokenId,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 hash = hashIdentity(identity);
        bytes32 calculatedHashToSign = hashToSign(hash);
        (uint8 v, bytes32 r, bytes32 s) = abi.decode(
            signature,
            (uint8, bytes32, bytes32)
        );

        address signUser = ecrecover(calculatedHashToSign, v, r, s);
        require(signUser == identity.user, "EIP712: illegal signature.");
        require(
            block.timestamp >= identity.nonce &&
                block.timestamp < (identity.nonce + 60),
            "EIP712: expired nonce."
        );
        return identity.user == ownerOf(tokenId);
    }
}
