import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/productSlice";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(clearCart());
    
    const fetchOrderDetails = async () => {
      try {
        const orderId = location.state?.orderId;
        if (!orderId) throw new Error('Order ID not found');

        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`₹{apiUrl}/api/customer/view-order/₹{orderId}`, {
          headers: { Authorization: `Bearer ₹{token}` }
        });

        setOrderDetails(response.data.order);
      } catch (error) {
        setError(error);
        toast.error("Failed to fetch order details");
        console.error("Error fetching order:", error);
        
        if (location.state?.orderDetails) {
          setOrderDetails(location.state.orderDetails);
        }
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.orderDetails) {
      setOrderDetails(location.state.orderDetails);
      setLoading(false);
    } else {
      fetchOrderDetails();
    }
  }, [dispatch, location.state]);

  // Safe number formatting function
  const formatPrice = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '0.00';
    return value.toFixed(2);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          We couldn't retrieve your order details. Please try again later.
        </p>
        <Link
          to="/orders"
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium transition-colors"
        >
          View My Orders
        </Link>
      </div>
    );
  }

  // Calculate estimated time safely
  const estimatedTime = orderDetails.createdAt 
    ? new Date(orderDetails.createdAt)
    : new Date();
  estimatedTime.setMinutes(estimatedTime.getMinutes() + 45);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
      <p className="text-xl text-gray-600 mb-8">
        Thank you for your order. We've received it and are preparing your food.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-left">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Order Number:</span> #{orderDetails._id || 'N/A'}</p>
          <p><span className="font-medium">Status:</span> {orderDetails.status || 'Pending'}</p>
          <p>
            <span className="font-medium">Estimated {orderDetails.orderType === "Delivery" ? 'Delivery' : 'Pickup'}:</span> 
            {estimatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          {orderDetails.staffId && (
            <p><span className="font-medium">Assigned Staff:</span> {orderDetails.name || 'Staff Member'}</p>
          )}
        </div>

        <h3 className="text-lg font-medium mt-6 mb-2">Items Ordered</h3>
        <div className="border-t pt-4 space-y-4">
          {(orderDetails.items || []).map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name || 'Item'} × {item.quantity || 1}</span>
              <span>₹{formatPrice((item.price || 0) * (item.quantity || 1))}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{formatPrice(orderDetails.subtotal)}</span>
          </div>
          {(orderDetails.deliveryFee || 0) > 0 && (
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>₹{formatPrice(orderDetails.deliveryFee)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>₹{formatPrice(orderDetails.tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total Paid:</span>
            <span>₹{formatPrice(orderDetails.totalAmount)}</span>
          </div>
        </div>

        {orderDetails.specialInstructions && (
          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium">Special Instructions:</h4>
            <p>{orderDetails.specialInstructions}</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          We'll send you an email confirmation shortly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            to="/menu"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium transition-colors"
          >
            Browse Menu Again
          </Link>
          <Link
            to="/order"
            className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;