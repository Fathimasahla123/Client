// import { useState, useEffect } from 'react';
// //import api from '../utils/api';
// import { useCustomer } from '../context/customerContext';

// const CustomerOrders = () => {
//   const { customer } = useCustomer();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0
//   });

//   useEffect(() => {
//     if (customer) {
//       fetchOrders();
//     }
//   }, [customer, pagination.page]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/customer/orders', {
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

//   if (!customer) return <div>Loading...</div>;

//   return (
//     <div className="orders-container">
//       <h2>My Orders</h2>
      
//       {error && <div className="error-message">{error}</div>}

//       {loading ? (
//         <div>Loading orders...</div>
//       ) : (
//         <>
//           {orders.length === 0 ? (
//             <div className="no-orders">You have no orders yet.</div>
//           ) : (
//             <>
//               <div className="orders-list">
//                 {orders.map(order => (
//                   <div key={order._id} className="order-card">
//                     <div className="order-header">
//                       <span className="order-id">Order #{order._id.substring(18)}</span>
//                       <span className={`order-status ${order.status.toLowerCase()}`}>
//                         {order.status}
//                       </span>
//                     </div>
//                     <div className="order-details">
//                       <div className="order-items">
//                         <h4>Items:</h4>
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
//                           <strong>Type:</strong> {order.orderType}
//                         </div>
//                         {order.orderType === 'Delivery' && (
//                           <div>
//                             <strong>Address:</strong> {order.deliveryAddress}
//                           </div>
//                         )}
//                         <div>
//                           <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
//                         </div>
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

// export default CustomerOrders;

import { useState, useEffect } from 'react';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  // Mock customer data
  const [customer] = useState({
    id: '123',
    name: 'John Doe'
  });

  useEffect(() => {
    if (customer) {
      fetchOrders();
    }
  }, [customer, pagination.page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock API response
      const mockResponse = {
        data: {
          data: [
            {
              _id: 'order123456789012345678',
              status: 'Completed',
              items: [
                { dishName: 'Pizza', quantity: 1, price: 12.99 },
                { dishName: 'Salad', quantity: 2, price: 6.50 }
              ],
              totalAmount: 25.99,
              orderType: 'Delivery',
              deliveryAddress: '123 Main St',
              createdAt: new Date()
            }
          ],
          pagination: {
            totalItems: 1,
            totalPages: 1
          }
        }
      };
      
      setOrders(mockResponse.data.data);
      setPagination(prev => ({
        ...prev,
        total: mockResponse.data.pagination.totalItems,
        totalPages: mockResponse.data.pagination.totalPages
      }));
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div>Loading orders...</div>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="no-orders">You have no orders yet.</div>
          ) : (
            <>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">Order #{order._id.substring(18)}</span>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <div className="order-items">
                        <h4>Items:</h4>
                        <ul>
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {item.dishName} x {item.quantity} - ${item.price.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="order-summary">
                        <div>
                          <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                        </div>
                        <div>
                          <strong>Type:</strong> {order.orderType}
                        </div>
                        {order.orderType === 'Delivery' && (
                          <div>
                            <strong>Address:</strong> {order.deliveryAddress}
                          </div>
                        )}
                        <div>
                          <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerOrders;