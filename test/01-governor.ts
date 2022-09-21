import { BigNumber, BigNumberish, BytesLike } from "ethers";
import { ethers } from "hardhat";
import { Box, GovernorContract } from "../typechain-types";
import { PromiseOrValue } from "../typechain-types/common";
import { moveTime } from "../utils/move-time";
import { governorConfig } from "../helper.config";
import { moveBlocks } from "../utils/move-block";


