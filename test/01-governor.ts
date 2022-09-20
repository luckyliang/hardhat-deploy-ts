import { BigNumber, BigNumberish, BytesLike } from "ethers";
import { ethers } from "hardhat";
import { Box, GovernorContract } from "../typechain-types";
import { PromiseOrValue } from "../typechain-types/common";


//创建提案
async function propose(targets: string[], values: BigNumberish[], calldatas: BytesLike[], description: string) {
    const governor = await ethers.getContract<GovernorContract>("GovernorContract");
    const proposeTx = await governor.propose(targets, values, calldatas, description).then(tx => tx.wait())
    return proposeTx
}

async function castVoteWithReason(proposalId: PromiseOrValue<BigNumberish>, support: PromiseOrValue<BigNumberish>, reason: PromiseOrValue<string>) {

    const governor = await ethers.getContract<GovernorContract>("GovernorContract")
    let voteTxRecipt = await governor.castVoteWithReason(proposalId, support, reason).then(tx => tx.wait());
    return voteTxRecipt;
}

async function queue(
    targets: PromiseOrValue<string>[],
    values: PromiseOrValue<BigNumberish>[],
    calldatas: PromiseOrValue<BytesLike>[],
    descriptionHash: PromiseOrValue<BytesLike>
    ) {
    const governor = await ethers.getContract<GovernorContract>("GovernorContract")
    let queuetx = await governor.queue(targets, values, calldatas, descriptionHash).then(tx => tx.wait());
    return queuetx;
}


let proposalId = 0;

async function test() {

    //提案是在值为77 的Box 合约上触发 store功能
    const description = "propose this data"
    const box = await ethers.getContract<Box>("Box");
    let encodeFunctionCall = box.interface.encodeFunctionData("store", [77])

    await propose([box.address], [0], [encodeFunctionCall], description)

    // 投票
    const voteWay = 1
    const reason = "I vote yes"
    proposalId = proposalId += 1;
    let voteTxRecipt = await castVoteWithReason(proposalId, voteWay, reason);
    console.log(voteTxRecipt);

    //队列和执行
    const queueTx = await queue([box.address], [0], [encodeFunctionCall], description);
    console.log(queueTx);

    await movetime();
    



}
async function main() {

    
    
}

main().catch((error) => {
    console.log(error);
    process.exit(1);
})