# System Architecture

## Core Components
1. **LoanCore**  
   - Handles loan creation/repayment  
   - Manages NFT collateralization  
   - Uses Chainlink for NFT valuation  

2. **NFTVault**  
   - Securely holds NFT collateral  
   - Implements time-locked withdrawals  

3. **Frontend**  
   - React.js + Ethers.js  
   - WalletConnect integration  
   - NFT gallery for collateral selection  

## Sequence Diagram
```mermaid
sequenceDiagram
    Borrower->>LoanCore: Request Loan (NFT as collateral)
    LoanCore->>NFTVault: Lock NFT
    LoanCore->>Borrower: Send ETH
    Borrower->>LoanCore: Repay Loan + Interest
    LoanCore->>NFTVault: Release NFT
