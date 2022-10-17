
import { mineUpTo } from "@nomicfoundation/hardhat-network-helpers";
import { increase, increaseTo, latest, latestBlock } from "@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time";
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


export  async function moveToTime(timeStamp:number) {
    console.log(`moveing to time ${timeStamp}`)
    const latestTime = await latest()
    const movedSeconds = timeStamp - latestTime;
    if (movedSeconds <= 0) {
        throw new Error("moved timestamp must > current timestamp");
    }
    await increaseTo(timeStamp)

    console.log(`moded ${movedSeconds} seconds`);
}

export async function moveTime(seconds:number) {
    if (seconds <= 0) throw new Error("moved seconds must > 0");
    const latestTime = await latest()
    const moveToTimeStamp = latestTime + seconds;
    console.log(`moving to time ${moveToTimeStamp}`);
    await moveToTime(moveToTimeStamp)
    console.log(`moded ${seconds} seconds`);

}