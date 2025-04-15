import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    staffId: '',
    items: [{ name: '', quantity: 1, price: 0 }],
    totalAmount: 0,
    orderType: 'Delivery',
    deliveryAddress: '',
    status: 'Pending'
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
    fetchStaffMembers();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/customer/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.data || response.data);
      setLoading(false);
    } catch (err) {
      handleApiError(err, "fetch orders");
    }
  };

  const fetchStaffMembers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/customer/list-staffs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaffMembers(response.data.staff || response.data);
    } catch (err) {
      handleApiError(err, "fetch staff members");
    }
  };

  const handleApiError = (err, action) => {
    setLoading(false);
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/adminDashboard");
      setError(`Session expired. Please login again.`);
    } else {
      setError(
        err.response?.data?.message || 
        `Failed to ${action}. Please try again.`
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [name]: name === 'quantity' || name === 'price' ? Number(value) : value };
    
    const totalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setFormData({
      ...formData,
      items: newItems,
      totalAmount
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems,
      totalAmount: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/customer/add-order`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      handleApiError(err, "add order");
    }
  };

  const handleEdit = (order) => {
    setEditOrder(order);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/api/customer/update-order/${editOrder._id}`,
        editOrder,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
      setShowEditModal(false);
    } catch (err) {
      handleApiError(err, "update order");
    }
  };

  const handleView = (order) => {
    setViewOrder(order);
    setShowViewModal(true);
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${apiUrl}/api/customer/delete-order/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchOrders();
      } catch (err) {
        handleApiError(err, "delete order");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      staffId: '',
      items: [{ name: '', quantity: 1, price: 0 }],
      totalAmount: 0,
      orderType: 'Delivery',
      deliveryAddress: '',
      status: 'Pending'
    });
  };

  if (loading) return <div className="text-center py-8">Loading orders...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="btn btn-primary"
        >
          Add New Order
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Staff</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id.substring(0, 8)}...</td>
                <td>{order.staffId?.name || 'N/A'}</td>
                <td>{order.items?.length || 0}</td>
                <td>${order.totalAmount?.toFixed(2) || '0.00'}</td>
                <td>
                  <span className={`badge ${
                    order.status === 'Delivered' ? 'badge-success' :
                    order.status === 'Preparing' ? 'badge-error' : 'badge-warning'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleView(order)} 
                      className="btn btn-xs btn-info"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleEdit(order)} 
                      className="btn btn-xs btn-warning"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteOrder(order._id)} 
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Order Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Add New Order</h3>
            <form onSubmit={handleSubmit}>
            
         
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-control">
                <div className="form-group">
             <label> Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>
                  <label className="label">
                    <span className="label-text">Staff Member</span>
                  </label>
                  <select
                    name="staffId"
                    value={formData.staffId}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Staff</option>
                    {staffMembers.map(staff => (
                      <option key={staff._id} value={staff._id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Order Type</span>
                  </label>
                  <select
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="Delivery">Delivery</option>
                    <option value="Parcel">Parcel</option>
                    <option value="Dine-in">Dine-in</option>
                  </select>
                </div>
              </div>

              {formData.orderType === 'Delivery' &&  (
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Delivery Address</span>
                  </label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              )}

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Order Items</h4>
                  <button 
                    type="button" 
                    onClick={addItem}
                    className="btn btn-xs btn-primary"
                  >
                    Add Item
                  </button>
                </div>
                {formData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-end">
                    <div className="col-span-5 form-control">
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, e)}
                        className="input input-bordered w-full"
                        placeholder="Item name"
                        required
                      />
                    </div>
                    <div className="col-span-2 form-control">
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="col-span-3 form-control">
                      <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, e)}
                        className="input input-bordered w-full"
                        placeholder="Price"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="btn btn-xs btn-error w-full"
                        disabled={formData.items.length <= 1}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="font-bold">
                  Total: ${formData.totalAmount.toFixed(2)}
                </div>
                <div className="modal-action">
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {showEditModal && editOrder && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Edit Order</h3>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-control">
                
             <label> Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={editOrder.customerName}
              onChange={(e) => setEditOrder({...editOrder, customerName: e.target.value})}
              required
            />
          
                  <label className="label">
                    <span className="label-text">Staff Member</span>
                  </label>
                  <select
                    name="staffId"
                    value={editOrder.staffId}
                    onChange={(e) => setEditOrder({...editOrder, staffId: e.target.value})}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Staff</option>
                    {staffMembers.map(staff => (
                      <option key={staff._id} value={staff._id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    name="status"
                    value={editOrder.status}
                    onChange={(e) => setEditOrder({...editOrder, status: e.target.value})}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Order Items</h4>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editOrder.items?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price?.toFixed(2)}</td>
                          <td>${(item.price * item.quantity)?.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="font-bold">
                  Total: ${editOrder.totalAmount?.toFixed(2)}
                </div>
                <div className="modal-action">
                  <button 
                    type="button" 
                    onClick={() => setShowEditModal(false)}
                    className="btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {showViewModal && viewOrder && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Order Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Order Information</h4>
                  <p>ID: {viewOrder._id}</p>
                  <p>Date: {new Date(viewOrder.createdAt).toLocaleString()}</p>
                  <p>Status: 
                    <span className={`badge ml-2 ${
                      viewOrder.status === 'Delivered' ? 'badge-success' :
                      viewOrder.status === 'Preparing' ? 'badge-error' : 'badge-warning'
                    }`}>
                      {viewOrder.status}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Staff</h4>
                  <p>{viewOrder.staffId?.name || 'N/A'}</p>
                  <h4 className="font-semibold mt-2">Order Type</h4>
                  <p>{viewOrder.orderType}</p>
                  {viewOrder.orderType === 'Delivery' && (
                    <>
                      <h4 className="font-semibold mt-2">Delivery Address</h4>
                      <p>{viewOrder.deliveryAddress}</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Items</h4>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewOrder.items?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price?.toFixed(2)}</td>
                          <td>${(item.price * item.quantity)?.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-right font-bold text-lg">
                Total: ${viewOrder.totalAmount?.toFixed(2)}
              </div>

              <div className="modal-action">
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;