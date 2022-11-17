// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../MyTokenCrossChain .sol";

// Token 在XDAI 链上，可以使用XDAI链上的跨链桥（AMB: https://docs.tokenbridge.net/amb-bridge/about-amb-bridge）
// XDAI链桥合约地址：https://blockscout.com/xdai/mainnet/address/0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59
contract MyTokenXDAI is
    MyTokenCrossChain,
    CrossChainEnabledAMB(0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59)
{
    
}