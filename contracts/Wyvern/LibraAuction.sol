// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./auction/ERC721Auction.sol";
import "./auction/ERC20Auction.sol";
import "./auth/Destructible.sol";
import "./auth/Employable.sol";

/**
 * @title 7seas Auction
 * @author 7seas Developers
 */
contract LibraAuction is ERC721Auction, ERC20Auction, Destructible, Employable {
    string public name = "7seas ERC721 Auction v1";

    constructor(address[] memory registryAddrs) {
        for (uint256 ind = 0; ind < registryAddrs.length; ind++) {
            registries[registryAddrs[ind]] = true;
        }
    }

    function start(
        address owner,
        address registry,
        address tokenAddr,
        address coinAddr,
        uint256 tokenId,
        uint256 price,
        uint256 startTime,
        uint256 endTime,
        uint256 minStep,
        uint256 maxStep
    ) public onlyEmployerOrOwner returns (uint256) {
        return
            _startWithTransferNFT(
                owner,
                registry,
                tokenAddr,
                coinAddr,
                tokenId,
                price,
                startTime,
                endTime,
                minStep,
                maxStep
            );
    }

    function bid(
        uint256 auctionId,
        address bidder,
        address reigstry,
        uint256 amount
    ) public onlyEmployerOrOwner {
        return
            _bidWithERC20(
                auctionId,
                bidder,
                reigstry,
                getCoin(auctionId),
                amount
            );
    }

    function abort(uint256 _auctionId) public {
        return _abort(_auctionId);
    }

    function interrupt(uint256 _auctionId, bool _i) public onlyEmployerOrOwner {
        _interrupt(_auctionId, _i);
    }

    function cancel(uint256 _auctionId) public onlyEmployerOrOwner {
        _cancelWithRevertNFT(_auctionId);
    }

    function withDraw(address account, uint256 auctionId)
        public
        onlyEmployerOrOwner
    {
        _withDraw(account, getCoin(auctionId), auctionId);
    }

    function rebate(
        uint256 auctionId,
        address marketer,
        address to,
        uint256 amount
    ) public onlyEmployerOrOwner {
        _rebate(auctionId, marketer, getCoin(auctionId), to, amount);
    }
}
