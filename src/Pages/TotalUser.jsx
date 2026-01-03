import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { useGetUsersQuery } from '../redux/api/userApi';
const UserTableSkeleton = () => {
  return [...Array(6)].map((_, i) => (
    <tr key={i} className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>

      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-28"></div>
      </td>

      <td className="px-6 py-4 text-center">
        <div className="h-5 w-5 bg-gray-200 rounded mx-auto"></div>
      </td>
    </tr>
  ));
};
const UserMobileSkeleton = () => {
  return [...Array(4)].map((_, i) => (
    <div
      key={i}
      className="border border-gray-200 rounded-xl p-4 shadow-sm animate-pulse"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="h-5 w-5 bg-gray-200 rounded"></div>
      </div>

      <div className="h-3 bg-gray-200 rounded w-28"></div>
    </div>
  ));
};

const TotalUser = () => {
  const { data, isLoading, isError } = useGetUsersQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const users = data?.data ? [...data.data].reverse() : [];

  // Search/filter logic
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      (user.name?.toLowerCase() || "").includes(term) ||
      (user.contact?.toLowerCase() || "").includes(term)
    );
  });


  return (
    <div className="px-4 font-manrope bg-white">
      <h2 className="text-lg font-semibold text-[#212121BD] mb-6">Manage Your Users</h2>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search by name or contact"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
        />
      </div>

      {/* Loading/Error */}
      {isError && <p>Failed to load users.</p>}

      {/* Desktop Table */}
      <div className="hidden md:block rounded-t-xl border border-gray-200 shadow-sm">
        <div className="max-h-[500px] overflow-y-auto no-scrollbar rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-[#1a1a1a] text-white sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-sm font-normal">Customer</th>
                <th className="px-6 py-4 text-sm font-normal">Contact</th>
                <th className="px-6 py-4 text-sm font-normal">Joined</th>
                <th className="px-6 py-4 text-sm font-normal text-center">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <UserTableSkeleton />
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-neutral-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#191A1A]">
                            {user.name || "N/D"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{user.contact}</td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                        }}
                        className="text-gray-900 hover:text-gray-600"
                      >
                        <Eye className="w-5 h-5 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {isLoading ? (
          <UserMobileSkeleton />
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-neutral-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#191A1A]">{user.name || "No Name"}</div>
                    <div className="text-xs text-gray-400">{user.contact}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                  className="text-gray-900 hover:text-gray-600 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              <div className="text-sm text-[#191A1A] mb-1">
                <span className="font-semibold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal view */}
      {isModalOpen && selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-[28px] p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">User Details</h2>
            </div>

            <div className="flex items-center gap-4 mb-6 bg-gray-100 rounded-2xl p-4">
              <div className="h-14 w-14 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">{selectedUser.name || "No Name"}</p>
                <p className="text-sm text-gray-500">{selectedUser.contact}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div className="bg-gray-100 rounded-xl p-3">
                <p className="text-gray-500 text-xs">Contact</p>
                <p className="font-semibold text-gray-900">{selectedUser.contact}</p>
              </div>

              <div className="bg-gray-100 rounded-xl p-3">
                <p className="text-gray-500 text-xs">Joined</p>
                <p className="font-semibold text-gray-900">
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalUser;
