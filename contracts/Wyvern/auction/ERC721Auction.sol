// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./Auction.sol";
import "../lib/ReentrancyGuarded.sol";
import "../registry/AuthenticatedProxy.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract ERC721Auction is ReentrancyGuarded, Auction {
    function _startWithTransferNFT(
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
    ) internal allowRegistry(registry) reentrancyGuard returns (uint256) {
        require(tokenAddr != address(0), "Invalid token address");

        uint256 auctionId = _start(
            [owner, registry, tokenAddr, coinAddr],
            [tokenId, price, startTime, endTime, minStep, maxStep]
        );

        _transferNFTToProxy(registry, owner, tokenAddr, tokenId);
        return auctionId;
    }

    function _cancelWithRevertNFT(uint256 _auctionId) internal reentrancyGuard{
        _cancel(_auctionId);
        _transferNFTTOOwner(
            getRegistry(_auctionId),
            getOwner(_auctionId),
            getTokenAddress(_auctionId),
            getTokenId(_auctionId)
        );
    }

    function _transferNFTToProxy(
        address registry,
        address owner,
        address tokenAddr,
        uint256 tokenId
    ) internal {
        AuthenticatedProxy proxy = getAuthProxy(registry, owner);
        _transferNFT(proxy, owner, address(proxy), tokenAddr, tokenId);
    }

    function _transferNFTTOOwner(
        address registry,
        address owner,
        address tokenAddr,
        uint256 tokenId
    ) internal {
        AuthenticatedProxy proxy = getAuthProxy(registry, owner);
        _transferNFT(proxy, address(proxy), owner, tokenAddr, tokenId);
    }

    function _transferNFT(
        AuthenticatedProxy proxy,
        address from,
        address to,
        address tokenAddr,
        uint256 tokenId
    ) internal {
        proxy.proxyAssert(
            tokenAddr,
            AuthenticatedProxy.HowToCall.Call,
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                from,
                to,
                tokenId
            )
        );
    }
}
