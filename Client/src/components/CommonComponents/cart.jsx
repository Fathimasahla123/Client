import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeCartItem, updateQuantity } from "../redux/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.product.cartItem);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, qty: newQty }));
    toast.info("Quantity updated", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleRemoveItem = (id, name) => {
    dispatch(removeCartItem(id));
    toast.error(`${name} removed from cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link 
            to="/menu" 
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map(item => (
                <div key={item._id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row items-center">
                  <img 
                    src={item.images} 
                    alt={item.name}
                    className="w-full md:w-32 h-32 object-cover rounded mb-4 md:mb-0 md:mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl">{item.name}</h3>
                    <p className="text-gray-600">{item.category}</p>
                    <p className="font-bold my-2">₹{item.price}</p>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0">
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button 
                        onClick={() => handleQuantityChange(item._id, item.qty - 1)}
                        className="bg-gray-100 hover:bg-gray-200 px-3 py-1 transition-colors"
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-white">{item.qty}</span>
                      <button 
                        onClick={() => handleQuantityChange(item._id, item.qty + 1)}
                        className="bg-gray-100 hover:bg-gray-200 px-3 py-1 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item._id, item.name)}
                      className="ml-4 text-red-500 hover:text-red-700 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="border-b pb-4 mb-4">
                {cartItems.map(item => (
                  <div key={item._id} className="flex justify-between mb-2">
                    <span className="text-gray-700">{item.name} × {item.qty}</span>
                    <span className="font-medium">₹{item.total}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total Amount:</span>
                <span className="text-amber-600">₹{totalAmount}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                Proceed to Checkout
              </button>
              <Link 
                to="/menu"
                className="block text-center mt-4 text-amber-600 hover:text-amber-700 underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;