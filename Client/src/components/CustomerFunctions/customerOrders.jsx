import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    staffId: "",
    items: [{ name: "", quantity: 1, price: 0 }],
    totalAmount: 0,
    orderType: "Delivery",
    deliveryAddress: "",
    status: "Pending",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/product/get-products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data.products || response.data);
      } catch (err) {
        handleApiError(err, "fetch products");
      }
    };
    fetchProducts();
  }, []);

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
      setStaffMembers(response.data.data || response.data);
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
        err.response?.data?.message || `Failed to ${action}. Please try again.`
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

    if (name === "productId") {
      const selectedProduct = products.find((p) => p._id === value);
      newItems[index] = {
        ...newItems[index],
        productId: value,
        name: selectedProduct.name,
        price: selectedProduct.price,
      };
    } else {
      newItems[index] = {
        ...newItems[index],
        [name]: name === "quantity" ? Number(value) : value,
      };
    }

    const totalAmount = newItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setFormData({
      ...formData,
      items: newItems,
      totalAmount,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { productId: "", name: "", quantity: 1, price: 0 },
      ],
    });
  };
  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems,
      totalAmount: newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
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
      customerName: "",
      staffId: "",
      items: [{ name: "", quantity: 1, price: 0 }],
      totalAmount: 0,
      orderType: "Delivery",
      deliveryAddress: "",
      status: "Pending",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                Order Management
              </h1>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150"
              >
                Add New Order
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Staff
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order._id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.staffId?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Preparing"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleView(order)}
                            className="text-amber-600 hover:text-amber-800"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(order)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteOrder(order._id)}
                            className="text-red-600 hover:text-red-800"
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
          </div>
        </div>
      </div>

      {/* Add Order Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add New Order
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Staff Member
                    </label>
                    <select
                      name="staffId"
                      value={formData.staffId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      <option value="">Select Staff</option>
                      {staffMembers.map((staff) => (
                        <option key={staff._id} value={staff._id}>
                          {staff.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Type
                    </label>
                    <select
                      name="orderType"
                      value={formData.orderType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      <option value="Delivery">Delivery</option>
                      <option value="Pickup">Pickup</option>
                    </select>
                  </div>
                </div>

                {formData.orderType === "Delivery" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-700">Order Items</h4>
                    <button
                      type="button"
                      onClick={addItem}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Add Item
                    </button>
                  </div>

                  {formData.items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-2 mb-2 items-end"
                    >
                      <div className="col-span-5">
                        <select
                          name="productId"
                          value={item.productId}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        >
                          <option value="">Select Menu Item</option>
                          {products.map((product) => (
                            <option key={product._id} value={product._id}>
                              {product.name} - ₹{product.price}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          name="price"
                          min="0"
                          step="0.01"
                          value={item.price}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                        />
                      </div>
                      <div className="col-span-2">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm disabled:opacity-50"
                          disabled={formData.items.length <= 1}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 border-t pt-4">
                  <div className="font-bold text-lg">
                    Total: ${formData.totalAmount.toFixed(2)}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        resetForm();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 text-white rounded-md text-sm font-medium hover:bg-amber-600"
                    >
                      Add Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {showEditModal && editOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Edit Order
              </h3>
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={editOrder.customerName}
                      onChange={(e) =>
                        setEditOrder({
                          ...editOrder,
                          customerName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Staff Member
                    </label>
                    <select
                      name="staffId"
                      value={editOrder.staffId}
                      onChange={(e) =>
                        setEditOrder({ ...editOrder, staffId: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      <option value="">Select Staff</option>
                      {staffMembers.map((staff) => (
                        <option key={staff._id} value={staff._id}>
                          {staff.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Type
                    </label>
                    <select
                      name="orderType"
                      value={editOrder.orderType}
                      onChange={(e) =>
                        setEditOrder({
                          ...editOrder,
                          orderType: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      <option value="Delivery">Delivery</option>
                      <option value="Pickup">Pickup</option>
                    </select>
                  </div>
                </div>

                {editOrder.orderType === "Delivery" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={editOrder.deliveryAddress}
                      onChange={(e) =>
                        setEditOrder({
                          ...editOrder,
                          deliveryAddress: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Order Items
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {editOrder.items?.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${item.price?.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${(item.price * item.quantity)?.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 border-t pt-4">
                  <div className="font-bold text-lg">
                    Total: ${editOrder.totalAmount?.toFixed(2)}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 text-white rounded-md text-sm font-medium hover:bg-amber-600"
                    >
                      Update Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {showViewModal && viewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Order Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">
                      Order Information
                    </h4>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">ID:</span> {viewOrder._id}
                      </p>
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(viewOrder.createdAt).toLocaleString()}
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium">Status:</span>
                        <span
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            viewOrder.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : viewOrder.status === "Preparing"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {viewOrder.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Staff</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {viewOrder.staffId?.name || "N/A"}
                    </p>
                    <h4 className="font-semibold text-gray-700 mt-3">
                      Order Type
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {viewOrder.orderType}
                    </p>
                    {viewOrder.orderType === "Delivery" && (
                      <>
                        <h4 className="font-semibold text-gray-700 mt-3">
                          Delivery Address
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {viewOrder.deliveryAddress}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">Items</h4>
                  <div className="mt-2 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {viewOrder.items?.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${item.price?.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${(item.price * item.quantity)?.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-right font-bold text-lg border-t pt-4">
                  Total: ${viewOrder.totalAmount?.toFixed(2)}
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
