// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "../lib/ArrayUtils.sol";
import "../registry/AuthenticatedProxy.sol";
import "../LibraAuction.sol";
import "../registry/AuthenticatedProxy.sol";
import "../registry/ProxyRegistry.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";

contract StaticAuction {
    using SafeMath for uint256;
    using Strings for uint256;
    using Address for address;
    using Strings for address;

    function decodeERC20Amount(
        uint256[6] memory extraUints,
        uint256 hightestBid,
        uint256 floorPrice
    ) public pure returns (uint256[4] memory) {
        uint256 royalty = (extraUints[2] * hightestBid) / extraUints[1];
        uint256 commission = (extraUints[3] * hightestBid) / extraUints[1];

        uint256 rebate = 0;
        // What if (𝑃 − 𝐶) is less than 3. 5% of 𝑃 ? There is no rebate for losing bidders and platform still take 3. 5%.
        // I.e. seller makes a loss, this can be avoided by adjusting floor price.
        if (
            (hightestBid - floorPrice) >=
            (extraUints[5] * hightestBid) / extraUints[1]
        ) {
            rebate =
                ((hightestBid - floorPrice) * extraUints[4]) /
                extraUints[1];
        }
        uint256 ownerBalance = hightestBid - (royalty + commission + rebate);
        return [ownerBalance, royalty, commission, rebate];
    }

    function assertAbortToAuction(
        bytes memory calldatas,
        uint256[] memory clengths,
        uint256 auctionId
    ) internal pure {
        require(
            ArrayUtils.arrayEq(
                ArrayUtils.arraySlice(calldatas, 0, clengths[0]),
                abi.encodeWithSignature("abort(uint256)", auctionId)
            ),
            "StaticAuction: Not a abort operation"
        );
    }

    function assertApproveForProxy(
        bytes memory calldatas,
        uint256[] memory clengths,
        address proxy,
        uint256 hightestBid
    ) internal pure {
        require(
            ArrayUtils.arrayEq(
                ArrayUtils.arraySlice(calldatas, clengths[0], clengths[1]),
                abi.encodeWithSignature(
                    "approve(address,uint256)",
                    proxy,
                    hightestBid
                )
            ),
            "StaticAuction: Not a apporve operation"
        );
    }

    function assertOwnerTransfer(
        uint256[6] memory extraUints,
        bytes memory calldatas,
        uint256[] memory clengths,
        address proxy,
        Auction auction,
        uint256 auctionId
    ) internal view {
        (, uint256 hightestBid) = auction.getHighester(auctionId);
        uint256[4] memory values = decodeERC20Amount(
            extraUints,
            hightestBid,
            auction.getFloorPrice(auctionId)
        );
        bytes memory data = ArrayUtils.arraySlice(
            calldatas,
            clengths[1] + clengths[0],
            clengths[2]
        );
        bytes memory expect = abi.encodeWithSignature(
            "transferFrom(address,address,uint256)",
            proxy,
            auction.getOwner(auctionId),
            values[0]
        );

        require(
            ArrayUtils.arrayEq(data, expect),
            "StaticAuction: Not a transfer operation for owner"
        );
    }

    function assertRoyaltyTransfer(
        address[7] memory extraAddr,
        uint256[6] memory extraUints,
        bytes memory calldatas,
        uint256[] memory clengths,
        address proxy,
        Auction auction,
        uint256 auctionId
    ) internal view {
        (, uint256 hightestBid) = auction.getHighester(auctionId);

        uint256[4] memory values = decodeERC20Amount(
            extraUints,
            hightestBid,
            auction.getFloorPrice(auctionId)
        );

        bytes memory data = ArrayUtils.arraySlice(
            calldatas,
            clengths[2] + clengths[1] + clengths[0],
            clengths[3]
        );
        bytes memory expect = abi.encodeWithSignature(
            "transferFrom(address,address,uint256)",
            proxy,
            extraAddr[4],
            values[1]
        );

        require(
            ArrayUtils.arrayEq(data, expect),
            "StaticAuction: Not a transfer operation for royalty"
        );
    }

    function assertCommissionTransfer(
        address[7] memory extraAddr,
        uint256[6] memory extraUints,
        bytes memory calldatas,
        uint256[] memory clengths,
        address proxy,
        Auction auction,
        uint256 auctionId
    ) internal view {
        (, uint256 hightestBid) = auction.getHighester(auctionId);
        uint256[4] memory values = decodeERC20Amount(
            extraUints,
            hightestBid,
            auction.getFloorPrice(auctionId)
        );
        bytes memory data = ArrayUtils.arraySlice(
            calldatas,
            clengths[3] + clengths[2] + clengths[1] + clengths[0],
            clengths[4]
        );
        bytes memory expect = abi.encodeWithSignature(
            "transferFrom(address,address,uint256)",
            proxy,
            extraAddr[5],
            values[2]
        );
        require(
            ArrayUtils.arrayEq(data, expect),
            "StaticAuction: Not a transfer operation for agent"
        );
    }

    function assertRebateTransfer(
        address[7] memory extraAddr,
        uint256[6] memory extraUints,
        bytes memory calldatas,
        uint256[] memory clengths,
        address proxy,
        Auction auction,
        uint256 auctionId
    ) internal view {
        (, uint256 hightestBid) = auction.getHighester(auctionId);
        uint256[4] memory values = decodeERC20Amount(
            extraUints,
            hightestBid,
            auction.getFloorPrice(auctionId)
        );
        if (values[3] == 0) {
            return;
        }

        bytes memory data = ArrayUtils.arraySlice(
            calldatas,
            clengths[4] + clengths[3] + clengths[2] + clengths[1] + clengths[0],
            clengths[5]
        );
        bytes memory expect = abi.encodeWithSignature(
            "transferFrom(address,address,uint256)",
            proxy,
            extraAddr[6],
            values[3]
        );
        require(
            ArrayUtils.arrayEq(data, expect),
            "StaticAuction: Not a transfer operation for marketer"
        );
    }

    function assertOrderOfFristCall(
        address[7] memory addresses,
        address[7] memory extraAddr,
        uint256[6] memory extraUints,
        bytes memory data,
        bytes memory counterdata
    ) internal view {
        // Token address
        require(
            addresses[2] == extraAddr[0],
            "StaticAuction: incorrect token address"
        );
        LibraAuction auction = LibraAuction(extraAddr[2]);
        (
            address[] memory caddrs,
            uint256[] memory cvals,
            uint256[] memory clengths,
            bytes memory calldatas
        ) = abi.decode(
                ArrayUtils.arrayDrop(counterdata, 4),
                (address[], uint256[], uint256[], bytes)
            );

        require(
            caddrs.length == cvals.length &&
                cvals.length == clengths.length &&
                cvals.length == 6,
            "StaticAuction: call data lengths is mistake"
        );

        uint256 auctionId = ArrayUtils.sliceUint(
            ArrayUtils.arraySlice(calldatas, 4, 32),
            0
        );
        (address highester, ) = auction.getHighester(auctionId);
        // Transfer NFT
        require(
            ArrayUtils.arrayEq(
                data,
                abi.encodeWithSignature(
                    "transferFrom(address,address,uint256)",
                    extraAddr[3],
                    highester,
                    extraUints[0]
                )
            ),
            "StaticAuction: Call counterdata must be a ERC721 transfer ABI"
        );
    }

    function assertOrderOfSecondCall(
        address[7] memory addresses,
        address[7] memory extraAddr,
        uint256[6] memory extraUints,
        bytes memory,
        bytes memory counterdata
    ) internal view {
        LibraAuction auction = LibraAuction(extraAddr[2]);
        (
            address[] memory caddrs,
            uint256[] memory cvals,
            uint256[] memory clengths,
            bytes memory calldatas
        ) = abi.decode(
                ArrayUtils.arrayDrop(counterdata, 4),
                (address[], uint256[], uint256[], bytes)
            );
        require(
            caddrs.length == cvals.length &&
                cvals.length == clengths.length &&
                cvals.length == 6,
            "StaticAuction: Call data lengths is mistake"
        );

        uint256 auctionId = ArrayUtils.sliceUint(
            ArrayUtils.arraySlice(calldatas, 4, 32),
            0
        );

        (address hightest, uint256 hightestBid) = auction.getHighester(
            auctionId
        );

        require(
            addresses[3] == auction.getRegistry(auctionId),
            "StaticAuction: Second call registry is mistake"
        );
        address proxy = address(ProxyRegistry(addresses[0]).proxies(hightest));

        // abort the auction
        require(
            caddrs[0] == extraAddr[2],
            "StaticAuction: Second call registry is mistake"
        );
        assertAbortToAuction(calldatas, clengths, auctionId);

        // approve for proxy
        require(
            caddrs[1] == extraAddr[1],
            "StaticAuction: Second call traget[approve] is mistake"
        );
        assertApproveForProxy(calldatas, clengths, proxy, hightestBid);

        // owner fee
        require(
            caddrs[2] == extraAddr[1],
            "StaticAuction: Second call traget[transfer to owner] is mistake"
        );
        assertOwnerTransfer(
            extraUints,
            calldatas,
            clengths,
            proxy,
            auction,
            auctionId
        );

        // royalty fee
        require(
            caddrs[3] == extraAddr[1],
            "StaticAuction: Second call traget[transfer to author] is mistake"
        );
        assertRoyaltyTransfer(
            extraAddr,
            extraUints,
            calldatas,
            clengths,
            proxy,
            auction,
            auctionId
        );

        // commission fee
        require(
            caddrs[4] == extraAddr[1],
            "StaticAuction: Second call traget[transfer to agent] is mistake"
        );
        assertCommissionTransfer(
            extraAddr,
            extraUints,
            calldatas,
            clengths,
            proxy,
            auction,
            auctionId
        );

        // rebate fee
        require(
            caddrs[5] == extraAddr[1],
            "StaticAuction: Second call traget[transfer to marketer] is mistake"
        );
        assertRebateTransfer(
            extraAddr,
            extraUints,
            calldatas,
            clengths,
            proxy,
            auction,
            auctionId
        );
    }

    function assertCountOrderOfFristCall(
        address[7] memory addresses,
        address[7] memory extraAddr,
        uint256[7] memory extraUints,
        bytes memory data,
        bytes memory counterdata
    ) internal view {
        // Token address
        require(addresses[5] == extraAddr[0]);
        LibraAuction auction = LibraAuction(extraAddr[2]);
        (
            address[] memory caddrs,
            uint256[] memory cvals,
            uint256[] memory clengths,

        ) = abi.decode(
                ArrayUtils.arrayDrop(counterdata, 4),
                (address[], uint256[], uint256[], bytes)
            );

        require(
            caddrs.length == cvals.length &&
                cvals.length == clengths.length &&
                cvals.length == 6
        );

        (address highester, ) = auction.getHighester(extraUints[6]);
        require(addresses[1] == highester);
        address proxy = address(
            ProxyRegistry(addresses[0]).proxies(addresses[4])
        );

        // Transfer NFT
        bytes memory expect = abi.encodeWithSignature(
            "transferFrom(address,address,uint256)",
            proxy,
            highester,
            extraUints[0]
        );
        require(ArrayUtils.arrayEq(data, expect), "StaticAuction: Not a transfer for ERC721");
    }

    function assertCountOrderOfSecondCall(
        address[7] memory addresses,
        address[7] memory extraAddr,
        uint256[6] memory extraUints,
        bytes memory counterdata,
        uint256 auctionId
    ) internal view {
        LibraAuction auction = LibraAuction(extraAddr[2]);
        (
            address[] memory caddrs,
            uint256[] memory cvals,
            uint256[] memory clengths,
            bytes memory calldatas
        ) = abi.decode(
                ArrayUtils.arrayDrop(counterdata, 4),
                (address[], uint256[], uint256[], bytes)
            );
        require(
            caddrs.length == cvals.length &&
                cvals.length == clengths.length &&
                cvals.length == 6
        );

        (address hightest, uint256 hightestBid) = auction.getHighester(
            auctionId
        );
        address proxy = address(ProxyRegistry(addresses[0]).proxies(hightest));

        // abort the auction
        require(caddrs[0] == extraAddr[2]);
        assertAbortToAuction(calldatas, clengths, auctionId);

        // approve for proxy
        require(caddrs[1] == extraAddr[1]);
        assertApproveForProxy(calldatas, clengths, extraAddr[3], hightestBid);

        // owner fee
        require(caddrs[2] == extraAddr[1]);
        assertOwnerTransfer(
            extraUints,
            calldatas,
            clengths,
            proxy,
            auction,
            auctionId
        );

        // royalty fee
        require(caddrs[2] == extraAddr[1]);
        assertRoyaltyTransfer(
            extraAddr,
            extraUints,
            calldatas,
            clengths,
            proxy,
            auction,
            auctionId
        );

        // commission fee
        require(caddrs[3] == extraAddr[1]);
        assertCommissionTransfer(
            extraAddr,
            extraUints,
            calldatas,
            clengths,
            proxy,
            auction,
            auctionId
        );

        // rebate fee
        require(caddrs[4] == extraAddr[1]);
        assertRebateTransfer(
            extraAddr,
            extraUints,
            calldatas,
            clengths,
            proxy,
            auction,
            auctionId
        );
    }

    function transferForSeller(
        bytes memory extra,
        address[7] memory addresses,
        AuthenticatedProxy.HowToCall[2] memory howToCalls,
        uint256[6] memory uints,
        bytes memory data,
        bytes memory counterdata
    ) public view returns (uint256) {
        (address[7] memory extraAddr, uint256[6] memory extraUints) = abi
            .decode(extra, (address[7], uint256[6]));

        require(
            howToCalls[0] == AuthenticatedProxy.HowToCall.Call,
            "StaticAuction: Method of frist call must be a Call"
        );
        require(
            howToCalls[1] == AuthenticatedProxy.HowToCall.DelegateCall,
            "StaticAuction: Method of frist call must be a delegatecall"
        );

        assertOrderOfFristCall(
            addresses,
            extraAddr,
            extraUints,
            data,
            counterdata
        );
        assertOrderOfSecondCall(
            addresses,
            extraAddr,
            extraUints,
            data,
            counterdata
        );

        return uints[5] + 1;
    }

    function transferForBuyer(
        bytes memory extra,
        address[7] memory addresses,
        AuthenticatedProxy.HowToCall[2] memory howToCalls,
        uint256[6] memory uints,
        bytes memory data,
        bytes memory counterdata
    ) public view returns (uint256) {
        (address[7] memory extraAddr, uint256[7] memory extraUints) = abi
            .decode(extra, (address[7], uint256[7]));

        require(howToCalls[1] == AuthenticatedProxy.HowToCall.Call);
        require(howToCalls[0] == AuthenticatedProxy.HowToCall.DelegateCall);
        assertCountOrderOfFristCall(
            addresses,
            extraAddr,
            extraUints,
            counterdata,
            data
        );

        uint256[6] memory values = [
            extraUints[0],
            extraUints[1],
            extraUints[2],
            extraUints[3],
            extraUints[4],
            extraUints[5]
        ];
        assertCountOrderOfSecondCall(
            addresses,
            extraAddr,
            values,
            data,
            extraUints[6]
        );
        return uints[5] + 1;
    }
}
