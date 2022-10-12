
import { mineUpTo } from "@nomicfoundation/hardhat-network-helpers";
import { latestBlock } from "@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time";
import { NumberLike } from "@nomicfoundation/hardhat-network-helpers/dist/src/types";

export async function moveToBlock(blockNumber: number) {
    console.log(`moving to blockNumber ${blockNumber}`);
    const latest = await latestBlock()
    await mineUpTo(blockNumber)
    const movedBlackNumber = blockNumber - latest;
    console.log(`moved ${movedBlackNumber} block`);
}

export async function moveBlock(block:number) {
    const latest = await latestBlock()
    const toLatest = latest + block
    await moveToBlock(toLatest)
}
