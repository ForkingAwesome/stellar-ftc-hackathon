"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Claim {
  id: string;
  recipient: string;
  reference: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

export default function SendPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    recipient: '',
    reference: '',
    notes: ''
  });

  const demoRecentClaims: Claim[] = [
    {
      id: '1',
      recipient: 'John Smith',
      reference: 'CLM-2024-001',
      amount: 500,
      date: '2024-03-06',
      status: 'completed'
    },
    {
      id: '2',
      recipient: 'Sarah Johnson',
      reference: 'CLM-2024-002',
      amount: 750,
      date: '2024-03-06',
      status: 'pending'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Add your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      router.push('/success'); // Or handle success differently
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0B14] text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="space-y-1 mb-12">
          <span className="text-md text-gray-300">Convert & Access</span>
          <p className="text-3xl">
            Use{" "}
            <span className={`font-semibold`}>
              Pulse⚡️
            </span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-[#272A48]/30 to-[#0F0E26]/30 p-6 rounded-2xl border border-gray-800/50">
              <p className="text-gray-400 text-sm">Available Balance</p>
              <h2 className="text-2xl font-semibold mt-1">1,000 USDC</h2>
            </div>

            {/* Form Card */}
            <div className="bg-gradient-to-br from-[#272A48]/30 to-[#0F0E26]/30 p-6 rounded-2xl border border-gray-800/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Claim Amount (USDC)
                    </label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="w-full bg-[#1C1E2E] p-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={formData.recipient}
                      onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                      className="w-full bg-[#1C1E2E] p-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:outline-none"
                      placeholder="Enter recipient's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Claim Reference
                    </label>
                    <input
                      type="text"
                      value={formData.reference}
                      onChange={(e) => setFormData({...formData, reference: e.target.value})}
                      className="w-full bg-[#1C1E2E] p-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:outline-none"
                      placeholder="Enter claim reference ID"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full bg-[#1C1E2E] p-3 rounded-xl border border-gray-700/50 focus:border-blue-500 focus:outline-none"
                      rows={3}
                      placeholder="Add any additional details"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 
                    text-white font-bold py-3 px-4 rounded-xl transition duration-200 
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Processing...' : 'Generate Voucher ⚡️'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Recent Claims</h3>
            <div className="space-y-4">
              {demoRecentClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="bg-gradient-to-br from-[#272A48]/30 to-[#0F0E26]/30 p-4 rounded-xl border border-gray-800/50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">{claim.recipient}</p>
                      <p className="text-gray-400 text-sm">Ref: {claim.reference}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{claim.amount} USDC</p>
                      <p className="text-gray-400 text-sm">{claim.date}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      claim.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                      claim.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}