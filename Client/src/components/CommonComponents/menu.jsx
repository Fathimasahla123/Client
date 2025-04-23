// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios"; // Missing import


// const Menu = () => {
//   const { filterby } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [products, setProducts] = useState([]); // Added state for products
//   const [categories, setCategories] = useState([]); // Added state for categories
//   const [loading, setLoading] = useState(true); // Added loading state
//   const [error, setError] = useState(null); // Added error state
//   const [formData, setFormData] = useState({}); // Added formData state

//   const productData = useSelector((state) => state.product.productList);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
//       const token = localStorage.getItem("token");

//       if (!token) {
//         throw new Error("Authentication token not found");
//       }

//       const response = await axios.get(`${apiUrl}/api/product/get-products`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const productsData = response.data.products || response.data;
//       setProducts(productsData);

//       const uniqueCategories = [
//         ...new Set(productsData.map((p) => p.category)),
//       ];
//       setCategories(uniqueCategories);

//       setLoading(false);
//     } catch (err) {
//       setLoading(false);

//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//         navigate("/adminDashboard");
//         setError("Session expired. Please login again.");
//       } else {
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to fetch products"
//         );
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Add null check for productDisplay
//   const productDisplay = productData?.filter((el) => el._id === filterby)[0];

//   if (!productDisplay) {
//     return <div>Product not found</div>;
//   }

//   const handleAddCartProduct = (e) => {
//     dispatch(addCartItem(productDisplay));
//   };

//   const handleBuy = () => {
//     dispatch(addCartItem(productDisplay));
//     navigate("/cart");
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <div className="p-2 md:p-4">
//         <div className="w-full max-w-4xl m-auto md:flex bg-white">
//           <div className="max-w-sm overflow-hidden w-full p-5">
//             <img
//               src={productDisplay.image}
//               className="hover:scale-105 transition-all h-full"
//               alt={productDisplay.name} // Added alt attribute
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
//               {productDisplay.name}
//             </h3>
//             <p className="text-slate-500 font-medium text-2xl">
//               {productDisplay.category}
//             </p>
//             <p className="font-bold md:text-2xl">
//               <span className="text-red-500">₹</span>
//               <span>{productDisplay.price}</span>
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleBuy}
//                 className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
//               >
//                 Buy
//               </button>
//               <button
//                 onClick={handleAddCartProduct}
//                 className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
//               >
//                 Add Cart
//               </button>
//             </div>
//             <div>
//               <p className="text-slate-600 font-medium">Description: </p>
//               <p>{productDisplay.description}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <AllProduct heading={"Related Product"} />
//     </div>
//   );
// };

// export default Menu;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { addCartItem } from "../redux/productSlice";
// import AllProduct from "../AllProduct";
// import { ArrowLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

// const Menu = () => {
//   const { filterby } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [cartItemsCount, setCartItemsCount] = useState(0);

//   const productsData = useSelector((state) => state.product.productList);
//   const cartItems = useSelector((state) => state.product.cartItem || []);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // useEffect(() => {
//   //   setCartItemsCount(cartItems.reduce((total, item) => total + item.qty, 0));
//   // }, [cartItems]);
//   useEffect(() => {
//     // Add null check for cartItems
//     const count = Array.isArray(cartItems) 
//       ? cartItems.reduce((total, item) => total + (item.qty || 0), 0)
//       : 0;
//     setCartItemsCount(count);
//   }, [cartItems]);

//   const fetchProducts = async () => {
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
//       const token = localStorage.getItem("token");

//       if (!token) {
//         throw new Error("Authentication token not found");
//       }

//       const response = await axios.get(`${apiUrl}/api/product/get-products`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const productsData = response.data.products || response.data;
//       setProducts(productsData);

//       const uniqueCategories = [
//         ...new Set(productsData.map((p) => p.category)),
//       ];
//       setCategories(uniqueCategories);

//       setLoading(false);
//     } catch (err) {
//       setLoading(false);

//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//         navigate("/login");
//         setError("Session expired. Please login again.");
//       } else {
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to fetch products"
//         );
//       }
//     }
//   };

//   //const productDisplay = productData?.find((el) => el._id === filterby);

//   if (loading) {
//     return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
//     </div>
//   );
// }

//   // if (error) return (
//   //   <div className="text-center py-10">
//   //     <div className="text-red-500 text-xl">{error}</div>
//   //     <button 
//   //       onClick={() => window.location.reload()}
//   //       className="mt-4 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
//   //     >
//   //       Retry
//   //     </button>
//   //   </div>
//   // );

//   // if (!productDisplay) {
//   //   return (
//   //     <div className="text-center py-20">
//   //       <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
//   //       <Link 
//   //         to="/dashboard" 
//   //         className="mt-4 inline-block bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
//   //       >
//   //         Back to Dashboard
//   //       </Link>
//   //     </div>
//   //   );
//   // }.

