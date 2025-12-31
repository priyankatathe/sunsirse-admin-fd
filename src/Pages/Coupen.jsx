import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { useAddCoupenMutation, useDeleteCoupenMutation, useEditCoupenMutation, useGetCoupenQuery } from "../redux/api/coupenApi";
const CouponSkeleton = () => {
    return [...Array(6)].map((_, i) => (
        <div
            key={i}
            className="border rounded-2xl p-5 shadow-sm animate-pulse"
        >
            <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>

            <div className="h-5 bg-gray-200 rounded w-24 mb-4"></div>

            <div className="h-3 bg-gray-200 rounded w-40 mb-6"></div>

            <div className="flex justify-between">
                <div className="h-10 w-[40%] bg-gray-200 rounded-lg"></div>
                <div className="h-10 w-[40%] bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    ));
};


const Coupen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState("");
    const [offer, setOffer] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editId, setEditId] = useState(null);


    const [addCoupen, { isLoading: addLoading }] = useAddCoupenMutation();
    const [editCoupen, { isLoading: editLoading }] = useEditCoupenMutation();
    const [deleteCoupen] = useDeleteCoupenMutation();
    const { data, refetch, isLoading } = useGetCoupenQuery();

    const handleEdit = (item) => {
        setIsOpen(false);
        setEditId(item._id);
        setCode(item.coupen_Code);
        setOffer(item.offer);
        setIsEditOpen(true);
    };


    // 🔹 Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addCoupen({
                coupen_Code: code,
                offer,
            }).unwrap();

            setCode("");
            setOffer("");
            setIsOpen(false);
            refetch();
        } catch (err) {
            console.error(err);
        }
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            await editCoupen({
                id: editId,
                coupen_Code: code,
                offer,
            }).unwrap();

            setIsEditOpen(false);
            setCode("");
            setOffer("");
            refetch();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this coupon?")) return;

        try {
            await deleteCoupen(id).unwrap();
            alert("Coupon deleted successfully ✅");
            refetch();
        } catch (err) {
            console.error(err);
            alert("Failed to delete coupon ❌");
        }
    };



    return (
        <div className="p-4 bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold"></h2>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Coupon
                </button>
            </div>

            {/* ================= MODAL ================= */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-white w-full max-w-md rounded-2xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold">Add Coupon</h3>
                            <X
                                className="cursor-pointer"
                                onClick={() => setIsOpen(false)}
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                required
                            />

                            <input
                                type="number"
                                placeholder="Offer Amount"
                                value={offer}
                                onChange={(e) => setOffer(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                required
                            />

                            <button
                                type="submit"
                                disabled={addLoading}
                                className="w-full bg-black text-white py-2 rounded-lg text-sm"
                            >
                                {addLoading ? "Adding..." : "Add Coupon"}
                            </button>

                        </form>
                    </div>
                </div>
            )}

            {isEditOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
                    onClick={() => setIsEditOpen(false)}
                >
                    <div
                        className="bg-white w-full max-w-md rounded-2xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold">Edit Coupon</h3>
                            <X
                                className="cursor-pointer"
                                onClick={() => setIsEditOpen(false)}
                            />
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                required
                            />

                            <input
                                type="number"
                                value={offer}
                                onChange={(e) => setOffer(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                required
                            />

                            <button
                                type="submit"
                                disabled={editLoading}
                                className="w-full bg-yellow-500 text-white py-2 rounded-lg text-sm"
                            >
                                {editLoading ? "Updating..." : "Update Coupon"}
                            </button>
                        </form>
                    </div>
                </div>
            )}


            {/* ================= COUPON CARDS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <CouponSkeleton />
                ) : (
                    data?.data?.map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                        >
                            <p className="text-lg font-bold">
                                {item.coupen_Code}
                            </p>

                            <p className="text-green-600 font-semibold mt-1">
                                ₹{item.offer} OFF
                            </p>

                            <p className="text-xs text-gray-500 mt-2">
                                Created on{" "}
                                {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                            <div className="mt-5 flex justify-between">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="px-4 py-3 w-[40%] text-xs rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="px-4 py-3 w-[40%]  text-xs rounded-lg bg-red-500 text-white hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Coupen;
