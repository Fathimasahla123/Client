// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const StaffOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     itemsPerPage: 10
//   });

//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get(`${apiUrl}/api/staff/view-orders`, {
//           // params: {
//           //   page: pagination.currentPage,
//           //   limit: pagination.itemsPerPage
//           // },
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setOrders(response.data.data);
//         setPagination(response.data.pagination);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//         setLoading(false);
//         if (err.response?.status === 401) {
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//       }
//     };

//     fetchOrders();
//   }, [pagination.currentPage, navigate]);

//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, currentPage: newPage }));
//   };

//   if (loading) return <div className="text-center py-8">Loading orders...</div>;
//   if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">My Assigned Orders</h1>
      
//       <div className="space-y-6">
//         {orders.length === 0 ? (
//           <div className="bg-gray-100 p-4 rounded-lg text-center">
//             No orders found
//           </div>
//         ) : (
//           orders.map(order => (
//             <div key={order.orderId} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h2 className="text-lg font-semibold">Order #{order.orderId.slice(-6)}</h2>
//                   <p className="text-sm text-gray-500">
//                     {new Date(order.createdAt).toLocaleDateString()} • {order.status}
//                   </p>
//                 </div>
//                 <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                   ${order.totalAmount.toFixed(2)}
//                 </span>
//               </div>

