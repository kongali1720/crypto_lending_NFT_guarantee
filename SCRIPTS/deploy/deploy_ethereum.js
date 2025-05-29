const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploy Price Oracle
  const PriceOracle = await ethers.getContractFactory("PriceOracle");
  const oracle = await PriceOracle.deploy();
  await oracle.deployed();

  // Deploy NFT Vault
  const NFTVault = await ethers.getContractFactory("NFTVault");
  const vault = await NFTVault.deploy();
  
  // Deploy LoanCore (upgradeable)
  const LoanCore = await ethers.getContractFactory("LoanCore");
  const loanCore = await upgrades.deployProxy(LoanCore, [
    oracle.address,
    vault.address
  ]);
  
  console.log("Deployment complete:");
  console.log(`PriceOracle: ${oracle.address}`);
  console.log(`NFTVault: ${vault.address}`);
  console.log(`LoanCore (Proxy): ${loanCore.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
