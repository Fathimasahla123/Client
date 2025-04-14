import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        images: [],
        newCategory: "",
      });
    } catch (err) {
      setError(err.message);
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
      setEditingProduct(null);
    } catch (error) {
      alert("Error updating user");
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
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Detailed delete error:", {
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

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="products-management-container">
      <div className="products-header">
        <h2>Products Management</h2>
      </div>

      <div className="products-content">
        {/* Add Product Form */}
        <div className="product-form-section">
          <h3>Add New Product</h3>
          {/* <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3> */}
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <div className="category-selector">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="newCategory"
                  value={formData.newCategory}
                  onChange={handleInputChange}
                  placeholder="Or add new category"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Images:</label>
              <div className="image-upload-container">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  disabled={imageUploading}
                />
                {imageUploading && <p>Uploading images...</p>}
                <div className="image-preview">
                  {formData.images.map((img, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={img} alt={`Preview ${index}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Add Product
            </button>
          </form>
        </div>

        {editingProduct && (
          <form onSubmit={handleUpdateProduct}>
            <h3>Edit Product</h3>

            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <select
                name="category"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="newCategory"
                value={editingProduct.newCategory}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    newCategory: e.target.value,
                  })
                }
                placeholder="Or add new category"
              />
            </div>

            <div className="form-group">
              <label>Price:</label>
              <input
               // type="number"
                name="price"
                // min="0"
                // step="0.01"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Images:</label>
              <div className="image-upload-container">
                <input
                  type="file"
                   onChange={handleImageUpload}
                  
                  multiple
                  accept="image/*"
                  disabled={imageUploading}
                />
                {imageUploading && <p>Uploading images...</p>}
                <div className="image-preview">
                  {formData.images.map((img, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={img} alt={`Preview ${index}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {imageUploading ? "Updating..." : "Update Product"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({
                    name: "",
                    category: "",
                    price: "",
                    description: "",
                    images: [],
                    newCategory: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Products List */}
        <div className="products-list-section">
          <h3>Product List</h3>
          <div className="products-grid">
            {products.length === 0 ? (
              <p className="no-products">No products found</p>
            ) : (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-images">
                    {product.images?.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p className="category">{product.category}</p>
                    <p className="price">${product.price}</p>
                    <p className="description">{product.description}</p>
                  </div>
                  <div className="product-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;
