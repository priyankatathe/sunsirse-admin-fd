import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import bgimg from "../../public/1 (2).png";
import {
  useAddCategoriesMutation,
  useDeleteCategoriesMutation,
  useEditCategoriesMutation,
  useGetCategoriesQuery,
} from "../redux/api/categoriesApi";
import { useForm } from "react-hook-form";

/* ---------------- Skeleton ---------------- */
const SkeletonCard = () => (
  <div className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
    <div className="relative h-48 w-full bg-gray-200 mb-4"></div>
    <div className="px-2 space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="flex gap-3 p-2 mt-2">
        <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
        <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  </div>
);

/* ---------------- Component ---------------- */
const Categories = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const [addCategories, { isLoading: isAdding }] = useAddCategoriesMutation();
  const [EditCategories, { isLoading: isEditing }] = useEditCategoriesMutation();
  const [deleteCategories, { isLoading: isDeleting }] = useDeleteCategoriesMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  /* ---------- ADD ---------- */
  const onAddSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", data.image[0]);
      await addCategories(formData).unwrap();
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  /* ---------- EDIT ---------- */
  const handleEditClick = (cat) => {
    setSelectedCategory(cat);
    setValue("name", cat.name);
    setValue("image", null);
    setIsEditModalOpen(true);
  };

  const onEditSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      await EditCategories({ id: selectedCategory.id, data: formData }).unwrap();
      setIsEditModalOpen(false);
      reset();
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      await deleteCategories(id).unwrap();
      alert("Category deleted successfully ✅");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete category ❌");
    }
  };

  /* ---------- DATA ---------- */
  const categories = data?.data?.map((cat) => ({
    id: cat._id,
    name: cat.name,
    bgImg: bgimg,
    fgImg: cat.image,
  })) || [];

  return (
    <div className="px-4 bg-white font-manrope">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-lg font-semibold text-[#212121BD]">
          Manage all Categories
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(isLoading || isAdding || isEditing || isDeleting)
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : categories.map((cat) => (
            <div key={cat.id} className="bg-gray-50 rounded-xl border shadow-sm">
              <div className="relative h-48 flex items-center justify-center">
                <img src={cat.bgImg} className="absolute inset-0 w-full h-full object-cover" />
                <img src={cat.fgImg} className="relative max-h-32 object-contain" />
              </div>
              <div className="p-3">
                <h3 className="font-bold">{cat.name}</h3>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleEditClick(cat)}
                    disabled={isEditing || isAdding || isDeleting}
                    className="flex-1 border rounded-xl py-2 flex justify-center gap-2 disabled:opacity-50"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    disabled={isEditing || isAdding || isDeleting}
                    className="flex-1 bg-red-600 text-white rounded-xl py-2 flex justify-center gap-2 disabled:opacity-50"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ---------------- Add Modal ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-6">Add Category</h2>
            <form onSubmit={handleSubmit(onAddSubmit)} className="space-y-5">
              <div>
                <input type="file" accept="image/*" {...register("image", { required: "Image is required" })} className="w-full border rounded-lg px-3 py-2" />
                {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
              </div>
              <div>
                <input type="text" placeholder="Category Name" {...register("name", { required: "Category name is required" })} className="w-full bg-gray-100 rounded-xl px-4 py-3" />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>
              <button className="w-full bg-black text-white py-3 rounded-xl" disabled={isAdding}>
                {isAdding ? "Adding..." : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- Edit Modal ---------------- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center" onClick={() => setIsEditModalOpen(false)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-6">Edit Category</h2>
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-5">
              <input type="file" accept="image/*" {...register("image")} className="w-full border rounded-lg px-3 py-2" />
              <input type="text" {...register("name", { required: "Category name is required" })} className="w-full bg-gray-100 rounded-xl px-4 py-3" />
              <button className="w-full bg-black text-white py-3 rounded-xl" disabled={isEditing}>
                {isEditing ? "Updating..." : "Update Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default Categories;
