// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "../lib/ArrayUtils.sol";
import "../registry/AuthenticatedProxy.sol";

contract FixPriceStatic {
    function checkOrder(
        bytes memory extra,
        address[7] memory addresses,
        AuthenticatedProxy.HowToCall[2] memory howToCalls,
        uint256[6] memory uints,
        bytes memory data,
        bytes memory counterdata
    ) public view returns (uint256) {
        require(
            howToCalls[1] == AuthenticatedProxy.HowToCall.DelegateCall,
            "checkOrder: call must be a direct call"
        );

        (
            // [coinBase, tokenAddress, seller, buyer, agent, author]
            address[6] memory transferAddresses,
            // [tokenId, buyAmount, sellAmount, commission, royalty, tradeAmount, isERC1155, tokenBalance]
            uint256[8] memory transferNumbers
        ) = abi.decode(extra, (address[6], uint256[8]));

        require(
            addresses[1] == transferAddresses[3],
            "checkOrder: incorrect maker."
        );
        require(
            exists(addresses[0]),
            "checkOrder: incorrect register address."
        );
        require(
            transferNumbers[1] > 0,
            "checkOrder: buy amount must be not a zero."
        );
        require(
            transferNumbers[5] > 0,
            "checkOrder: coin amount must be not a zero."
        );

        checkNFTTransfer(
            transferNumbers[7] > 0,
            transferNumbers[6] > 0,
            [transferAddresses[1], transferAddresses[2], transferAddresses[3]],
            [transferNumbers[0], transferNumbers[2], transferNumbers[1]],
            counterdata
        );

        checkCoinTransfer(
            [
                transferAddresses[0],
                transferAddresses[2],
                transferAddresses[3],
                transferAddresses[4],
                transferAddresses[5]
            ],
            [transferNumbers[3], transferNumbers[4], transferNumbers[5]],
            data
        );

        return SafeMath.add(uints[5], transferNumbers[1]);
    }

    function checkCounterOrder(
        bytes memory extra,
        address[7] memory addresses,
        AuthenticatedProxy.HowToCall[2] memory howToCalls,
        uint256[6] memory uints,
        bytes memory data,
        bytes memory counterdata
    ) public view returns (uint256) {
        require(
            howToCalls[1] == AuthenticatedProxy.HowToCall.DelegateCall,
            "checkCounterOrder: call must be a direct call"
        );

        (
            // [coinBase, tokenAddress, seller, agent, author]
            address[5] memory transferAddresses,
            // [tokenId, sellAmount, sellingPrice, royalty * denominator, commission * denominator, denominator, erc1155Status]
            uint256[7] memory transferNumbers
        ) = abi.decode(extra, (address[5], uint256[7]));

        require(
            addresses[1] == transferAddresses[2],
            "checkOrder: incorrect maker."
        );
        require(
            exists(addresses[0]),
            "checkOrder: incorrect register address."
        );
        require(
            transferNumbers[1] > 0,
            "checkOrder: NFT amount must be not a zero."
        );
        require(
            transferNumbers[2] > 0,
            "checkOrder: NFT price must be not a zero."
        );

        (
            address buyer,
            uint256 buyAmount,
            bool hasMinted
        ) = decodeNFTTransferData(data);

        require(addresses[4] == buyer, "checkOrder: incorrect buyer.");

        checkNFTTransfer(
            hasMinted,
            transferNumbers[6] == 1,
            [transferAddresses[1], transferAddresses[2], buyer],
            [transferNumbers[0], transferNumbers[1], buyAmount],
            data
        );

        require(
            transferNumbers[5] != 0,
            "checkOrder: Denominator must be not a zero."
        );

        uint256 total = SafeMath.mul(transferNumbers[2], buyAmount);
        uint256 commission = SafeMath.div(
            SafeMath.mul(total, transferNumbers[4]),
            transferNumbers[5]
        );
        uint256 royalty = SafeMath.div(
            SafeMath.mul(total, transferNumbers[3]),
            transferNumbers[5]
        );
        uint256 finalAmount = SafeMath.sub(
            SafeMath.sub(total, commission),
            royalty
        );

        checkCoinTransfer(
            [
                transferAddresses[0],
                transferAddresses[2],
                buyer,
                transferAddresses[3],
                transferAddresses[4]
            ],
            [commission, royalty, finalAmount],
            counterdata
        );

        return SafeMath.add(uints[5], buyAmount);
    }

    function checkNFTTransfer(
        bool hasMinted,
        bool isERC1155,
        // [token,seller,buyer]
        address[3] memory addresses,
        // [tokenID, mintAmount, amount]
        uint256[3] memory values,
        bytes memory data
    ) internal pure {
        require(
            addresses[1] != address(0) && addresses[2] != address(0),
            "checkNFTTransfer: incorret seller address."
        );
        require(
            addresses[1] != address(0) && addresses[2] != address(0),
            "checkNFTTransfer: incorret buyer address."
        );

        (
            address[] memory caddrs,
            uint256[] memory cvals,
            uint256[] memory clengths,
            bytes memory calldatas
        ) = abi.decode(
                ArrayUtils.arrayDrop(data, 4),
                (address[], uint256[], uint256[], bytes)
            );

        require(
            addresses[0] == caddrs[0],
            "checkNFTTransfer: incorret NFT address."
        );

        require(
            hasMinted || caddrs.length > 1,
            "checkNFTTransfer: must be have a minted trade."
        );
        require(
            hasMinted || cvals.length > 1,
            "checkNFTTransfer: must be have a minted trade."
        );
        require(
            hasMinted || clengths.length > 1,
            "checkNFTTransfer: must be have a minted trade."
        );
        require(
            hasMinted || addresses[0] == caddrs[1],
            "checkNFTTransfer: must be have a minted trade."
        );

        bytes memory matchData;
        uint256 i = 0;
        uint256 start = 0;
        if (!hasMinted) {
            matchData = ArrayUtils.arraySlice(calldatas, start, clengths[i]);
            bytes memory mintData;
            if (isERC1155) {
                mintData = abi.encodeWithSignature(
                    "mint(address,uint256,uint256)",
                    addresses[1],
                    values[0],
                    values[1]
                );
                require(
                    ArrayUtils.arrayEq(mintData, matchData),
                    "checkOrder: incorret ERC1155 mint and transfer call."
                );
            } else {
                mintData = abi.encodeWithSignature(
                    "mint(address,uint256)",
                    addresses[1],
                    values[0]
                );
                require(
                    ArrayUtils.arrayEq(mintData, matchData),
                    "checkOrder: incorret ERC721 mint and transfer call."
                );
            }
            start = clengths[i];
            i += 1;
        }
        bytes memory safeTransferFromData = "";
        matchData = ArrayUtils.arraySlice(calldatas, start, clengths[i]);
        if (isERC1155) {
            safeTransferFromData = abi.encodeWithSignature(
                "safeTransferFrom(address,address,uint256,uint256,bytes)",
                addresses[1],
                addresses[2],
                values[0],
                values[2],
                ""
            );
        } else {
            safeTransferFromData = abi.encodeWithSignature(
                "safeTransferFrom(address,address,uint256)",
                addresses[1],
                addresses[2],
                values[0]
            );
        }

        require(
            ArrayUtils.arrayEq(
                ArrayUtils.arraySlice(safeTransferFromData, 0, clengths[i]),
                matchData
            ),
            "checkOrder: incorret NFT transfer call."
        );
    }

    function checkCoinTransfer(
        // [coinBase, seller, buyer, agent, author]
        address[5] memory addrs,
        // [commission, royalty, finalAmount]
        uint256[3] memory amounts,
        bytes memory data
    ) internal view {
        require(
            addrs[1] != address(0),
            "checkCoinTransfer: incorret seller address."
        );
        require(
            addrs[2] != address(0),
            "checkCoinTransfer: incorret buyer address."
        );
        require(
            addrs[3] != address(0),
            "checkCoinTransfer: incorret agent address."
        );
        require(
            addrs[4] != address(0),
            "checkCoinTransfer: incorret author address."
        );

        require(
            amounts[2] != 0,
            "checkCoinTransfer: incorret coin transfer amount."
        );

        (
            address[] memory caddrs,
            uint256[] memory cvals,
            uint256[] memory clengths,
            bytes memory calldatas
        ) = abi.decode(
                ArrayUtils.arrayDrop(data, 4),
                (address[], uint256[], uint256[], bytes)
            );

        uint256 start = 0;
        uint256 i = 0;

        // tradeAmount
        assertCoinTransferData(
            ArrayUtils.arraySlice(calldatas, start, clengths[i]),
            [caddrs[i], addrs[0]],
            addrs[2],
            addrs[1],
            [cvals[i], amounts[2]]
        );

        // commission
        if (amounts[0] > 0) {
            start += clengths[i];
            i += 1;

            assertCoinTransferData(
                ArrayUtils.arraySlice(calldatas, start, clengths[i]),
                [caddrs[i], addrs[0]],
                addrs[2],
                addrs[3],
                [cvals[i], amounts[0]]
            );
        }

        // royalty
        if (amounts[1] > 0) {
            start += clengths[i];
            i += 1;

            assertCoinTransferData(
                ArrayUtils.arraySlice(calldatas, start, clengths[i]),
                [caddrs[i], addrs[0]],
                addrs[2],
                addrs[4],
                [cvals[i], amounts[1]]
            );
        }
    }

    function assertCoinTransferData(
        bytes memory src,
        address[2] memory coinBase,
        address from,
        address to,
        uint256[2] memory value
    ) internal view {
        // matched eth transfer
        if (coinBase[1] == address(0)) {
            require(
                src.length == 0,
                "assertCoinTransferData: incorret ETH transferData length."
            );
            require(
                !exists(to),
                "assertCoinTransferData: incorret ETH transferData to must be a wallet address."
            );
            require(
                coinBase[0] == to,
                "assertCoinTransferData: incorret ETH transferData to address."
            );
            require(
                value[0] == value[1],
                "assertCoinTransferData: incorret ETH transferData amount."
            );
            return;
        }

        // matched ERC20 transfer
        bytes memory abiData = abi.encodeWithSignature(
            "transferFrom(address,address,uint256)",
            from,
            to,
            value[1]
        );
        assertERC20TransferData(
            src,
            ArrayUtils.arraySlice(abiData, 0, src.length)
        );
    }

    function assertERC20TransferData(bytes memory src, bytes memory expect)
        internal
        pure
    {
        require(
            ArrayUtils.arrayEq(src, expect),
            "assertCoinTransferData: incorret ERC20 transfer data."
        );
    }

    function decodeNFTTransferData(bytes memory data)
        internal
        pure
        returns (
            address,
            uint256,
            bool
        )
    {
        (
            address[] memory caddrs,
            uint256[] memory cvals,
            uint256[] memory clengths,
            bytes memory calldatas
        ) = abi.decode(
                ArrayUtils.arrayDrop(data, 4),
                (address[], uint256[], uint256[], bytes)
            );
        for (uint256 index = 0; index < cvals.length; index++) {
            require(
                cvals[index] == 0,
                "decodeNFTTransferData: incorrect value."
            );
        }

        uint256 start = 0;
        uint256 i = 0;
        // Has mint step
        if (caddrs.length == 2) {
            start = clengths[i];
            i += 1;
        }
        bytes memory transferData = ArrayUtils.arraySlice(
            calldatas,
            start,
            clengths[i]
        );

        // ERC1155
        if (transferData.length >= 196) {
            (address a, address b, uint256 t, uint256 v, bytes memory d) = abi
                .decode(
                    ArrayUtils.arrayDrop(transferData, 4),
                    (address, address, uint256, uint256, bytes)
                );
            require(a != address(0), "decodeNFTTransferData: incorrect a");
            require(t > 0, "decodeNFTTransferData: incorrect transfer amount");
            require(d.length >= 0, "decodeNFTTransferData: incorrect data");
            return (b, v, caddrs.length == 1);
        }
        // ERC721
        else {
            (address a, address b, uint256 t) = abi.decode(
                ArrayUtils.arrayDrop(transferData, 4),
                (address, address, uint256)
            );
            require(a != address(0), "decodeNFTTransferData: incorrect a");
            require(t > 0, "decodeNFTTransferData: incorrect transfer amount");
            return (b, 1, caddrs.length == 1);
        }
    }

    function exists(address what) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(what)
        }
        return size > 0;
    }
}
