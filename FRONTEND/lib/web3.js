import { ethers } from 'ethers';
import LoanCoreABI from '../../artifacts/contracts/CORE/LoanCore.sol/LoanCore.json';

export async function initWeb3() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const loanCoreAddress = process.env.NEXT_PUBLIC_LOAN_CORE_ADDRESS;
      const loanCore = new ethers.Contract(
        loanCoreAddress,
        LoanCoreABI.abi,
        signer
      );
      
      return { provider, signer, loanCore };
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
      throw error;
    }
  } else {
    throw new Error("MetaMask not detected");
  }
}
