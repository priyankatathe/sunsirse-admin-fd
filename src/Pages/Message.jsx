import React from "react";
import { useGetMessagesQuery } from "../redux/api/messageApi";
const TableSkeleton = () => {
    return (
        <>
            {[...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                    {[...Array(5)].map((_, j) => (
                        <td key={j} className="px-4 py-3">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};

const CardSkeleton = () => {
    return (
        <>
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="border rounded-xl p-4 shadow-sm animate-pulse"
                >
                    <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
            ))}
        </>
    );
};

const Message = () => {
    const { data, isLoading } = useGetMessagesQuery();

    const messages = data?.data || [];

    return (
        <div className="p-4 font-manrope">

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block rounded-2xl mt-5 border border-gray-100 shadow-sm">
                <div className="max-h-[500px] rounded-xl overflow-y-auto no-scrollbar">
                    <table className="w-full text-left table-auto">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-[#1a1a1a] text-white">
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Contact</th>
                                <th className="px-4 py-2">Message</th>
                                <th className="px-4 py-2">Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <TableSkeleton />
                            ) : messages.length > 0 ? (
                                messages.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{item.name}</td>
                                        <td className="px-4 py-2">{item.email}</td>
                                        <td className="px-4 py-2">{item.contact || "-"}</td>
                                        <td className="px-4 py-2 max-w-xs truncate">
                                            {item.message}
                                        </td>
                                        <td className="px-4 py-2">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        No messages found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden space-y-4 mt-4">
                {isLoading ? (
                    <CardSkeleton />
                ) : messages.length > 0 ? (
                    messages.map((item) => (
                        <div key={item._id} className="border rounded-xl p-4 shadow-sm">
                            <p className="font-semibold text-lg">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.email}</p>

                            {item.contact && (
                                <p className="text-sm mt-1">
                                    📞 <span className="font-medium">{item.contact}</span>
                                </p>
                            )}

                            <p className="text-sm mt-2 text-gray-700">
                                {item.message}
                            </p>

                            <p className="text-xs text-gray-400 mt-2">
                                {new Date(item.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No messages found</p>
                )}
            </div>
        </div>
    );
};

export default Message;
