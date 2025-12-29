
import React, { useState } from "react";
import { Search, Eye, Pencil, Trash2, Plus, ChevronDown, X } from "lucide-react";
import img from '../../public/Group 7.png';

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);



  const products = Array(6).fill({
    name: "EcoHeat Pro 2000W Room Heater",
    warranty: "2 Years warranty",
    category: "Heater",
    price: "₹3,499",
    stock: "45 units",
    image: img,
  });

  return (
    <div className="px-4 bg-white  font-manrope relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <p className="text-lg font-semibold text-[#212121BD]">
          Manage Your Products
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            placeholder="Search by name or Category"
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
          />
        </div>

        <div className="relative">
          <select className="appearance-none bg-gray-100 pl-4 pr-10 py-2 rounded-lg text-sm">
            <option>All Categories</option>
            <option>Heater</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
        </div>
      </div>

      {/* ================= TABLE (DESKTOP/TABLET) ================= */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border shadow-sm">
        <table className="w-full  table-fixed">
          <thead>
            <tr className="bg-[#1a1a1a] text-white">
              <th className="px-4 py-4 text-sm text-left w-[30%]">Product</th>
              <th className="px-4 py-4 text-sm text-center w-[15%]">Category</th>
              <th className="px-4 py-4 text-sm text-center w-[15%]">Price</th>
              <th className="px-4 py-4 text-sm text-center w-[15%]">Stock</th>
              <th className="px-4 py-4 text-sm text-center w-[20%]">Action</th>

            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      className="w-12 h-12 rounded-lg"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {item.warranty}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="px-7 py-2  bg-[#D9D9D970] border rounded-full text-xs">
                    {item.category}
                  </span>
                </td>

                <td className="px-6 py-4 text-center font-bold">
                  {item.price}
                </td>

                <td className="px-6 py-4 text-center text-gray-600">
                  {item.stock}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <Eye
                      size={18}
                      className="cursor-pointer"
                      onClick={() => {
                        setViewProduct(item);
                        setIsViewOpen(true);
                      }}
                    />

                    <Pencil
                      size={18}
                      className="cursor-pointer"
                      onClick={() => {
                        setEditProduct(item);
                        setIsEditOpen(true);
                      }}
                    />

                    <Trash2 size={18} className="text-red-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4 ">
        {products.map((item, i) => (
          <div key={i} className="border rounded-xl p-4 shadow-sm">
            <div className="flex gap-3">
              <img
                src={item.image}
                className="w-14 h-14 rounded-lg"
                alt=""
              />
              <div>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-gray-400">{item.warranty}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 mt-3 text-sm">
              <span className="text-gray-500">Category</span>
              <span>{item.category}</span>

              <span className="text-gray-500">Price</span>
              <span className="font-bold">{item.price}</span>

              <span className="text-gray-500">Stock</span>
              <span>{item.stock}</span>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Eye
                size={18}
                className="cursor-pointer"
                onClick={() => {
                  setViewProduct(item);
                  setIsViewOpen(true);
                }}
              />

              <Pencil
                size={18}
                className="cursor-pointer"
                onClick={() => {
                  setEditProduct(item);
                  setIsEditOpen(true);
                }}
              />

              <Trash2 size={18} className="text-red-500" />
            </div>
          </div>
        ))}
      </div>

      {/* --- Add Product Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 p-5 bg-black/50 z-50 flex items-end md:items-center justify-center"
              onClick={() => setIsModalOpen(false)}
        >

          {/* Modal Box */}
          <div
            className="
        bg-white w-full md:max-w-2xl
        rounded-3xl md:rounded-3xl
        p-5 md:p-8
        relative
        max-h-[90vh]
        overflow-y-auto
        animate-slideUp
      "
          >
            {/* Close Button */}
            {/* <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button> */}

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

              {/* Select Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Select Category
                </label>
                <div className="relative">
                  <select className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm appearance-none">
                    <option>Select</option>
                    <option>Heater</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  placeholder="Enter Quantity"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Upload Images */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Upload Images
                </label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* How To Use */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  How To Use
                </label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Key Highlights */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Key Highlights
                </label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Price
                </label>
                <input
                  type="text"
                  placeholder="Enter Price"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex justify-center pt-2 pb-4">
                <button
                  type="button"
                  className="bg-[#1a1a1a] text-white px-10 py-3 rounded-xl font-medium hover:bg-black w-full md:w-auto"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* view product detail modal */}
      {isViewOpen && viewProduct && (
        <div className="fixed inset-0 p-5 bg-black/50 z-50 flex items-center md:items-center justify-center"
              onClick={() => setIsViewOpen(false)}
        >

          <div className="
      bg-white w-full md:max-w-xl
      rounded-3xl
      p-5 md:p-8
      relative
      max-h-[90vh]
      overflow-y-auto
      animate-slideUp
    ">

            {/* Close */}
            {/* <button
              onClick={() => setIsViewOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button> */}

            {/* Product Info */}
            <div className="flex gap-4 mb-6">
              <img
                src={viewProduct.image}
                className="w-20 h-20 rounded-xl"
                alt=""
              />
              <div>
                <p className="text-lg font-semibold">{viewProduct.name}</p>
                <p className="text-sm text-gray-400">{viewProduct.warranty}</p>
                <span className="inline-block mt-2 px-4 py-1 text-xs rounded-full bg-[#D9D9D970] border">
                  {viewProduct.category}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Price</p>
                <p className="font-bold">{viewProduct.price}</p>
              </div>

              <div>
                <p className="text-gray-400">Stock</p>
                <p>{viewProduct.stock}</p>
              </div>
            </div>

          </div>
        </div>
      )}


      {/* edit modal */}
      {isEditOpen && editProduct && (
        <div className="fixed inset-0 p-5 bg-black/50 z-50 flex items-end md:items-center justify-center"
          onClick={() => setIsEditOpen(false)}
        >

          {/* Modal Box */}
          <div
            className="
        bg-white w-full md:max-w-2xl
        rounded-3xl
        p-5 md:p-8
        relative
        max-h-[90vh]
        overflow-y-auto
        animate-slideUp
      "

          >
            {/* Close Button */}
            {/* <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button> */}

            <h2 className="text-xl text-center p-3 font-semibold mb-4">Edit Product</h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Select Category
                </label>
                <div className="relative">
                  <select
                    defaultValue={editProduct.category}
                    className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm appearance-none"
                  >
                    <option>Heater</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  defaultValue={editProduct.name}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>
                <input
                  type="text"
                  defaultValue="Energy efficient heater"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  defaultValue={editProduct.stock}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Upload Image */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Upload Images
                </label>
                <input
                  type="text"
                  defaultValue="image.png"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* How To Use */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  How To Use
                </label>
                <input
                  type="text"
                  defaultValue="Plug & Play"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Key Highlights */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Key Highlights
                </label>
                <input
                  type="text"
                  defaultValue="Low power consumption"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Price
                </label>
                <input
                  type="text"
                  defaultValue={editProduct.price}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex justify-center pt-2 pb-4">
                <button
                  type="button"
                  className="bg-yellow-400 text-white px-10 py-3 rounded-xl font-medium hover:bg-yellow-300 w-full md:w-auto"
                >
                  Update Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}


    </div>
  );
};

export default Product;