//   if (!productsData || productsData.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl font-bold text-gray-700">No products available</h2>
//         <Link 
//           to="/dashboard" 
//           className="mt-4 inline-block bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
//         >
//           Back to Dashboard
//         </Link>
//       </div>
//     );
//   }
  
//   const productDisplay = productsData.find((el) => el._id === filterby);
  
//   if (!productDisplay) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
//         <p className="text-gray-600 mb-4">No product found with ID: {filterby}</p>
//         <Link 
//           to="/menu" 
//           className="mt-4 inline-block bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
//         >
//           Browse Products
//         </Link>
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     dispatch(addCartItem({
//       ...productDisplay,
//       qty: quantity
//     }));
//   };

//   const handleOrderNow = () => {
//     handleAddToCart();
//     navigate("/order");
//   };

//   const handleQuantityChange = (e) => {
//     const value = Math.max(1, parseInt(e.target.value) || 1);
//     setQuantity(value);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Navigation Header */}
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <button 
//             onClick={() => navigate(-1)}
//             className="flex items-center text-gray-700 hover:text-amber-500"
//           >
//             <ArrowLeftIcon className="h-5 w-5 mr-1" />
//             Back
//           </button>
          
//           <Link 
//             to="/cart" 
//             className="relative flex items-center text-gray-700 hover:text-amber-500"
//           >
//             <ShoppingCartIcon className="h-6 w-6" />
//             {cartItemsCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                 {cartItemsCount}
//               </span>
//             )}
//           </Link>
//         </div>
//       </header>

//       {/* Product Details */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
//           <div className="md:flex">
//             {/* Product Image */}
//             <div className="md:w-1/2 p-6">
//               <img
//                 src={productDisplay.image}
//                 className="w-full h-auto rounded-lg object-cover hover:scale-105 transition-transform duration-300"
//                 alt={productDisplay.name}
//               />
//             </div>

//             {/* Product Info */}
//             <div className="md:w-1/2 p-6">
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                 {productDisplay.name}
//               </h1>
              
//               <div className="flex items-center mb-4">
//                 <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-2.5 py-0.5 rounded">
//                   {productDisplay.category}
//                 </span>
//               </div>

//               <p className="text-2xl font-bold text-gray-900 mb-4">
//                 <span className="text-amber-500">₹</span>
//                 {productDisplay.price}
//               </p>

//               <div className="mb-6">
//                 <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
//                   Quantity
//                 </label>
//                 <input
//                   type="number"
//                   id="quantity"
//                   name="quantity"
//                   min="1"
//                   value={quantity}
//                   onChange={handleQuantityChange}
//                   className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
//                 />
//               </div>

//               <div className="flex flex-wrap gap-3 mb-6">
//                 <button
//                   onClick={handleOrderNow}
//                   className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
//                 >
//                   Order Now
//                 </button>
//                 <button
//                   onClick={handleAddToCart}
//                   className="flex-1 bg-white border border-amber-500 text-amber-500 hover:bg-amber-50 font-medium py-2 px-4 rounded-md transition-colors duration-300"
//                 >
//                   Add to Cart
//                 </button>
//               </div>

//               <div className="border-t border-gray-200 pt-4">
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
//                 <p className="text-gray-600">{productDisplay.description}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       <div className="container mx-auto px-4 pb-12">
//         <AllProduct 
//           heading={"Related Products"} 
//           filter={productDisplay.category} 
//           excludeId={productDisplay._id} 
//         />
//       </div>
//     </div>
//   );
// };

// export default Menu;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { setProducts, addCartItem } from "../redux/productSlice";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const Menu = () => {
//   const dispatch = useDispatch();
//   const productList = useSelector(state => state.product.productList);
//   const cartItems = useSelector(state => state.product.cartItem);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Authentication token not found");
//          }
//          const response = await axios.get(`${apiUrl}/api/product/get-products`, {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 });
                
//         dispatch(setProducts(response.data.products || response.data));
//       } catch (error) {
//         toast.error("Failed to load products");
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [dispatch]);

//   const cartItemCount = cartItems.reduce((total, item) => total + item.qty, 0);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Our Menu</h1>
//         <Link to="/cart" className="relative">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//           </svg>
//           {cartItemCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {cartItemCount}
//             </span>
//           )}
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {productList.map(product => (
//           <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img 
//               src={product.images} 
//               alt={product.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="font-bold text-xl mb-2">{product.name}</h3>
//               <p className="text-gray-600 mb-2">{product.category}</p>
//               <div className="flex justify-between items-center">
//                 <span className="font-bold">₹{product.price}</span>
//                 <button
//                   onClick={() => dispatch(addCartItem(product))}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Menu;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProducts, addCartItem } from "../redux/productSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Menu = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.product.productList);
  const cartItems = useSelector(state => state.product.cartItem);

  useEffect(() => {
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
        
        dispatch(setProducts(response.data.products || response.data));
      } catch (error) {
        toast.error("Failed to load products");
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addCartItem(product));
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Menu</h1>
        <Link to="/cart" className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map(product => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img 
              src={product.images} 
              alt={product.name}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-600">₹{product.price}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;