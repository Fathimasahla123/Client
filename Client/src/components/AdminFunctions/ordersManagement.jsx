// import { useState, useEffect } from 'react';
// //import api from '../utils/api';

// const OrdersManagement = () => {
//   const [orders, setOrders] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [staffs, setStaffs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     customerId: '',
//     staffId: '',
//     items: [],
//     totalAmount: 0,
//     orderType: 'Dine-in',
//     deliveryAddress: ''
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [ordersRes, customersRes, staffsRes] = await Promise.all([
//         api.get('/admin/orders'),
//         api.get('/admin/customers'),
//         api.get('/admin/staffs')
//       ]);
      
//       setOrders(ordersRes.data.order);
//       setCustomers(customersRes.data);
//       setStaffs(staffsRes.data.staff);
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/admin/orders/add', formData);
//       fetchData();
//       setFormData({
//         customerId: '',
//         staffId: '',
//         items: [],
//         totalAmount: 0,
//         orderType: 'Dine-in',
//         deliveryAddress: ''
//       });
//     } catch (err) {
//       setError(err.response?.data?.msg || err.message);
//     }
//   };

//   const deleteOrder = async (id) => {
//     if (window.confirm('Are you sure you want to delete this order?')) {
//       try {
//         await api.delete(`/admin/orders/${id}`);
//         fetchData();
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   if (loading) return <div>Loading orders...</div>;
//   if (error) return <div className="error-message">Error: {error}</div>;

//   return (
//     <div className="management-container">
//       <h2>Orders Management</h2>
      
//       <div className="form-section">
//         <h3>Create New Order</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Customer:</label>
//             <select
//               name="customerId"
//               value={formData.customerId}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select Customer</option>
//               {customers.map(customer => (
//                 <option key={customer._id} value={customer._id}>
//                   {customer.name} ({customer.email})
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Staff:</label>
//             <select
//               name="staffId"
//               value={formData.staffId}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select Staff</option>
//               {staffs.map(staff => (
//                 <option key={staff._id} value={staff._id}>
//                   {staff.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Order Type:</label>
//             <select
//               name="orderType"
//               value={formData.orderType}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="Dine-in">Dine-in</option>
//               <option value="Takeaway">Takeaway</option>
//               <option value="Delivery">Delivery</option>
//             </select>
//           </div>
//           {formData.orderType === 'Delivery' && (
//             <div className="form-group">
//               <label>Delivery Address:</label>
//               <input
//                 type="text"
//                 name="deliveryAddress"
//                 value={formData.deliveryAddress}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           )}
//           {/* Items would be added here with a more complex implementation */}
//           <div className="form-group">
//             <label>Total Amount:</label>
//             <input
//               type="number"
//               name="totalAmount"
//               value={formData.totalAmount}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <button type="submit" className="submit-btn">Create Order</button>
//         </form>
//       </div>

//       <div className="list-section">
//         <h3>Order List</h3>
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Customer</th>
//               <th>Staff</th>
//               <th>Type</th>
//               <th>Amount</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order._id}>
//                 <td>{order._id.substring(18)}</td>
//                 <td>{order.customerId?.name || 'N/A'}</td>
//                 <td>{order.staffId?.name || 'N/A'}</td>
//                 <td>{order.orderType}</td>
//                 <td>${order.totalAmount.toFixed(2)}</td>
//                 <td>{order.status || 'Pending'}</td>
//                 <td>
//                   <button className="edit-btn">Edit</button>
//                   <button 
//                     className="delete-btn"
//                     onClick={() => deleteOrder(order._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrdersManagement;

import { useState, useEffect } from 'react';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    customerId: '',
    staffId: '',
    items: [],
    totalAmount: 0,
    orderType: 'Dine-in',
    deliveryAddress: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api';
      const [ordersRes, customersRes, staffsRes] = await Promise.all([
        fetch(`${baseUrl}/admin/orders`).then(res => res.json()),
        fetch(`${baseUrl}/admin/customers`).then(res => res.json()),
        fetch(`${baseUrl}/admin/staffs`).then(res => res.json())
      ]);
      
      setOrders(ordersRes.order);
      setCustomers(customersRes.data);
      setStaffs(staffsRes.staff);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/admin/orders/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      fetchData();
      setFormData({
        customerId: '',
        staffId: '',
        items: [],
        totalAmount: 0,
        orderType: 'Dine-in',
        deliveryAddress: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/admin/orders/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete order');
        }
        
        fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="management-container">
      <h2>Orders Management</h2>
      
      {/* ... rest of the component remains the same ... */}
    </div>
  );
};

export default OrdersManagement;