//               <div className="mb-4">
//                 <h3 className="font-medium mb-2">Customer:</h3>
//                 <div className="flex items-center space-x-2">
//                   <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
//                     <span className="text-gray-600 text-sm">
//                       {order.customer?.name?.charAt(0) || 'C'}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="font-medium">{order.customer?.name || 'N/A'}</p>
//                     <p className="text-sm text-gray-500">{order.customer?.email || ''}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <h3 className="font-medium mb-2">Items:</h3>
//                 <ul className="space-y-2">
//                   {order.items.map((item, index) => (
//                     <li key={index} className="flex justify-between">
//                       <span>{item.name}</span>
//                       <span className="text-gray-600">
//                         {item.quantity} × ${item.price.toFixed(2)}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {order.feedback && (
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <h3 className="font-medium mb-2">Customer Feedback:</h3>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <div className="flex space-x-4 mb-2">
//                       <div>
//                         <p className="text-sm text-gray-600">Service</p>
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <span 
//                               key={i} 
//                               className={`${i < order.feedback.rating.customerService ? 'text-yellow-400' : 'text-gray-300'}`}
//                             >
//                               ★
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600">Punctuality</p>
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <span 
//                               key={i} 
//                               className={`${i < order.feedback.rating.punctuality ? 'text-yellow-400' : 'text-gray-300'}`}
//                             >
//                               ★
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                     {order.feedback.comment && (
//                       <p className="text-gray-700 mt-2">"{order.feedback.comment}"</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {pagination.totalPages > 1 && (
//         <div className="flex justify-center mt-8 space-x-2">
//           {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               className={`px-3 py-1 rounded ${pagination.currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StaffOrders;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const StaffOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     itemsPerPage: 10
//   });

//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get(`${apiUrl}/api/staff/view-orders`, {
//           // params: {
//           //   page: pagination.currentPage,
//           //   limit: pagination.itemsPerPage
//           // },
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setOrders(response.data.data);
//         setPagination(response.data.pagination);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//         setLoading(false);
//         if (err.response?.status === 401) {
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//       }
//     };

//     fetchOrders();
//   }, [pagination.currentPage, navigate]);

//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, currentPage: newPage }));
//   };


//   if (loading) return (
//     <div className="flex justify-center items-center min-h-[50vh]">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="max-w-4xl mx-auto mt-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
//       <strong className="font-bold">Error:</strong>
//       <span className="block sm:inline ml-1">{error}</span>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">My Assigned Orders</h1>
//         {orders.length > 0 && (
//           <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//             {pagination.totalItems} total orders
//           </span>
//         )}
//       </div>
      
//       <div className="space-y-6">
//         {orders.length === 0 ? (
//           <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-200">
//             <p className="text-gray-500">No orders assigned to you yet</p>
//           </div>
//         ) : (
//           orders.map(order => (
//             <div key={order.orderId} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
//               <div className="p-6">
//                 {/* Order Header */}
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-5 gap-3">
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-800">
//                       Order #{order.orderId.slice(-6).toUpperCase()}
//                     </h2>
//                     <div className="flex items-center mt-1 space-x-3">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         order.status === 'completed' ? 'bg-green-100 text-green-800' :
//                         order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                         'bg-blue-100 text-blue-800'
//                       }`}>
//                         {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         {new Date(order.createdAt).toLocaleDateString('en-US', {
//                           month: 'short',
//                           day: 'numeric',
//                           year: 'numeric'
//                         })}
//                       </span>
//                     </div>
//                   </div>
//                   <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                     ${order.totalAmount.toFixed(2)}
//                   </span>
//                 </div>

//                 {/* Customer Info */}
//                 <div className="mb-5">
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">CUSTOMER</h3>
//                   <div className="flex items-center">
//                     <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
//                       <span className="text-gray-600 font-medium">
//                         {order.customer?.name?.charAt(0) || 'C'}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800">
//                         {order.customer?.name || 'Anonymous Customer'}
//                       </p>
//                       {order.customer?.email && (
//                         <p className="text-sm text-gray-500">{order.customer.email}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div className="mb-5">
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">ITEMS</h3>
//                   <ul className="space-y-3">
//                     {order.items.map((item, index) => (
//                       <li key={index} className="flex justify-between items-center">
//                         <div>
//                           <span className="text-gray-800">{item.name}</span>
//                           {item.specialInstructions && (
//                             <p className="text-xs text-gray-500 mt-1">Note: {item.specialInstructions}</p>
//                           )}
//                         </div>
//                         <span className="text-gray-600 font-medium">
//                           {item.quantity} × ${item.price.toFixed(2)}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Feedback Section */}
//                 {order.feedback && (
//                   <div className="mt-5 pt-5 border-t border-gray-200">
//                     <h3 className="text-sm font-medium text-gray-500 mb-3">CUSTOMER FEEDBACK</h3>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                         <div>
//                           <p className="text-sm text-gray-600 mb-1">Service Quality</p>
//                           <div className="flex space-x-1">
//                             {[...Array(5)].map((_, i) => (
//                               <span 
//                                 key={i} 
//                                 className={`text-xl ${i < order.feedback.rating.customerService ? 'text-yellow-500' : 'text-gray-300'}`}
//                               >
//                                 ★
//                               </span>
//                             ))}
//                             <span className="ml-2 text-gray-700 text-sm">
//                               ({order.feedback.rating.customerService}/5)
//                             </span>
//                           </div>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-600 mb-1">Punctuality</p>
//                           <div className="flex space-x-1">
//                             {[...Array(5)].map((_, i) => (
//                               <span 
//                                 key={i} 
//                                 className={`text-xl ${i < order.feedback.rating.punctuality ? 'text-yellow-500' : 'text-gray-300'}`}
//                               >
//                                 ★
//                               </span>
//                             ))}
//                             <span className="ml-2 text-gray-700 text-sm">
//                               ({order.feedback.rating.punctuality}/5)
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       {order.feedback.comment && (
//                         <div className="mt-3">
//                           <p className="text-gray-700 italic">"{order.feedback.comment}"</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       {pagination.totalPages > 1 && (
//         <div className="flex justify-center mt-8">
//           <div className="flex space-x-2">
//             {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
//               <button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                   pagination.currentPage === page 
//                     ? 'bg-blue-600 text-white font-medium' 
//                     : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StaffOrders;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StaffOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [expandedOrder, setExpandedOrder] = useState(null);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/staff/view-orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setOrders(response.data.data);
        setPagination(response.data.pagination);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchOrders();
  }, [pagination.currentPage, navigate]);

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const toggleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline ml-1">{error}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Assigned Orders</h1>
        {orders.length > 0 && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {pagination.totalItems} total orders
          </span>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders assigned to you yet
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <>
                    <tr 
                      key={order.orderId} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleExpandOrder(order.orderId)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.orderId.slice(-6).toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {order.customer?.name?.charAt(0) || 'C'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {order.customer?.name || 'Anonymous'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.customer?.email || ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.feedback ? (
                          <div className="flex">
                            {renderStars(order.feedback.rating.customerService)}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No feedback</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpandOrder(order.orderId);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {expandedOrder === order.orderId ? 'Hide details' : 'View details'}
                        </button>
                      </td>
                    </tr>
                    
                    {expandedOrder === order.orderId && (
                      <tr className="bg-gray-50">
                        <td colSpan="7" className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Order Items */}
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 mb-3">ORDER ITEMS</h3>
                              <ul className="space-y-3">
                                {order.items.map((item, index) => (
                                  <li key={index} className="flex justify-between">
                                    <div>
                                      <span className="text-gray-800">{item.name}</span>
                                      {item.specialInstructions && (
                                        <p className="text-xs text-gray-500 mt-1">Note: {item.specialInstructions}</p>
                                      )}
                                    </div>
                                    <span className="text-gray-600 font-medium">
                                      {item.quantity} × ${item.price.toFixed(2)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Feedback Section */}
                            {order.feedback && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3">CUSTOMER FEEDBACK</h3>
                                <div className="bg-white p-4 rounded-lg border border-gray-200">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <div>
                                      <p className="text-sm text-gray-600 mb-1">Service Quality</p>
                                      <div className="flex items-center">
                                        {renderStars(order.feedback.rating.customerService)}
                                        <span className="ml-2 text-sm text-gray-700">
                                          ({order.feedback.rating.customerService}/5)
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600 mb-1">Punctuality</p>
                                      <div className="flex items-center">
                                        {renderStars(order.feedback.rating.punctuality)}
                                        <span className="ml-2 text-sm text-gray-700">
                                          ({order.feedback.rating.punctuality}/5)
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {order.feedback.comment && (
                                    <div className="mt-3">
                                      <p className="text-gray-700 italic">"{order.feedback.comment}"</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  pagination.currentPage === page 
                    ? 'bg-blue-600 text-white font-medium' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffOrders;