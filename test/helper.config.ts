import { ethers } from "hardhat";


//TimeLock 最小延迟时间为3600秒
//Quorum（法定人数比例）为 90%
//投票周期为5个区块
//投标延迟为3个区块
export const governorConfig = {
    MIN_DELAY: 3600,
    QUORUM_PERCENTAGE:90,
    VOTING_PERIOD:5,
    VOTING_DELAY:3,
    ADDRESS_ZERO : "0x0000000000000000000000000000000000000000"
}