import { useState, useEffect } from 'react';
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${apiUrl}/api/admin/list-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.order || response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setError("Session expired. Please login again.");
        } else {
          setError(
            err.response?.data?.message || err.message || "Failed to fetch orders"
          );
        }
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="orders-container">
      <h2>Orders List</h2>
      
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Staff</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id.substring(18)}</td>
                <td>{order.customerName}</td>
                <td>{order.staffId?.name || 'N/A'}</td>
                <td>{order.orderType}</td>
                <td>${order.totalAmount?.toFixed(2) || '0.00'}</td>
                <td className={`status-${order.status?.toLowerCase() || 'pending'}`}>
                  {order.status || 'Pending'}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;