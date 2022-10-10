import { ethers, upgrades } from "hardhat";


 //转移代理管理合约所属权， 只有该权限才能升级合约
async function main() {
    const signers = await ethers.getSigners()

    console.log("Transferring ownership of ProxAdmin ...");

    await upgrades.admin.transferProxyAdminOwnership(signers[1].address)

    console.log("Transferred ownership of ProxyAdmin to: ", signers[1].address);
    
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  })