'use client';
import { useEffect, useState } from 'react';
import { initWeb3 } from '../../lib/web3';

export default function Dashboard() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { loanCore } = await initWeb3();
        const userLoans = await loanCore.getUserLoans();
        setLoans(userLoans);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Loan Dashboard</h1>
      {/* Loan list rendering */}
    </div>
  );
}
