import React, { useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import bgimg from '../../public/1 (2).png';
import img1 from '../../public/1 (1).png';
import img2 from '../../public/1 (3).png';

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    {
      id: 1, name: "Room Heaters", items: 3,
      bgImg: bgimg,
      fgImg: img2
    },
    {
      id: 2, name: "Room Heaters", items: 3,
      bgImg: bgimg,
      fgImg: img1
    },
  ];

  return (
    <div className="px-4 bg-white  font-manrope">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          {/* <h1 className="text-3xl font-bold text-gray-900">Categories</h1> */}
          <p className="text-lg font-semibold text-[#212121BD]">Manage all Categories</p>
        </div>
        {/* Updated Button to open modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center mt-2 gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition-all shadow-sm"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Responsive Grid System */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-gray-50 rounded-xl  border border-gray-100 shadow-sm overflow-hidden">
            <div className="relative h-48 w-full bg-white  flex items-center justify-center mb-4 overflow-hidden">
              {/* Background Image */}
              <img
                src={cat.bgImg}
                alt={`${cat.name} background`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Foreground Image */}
              <img
                src={cat.fgImg}
                alt={`${cat.name} foreground`}
                className="relative mt-6 max-h-32 object-contain z-10"
              />
            </div>

            <div className="px-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.name}</h3>
              <div className="inline-block px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 bg-gray-100/50 mb-6">
                {cat.items} Items
              </div>

              <div className="flex gap-3 p-2 mt-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                  <Pencil size={16} />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#ff1a1a] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shadow-sm">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* --- Add New Category Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-8">Add New Category</h2>

            <form className="space-y-6">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Category Name</label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="w-full bg-[#f8f9fa] border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-gray-200 outline-none placeholder:text-gray-400"
                />
              </div>

              {/* Category Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Category Image</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Upload"
                    className="w-full bg-[#f8f9fa] border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-gray-200 outline-none placeholder:text-gray-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  className="w-full bg-[#1a1a1a] text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Plus size={18} />
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;