import React from 'react';
import { Search, Filter } from 'lucide-react';

const Transactions = () => {
  const transactions = Array(15).fill({
    id: "TR-23456",
    name: "john doe",
    email: "john@gmail.com",
    date: "20/09/2025",
    contact: "8585 555 555",
    amount: "₹800",
    method: "UPI",
    status: "Paid"
  });

  return (
    <div className="px-4 py-6 bg-white font-manrope">
      <p className="text-lg font-semibold text-[#212121BD] mb-6">
        Manage all Transactions
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search By Customer"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
          <Filter size={18} />
          <select className="bg-transparent text-sm outline-none">
            <option>All Status</option>
          </select>
        </div>
      </div>

      {/* Desktop Table - Hidden on Mobile */}
      <div className="hidden md:block border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1a1a1a] text-white sticky top-0 z-20">
            <tr>
              <th className="px-4 py-3 text-xs text-left whitespace-nowrap">Transaction ID</th>
              <th className="px-4 py-3 text-xs text-left whitespace-nowrap">Customer</th>
              <th className="px-4 py-3 text-xs text-center whitespace-nowrap">Date</th>
              <th className="px-4 py-3 text-xs text-center whitespace-nowrap">Contact</th>
              <th className="px-4 py-3 text-xs text-center whitespace-nowrap">Amount</th>
              <th className="px-4 py-3 text-xs text-center whitespace-nowrap">Method</th>
              <th className="px-4 py-3 text-xs text-center whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="table-row-group max-h-[430px] overflow-y-auto no-scrollbar bg-white">
            {transactions.map((tr, i) => (
              <tr key={i} className="table-row hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-600">{tr.id}</td>
                <td className="px-4 py-3">
                  <div className="text-sm font-semibold">{tr.name}</div>
                  <div className="text-xs text-gray-400">{tr.email}</div>
                </td>
                <td className="px-4 py-3 text-sm text-center">{tr.date}</td>
                <td className="px-4 py-3 text-sm text-center">{tr.contact}</td>
                <td className="px-4 py-3 text-sm font-semibold text-center">{tr.amount}</td>
                <td className="px-4 py-3 text-sm text-center">{tr.method}</td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                    {tr.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - Hidden on Desktop */}
      <div className="md:hidden flex flex-col gap-4">
        {transactions.map((tr, i) => (
          <div key={i} className="border border-gray-100 rounded-2xl p-4 shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">{tr.name}</span>
              <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full text-xs font-bold">
                {tr.status}
              </span>
            </div>
            <div className="text-xs text-gray-400 mb-2">{tr.email}</div>
            <div className="flex flex-wrap text-sm gap-2">
              <div><strong>ID:</strong> {tr.id}</div>
              <div><strong>Date:</strong> {tr.date}</div>
              <div><strong>Contact:</strong> {tr.contact}</div>
              <div><strong>Amount:</strong> {tr.amount}</div>
              <div><strong>Method:</strong> {tr.method}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
