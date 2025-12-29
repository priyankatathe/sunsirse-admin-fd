import React, { useState } from 'react';
import img from '../../public/Group 7.png';
import { Search, Eye, Download, ChevronDown, X, MapPin, ChevronDownIcon } from 'lucide-react';
import { IoLocationSharp } from 'react-icons/io5';

const OrderManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const orders = [
        { id: "ORD-2345", name: "Sarah Chen", email: "Sara@Gmail.Com", date: "20/02/2025", contact: "+91 2222 222 222", payment: "Cash on Delivery", amount: "₹3,499", status: "Delivered" },
        { id: "ORD-2346", name: "John Doe", email: "John@Gmail.Com", date: "21/02/2025", contact: "+91 3333 333 333", payment: "UPI", amount: "₹2,999", status: "Processing" },
        { id: "ORD-2347", name: "Alice Smith", email: "Alice@Gmail.Com", date: "22/02/2025", contact: "+91 4444 444 444", payment: "Card", amount: "₹4,499", status: "Pending" },
        { id: "ORD-2348", name: "Bob Lee", email: "Bob@Gmail.Com", date: "23/02/2025", contact: "+91 5555 555 555", payment: "Cash on Delivery", amount: "₹1,499", status: "Shipped" },
    ];

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
            default: return 'bg-gray-50 text-gray-500 border-gray-200';
        }
    };

    return (
        <div className="px-4  bg-white font-manrope">
            {/* Header */}
            <div className="mb-6">
                <p className="text-lg font-semibold text-[#212121BD]">Manage Your Orders</p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or Category"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none w-full sm:w-auto">
                        <select className="appearance-none bg-gray-100 border-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium text-gray-700 focus:outline-none w-full">
                            <option>All Status</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                    <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition-all">
                        <Download size={18} /> Export
                    </button>
                </div>
            </div>

            {/* Table - Desktop */}
            <div className="overflow-x-hidden rounded-2xl border border-gray-100 shadow-sm hidden md:block">
                <table className="w-full text-left table-auto">
                    <thead>
                        <tr className="bg-[#1a1a1a] text-white">
                            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider">Order ID</th>
                            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider max-w-[150px]">Customer</th>
                            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center max-w-[120px]">Contact</th>
                            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center max-w-[120px]">Payment</th>
                            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center">Amount</th>
                            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center">Status</th>
                            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders.map((order, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors whitespace-nowrap">
                                <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-[100px]">{order.id}</td>
                                <td className="px-4 py-3 truncate max-w-[150px]">
                                    <div className="text-sm font-medium text-gray-900 truncate">{order.name}</div>
                                    <div className="text-xs text-gray-400 truncate">{order.email}</div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                                <td className="px-4 py-3 text-sm text-gray-600 text-center truncate max-w-[120px]">{order.contact}</td>
                                <td className="px-4 py-3 text-center truncate max-w-[120px]">
                                    <span className="px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs font-medium">
                                        {order.payment}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center">{order.amount}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button onClick={() => openModal(order)} className="text-gray-900 hover:opacity-60">
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* Mobile Cards - sm & md */}
            <div className="flex flex-col gap-4 md:hidden">
                {orders.map((order, idx) => (
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
                            <span className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600 text-xs font-medium">
                                {order.payment}
                            </span>
                            <span className={`px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusStyle(order.status)}`}>
                                {order.status}
                            </span>
                            <span className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-900 text-xs font-medium">
                                {order.amount}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* update status Modal */}
            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="bg-white  w-full max-w-xl md:max-w-xl  rounded-[28px] p-6 shadow-2xl animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                Order Details - {selectedOrder.id}
                            </h2>

                            <div className="flex items-center gap-3 ">
                                <div className="relative inline-block">
                                    <select className="appearance-none bg-gray-100 text-sm font-medium px-5 py-2 pr-10 rounded-full outline-none cursor-pointer focus:ring-2 focus:ring-gray-300">
                                        <option>Delivered</option>
                                        <option>Pending</option>
                                        <option>Cancelled</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
                                </div>
                               
                            </div>
                        </div>

                        {/* Customer Info */}
                        <section className="mb-5">
                            <h3 className="text-lg font-bold text-[#000000] mb-2">
                                Customer Information
                            </h3>

                            <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                                    {selectedOrder.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>

                                <div>
                                    <p className="font-medium text-[#191A1A]">
                                        {selectedOrder.name}
                                    </p>
                                    <p className="text-sm font-medium    text-[#212121BD]">
                                        {selectedOrder.email}
                                    </p>
                                    <p className="text-sm font-medium  text-[#191A1A]">
                                        {selectedOrder.contact}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section className="mb-5">
                            <div className="bg-gray-100 rounded-2xl p-4">
                                <div className="flex items-center gap-2 font-medium text-#000000 mb-1">
                                    <IoLocationSharp size={16} />
                                    Shipping Address
                                </div>

                                <p className="text-sm text-[#000000] font-medium leading-relaxed pl-6">
                                    {selectedOrder.address ||
                                        "123 MG Road, Bangalore, Karnataka 560001"}
                                </p>
                            </div>
                        </section>

                        {/* Product Details */}
                        <section className="mb-6">
                            <h3 className="text-lg font-bold text-[#000000] mb-2">
                                Product Details
                            </h3>

                            <div className="bg-gray-100 rounded-2xl p-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-12 bg-white rounded-xl border flex items-center justify-center">
                                        <img
                                            src={img}
                                            alt="product"
                                            className="object-contain"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[#000000]">
                                            {selectedOrder.product ||
                                                "SmartTemp WiFi Enabled Geyser 15L"}
                                        </p>
                                        <p className="text-xs mt-3 font-semibold text-[#000000]">
                                            Quantity: 1
                                        </p>
                                    </div>
                                </div>

                                <p className="font-semibold text-gray-900">
                                    {selectedOrder.productPrice || "₹10,399"}
                                </p>
                            </div>
                        </section>

                        {/* Action Button */}
                        <div className='text-center'>
                            <button className="w-[30%]  bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-900 transition">
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default OrderManagement;
