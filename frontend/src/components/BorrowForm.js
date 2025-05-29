import { useState } from "react";
import { ethers } from "ethers";

export default function BorrowForm({ web3, nfts }) {
  const [loanAmount, setLoanAmount] = useState("");
  const [selectedNFT, setSelectedNFT] = useState(null);

  const handleBorrow = async () => {
    if (!web3 || !selectedNFT) return;
    
    const contract = new ethers.Contract(
      "0xYourLoanCoreAddress",
      LoanCoreABI,
      web3.getSigner()
    );

    const tx = await contract.createLoan(
      selectedNFT.contractAddress,
      selectedNFT.tokenId,
      ethers.utils.parseEther(loanAmount),
      30 // 30-day loan
    );

    await tx.wait();
    alert("Loan created!");
  };

  return (
    <div className="borrow-form">
      <h2>Create NFT-Backed Loan</h2>
      <input 
        type="number" 
        placeholder="Loan Amount (ETH)" 
        onChange={(e) => setLoanAmount(e.target.value)}
      />
      <select onChange={(e) => setSelectedNFT(JSON.parse(e.target.value))}>
        <option>Select NFT as Collateral</option>
        {nfts.map((nft) => (
          <option key={nft.id} value={JSON.stringify(nft)}>
            {nft.name} (ID: {nft.tokenId})
          </option>
        ))}
      </select>
      <button onClick={handleBorrow}>Get Loan</button>
    </div>
  );
}
