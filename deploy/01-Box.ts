import { ethers, upgrades } from "hardhat";


async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");
    const Lock = await ethers.getContractFactory("Box")
    const instance = await upgrades.deployProxy(Lock, )
}