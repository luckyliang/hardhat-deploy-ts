import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { Box } from "../typechain";

describe("test Box (proxy)", function () {
    let Box;
    let box: Box;

    beforeEach(async () => {
        Box = await ethers.getContractFactory("Box")
        box = (await upgrades.deployProxy(Box, [42], {initializer: 'store'})) as Box;
    })
    
    it('retrieve returns a value previoously stored',async () => {
        
        expect((await box.retrieve()).toString()).to.equal('42')
        
    })
})