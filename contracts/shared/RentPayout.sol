// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "../libraries/LibERC721.sol";
import "../libraries/LibTransfer.sol";
import "../libraries/LibFee.sol";
import "../libraries/marketplace/LibMarketplace.sol";
import "../interfaces/IRentPayout.sol";

contract RentPayout is IRentPayout {
    modifier payout(uint256 tokenId) {
        payoutRent(tokenId);
        _;
    }

    /// @dev Pays out the accumulated rent for a given tokenId
    /// 支付给定tokenId（assetId）的累积租金
    /// Rent is paid out to consumer if set, otherwise it is paid to the owner of the LandWorks NFT
    function payoutRent(uint256 tokenId) internal returns (address, uint256) {
        address paymentToken = LibMarketplace
            .marketplaceStorage()
            .assets[tokenId]
            .paymentToken;
        uint256 amount = LibFee.clearAccumulatedRent(tokenId, paymentToken); //计算并清除累积费用
        if (amount == 0) {
            return (paymentToken, amount);
        }

        address receiver = LibERC721.consumerOf(tokenId); //如果设置了consumer则支付给consumer
        if (receiver == address(0)) {
            receiver = LibERC721.ownerOf(tokenId); //否则支付给tokenId所有者
        }

        LibTransfer.safeTransfer(paymentToken, receiver, amount); //转移费用
        emit ClaimRentFee(tokenId, paymentToken, receiver, amount);

        return (paymentToken, amount);
    }
}
