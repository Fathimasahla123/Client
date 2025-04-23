// import { CheckCircleIcon } from "@heroicons/react/24/solid";

// const OrderSummary = ({ formData, prevStep }) => {
//   // Sample order data - replace with actual cart items
//   const orderItems = [
//     { name: "Margherita Pizza", quantity: 1, price: 250.00 },
//     { name: "Chicken Burger", quantity: 1, price: 180.00 },
//     { name: "Vegan Brownie", quantity: 1, price: 150.00 }
//   ];

//   const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const deliveryFee = formData.orderType === "delivery" ? 3.99 : 0;
//   const tax = subtotal * 0.07;
//   const total = subtotal + deliveryFee + tax;

//   return (
//     <div>
//       <div className="text-center mb-8">
//         <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmation</h2>
//         <p className="text-gray-600">Review your order details before placing</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Order Details */}
//         <div>
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
//           <div className="border rounded-md divide-y">
//             {orderItems.map((item, index) => (
//               <div key={index} className="p-4 flex justify-between">
//                 <div>
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-sm text-gray-500">{item.quantity} × ₹{item.price.toFixed(2)}</p>
//                 </div>
//                 <p className="font-medium">₹{(item.quantity * item.price).toFixed(2)}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 border-t pt-4 space-y-2">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             {deliveryFee > 0 && (
//               <div className="flex justify-between">
//                 <span>Delivery Fee</span>
//                 <span>₹{deliveryFee.toFixed(2)}</span>
//               </div>
//             )}
//             <div className="flex justify-between">
//               <span>Tax (7%)</span>
//               <span>₹{tax.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-lg pt-2">
//               <span>Total</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Customer Info */}
//         <div>
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
//           <div className="bg-gray-50 p-6 rounded-md">
//             <div className="space-y-4">
//               <div>
//                 <h4 className="font-medium text-gray-900">Contact</h4>
//                 <p>{formData.name}</p>
//                 <p>{formData.email}</p>
//                 <p>{formData.phone}</p>
//               </div>

//               {formData.orderType === "delivery" ? (
//                 <div>
//                   <h4 className="font-medium text-gray-900">Delivery Address</h4>
//                   <p>{formData.address}</p>
//                   <p>{formData.city}, {formData.state} {formData.zip}</p>
//                   {formData.instructions && (
//                     <div className="mt-2">
//                       <h4 className="font-medium text-gray-900">Delivery Instructions</h4>
//                       <p>{formData.instructions}</p>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h4 className="font-medium text-gray-900">Pickup Information</h4>
//                   <p>123 Restaurant Row, Foodie City, FC 12345</p>
//                 </div>
//               )}

