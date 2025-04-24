import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    images: [],
    newCategory: "",
  });
  const [categories, setCategories] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.get(`${apiUrl}/api/product/get-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Use response.data instead of undefined 'data'
      const productsData = response.data.products || response.data;
      setProducts(productsData);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(productsData.map((p) => p.category)),
      ];
      setCategories(uniqueCategories);

      setLoading(false);
    } catch (err) {
      setLoading(false);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/adminDashboard");
        setError("Session expired. Please login again.");
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch products"
        );
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImageUploading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");
      const uploadedImages = [];

      for (const file of files) {
        // Resize the image before uploading
        const resizedImage = await resizeImage(file, 800, 800); // 800x800 max dimensions

        const formData = new FormData();
        formData.append("image", resizedImage);

        const response = await axios.post(
          `${apiUrl}/api/product/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        uploadedImages.push(response.data.imageUrl);
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setImageUploading(false);
    }
  };

  // Image resizing function
  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                })
              );
            },
            "image/jpeg",
            0.8
          ); // 0.8 quality
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.category ||
        !formData.price ||
        formData.images.length === 0
      ) {
        throw new Error(
          "Name, category, price and at least one image are required"
        );
      }

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");

      await axios.post(`${apiUrl}/api/product/upload-product`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
      toast.success("Product added successfully!", setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        images: [],
        newCategory: "",
      }));
    } catch (err) {
      toast.error(err.message || "Failed to add product",setError(err.message));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiUrl}/api/product/update-product/${editingProduct._id}`,
        editingProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProducts();
      toast.success("Product updated successfully!", setEditingProduct(null));
    } catch (error) {
      toast.error("Failed to update product")
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");

      // // Debugging logs
      // console.log("Attempting to delete product ID:", id);
      // console.log("Using API URL:", apiUrl);
      // console.log("Current token exists:", !!token);

      const response = await axios.delete(
        `${apiUrl}/api/product/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Delete response:", response);

      // Optimistically update the UI
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );

      // Optional: Show success message
      setError(null); // Clear any previous errors
     toast.success("Product deleted successfully!")
    } catch (err) {
      toast.error("Detailed delete error:", {
        message: err.message,
        response: err.response,
        stack: err.stack,
      });

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete product";
      setError(errorMessage);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

if (loading) return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading products...</p>
    </div>
  </div>
);

if (error) return (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

return (
  <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <ToastContainer />
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Products Management</h1>
        </div>

        <div className="p-6 space-y-8">
          {/* Add/Edit Product Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2 border-amber-500">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            
            <form onSubmit={editingProduct ? handleUpdateProduct : handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingProduct?.name || formData.name}
                    onChange={editingProduct ? (e) => setEditingProduct({...editingProduct, name: e.target.value}) : handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>

                {/* Category Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="flex gap-2">
                    <select
                      name="category"
                      value={editingProduct?.category || formData.category}
                      onChange={editingProduct ? (e) => setEditingProduct({...editingProduct, category: e.target.value}) : handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="newCategory"
                      placeholder="New Category"
                      value={editingProduct?.newCategory || formData.newCategory}
                      onChange={editingProduct ? (e) => setEditingProduct({...editingProduct, newCategory: e.target.value}) : handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Price Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                    <input
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      value={editingProduct?.price || formData.price}
                      onChange={editingProduct ? (e) => setEditingProduct({...editingProduct, price: e.target.value}) : handleInputChange}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                {/* Images Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      multiple
                      accept="image/*"
                      disabled={imageUploading}
                      className="w-full cursor-pointer"
                    />
                    {imageUploading && <p className="text-sm text-gray-500 mt-2">Uploading images...</p>}
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {(editingProduct?.images || formData.images).map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Preview ${index}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={editingProduct?.description || formData.description}
                    onChange={editingProduct ? (e) => setEditingProduct({...editingProduct, description: e.target.value}) : handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                {editingProduct && (
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  disabled={imageUploading}
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>

          {/* Products Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-800 p-6 border-b border-gray-200">
              Product List
            </h3>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-lg text-gray-800">{product.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-amber-600 font-medium">₹{product.price}</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          {product.category}
                        </span>
                      </div>
                      {product.description && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                      )}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 px-3 py-2 text-sm bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ProductsManagement;