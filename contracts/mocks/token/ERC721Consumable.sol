//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "../../interfaces/IERC721Consumable.sol";

contract ERC721Consumable is IERC721Consumable, ERC721 {
    // Mintable
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from token ID to consumer address
    mapping(uint256 => address) _tokenConsumers;

    constructor() ERC721("ReferenceImpl", "RIMPL") {}

    // @notice Mints new NFT to msg.sender
    function mint() external returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        return newItemId;
    }

    /**
     * @dev See {IERC721Consumable-consumerOf}
     */
    function consumerOf(uint256 _tokenId) external view returns (address) {
        require(
            _exists(_tokenId),
            "ERC721Consumable: consumer query for nonexistent token"
        );
        return _tokenConsumers[_tokenId];
    }

    /**
     * @dev See {IERC721Consumable-changeConsumer}
     */
    function changeConsumer(address _consumer, uint256 _tokenId) external {
        address owner = this.ownerOf(_tokenId);
        require(
            msg.sender == owner ||
                msg.sender == getApproved(_tokenId) ||
                isApprovedForAll(owner, msg.sender),
            "ERC721Consumable: changeConsumer caller is not owner nor approved"
        );
        _changeConsumer(owner, _consumer, _tokenId);
    }

    /**
     * @dev Changes the consumer
     * Requirement: `tokenId` must exist
     */
    function _changeConsumer(
        address _owner,
        address _consumer,
        uint256 _tokenId
    ) internal {
        _tokenConsumers[_tokenId] = _consumer;
        emit ConsumerChanged(_owner, _consumer, _tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721)
        returns (bool)
    {
        return
            interfaceId == type(IERC721Consumable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId, /* firstTokenId */
        uint256 batchSize
    ) internal virtual override(ERC721) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        _changeConsumer(from, address(0), tokenId);
    }
}
