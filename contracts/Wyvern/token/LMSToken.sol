// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;
pragma abicoder v2;

import "../lib/ReentrancyGuarded.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../auth/Destructible.sol";
import "../auth/Employable.sol";

/**
 * @author Libra Developer
 * @title Legends of Mountains and Seas 01
 * @dev see https://eips.ethereum.org/EIPS/eip-721
 */
contract LMSToken is
    ERC721("Legends of Mountains and Seas v1", "LMS"),
    ReentrancyGuarded,
    Destructible,
    Employable
{
    constructor() {
        setBaseURI("https://sevenseas.mypinata.cloud/ipfs/");
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
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public onlyEmployerOrOwner {
        _safeMint(to, tokenId, _data);
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
        reentrancyGuard
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
    ) public reentrancyGuard onlyEmployerOrOwner {
        require(
            accounts.length == ids.length && ids.length == uris.length,
            "ERC721: accounts, ids and uris length mismatch"
        );

        for (uint256 i = 0; i < accounts.length; ++i) {
            mintWithURI(accounts[i], ids[i], uris[i]);
        }
    }

    /**
     * @dev Burn a token
     * @param tokenId the burn of token
     */
    function burn(uint256 tokenId) public {
        require(
            isApproveFor(_msgSender()) ||
                owner() == _msgSender() ||
                ownerOf(tokenId) == _msgSender(),
            "ERC721: burn caller is not owner nor member of contract"
        );
        _burn(tokenId);
    }
}
