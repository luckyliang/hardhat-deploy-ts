// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;
pragma abicoder v2;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "../lib/ArrayUtils.sol";
import "../registry/AuthenticatedProxy.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title 7seas Auction
 * @author Libra Developer
 * @dev Everyone can send their bids during a bidding period.
 */
contract Auction is Ownable {
    using SafeMath for uint256;

    /* Latest Auction ID */
    uint256 _latestAuctionId;

    uint256 private constant D = 10000;
    /* Contracts allowed to call those operation. */
    mapping(address => bool) registries;
    /* Auction ID => Auction */
    mapping(uint256 => AuctionData) auctions;

    /* Token ID => Auction ID */
    mapping(address => mapping(uint256 => uint256)) activeTokens;
    /* Active acutions */
    mapping(uint256 => bool) activeAuctions;
    /* Canceled acutions */
    mapping(uint256 => bool) canceledAuctions;

    modifier allowRegistry(address registry) {
        require(registries[registry], "The registry not allowed");
        _;
    }

    modifier activeAuction(uint256 AuctionId) {
        require(activeAuctions[AuctionId], "Inactive Auction ID");
        _;
    }

    modifier InactiveTokenId(address tokenAddr, uint256 tokenId) {
        require(
            !activeAuctions[activeTokens[tokenAddr][tokenId]],
            "Actived token ID"
        );
        _;
    }

    struct AuctionData {
        address owner;
        address tokenAddr;
        uint256 tokenId;
        uint256 price;
        uint256 startTime;
        uint256 endTime;
        // percent of highestBid to min step
        uint256 minStep;
        // percent of highestBid to max step
        uint256 maxStep;
        address registry;
        // Current state of Auction.
        address highestBidder;
        uint256 highestBid;
        address coin;
    }

    event AuctionStarted(
        address owner,
        address tokenAddr,
        uint256 tokenId,
        uint256 price,
        uint256 startTime,
        uint256 endTime,
        uint256 minStep,
        uint256 maxStep,
        address registry,
        address coin,
        uint256 indexed auctionId
    );
    event HighestBid(
        address bidder,
        uint256 bid,
        uint256 tokenId,
        uint256 indexed auctionId
    );
    event AuctionEnded(
        address winner,
        uint256 bid,
        uint256 indexed AuctionId,
        uint256 tokenId
    );
    event AuctionInterrupted(
        uint256 indexed AuctionId,
        uint256 tokenId,
        bool interrupt
    );
    event AuctionCanceled(uint256 indexed AuctionId, uint256 tokenId);

    function getProxyAddress(address registry, address maker)
        internal
        returns (address)
    {
        return address(getProxy(registry, maker));
    }

    function getAuthProxy(address registry, address maker)
        internal
        returns (AuthenticatedProxy)
    {
        OwnableDelegateProxy proxy = getProxy(registry, maker);
        return AuthenticatedProxy(address(proxy));
    }

    function getProxy(address registry, address maker)
        internal
        returns (OwnableDelegateProxy)
    {
        /* Assert valid registry. */
        require(registries[registry]);

        ProxyRegistryInterface r = ProxyRegistryInterface(registry);
        /* Retrieve delegate proxy contract. */
        OwnableDelegateProxy delegateProxy = r.proxies(maker);

        /* Assert existence. */
        require(
            delegateProxy != OwnableDelegateProxy(0),
            "Delegate proxy does not exist for maker"
        );

        /* Assert implementation. */
        require(
            delegateProxy.implementation() == r.delegateProxyImplementation(),
            "Incorrect delegate proxy implementation for maker"
        );

        return delegateProxy;
    }

    function getHighester(uint256 _auctionId)
        public
        view
        returns (address, uint256)
    {
        AuctionData memory _a = auctions[_auctionId];
        return (_a.highestBidder, _a.highestBid);
    }

    function getHighesterAccount(uint256 _auctionId)
        public
        view
        returns (address)
    {
        AuctionData memory _a = auctions[_auctionId];
        return _a.highestBidder;
    }

    function getCoin(uint256 _auctionId) public view returns (address) {
        AuctionData memory _a = auctions[_auctionId];
        return _a.coin;
    }

    function getFloorPrice(uint256 _auctionId) public view returns (uint256) {
        AuctionData memory _a = auctions[_auctionId];
        return _a.price;
    }

    function getOwner(uint256 _auctionId) public view returns (address) {
        AuctionData memory _a = auctions[_auctionId];
        return _a.owner;
    }

    function getTokenId(uint256 _auctionId) public view returns (uint256) {
        AuctionData memory _a = auctions[_auctionId];
        return _a.tokenId;
    }

    function isEnded(uint256 _auctionId) public view returns (bool) {
        return !activeAuctions[_auctionId];
    }

    function isCanceled(uint256 _auctionId) public view returns (bool) {
        return canceledAuctions[_auctionId];
    }

    function activeAuctionByTokenId(address tokenAddr, uint256 tokenId)
        public
        view
        returns (uint256)
    {
        return activeTokens[tokenAddr][tokenId];
    }

    function latestAuctionId() public view returns (uint256) {
        return _latestAuctionId;
    }

    function getRegistry(uint256 _auctionId) public view returns (address) {
        AuctionData memory _a = auctions[_auctionId];
        return _a.registry;
    }

    function getTokenAddress(uint256 _auctionId)
        internal
        view
        returns (address)
    {
        AuctionData memory _a = auctions[_auctionId];
        return _a.tokenAddr;
    }

    /**
     * @dev Start an auction
     * @param addrs: owner, registry, token contract, erc20 address
     * @param uints: tokenId, price, startTime, endTime, minStep, maxStep
     */
    function _start(address[4] memory addrs, uint256[6] memory uints)
        internal
        virtual
        InactiveTokenId(addrs[2], uints[0])
        returns (uint256)
    {
        require(addrs[0] != address(0), "Invalid owner");
        require(uints[1] > 0, "Invalid price");
        require(uints[2] > 0, "Invalid startTime");
        require(uints[3] > uints[2], "Invalid endTime");
        require(uints[4] > 0, "Invalid min step");
        require(uints[5] > uints[4], "Invalid max step");

        // Increase Auction ID
        _latestAuctionId = SafeMath.add(_latestAuctionId, 1);
        // Save Auction to Auctions
        auctions[_latestAuctionId] = AuctionData(
            addrs[0],
            addrs[2],
            uints[0],
            uints[1],
            uints[2],
            uints[3],
            uints[4],
            uints[5],
            addrs[1],
            address(0),
            0,
            addrs[3]
        );
        // Replace AuctionId of token ID to latestAuctionId in active tokens
        activeTokens[addrs[2]][uints[0]] = _latestAuctionId;
        // Enable Auction
        activeAuctions[_latestAuctionId] = true;
        // Setting status to canceled list
        canceledAuctions[_latestAuctionId] = false;

        emit AuctionStarted(
            addrs[0],
            addrs[2],
            uints[0],
            uints[1],
            uints[2],
            uints[3],
            uints[4],
            uints[5],
            addrs[1],
            addrs[3],
            _latestAuctionId
        );
        return _latestAuctionId;
    }

    /**
     * @dev Bid for Auction
     * @param _auctionId: Auction ID
     * @param bidder: Bid from ?
     * @param amount: Amount of bid
     */
    function _bid(
        uint256 _auctionId,
        address bidder,
        uint256 amount
    ) internal virtual activeAuction(_auctionId) {
        AuctionData storage _a = auctions[_auctionId];
        require(_a.startTime <= block.timestamp, "The Auction not started");
        require(_a.endTime >= block.timestamp, "The Auction is ended");
        require(_a.owner != bidder, "Not allow owner join the Auction");
        require(
            _a.highestBidder == address(0) || _a.highestBidder != bidder,
            "Repeat to bidding"
        );

        if (_a.highestBid == 0) {
            _a.highestBid = _a.price;
        }

        require(
            _a.highestBid + (_a.highestBid * _a.minStep) / D <= amount &&
                amount <= _a.highestBid + ((_a.highestBid * _a.maxStep) / D),
            "Out range of increase step"
        );

        // Update last bid
        _a.highestBid = amount;
        _a.highestBidder = bidder;

        emit HighestBid(bidder, amount, _a.tokenId, _auctionId);
    }

    /**
     * @dev Abort an auction (only owner of the auction or proxy of the owner)
     * @param _auctionId: Auction ID
     */
    function _abort(uint256 _auctionId) internal virtual {
        if (!activeAuctions[_auctionId]) return;
        AuctionData memory _a = auctions[_auctionId];
        require(_a.endTime <= block.timestamp, "Not time to the end");

        activeAuctions[_auctionId] = false;
        delete activeTokens[_a.tokenAddr][_a.tokenId];

        emit AuctionEnded(
            _a.highestBidder,
            _a.highestBid,
            _auctionId,
            _a.tokenId
        );
    }

    /**
     * @dev Interrupt or uninterrupt an auction
     * @param _auctionId: Auction ID
     * @param interrupt: interrupt status. interrupted if true, otherwise false.
     */
    function _interrupt(uint256 _auctionId, bool interrupt)
        internal
        activeAuction(_auctionId)
    {
        require(activeAuctions[_auctionId] != !interrupt, "Repeat setting");
        activeAuctions[_auctionId] = !interrupt;

        AuctionData memory _a = auctions[_auctionId];
        emit AuctionInterrupted(_auctionId, _a.tokenId, interrupt);
    }

    /**
     * @dev Cacnecl an auction
     * @param _auctionId: Auction ID
     */
    function _cancel(uint256 _auctionId) internal activeAuction(_auctionId) {
        require(!canceledAuctions[_auctionId], "Repeat to cancel");
        AuctionData memory _a = auctions[_auctionId];

        activeAuctions[_auctionId] = false;
        canceledAuctions[_auctionId] = true;
        delete activeTokens[_a.tokenAddr][_a.tokenId];

        emit AuctionCanceled(_auctionId, _a.tokenId);
    }
}
