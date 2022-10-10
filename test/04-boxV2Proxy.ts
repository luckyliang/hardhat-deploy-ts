
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { Box, Box__factory } from "../typechain";
import { BoxV2__factory } from "../typechain/factories/BoxV2__factory";
import { BoxV2 } from "../typechain/BoxV2";

describe("test BoxV2 (proxy)", function () {
    let Box: Box__factory;
    let box: Box;
    
    let BoxV2: BoxV2__factory;
    let boxV2: BoxV2;

    beforeEach(async () => {

        Box = await ethers.getContractFactory("Box")
        BoxV2 = await ethers.getContractFactory("BoxV2")

        box = (await upgrades.deployProxy(Box, [42], {initializer: 'store'})) as Box;
        
        boxV2 = (await upgrades.upgradeProxy(box.address, BoxV2)) as BoxV2
    })
    
    // Test case
    it('retrieve returns a value previously incremented', async function () {
        // Increment
        await boxV2.increment();
    
        // Test if the returned value is the same one
        // Note that we need to use strings to compare the 256 bit integers
        expect((await boxV2.retrieve()).toString()).to.equal('43');
    });
})