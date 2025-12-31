
import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Plus,
  ChevronDown,
} from "lucide-react";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} from "../redux/api/productApi";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetCategoriesQuery } from "../redux/api/categoriesApi";
const ProductTableSkeleton = () => {
  return [...Array(6)].map((_, i) => (
    <tr key={i} className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-44"></div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-center">
        <div className="h-6 bg-gray-200 rounded-full w-24 mx-auto"></div>
      </td>

      <td className="px-6 py-4 text-center">
        <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
      </td>

      <td className="px-6 py-4 text-center">
        <div className="h-4 bg-gray-200 rounded w-10 mx-auto"></div>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-4">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
        </div>
      </td>
    </tr>
  ));
};

const ProductMobileSkeleton = () => {
  return [...Array(4)].map((_, i) => (
    <div
      key={i}
      className="border rounded-xl p-4 shadow-sm animate-pulse"
    >
      <div className="flex gap-3">
        <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-2 mt-4">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>

        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>

        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-12"></div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <div className="w-5 h-5 bg-gray-200 rounded"></div>
        <div className="w-5 h-5 bg-gray-200 rounded"></div>
        <div className="w-5 h-5 bg-gray-200 rounded"></div>
      </div>
    </div>
  ));
};

// Yup Validation Schema
const productSchema = yup.object().shape({
  productname: yup
    .string()
    .min(3, "Product name must be at least 3 characters")
    .required("Product name is required"),
  // category: yup.string().required("Please select a category"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be positive")
    .integer("Quantity must be a whole number")
    .required("Quantity is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  howToUse: yup.string().optional(),
  highlights: yup.string().optional(),
});

const Product = () => {
  // RTK Query hooks
  const {
    data: apiData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();
  const {
    data: categoriesData,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [editProduct, { isLoading: isEditing }] = useEditProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] =
    useDeleteProductMutation();

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEditProduct, setCurrentEditProduct] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");


  const products = apiData?.products || [];
  const categoriesapi = categoriesData?.data || []

  // Get unique categories from products
  const categories = [
    ...new Map(
      products
        .filter((p) => p.category && p.category.name)
        .map((p) => [p.category._id, p.category.name])
    ).values(),
  ];

  const filteredProducts = products.filter((item) => {
    // ✅ Category filter
    const categoryMatch =
      selectedCategory === "" ||
      item.category?.name === selectedCategory;

    // ✅ Search filter (product name OR category name)
    const searchMatch =
      item.productname
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.category?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });



  // Add Form
  const addForm = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      productname: "",
      category: "",
      description: "",
      quantity: "",
      price: "",
      howToUse: "",
      highlights: "",
    },
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // Edit Form
  const editForm = useForm({
    resolver: yupResolver(productSchema),
  });

  // Reset add form when modal opens
  useEffect(() => {
    if (isAddModalOpen) {
      addForm.reset();
      setSelectedFiles([]);
    }
  }, [isAddModalOpen, addForm]);

  // Pre-fill edit form
  useEffect(() => {
    if (isEditOpen && currentEditProduct) {
      editForm.reset({
        productname: currentEditProduct.productname || "",
        // category: currentEditProduct.category?._id || currentEditProduct.category || "",
        description: currentEditProduct.description || "",
        quantity: currentEditProduct.quantity || "",
        price: currentEditProduct.price || "",
        howToUse: currentEditProduct.howToUse || "",
        highlights: currentEditProduct.highlights || "",
      });
      setSelectedFiles([]);
    }
  }, [isEditOpen, currentEditProduct, editForm]);

  // Add Submit
  const handleAddSubmit = async (data) => {
    if (selectedFiles.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    const formData = new FormData();

    formData.append("productname", data.productname);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("quantity", Number(data.quantity));
    formData.append("price", Number(data.price));
    formData.append("howToUse", data.howToUse || "");
    formData.append("highlights", data.highlights || "");

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await addProduct(formData).unwrap();
      setIsAddModalOpen(false);
      addForm.reset();
      setSelectedFiles([]);
      refetch();
      alert("Product added successfully!");
    } catch (err) {
      console.error("Add product failed:", err);
      alert("Failed to add product: " + (err?.data?.message || err.message));
    }
  };

  // Edit Submit
  const handleEditSubmit = async (data) => {
    const formData = new FormData();

    formData.append("productname", data.productname);
    // formData.append("category", data.category); // 🔥 Uncommented for category update
    formData.append("description", data.description);
    formData.append("quantity", Number(data.quantity));
    formData.append("price", Number(data.price));
    formData.append("howToUse", data.howToUse || "");
    formData.append("highlights", data.highlights || "");

    // if (selectedFiles.length > 0) {
    //   selectedFiles.forEach((file) => {
    //     formData.append("images", file);
    //   });
    // }

    try {
      await editProduct({
        id: currentEditProduct._id,
        formData,
      }).unwrap();
      setIsEditOpen(false);
      editForm.reset();
      setCurrentEditProduct(null);
      setSelectedFiles([]);
      refetch();
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Edit failed:", err);
      alert("Failed to update product: " + (err?.data?.message || err.message));
    }
  };

  const openEditModal = (product) => {
    console.log("Edit clicked", product); // Check console for product data
    if (!product) {
      alert("Product data is undefined. Please refresh and try again.");
      return;
    }
    setCurrentEditProduct(product);
    setIsEditOpen(true);
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id).unwrap();
      refetch();
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error?.data?.message || "Failed to delete product");
    }
  };



  if (isError) {
    return (
      <div className="px-4 py-10 text-center text-red-600">
        Error loading products: {error?.data?.message || "Unknown error"}
      </div>
    );
  }
  return (
    <div className="px-4 bg-white font-manrope relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <p className="text-lg font-semibold text-[#212121BD]">
          Manage Your Products
        </p>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/*  Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            placeholder="Search by name or Category"
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        <div className="relative">
          <select
            className="appearance-none bg-gray-100 pl-4 pr-10 py-2 rounded-lg text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>


          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-2xl border shadow-sm">
        <div className="max-h-[500px] rounded-xl overflow-y-auto no-scrollbar">
          <table className="w-full table-fixed">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#1a1a1a] text-white">
                <th className="px-4 py-4 text-sm text-left w-[30%]">Product</th>
                <th className="px-4 py-4 text-sm text-center w-[15%]">Category</th>
                <th className="px-4 py-4 text-sm text-center w-[15%]">Price</th>
                <th className="px-4 py-4 text-sm text-center w-[15%]">Stock</th>
                <th className="px-4 py-4 text-sm text-center w-[20%]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <ProductTableSkeleton />
              ) : (
                filteredProducts.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <img
                          src={item.images?.[0] || "https://via.placeholder.com/48"} // 🔥 Safe access
                          className="w-12 h-12 rounded-lg object-cover"
                          alt={item.productname}
                        />
                        <div>
                          <p className="font-semibold text-sm">{item.productname}</p>
                          <p className="text-xs text-gray-400">{item.description || "No description"}</p> {/* 🔥 Safe */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-7 py-2 bg-[#D9D9D970] border rounded-full text-xs">
                        {item.category?.name || item.category || "Fan"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold">
                      ₹{item.price || 0}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {item.quantity || 0}
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
                          onClick={() => openEditModal(item)}
                        />
                        <Trash2
                          size={18}
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDelete(item._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {isLoading ? (
          <ProductMobileSkeleton />
        ) : (
          products.map((item) => (
            <div key={item._id} className="border rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/56"} // 🔥 Safe access
                  className="w-14 h-14 rounded-lg object-cover"
                  alt={item.productname}
                />
                <div>
                  <p className="font-semibold text-sm">{item.productname}</p>
                  <p className="text-xs text-gray-400">{item.description || "No description"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-2 mt-3 text-sm">
                <span className="text-gray-500">Category</span>
                <span>{item.category?.name || item.category || "Fan"}</span>

                <span className="text-gray-500">Price</span>
                <span className="font-bold">₹{item.price || 0}</span>

                <span className="text-gray-500">Stock</span>
                <span>{item.quantity || 0}</span>
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
                  onClick={() => openEditModal(item)}
                />
                <Trash2
                  size={18}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 p-5 bg-black/50 z-50 flex items-end md:items-center justify-center"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white w-full md:max-w-2xl rounded-3xl p-5 md:p-5  relative max-h-[100vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-center font-semibold mb-6">Add New Product</h2>

            <form onSubmit={addForm.handleSubmit(handleAddSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  {...addForm.register("category")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm appearance-none"
                >
                  <option value="">Select</option>
                  {categoriesapi.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </option>
                  ))}
                </select>
                {addForm.formState.errors.category && (
                  <p className="text-red-500 text-xs mt-1">{addForm.formState.errors.category.message}</p>
                )}
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  {...addForm.register("productname")}
                  placeholder="Enter Name"
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
                {addForm.formState.errors.productname && (
                  <p className="text-red-500 text-xs mt-1">{addForm.formState.errors.productname.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  rows={3}
                  {...addForm.register("description")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm resize-none"
                />
                {addForm.formState.errors.description && (
                  <p className="text-red-500 text-xs mt-1">{addForm.formState.errors.description.message}</p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <input
                  type="number"
                  {...addForm.register("quantity")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
                {addForm.formState.errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">{addForm.formState.errors.quantity.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold mb-2">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  {...addForm.register("price")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
                {addForm.formState.errors.price && (
                  <p className="text-red-500 text-xs mt-1">{addForm.formState.errors.price.message}</p>
                )}
              </div>

              {/* How To Use */}
              <div>
                <label className="block text-sm font-semibold mb-2">How To Use</label>
                <input
                  type="text"
                  {...addForm.register("howToUse")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Key Highlights */}
              <div>
                <label className="block text-sm font-semibold mb-2">Key Highlights</label>
                <input
                  type="text"
                  {...addForm.register("highlights")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Image Upload with Preview */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm cursor-pointer file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isAdding}
                  className="bg-[#1a1a1a] text-white px-10 py-3 rounded-xl font-medium hover:bg-black w-full md:w-auto disabled:opacity-70"
                >
                  {isAdding ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {isViewOpen && viewProduct && (
        <div
          className="fixed inset-0 p-5 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setIsViewOpen(false)}
        >
          <div className="bg-white w-full md:max-w-xl rounded-3xl p-5 md:p-8 relative max-h-[90vh] overflow-y-auto">
            <div className="flex gap-4 mb-6">
              <img
                src={viewProduct.images?.[0] || "https://via.placeholder.com/80"} // 🔥 Safe access
                className="w-20 h-20 rounded-xl object-cover"
                alt={viewProduct.productname}
              />
              <div>
                <p className="text-lg font-semibold">{viewProduct.productname || "Unnamed Product"}</p> {/* 🔥 Safe */}
                <span className="inline-block mt-2 px-4 py-1 text-xs rounded-full bg-[#D9D9D970] border">
                  {viewProduct.category?.name || viewProduct.category || "Fan"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Price</p>
                <p className="font-bold">₹{viewProduct.price || 0}</p>
              </div>
              <div>
                <p className="text-gray-400">Stock</p>
                <p>{viewProduct.quantity || 0} units</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="mt-6">
                <p className="text-gray-400">Description</p>
                <p>{viewProduct.description || "No description"}</p>
              </div>

              <div className="mt-6">
                <p className="text-gray-400">Highlights</p>
                <p>{viewProduct.highlights || "No highlights"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditOpen && currentEditProduct && (
        <div
          className="fixed inset-0 p-5 bg-black/50 z-50 flex items-end md:items-center justify-center"
          onClick={() => {
            setIsEditOpen(false);
            setCurrentEditProduct(null);
            setSelectedFiles([]);
          }}
        >
          <div
            className="bg-white w-full md:max-w-2xl rounded-3xl p-5 md:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-center font-semibold mb-6">Edit Product</h2>
            <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">


              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  {...editForm.register("productname")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
                {editForm.formState.errors.productname && (
                  <p className="text-red-500 text-xs mt-1">{editForm.formState.errors.productname.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  rows={3}
                  {...editForm.register("description")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm resize-none"
                />
                {editForm.formState.errors.description && (
                  <p className="text-red-500 text-xs mt-1">{editForm.formState.errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <input
                  type="number"
                  {...editForm.register("quantity")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
                {editForm.formState.errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">{editForm.formState.errors.quantity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  {...editForm.register("price")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
                {editForm.formState.errors.price && (
                  <p className="text-red-500 text-xs mt-1">{editForm.formState.errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">How To Use</label>
                <input
                  type="text"
                  {...editForm.register("howToUse")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Key Highlights</label>
                <input
                  type="text"
                  {...editForm.register("highlights")}
                  className="w-full bg-[#f3f4f6] rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div className="md:col-span-2 flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isEditing}
                  className="bg-yellow-400 text-black px-10 py-3 rounded-xl font-medium hover:bg-yellow-300 w-full md:w-auto disabled:opacity-70"
                >
                  {isEditing ? "Updating..." : "Update Product"}
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