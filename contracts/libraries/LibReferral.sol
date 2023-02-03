// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

library LibReferral {
    bytes32 constant REFERRAL_STORAGE_POSITION =
        keccak256("com.enterdao.landworks.referral");

    // Stores information about a metaverse registry's referrer and
    // percentage, used to calculate the reward upon every rent.
    struct MetaverseRegistryReferrer {
        // address of the referrer 
        address referrer; //推荐人地址
        // percentage from the rent protocol fee, which will be
        // accrued to the referrer
        //元宇宙推荐者租金协议费的百分比，这将是归于推荐人
        uint24 percentage; //推荐人百分比
    }

    struct ReferrerPercentage {
        // Main referrer percentage, used as reward
        // for referrers + referees.
        // 主要百分比，用于计算 推荐人+上市者或者租赁者 总奖励数。 总奖励数 = （总协议费用 - 元宇宙奖励数）* mainPercentage / LibFee.FEE_PRECISION
        uint24 mainPercentage; //如果等于0则在黑名单中，不允许推荐人获得奖励, <= (LibFee.FEE_PRECISION / 2) = 50_000
        // Secondary percentage, which is used to calculate
        // the reward for a given referee.
        // 次要百分比，用于计算给定裁判的奖励。
        uint24 secondaryPercentage; //上市者和租赁者获取的奖励 = （总协议费用 - 元宇宙奖励数）* mainPercentage / LibFee.FEE_PRECISION * secondaryPercentage / LibFee.FEE_PRECISION, 剩下的给推荐者
    }
    // listReferrer
    struct ReferralStorage {
        // Sets referrers
        address admin;
        //新tokenId => 推荐人
        //储存列表推荐者
        // Stores addresses of listing referrer
        mapping(uint256 => address) listReferrer;

        // Accrued referrers fees 储存推荐者的累积奖励费用 address => paymentToken => amount
        mapping(address => mapping(address => uint256)) referrerFees;

        // Metaverse Registry referrers 元宇宙NFT登记推荐者信息 官方设置
        mapping(address => MetaverseRegistryReferrer) metaverseRegistryReferrers;

        // Referrers percentages 推荐人百分比, 官方设置
        //referrer => ReferrerPercentage
        mapping(address => ReferrerPercentage) referrerPercentages;
    }

    function referralStorage()
        internal
        pure
        returns (ReferralStorage storage rs)
    {
        bytes32 position = REFERRAL_STORAGE_POSITION;

        assembly {
            rs.slot := position
        }
    }
}
