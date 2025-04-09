// import { useState, useEffect } from 'react';
// //import api from '../utils/api';

// const ProductsManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     price: 0,
//     description: '',
//     image: ''
//   });
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await api.get('/admin/products');
//       setProducts(response.data.products);
      
//       // Extract unique categories
//       const uniqueCategories = [...new Set(response.data.products.map(p => p.category))];
//       setCategories(uniqueCategories);
      
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await api.post('/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setFormData(prev => ({
//         ...prev,
//         image: response.data.imageUrl
//       }));
//     } catch (err) {
//       setError(err.response?.data?.msg || err.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/admin/products/upload', formData);
//       fetchData();
//       setFormData({
//         name: '',
//         category: '',
//         price: 0,
//         description: '',
//         image: ''
//       });
//     } catch (err) {
//       setError(err.response?.data?.msg || err.message);
//     }
//   };

//   const deleteProduct = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await api.delete(`/admin/products/${id}`);
//         fetchData();
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   if (loading) return <div>Loading products...</div>;
//   if (error) return <div className="error-message">Error: {error}</div>;

//   return (
//     <div className="management-container">
//       <h2>Products Management</h2>
      
//       <div className="form-section">
//         <h3>Add New Product</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Category:</label>
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//               list="categories"
//               required
//             />
//             <datalist id="categories">
//               {categories.map((cat, index) => (
//                 <option key={index} value={cat} />
//               ))}
//             </datalist>
//           </div>
//           <div className="form-group">
//             <label>Price:</label>
//             <input
//               type="number"
//               name="price"
//               min="0"
//               step="0.01"
//               value={formData.price}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Description:</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Image:</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//             />
//             {formData.image && (
//               <div className="image-preview">
//                 <img src={formData.image} alt="Preview" width="100" />
//               </div>
//             )}
//           </div>
//           <button type="submit" className="submit-btn">Add Product</button>
//         </form>
//       </div>

//       <div className="list-section">
//         <h3>Product List</h3>
//         <div className="product-grid">
//           {products.map(product => (
//             <div key={product._id} className="product-card">
//               <div className="product-image">
//                 {product.image ? (
//                   <img src={product.image} alt={product.name} />
//                 ) : (
//                   <div className="no-image">No Image</div>
//                 )}
//               </div>
//               <div className="product-details">
//                 <h4>{product.name}</h4>
//                 <p className="category">{product.category}</p>
//                 <p className="price">${product.price.toFixed(2)}</p>
//                 <p className="description">{product.description}</p>
//                 <div className="product-actions">
//                   <button className="edit-btn">Edit</button>
//                   <button 
//                     className="delete-btn"
//                     onClick={() => deleteProduct(product._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsManagement;

import { useState, useEffect } from 'react';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    description: '',
    image: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/admin/products`);
      const data = await response.json();
      
      setProducts(data.products);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.products.map(p => p.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        image: data.imageUrl
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/admin/products/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      
      fetchData();
      setFormData({
        name: '',
        category: '',
        price: 0,
        description: '',
        image: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api';
        const response = await fetch(`${baseUrl}/admin/products/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        
        fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="management-container">
      <h2>Products Management</h2>
      
      {/* ... rest of the component remains the same ... */}
    </div>
  );
};

export default ProductsManagement;