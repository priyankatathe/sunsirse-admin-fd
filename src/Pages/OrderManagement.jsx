
import React, { useState } from 'react';
import img from '../../public/Group 7.png';
import { Search, Eye, Download, ChevronDown, ChevronDownIcon } from 'lucide-react';
import { useEDITOrderStatusMutation, useGetOrderQuery } from '../redux/api/orderApi';
import { IoLocationSharp } from 'react-icons/io5';
const OrderTableSkeleton = () => {
    return [...Array(6)].map((_, i) => (
        <tr key={i} className="animate-pulse">
            <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
            <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
            <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
            <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
            <td className="px-4 py-3 text-center"><div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div></td>
            <td className="px-4 py-3 text-center"><div className="h-6 bg-gray-200 rounded-full w-28 mx-auto"></div></td>
            <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
            <td className="px-4 py-3 text-center"><div className="h-6 bg-gray-200 rounded-full w-20 mx-auto"></div></td>
            <td className="px-4 py-3 text-center"><div className="h-6 bg-gray-200 rounded w-6 mx-auto"></div></td>
            <td className="px-4 py-3 text-center"><div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div></td>
        </tr>
    ));
};
const OrderMobileSkeleton = () => {
    return [...Array(4)].map((_, i) => (
        <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow border border-gray-100 animate-pulse"
        >
            <div className="flex justify-between items-center mb-3">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
                <div className="h-5 bg-gray-200 rounded w-6"></div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-40"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-36"></div>
            </div>
            <div className="flex gap-2 mt-3">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
        </div>
    ));
};
const OrderManagement = () => {
    const { data, isLoading: orderLoading } = useGetOrderQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusdata, { isLoading }] = useEDITOrderStatusMutation();
    const [paymentFilter, setPaymentFilter] = useState('All'); // Payment filter state
    const [statusFilter, setStatusFilter] = useState('All'); // Status filter state
    const [searchTerm, setSearchTerm] = useState(''); // Search filter state
    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'Processing': return 'bg-orange-50 text-orange-500 border-orange-200';
            case 'Pending': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
            case 'Shipped': return 'bg-blue-50 text-blue-500 border-blue-200';
            case 'paid': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'COD': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            default: return 'bg-gray-50 text-gray-500 border-gray-200';
        }
    };
    const extractPincode = (address = '') => {
        const match = address.match(/\b\d{6}\b/);
        return match ? match[0] : '-';
    };
    // Map API response to a usable format
    const orders = data?.data?.map((item) => {
        const fullAddress = item.address_id?.address || '-';
        const separatePincode = item.address_id?.pincode; // Check for separate pincode field
        return {
            id: item._id,
            // USER
            name: item.user_id?.name || '-',
            email: item.user_id?.email || '-',
            contact: item.user_id?.contact || '-',
            // DATE
            date: new Date(item.createdAt).toLocaleDateString('en-IN'),
            createdAt: item.createdAt,
            // PAYMENT (REAL VALUES → filter/sort)
            paymentMethod: item.paymentMethod, // online | cod
            paymentStatus: item.payment_status, // paid | cod
            // PAYMENT LABEL (UI)
            paymentLabel:
                item.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : 'Online Payment',
            // AMOUNT
            amount: Number(item.amount),
            amountLabel: `₹${item.amount}`,
            // ADDRESS
            address: fullAddress,
            pincode: separatePincode || extractPincode(fullAddress), // Prioritize separate pincode if available
            // PRODUCTS
            products: item.products || [],
        };
    }) || [];
    // Apply filters
    const filteredOrders = orders
        .filter(order => {
            const paymentMatch =
                paymentFilter === 'All' ||
                order.paymentMethod === paymentFilter;
            const statusMatch =
                statusFilter === 'All' ||
                order.paymentStatus === statusFilter;
            const searchMatch =
                !searchTerm ||
                order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.products.some(prod =>
                    prod.product_id?.productname
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            return paymentMatch && statusMatch && searchMatch;
        })
        // ✅ NEW ORDER FIRST
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const handleStatusChange = async (id) => {
        console.log("id", id)
        try {
            const response = await statusdata(id);
        } catch (error) {
            console.log(error);
        }
    }
    const safe = (val = "") =>
        `"${String(val)
            .replace(/"/g, '""')     // quotes safe
            .replace(/\r?\n|\r/g, ' ') // 🚨 REMOVE new lines
        }"`;


    const handleCSVDownload = () => {
        if (!filteredOrders.length) return;
        const headers = [
            "Order ID",
            "Customer",
            "Contact",
            "Amount",
            "Payment Method",
            "Payment Status",
            "Date",
            "Pincode",
            "Address",
        ];
        const rows = filteredOrders.map(order => [
            safe(order.id),
            safe(order.name),
            `="${order.contact}"`,
            `="${order.amount}"`,
            safe(order.paymentLabel),
            safe(order.paymentStatus),
            safe(order.date),     // ✅ Date first
            safe(order.pincode),  // ✅ Pincode
            safe(order.address),  // ✅ Address
        ]);


        // Combine rows
        const csvContent =
            headers.join(",") +
            "\n" +
            rows.map(row => row.join(",")).join("\n");
        // ✅ Add UTF-8 BOM at the start
        const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Orders-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };
    return (
        <div className="px-4 bg-white font-manrope">
            {/* Header */}
            <div className="mb-6">
                <p className="text-lg font-semibold text-[#212121BD]">Manage Your Orders</p>
            </div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                {/* Search */}
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or product"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Filters + Export */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                    {/* Payment Method */}
                    <div className="relative flex-1 sm:flex-none w-full sm:w-auto">
                        <select
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            className="appearance-none bg-gray-100 border-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium text-gray-700 focus:outline-none w-full"
                        >
                            <option value="All">All Payment Methods</option>
                            <option value="cod">Cash on Delivery</option>
                            <option value="online">Online</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                    {/* Status */}
                    <div className="relative flex-1 sm:flex-none w-full sm:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-gray-100 border-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium text-gray-700 focus:outline-none w-full"
                        >
                            <option value="All">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="cod">COD</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                    <button
                        onClick={handleCSVDownload}
                        className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition-all"
                    >
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </div>
            {/* Table - Desktop */}
            <div className="hidden md:block rounded-2xl border border-gray-100 shadow-sm">
                <div className="max-h-[500px] rounded-xl overflow-y-auto no-scrollbar">
                    <table className="w-full text-left table-auto">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-[#1a1a1a] text-white">
                                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider">Order ID</th>
                                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider max-w-[150px]">Customer</th>
                                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider max-w-[150px]">Location</th>
                                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center max-w-[120px]">Contact</th>
                                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center max-w-[120px]">Payment</th>
                                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-start">Amount</th>
                                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center">Status</th>
                                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center">View</th>
                                {paymentFilter === "cod" ? <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center">Action</th> : null}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orderLoading ? (
                                <OrderTableSkeleton />
                            ) : (
                                filteredOrders.map((order, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-gray-50 transition-colors whitespace-nowrap"
                                    >
                                        <td className="px-4 py-3 text-[15px] text-[#191A1A] font-medium whitespace-nowrap">
                                            {order.id}
                                        </td>
                                        <td className="px-4 py-3 truncate max-w-[150px]">
                                            <div className="text-sm font-medium text-[#191A1A] truncate">{order.name}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-[#191A1A] max-w-[220px]">
                                            <p className="line-clamp-5 break-words whitespace-normal">
                                                <span className="block font-semibold">{order.pincode || '-'}</span>
                                                <span className="block">{order.address || '-'}</span>
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-[#191A1A]">{order.date}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-[#191A1A] text-center truncate max-w-[120px]">{order.contact}</td>
                                        <td className="px-4 py-3 text-center max-w-[120px]">
                                            <span className="
    px-3 py-1.5 rounded-full
    border border-emerald-200
    bg-emerald-50 text-emerald-600
    text-xs font-medium
    inline-block
    overflow-hidden
    text-ellipsis
    line-clamp-2
  ">
                                                {order.paymentLabel}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-[16px] font-medium text-[#000000]text-center">{order.amount}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusStyle(order.status)}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => openModal(order)} className="text-gray-900 hover:opacity-60">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                        {paymentFilter === "cod" && order.paymentStatus === "cod" ? <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center cursor-pointer hover:underline"
                                            onClick={() => { console.log("clicked id:", order); handleStatusChange(order.id) }}
                                        >Mark as Paid</td> : null}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Mobile Cards - sm & md */}
            <div className="flex flex-col gap-4 md:hidden">
                {orderLoading ? (
                    <OrderMobileSkeleton />
                ) : (
                    filteredOrders.map((order, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-4 shadow border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <div className="font-bold text-gray-900">{order.name}</div>
                                <button onClick={() => openModal(order)} className="text-gray-900 hover:opacity-60">
                                    <Eye size={18} />
                                </button>
                            </div>
                            <div className="text-xs text-gray-500 mb-1">{order.email}</div>
                            <div className="text-sm text-gray-600 mb-1">Order ID: {order.id}</div>
                            <div className="text-sm text-gray-600 mb-1">Date: {order.date}</div>
                            <div className="text-sm text-gray-600 mb-1">Contact: {order.contact}</div>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600 text-xs font-medium">{order.payment}</span>
                                <span className={`px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusStyle(order.status)}`}>{order.status}</span>
                                <span className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-900 text-xs font-medium">{order.amount}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* Modal */}
            {isModalOpen && selectedOrder && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3 sm:px-4 "
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="
    bg-white
    w-full max-w-full sm:max-w-lg md:max-w-xl
    rounded-[24px] sm:rounded-[28px]
    px-4 sm:px-6 py-5
    shadow-2xl
    max-h-[90vh]
    overflow-y-auto
    no-scrollbar
  "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                            <h2 className="text-base sm:text-lg font-bold text-gray-900">
                                Order Details - {selectedOrder.id}
                            </h2>
                        </div>
                        {/* Customer Info */}
                        <section className="mb-4">
                            <h3 className="text-base sm:text-lg font-bold mb-2">Customer Information</h3>
                            <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-4">
                                <div className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                                    {selectedOrder.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium">{selectedOrder.name}</p>
                                    <p>{selectedOrder.contact}</p>
                                </div>
                            </div>
                        </section>
                        {/* Shipping */}
                        <section className="mb-4">
                            <div className="bg-gray-100 rounded-2xl p-4">
                                <div className="flex items-center gap-2 font-medium mb-1">
                                    <IoLocationSharp size={16} />
                                    Shipping Address
                                </div>
                                <p className="text-sm pl-6">{selectedOrder.address || '-'}</p>
                            </div>
                        </section>
                        {/* Products */}
                        <section className="mb-5">
                            <h3 className="text-base sm:text-lg font-bold mb-2">Product Details</h3>
                            {selectedOrder.products.map((prod, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gray-100 rounded-2xl p-4 flex justify-between items-center gap-3 mb-2"
                                >
                                    {/* Left: Image + Name + Quantity */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-20 bg-white rounded-xl border flex items-center justify-center">
                                            <img
                                                src={prod.product_id?.images[0] || '/placeholder.png'}
                                                alt={prod.product_id?.productname || 'Product'}
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                        <div className="text-lg">
                                            <p className="font-semibold">{prod.product_id?.productname || 'Product Name'}</p>
                                            <p className="text-xs mt-1 font-semibold">Quantity: {prod.quantity}</p>
                                        </div>
                                    </div>
                                    {/* Right: Price */}
                                    <div className="text-lg font-bold text-right">
                                        Price : ₹ {prod.product_id?.price}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
};
export default OrderManagement;