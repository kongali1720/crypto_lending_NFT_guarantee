const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LoanCore", function () {
  let loanCore, nftVault, oracle;
  let owner, lender, borrower;

  before(async () => {
    [owner, lender, borrower] = await ethers.getSigners();

    const Oracle = await ethers.getContractFactory("PriceOracle");
    oracle = await Oracle.deploy();
    
    const Vault = await ethers.getContractFactory("NFTVault");
    nftVault = await Vault.deploy();
    
    const LoanCore = await ethers.getContractFactory("LoanCore");
    loanCore = await upgrades.deployProxy(LoanCore, [
      oracle.address,
      nftVault.address
    ]);
  });

  describe("createLoan()", () => {
    it("Should create new loan with NFT collateral", async () => {
      // Test implementation here
    });
  });
});
