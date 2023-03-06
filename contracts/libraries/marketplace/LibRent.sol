// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "../LibERC721.sol";
import "../LibFee.sol";
import "../LibReferral.sol";
import "../LibTransfer.sol";
import "../marketplace/LibMarketplace.sol";

library LibRent {
    using SafeERC20 for IERC20;

    event Rent(
        uint256 indexed _assetId,
        uint256 _rentId,
        address indexed _renter,
        uint256 _start,
        uint256 _end,
        address indexed _paymentToken,
        uint256 _rent,
        uint256 _protocolFee
    );
    event AccrueReferralFee(
        uint256 indexed _assetId,
        uint256 _rentId,
        address indexed _referrer,
        address indexed _paymentToken,
        uint256 _fee
    );

    struct RentParams {
        uint256 _assetId;
        uint256 _period;
        uint256 _maxRentStart;
        address _paymentToken;
        uint256 _amount;
        address _referrer;
    }

    struct DistributionParams {
        uint256 assetId;    //市场资产id（新铸造的tokenId）
        uint256 rentId;     //租赁id
        address metaverseRegistry; //元宇宙合约地址，erc721 nft 合约地址
        address paymentToken;      //支付token地址
        uint256 rentPayment;       //租金
        address rentReferrer;      //租赁推荐者
    }

    struct RentDistribution {
        // The cost, which the renter has to send/approve
        uint256 renterCost; //租金 - 租赁者折扣 = 实际支付的金额
        // The reward accrued to the lister
        uint256 listerReward; // 出租者应得报酬 = renterCost - protocolFee
        // The total protocol fee 总的协议费用
        uint256 protocolFee;
    }

    /// @dev Rents asset for a given period (in seconds)
    /// Rent is added to the queue of pending rents.
    /// Rent start will begin from the last rented timestamp. 开始时间为最进的租赁时间
    /// If no active rents are found, rents starts from the current timestamp. 如果没有正在租赁的，则租赁时间为当前时间
    /// Protocol fee may be split into multiple referrals. 协议费将会分割给多个人
    /// Priority is the following: 优先级：

    /// 1. 如果给定的资产 metaverse registry 有一个 metaverse referrer，它会向该 referrer 收取一定比例的协议费用。
    /// 1. Metaverse registry referrer: If the given asset metaverse registry has a metaverse
    /// referrer, it accrues a percent of the protocol fees to that referrer.

    /// 2.1.  上市推荐者: 根据mainPercentage获取剩余的（协议费用 - 元宇宙协议推荐奖励费用）百分比，最大为50%
    /// 2.1. List referrer: Takes percentage of the leftovers based on `mainPercentage`.
    /// `mainPercentage` has a maximum percentage of 50 due to rent referrer.
    /// 列表者本身可能会根据“次要百分比”占列表推荐的百分比
    /// The lister itself might take percentage of the list referral based on `secondaryPercentage`,
    /// adding an additional amount to the rent reward. 在租金奖励中增加额外的金额。

    /// 2.2. 租赁推荐者：根据`mainPercentage`获得剩余（总协议费用 - 元宇宙协议推荐奖励费用）的百分比 最大为50%
    /// 2.2. Rent referrer: Takes percentage of the leftovers based on `mainPercentage`.
    /// `mainPercentage` has a maximum percentage of 50 due to list referrer.
    /// The renter itself might take percentage of the rent referral based on `secondaryPercentage`,
    /// which will serve as discount to the initial rent amount. 这将作为初始租金的折扣。

    /// 3. Protocol: Everything left is for the protocol. 剩下的为协议费用
    /// See {IReferralFacet-setMetaverseRegistryReferrers}, {IReferralFacet-setReferrers}.
    function rent(RentParams memory rentParams)
        internal
        returns (uint256, bool)
    {
        LibMarketplace.MarketplaceStorage storage ms = LibMarketplace
            .marketplaceStorage();

        require(LibERC721.exists(rentParams._assetId), "_assetId not found");
        LibMarketplace.Asset memory asset = ms.assets[rentParams._assetId];
        require(
            asset.status == LibMarketplace.AssetStatus.Listed, //必须上市状态
            "_assetId not listed"
        );

        //必须大于出租者设置的最小周期
        require( 
            rentParams._period >= asset.minPeriod, 
            "_period less than minPeriod"
        );
        require(
            rentParams._period <= asset.maxPeriod,
            "_period more than maxPeriod"
        );                                                                                                                                       

        require(
            rentParams._paymentToken == asset.paymentToken,
            "invalid _paymentToken"
        );

        if (rentParams._referrer != address(0)) { //租赁推荐者
            LibReferral.ReferrerPercentage memory rp = LibReferral
                .referralStorage()
                .referrerPercentages[rentParams._referrer];
            require(rp.mainPercentage > 0, "_referrer not whitelisted");
        }

        bool rentStartsNow = true;
        uint256 rentStart = block.timestamp;

        //最后一人的结束时间
        uint256 lastRentEnd = ms.rents[rentParams._assetId][asset.totalRents].end;

        if (lastRentEnd > rentStart) { //最后一人的结束时间 > 结束时间
            rentStart = lastRentEnd; //开始时间 = 最后一人的结束时间
            rentStartsNow = false;
        }

        require(//校验最大开始租赁时间
            rentStart <= rentParams._maxRentStart,
            "rent start exceeds maxRentStart"
        );

        uint256 rentEnd = rentStart + rentParams._period; //结束时间

        require(//最大未来时间
            block.timestamp + asset.maxFutureTime >= rentEnd,
            "rent more than current maxFutureTime"
        );

        uint256 rentPayment = rentParams._period * asset.pricePerSecond;

        //储存租赁信息
        uint256 rentId = LibMarketplace.addRent(
            rentParams._assetId,
            msg.sender,
            rentStart,
            rentEnd
        );

        //分配费用
        RentDistribution memory rds = distributeFees(
            DistributionParams({
                assetId: rentParams._assetId,
                rentId: rentId,
                metaverseRegistry: asset.metaverseRegistry,
                paymentToken: asset.paymentToken,
                rentPayment: rentPayment,
                rentReferrer: rentParams._referrer
            })
        );

        require(rentParams._amount == rds.renterCost, "invalid _amount");
        if (asset.paymentToken == LibTransfer.ETHEREUM_PAYMENT_TOKEN) {
            require(msg.value == rds.renterCost, "invalid msg.value");
        } else {
            require(msg.value == 0, "invalid token msg.value");
        }

        if (asset.paymentToken != LibTransfer.ETHEREUM_PAYMENT_TOKEN) {
            LibTransfer.safeTransferFrom(
                asset.paymentToken,
                msg.sender,
                address(this),
                rds.renterCost
            );
        }

        emit Rent(
            rentParams._assetId,
            rentId,
            msg.sender,
            rentStart,
            rentEnd,
            asset.paymentToken,
            rds.listerReward,
            rds.protocolFee
        );

        return (rentId, rentStartsNow);
    }

    //分配费用
    function distributeFees(DistributionParams memory params)
        internal
        returns (RentDistribution memory rds)
    {
        LibFee.FeeStorage storage fs = LibFee.feeStorage();
        LibReferral.ReferralStorage storage rs = LibReferral.referralStorage();

        //协议总费用
        rds.protocolFee =
            (params.rentPayment * fs.feePercentages[params.paymentToken]) /
            LibFee.FEE_PRECISION;

        //上市者报酬 = 租金 - 协议费用
        rds.listerReward = params.rentPayment - rds.protocolFee;

        //总租金
        rds.renterCost = params.rentPayment;

        {//元宇宙推荐者奖励

            LibReferral.MetaverseRegistryReferrer memory mrr = rs
                .metaverseRegistryReferrers[params.metaverseRegistry];

            if (mrr.percentage > 0) {

                //1. 计算元宇宙推荐者奖励费用：协议费用 * 元宇宙推荐者得百分比 
                uint256 metaverseReferralAmount = (rds.protocolFee *
                    mrr.percentage) / LibFee.FEE_PRECISION;

                rs.referrerFees[mrr.referrer][
                    params.paymentToken
                ] += metaverseReferralAmount;
                rds.protocolFee -= metaverseReferralAmount;

                emit AccrueReferralFee(
                    params.assetId,
                    params.rentId,
                    mrr.referrer,
                    params.paymentToken,
                    metaverseReferralAmount
                );
            }
        }

        //剩余费用
        uint256 referralFeesLeft = rds.protocolFee;

       
        if (referralFeesLeft > 0) { //计算上市奖励
            {   
                //tokenID上市推荐者
                address listReferrer = rs.listReferrer[params.assetId];
                if (listReferrer != address(0)) {
                    LibReferral.ReferrerPercentage memory rp = rs
                        .referrerPercentages[listReferrer];

                    if (rp.mainPercentage > 0) {

                        //上市总奖励费用：剩余协议费 * mainPercentage百分比
                        uint256 totalReferralFee = (referralFeesLeft *
                            rp.mainPercentage) / LibFee.FEE_PRECISION;

                        rds.protocolFee -= totalReferralFee;

                       // 上市者奖励
                        uint256 listerFee = (totalReferralFee *
                            rp.secondaryPercentage) / LibFee.FEE_PRECISION;
                        rds.listerReward += listerFee;
                        
                        //上市推荐者奖励
                        uint256 referrerFee = totalReferralFee - listerFee;

                        rs.referrerFees[listReferrer][
                            params.paymentToken
                        ] += referrerFee;

                        emit AccrueReferralFee(
                            params.assetId,
                            params.rentId,
                            listReferrer,
                            params.paymentToken,
                            referrerFee
                        );
                    }
                }
            }

            {//租赁奖励
                if (params.rentReferrer != address(0)) {
                    LibReferral.ReferrerPercentage memory rp = rs
                        .referrerPercentages[params.rentReferrer];

                    //租赁总奖励费用
                    uint256 totalReferralFee = (referralFeesLeft *
                        rp.mainPercentage) / LibFee.FEE_PRECISION;
                    rds.protocolFee -= totalReferralFee;

                    //租赁者折扣
                    uint256 renterDiscount = (totalReferralFee *
                        rp.secondaryPercentage) / LibFee.FEE_PRECISION;

                    //租赁者实际支付金额
                    rds.renterCost -= renterDiscount;

                    //租赁推荐者奖励：租赁总奖励 - 租赁者折扣
                    uint256 referrerFee = totalReferralFee - renterDiscount;

                    rs.referrerFees[params.rentReferrer][
                        params.paymentToken
                    ] += referrerFee;

                    emit AccrueReferralFee(
                        params.assetId,
                        params.rentId,
                        params.rentReferrer,
                        params.paymentToken,
                        referrerFee
                    );
                }
            }
        }

        //记录assetId总的出租所有金额
        fs.assetRentFees[params.assetId][params.paymentToken] += rds
            .listerReward;

        //记录获得总协议费用
        fs.protocolFees[params.paymentToken] += rds.protocolFee;

        return rds;
    }
}
