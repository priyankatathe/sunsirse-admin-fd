import React from 'react';
import { Search, Eye } from 'lucide-react';

const TotalUser = () => {
  const customers = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "Sarah.Chen@Email.Com",
      location: "Pune",
      contact: "+91 2222 222 222",
      orders: 12,
      joined: "20/12/2025",
      spent: "$328,500",
      initials: "SC"
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "Sarah.Chen@Email.Com",
      location: "Mumbai",
      contact: "+91 2222 222 222",
      orders: 12,
      joined: "20/12/2025",
      spent: "$328,500",
      initials: "SC"
    }
  ];

  return (
    <div className="px-4 font-manrope bg-white">
      <h2 className="text-lg font-semibold text-[#212121BD] mb-6">Manage Your Products</h2>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search by name or email"
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-t-xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-[#1a1a1a] text-white">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">Customer</th>
              <th className="px-6 py-4 text-sm font-normal">Location</th>
              <th className="px-6 py-4 text-sm font-normal">Contact</th>
              <th className="px-6 py-4 text-sm font-normal">Orders</th>
              <th className="px-6 py-4 text-sm font-normal">Joined</th>
              <th className="px-6 py-4 text-sm font-normal">Total Spent</th>
              <th className="px-6 py-4 text-sm font-normal text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-neutral-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {customer.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#191A1A]">{customer.name}</div>
                      <div className="text-xs text-gray-400">{customer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#191A1A]">{customer.location}</td>
                <td className="px-6 py-4 text-sm text-[#191A1A]">{customer.contact}</td>
                <td className="px-6 py-4 text-sm text-[#191A1A]">{customer.orders}</td>
                <td className="px-6 py-4 text-sm text-[#191A1A]">{customer.joined}</td>
                <td className="px-6 py-4 text-sm font-semibold text-[#177A3A]">{customer.spent}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-gray-900 hover:text-gray-600 transition-colors">
                    <Eye className="w-5 h-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-neutral-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {customer.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#191A1A]">{customer.name}</div>
                  <div className="text-xs text-gray-400">{customer.email}</div>
                </div>
              </div>
              <button className="text-gray-900 hover:text-gray-600 transition-colors">
                <Eye className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm text-[#191A1A] mb-1"><span className="font-semibold">Location:</span> {customer.location}</div>
            <div className="text-sm text-[#191A1A] mb-1"><span className="font-semibold">Contact:</span> {customer.contact}</div>
            <div className="text-sm text-[#191A1A] mb-1"><span className="font-semibold">Orders:</span> {customer.orders}</div>
            <div className="text-sm text-[#191A1A] mb-1"><span className="font-semibold">Joined:</span> {customer.joined}</div>
            <div className="text-sm font-semibold text-[#177A3A]"><span className="font-semibold">Total Spent:</span> {customer.spent}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalUser;
