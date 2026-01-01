import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useGetTransactionQuery } from '../redux/api/orderApi';
const TableSkeleton = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <tr key={i} className="animate-pulse">
        <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
        <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
        <td className="px-4 py-3 text-center"><div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div></td>
        <td className="px-4 py-3 text-center"><div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div></td>
        <td className="px-4 py-3 text-center"><div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div></td>
        <td className="px-4 py-3 text-center"><div className="h-6 bg-gray-200 rounded-full w-20 mx-auto"></div></td>
      </tr>
    ))}
  </>
);

const MobileSkeleton = () => (
  <>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="border rounded-2xl p-4 animate-pulse">
        <div className="flex justify-between mb-3">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-5 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-40"></div>
          <div className="h-3 bg-gray-200 rounded w-28"></div>
        </div>
      </div>
    ))}
  </>
);

const Transactions = () => {
  const { data, isLoading } = useGetTransactionQuery()

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");


  const transactions = data?.data?.map((tr) => ({
    id: tr._id,
    name: tr.user_id?.name || "Anonymous",
    email: tr.user_id?.email || "-",
    date: new Date(tr.createdAt).toLocaleDateString("en-GB"),
    contact: tr.user_id?.contact || "-",
    amount: `₹${tr.amount}`,
    // method: tr.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online',
    status: tr.payment_status

  }));
  const filteredTransactions = transactions?.filter((tr) => {
    const searchMatch =
      tr.name?.toLowerCase().includes(search.toLowerCase()) ||
      tr.contact?.includes(search);

    const statusMatch =
      status === "all" || tr.status === status;

    return searchMatch && statusMatch;
  });




  return (
    <div className="px-4 bg-white font-manrope">
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl"
          />

        </div>

        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
          <Filter size={18} />
          <select
            className="bg-transparent text-sm outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="cod">COD</option>
          </select>

        </div>
      </div>

      {/* Desktop Table - Hidden on Mobile */}
      <div className="hidden md:block border border-gray-100 rounded-2xl shadow-sm">
        <div className="max-h-[500px] rounded-xl overflow-y-auto no-scrollbar">
          <table className="w-full overflow-x-auto">
            <thead className="bg-[#1a1a1a] text-white sticky top-0 z-20">
              <tr>
                <th className="px-4 py-3 text-xs text-left whitespace-nowrap">Transaction ID</th>
                <th className="px-4 py-3 text-xs text-left whitespace-nowrap">Customer</th>
                <th className="px-4 py-3 text-xs text-center whitespace-nowrap">Date</th>
                <th className="px-4 py-3 text-xs text-center whitespace-nowrap">Contact</th>
                <th className="px-4 py-3 text-xs text-center whitespace-nowrap">Amount</th>
                {/* <th className="px-4 py-3 text-xs text-center whitespace-nowrap">Method</th> */}
                <th className="px-4 py-3 text-xs text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoading ? (
                <TableSkeleton />
              ) : (
                filteredTransactions?.map((tr, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{tr.id}</td>
                    <td className="px-4 py-3">{tr.name}</td>
                    <td className="px-4 py-3 text-center">{tr.date}</td>
                    <td className="px-4 py-3 text-center">{tr.contact}</td>
                    <td className="px-4 py-3 text-center">{tr.amount}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${tr.status === "paid"
                        ? "bg-[#04C53B2B] text-[#2C7E00]"
                        : "bg-gray-200"
                        }`}>
                        {tr.status.toUpperCase()}
                      </span>

                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Mobile Cards - Hidden on Desktop */}
      <div className="md:hidden flex flex-col gap-4">
        {isLoading ? (
          <MobileSkeleton />
        ) : (
          filteredTransactions?.map((tr, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4 shadow-sm bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">{tr.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${tr.status === "Paid" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                  {tr.status}
                </span>
              </div>
              <div className="flex flex-wrap text-sm gap-2">
                <div><strong>ID:</strong> {tr.id}</div>
                <div><strong>Date:</strong> {tr.date}</div>
                <div><strong>Contact:</strong> {tr.contact}</div>
                <div><strong>Amount:</strong> {tr.amount}</div>
                {/* <div><strong>Method:</strong> {tr.method}</div> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
