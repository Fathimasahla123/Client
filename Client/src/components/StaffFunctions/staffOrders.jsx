// import { useState, useEffect } from 'react';
// import { useStaff } from '../context/staffContext';
// //import api from '../utils/api';

// const StaffOrders = () => {
//   const { staff } = useStaff();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0
//   });

//   useEffect(() => {
//     if (staff) {
//       fetchOrders();
//     }
//   }, [staff, pagination.page]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/staff/orders', {
//         params: {
//           page: pagination.page,
//           limit: pagination.limit
//         }
//       });
      
//       setOrders(response.data.data);
//       setPagination(prev => ({
//         ...prev,
//         total: response.data.pagination.totalItems,
//         totalPages: response.data.pagination.totalPages
//       }));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//   };

//   if (!staff) return null;

//   return (
//     <div className="staff-orders">
//       <h2>My Orders</h2>
      
//       {error && <div className="error-message">{error}</div>}

//       {loading ? (
//         <div>Loading orders...</div>
//       ) : (
//         <>
//           {orders.length === 0 ? (
//             <div className="no-orders">No orders assigned to you yet.</div>
//           ) : (
//             <>
//               <div className="orders-list">
//                 {orders.map(order => (
//                   <div key={order.orderId} className="order-card">
//                     <div className="order-header">
//                       <span className="order-id">Order #{order.orderId.substring(18)}</span>
//                       <span className={`order-status ${order.status.toLowerCase()}`}>
//                         {order.status}
//                       </span>
//                     </div>
//                     <div className="order-details">
//                       <div className="customer-info">
//                         <strong>Customer:</strong> {order.customer.name} ({order.customer.email})
//                       </div>
//                       <div className="order-items">
//                         <strong>Items:</strong>
//                         <ul>
//                           {order.items.map((item, index) => (
//                             <li key={index}>
//                               {item.dishName} x {item.quantity} - ${item.price.toFixed(2)}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                       <div className="order-summary">
//                         <div>
//                           <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
//                         </div>
//                         <div>
//                           <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
//                         </div>
//                         {order.feedback && (
//                           <div className="order-feedback">
//                             <strong>Feedback:</strong>
//                             <div>Service: {order.feedback.rating.customerService}/5</div>
//                             {order.feedback.comment && (
//                               <div>Comment: {order.feedback.comment}</div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="pagination">
//                 <button
//                   onClick={() => handlePageChange(pagination.page - 1)}
//                   disabled={pagination.page === 1}
//                 >
//                   Previous
//                 </button>
//                 <span>
//                   Page {pagination.page} of {pagination.totalPages}
//                 </span>
//                 <button
//                   onClick={() => handlePageChange(pagination.page + 1)}
//                   disabled={pagination.page === pagination.totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default StaffOrders;

import { useState, useEffect } from 'react';
//import { useStaff } from './staffDashboard';

const StaffOrders = () => {
  const { staff } = useStaff();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  useEffect(() => {
    if (staff) {
      fetchOrders();
    }
  }, [staff, pagination.page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await mockApi.get('/staff/orders', {
        params: {
          page: pagination.page,
          limit: pagination.limit
        }
      });
      
      setOrders(response.data.data);
      setPagination(prev => ({
        ...prev,
        total: response.data.pagination.totalItems,
        totalPages: response.data.pagination.totalPages
      }));
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the component remains the same ...

  return (
    <div className="staff-orders">
      {/* ... existing JSX ... */}
    </div>
  );
};

export default StaffOrders;