// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./Auction.sol";
import "../lib/ReentrancyGuarded.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";

contract ERC20Auction is ReentrancyGuarded, Auction {
    event WithDraw(
        uint256 indexed auctionId,
        uint256 amount,
        address to,
        address coin
    );
    event Rebate(
        uint256 indexed auctionId,
        uint256 amount,
        address from,
        address to,
        address coin
    );

    /* Refund list, Auction ID => bidder => bid */
    mapping(uint256 => mapping(address => uint256)) refunds;
    mapping(uint256 => mapping(address => uint256)) rebates;

    function getRefundAmount(uint256 _auctionId, address account)
        public
        view
        returns (uint256)
    {
        return refunds[_auctionId][account];
    }

    function _rebate(
        uint256 auctionId,
        address marketer,
        address tokenAddress,
        address to,
        uint256 amount
    ) internal {
        require(!isCanceled(auctionId), "Auction was canceled");
        require(isEnded(auctionId), "Auction not ended");
        require(rebates[auctionId][to] == 0, "Rebated amount");

        ERC20 erc20c = ERC20(tokenAddress);
        erc20c.transferFrom(marketer, to, amount);
        rebates[auctionId][to] = amount;

        emit Rebate(auctionId, amount, marketer, to, tokenAddress);
    }

    function _withDraw(
        address account,
        address tokenAddress,
        uint256 auctionId
    ) internal {
        require(isEnded(auctionId), "Auction not ended");
        require(refunds[auctionId][account] > 0, "Refund amount is zero");

        if (!isCanceled(auctionId)) {
            address bidder = getHighesterAccount(auctionId);
            require(account != bidder, "The winner not with draw");
        }

        address registry = getRegistry(auctionId);
        uint256 amount = refunds[auctionId][account];
        _transferCoinToOwner(
            registry,
            account,
            tokenAddress,
            amount,
            auctionId
        );

        emit WithDraw(auctionId, amount, account, tokenAddress);
    }

    function _bidWithERC20(
        uint256 auctionId,
        address bidder,
        address registry,
        address tokenAddr,
        uint256 amount
    ) internal reentrancyGuard {
        require(tokenAddr != address(0), "Invalid token address");
        _bid(auctionId, bidder, amount);
        _transferCoinToProxy(registry, bidder, tokenAddr, amount, auctionId);
    }

    function _transferCoinToProxy(
        address registry,
        address owner,
        address tokenAddr,
        uint256 amount,
        uint256 auctionId
    ) internal {
        AuthenticatedProxy proxy = getAuthProxy(registry, owner);
        uint256 refundAmount = getRefundAmount(auctionId, owner);
        uint256 transferAmount = SafeMath.sub(amount, refundAmount);
        _transferCoin(proxy, owner, address(proxy), tokenAddr, transferAmount);
        refunds[auctionId][owner] = amount;
    }

    function _transferCoinToOwner(
        address registry,
        address owner,
        address tokenAddr,
        uint256 amount,
        uint256 auctionId
    ) internal {
        AuthenticatedProxy proxy = getAuthProxy(registry, owner);
        _approvalForProxy(proxy, address(proxy), tokenAddr, amount);
        _transferCoin(proxy, address(proxy), owner, tokenAddr, amount);
        delete refunds[auctionId][owner];
    }

    function _transferCoin(
        AuthenticatedProxy proxy,
        address from,
        address to,
        address tokenAddr,
        uint256 amount
    ) internal {
        proxy.proxyAssert(
            tokenAddr,
            AuthenticatedProxy.HowToCall.Call,
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                from,
                to,
                amount
            )
        );
    }

    function _approvalForProxy(
        AuthenticatedProxy proxy,
        address from,
        address tokenAddr,
        uint256 amount
    ) internal {
        proxy.proxyAssert(
            tokenAddr,
            AuthenticatedProxy.HowToCall.Call,
            abi.encodeWithSignature("approve(address,uint256)", from, amount)
        );
    }
}