//               <div>
//                 <h4 className="font-medium text-gray-900">Payment Method</h4>
//                 <p>
//                   {formData.paymentMethod === "card" 
//                     ? "Credit/Debit Card" 
//                     : `Cash on ${formData.orderType === "delivery" ? "Delivery" : "Pickup"}`}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 flex justify-between">
//         <button
//           onClick={prevStep}
//           className="px-6 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-100"
//         >
//           ← Back
//         </button>
//         <button
//           onClick={() => alert("Order placed successfully!")}
//           className="px-6 py-3 rounded-md font-medium bg-green-600 hover:bg-green-700 text-white"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { CheckCircleIcon } from "@heroicons/react/24/solid";
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const OrderSummary = ({ formData, prevStep }) => {
//   const navigate = useNavigate();
//   const cartItems = useSelector(state => state.product.cartItem);
  
//   // Calculate order totals properly
//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
//   const deliveryFee = formData.orderType === "delivery" ? 3.99 : 0;
//   const tax = subtotal * 0.07;
//   const total = subtotal + deliveryFee + tax;

//   const handlePlaceOrder = async () => {
//     try {
//       // Prepare order data
//       const orderData = {
//         customerName: formData.name,
//         customerEmail: formData.email,
//         customerPhone: formData.phone,
//         orderType: formData.orderType,
//         deliveryAddress: formData.orderType === "delivery" ? {
//           street: formData.address,
//           city: formData.city,
//           state: formData.state,
//           zip: formData.zip
//         } : null,
//         paymentMethod: formData.paymentMethod,
//         specialInstructions: formData.instructions,
//         items: cartItems.map(item => ({
//           productId: item.id || item._id,
//           name: item.name,
//           quantity: item.quantity || 1,
//           price: item.price
//         })),
//         subtotal,
//         deliveryFee,
//         tax,
//         totalAmount: total
//       };

//       const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         throw new Error('Authentication token not found');
//       }

//       // Changed from GET to POST request
//       const response = await axios.post(`${apiUrl}/api/customer/add-order`, orderData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       navigate('/order-confirmation', {
//         state: {
//           orderId: response.data.order._id,
//           orderDetails: response.data.order
//         }
//       });

//     } catch (error) {
//       toast.error(error.response?.data?.msg || "Failed to place order. Please try again.");
//       console.error("Order error:", error);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//  //     <div className="text-center mb-8">
//         <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmation</h2>
//         <p className="text-gray-600">Review your order details before placing</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Order Details */}
//         <div>
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
//           <div className="border rounded-md divide-y">
//             {cartItems.map((item, index) => (
//               <div key={index} className="p-4 flex justify-between">
//                 <div>
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-sm text-gray-500">
//                     {item.quantity || 1} × ₹{item.price?.toFixed(2) || '0.00'}
//                   </p>
//                 </div>
//                 <p className="font-medium">
//                   ₹{((item.quantity || 1) * (item.price || 0)).toFixed(2)}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 border-t pt-4 space-y-2">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             {deliveryFee > 0 && (
//               <div className="flex justify-between">
//                 <span>Delivery Fee</span>
//                 <span>₹{deliveryFee.toFixed(2)}</span>
//               </div>
//             )}
//             <div className="flex justify-between">
//               <span>Tax (7%)</span>
//               <span>₹{tax.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-lg pt-2">
//               <span>Total</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Customer Info */}
//         <div>
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
//           <div className="bg-gray-50 p-6 rounded-md">
//             <div className="space-y-4">
//               <div>
//                 <h4 className="font-medium text-gray-900">Contact</h4>
//                 <p>{formData.name || "Not provided"}</p>
//                 <p>{formData.email || "Not provided"}</p>
//                 <p>{formData.phone || "Not provided"}</p>
//               </div>

//               {formData.orderType === "delivery" ? (
//                 <div>
//                   <h4 className="font-medium text-gray-900">Delivery Address</h4>
//                   {formData.address ? (
//                     <>
//                       <p>{formData.address}</p>
//                       <p>
//                         {formData.city}, {formData.state} {formData.zip}
//                       </p>
//                       {formData.instructions && (
//                         <div className="mt-2">
//                           <h4 className="font-medium text-gray-900">Delivery Instructions</h4>
//                           <p>{formData.instructions}</p>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <p className="text-red-500">Delivery address not provided</p>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h4 className="font-medium text-gray-900">Pickup Information</h4>
//                   <p className="font-semibold">Restaurant Address:</p>
//                   <p>123 Main Street, Foodville, FC 12345</p>
//                   <p className="mt-2 font-semibold">Pickup Hours:</p>
//                   <p>Monday-Sunday: 11:00 AM - 9:00 PM</p>
//                   <p className="mt-2 text-sm text-gray-500">
//                     Please bring your order confirmation and ID
//                   </p>
//                 </div>
//               )}

//               <div>
//                 <h4 className="font-medium text-gray-900">Payment Method</h4>
//                 <p>
//                   {formData.paymentMethod === "card" 
//                     ? "Credit/Debit Card" 
//                     : formData.paymentMethod === "online" 
//                     ? "Online Payment"
//                     : `Cash on ${formData.orderType === "delivery" ? "Delivery" : "Pickup"}`}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 flex justify-between">
//         <button
//           onClick={prevStep}
//           className="px-6 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-100 border border-gray-300"
//         >
//           ← Back
//         </button>
//         <button
//           onClick={handlePlaceOrder}
//           className="px-6 py-3 rounded-md font-medium bg-green-600 hover:bg-green-700 text-white"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;


import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderSummary = ({ formData, prevStep, selectedStaff }) => {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.product.cartItem);
  
  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = formData.orderType === "delivery" ? 3.99 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    try {
      if (!selectedStaff) {
        throw new Error('No staff member selected');
      }

      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        staffId: selectedStaff._id,
        staffName: selectedStaff.name,
        items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price
        })),
        totalAmount: total,
        orderType: formData.orderType === "delivery" ? "Delivery" : "Pickup",
        deliveryAddress: formData.orderType === "delivery" ? 
          `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}` : undefined,
        paymentMethod: formData.paymentMethod,
        specialInstructions: formData.instructions
      };

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.post(`${apiUrl}/api/customer/add-order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      navigate('/order-confirmation', {
        state: {
          orderId: response.data.order._id,
          orderDetails: response.data.order
        }
      });

    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to place order. Please try again.");
      console.error("Order error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmation</h2>
        <p className="text-gray-600">Review your order details before placing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
          <div className="border rounded-md divide-y">
            {cartItems.map((item, index) => (
              <div key={index} className="p-4 flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity || 1} × ₹{item.price?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <p className="font-medium">
                  ₹{((item.quantity || 1) * (item.price || 0)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax (7%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
          <div className="bg-gray-50 p-6 rounded-md">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Contact</h4>
                <p>{formData.name || "Not provided"}</p>
                <p>{formData.email || "Not provided"}</p>
                <p>{formData.phone || "Not provided"}</p>
              </div>

              
      <div className="bg-gray-50 p-6 rounded-md mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Assigned Staff</h3>
        {selectedStaff && (
          <div>
            <p><span className="font-medium">Name:</span> {selectedStaff.name}</p>
            <p><span className="font-medium">Role:</span> {selectedStaff.role}</p>
          </div>
        )}
      </div>
      {formData.orderType === "delivery" ? (
                <div>
                  <h4 className="font-medium text-gray-900">Delivery Address</h4>
                  {formData.address ? (
                    <>
                      <p>{formData.address}</p>
                      <p>
                        {formData.city}, {formData.state} {formData.zip}
                      </p>
                      {formData.instructions && (
                        <div className="mt-2">
                          <h4 className="font-medium text-gray-900">Delivery Instructions</h4>
                          <p>{formData.instructions}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-red-500">Delivery address not provided</p>
                  )}
                </div>
              ) : (
                <div>
                  <h4 className="font-medium text-gray-900">Pickup Information</h4>
                  <p className="font-semibold">Restaurant Address:</p>
                  <p>123 Main Street, Foodville, FC 12345</p>
                  <p className="mt-2 font-semibold">Pickup Hours:</p>
                  <p>Monday-Sunday: 11:00 AM - 9:00 PM</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Please bring your order confirmation and ID
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900">Payment Method</h4>
                <p>
                  {formData.paymentMethod === "card" 
                    ? "Credit/Debit Card" 
                    : formData.paymentMethod === "online" 
                    ? "Online Payment"
                    : `Cash on ${formData.orderType === "delivery" ? "Delivery" : "Pickup"}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-100 border border-gray-300"
        >
          ← Back
        </button>
        <button
          onClick={handlePlaceOrder}
          className="px-6 py-3 rounded-md font-medium bg-green-600 hover:bg-green-700 text-white"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
      
