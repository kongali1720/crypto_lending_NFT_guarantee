// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IERC721.sol";

contract LoanCore is ReentrancyGuard {
    struct Loan {
        address borrower;
        uint256 nftId;
        uint256 loanAmount;
        uint256 dueDate;
        bool isRepaid;
    }

    mapping(uint256 => Loan) public loans;
    uint256 public totalLoans;

    event LoanCreated(uint256 loanId, address borrower, uint256 amount);
    event LoanRepaid(uint256 loanId);

    function createLoan(
        address _nftContract,
        uint256 _nftId,
        uint256 _loanAmount,
        uint256 _durationDays
    ) external nonReentrant {
        // 1. Transfer NFT to Vault (collateral)
        IERC721(_nftContract).transferFrom(msg.sender, address(this), _nftId);
        
        // 2. Create loan entry
        uint256 loanId = totalLoans++;
        loans[loanId] = Loan({
            borrower: msg.sender,
            nftId: _nftId,
            loanAmount: _loanAmount,
            dueDate: block.timestamp + (_durationDays * 1 days),
            isRepaid: false
        });

        // 3. Send ETH to borrower
        (bool success, ) = msg.sender.call{value: _loanAmount}("");
        require(success, "Loan transfer failed");

        emit LoanCreated(loanId, msg.sender, _loanAmount);
    }

    function repayLoan(uint256 _loanId) external payable {
        Loan storage loan = loans[_loanId];
        require(!loan.isRepaid, "Loan already repaid");
        require(msg.value >= loan.loanAmount, "Insufficient repayment");

        // Return NFT to borrower
        IERC721(_nftContract).transferFrom(address(this), loan.borrower, loan.nftId);

        loan.isRepaid = true;
        emit LoanRepaid(_loanId);
    }
}
