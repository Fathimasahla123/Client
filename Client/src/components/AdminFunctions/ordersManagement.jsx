import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/admin/list-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.order || response.data || [];
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      handleApiError(err, "fetch orders");
    }
  };

  const handleApiError = (err, action) => {
    setLoading(false);
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/admin/login");
      setError(`Session expired. Please login again.`);
    } else {
      setError(
        err.response?.data?.message || `Failed to ${action}. Please try again.`
      );
    }
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/api/admin/update-order/${editOrder._id}`,
        { status: editOrder.status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === editOrder._id
            ? { ...order, status: editOrder.status }
            : order
        )
      );
      setShowEditModal(false);
      toast.success("Order updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${apiUrl}/api/admin/delete-order/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchOrders();
      } catch (err) {
        handleApiError(err, "delete order");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />

      {/* Edit Status Modal */}
      {showEditModal && editOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Edit Order Status
              </h3>
              <form onSubmit={handleStatusUpdate}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editOrder.status}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
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
                    Update Status
                  </button>
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
                          className={`ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                            viewOrder.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : viewOrder.status === "Preparing"
                              ? "bg-amber-100 text-amber-800"
                              : viewOrder.status === "Pending"
                              ? "bg-red-100 text-red-800"
                              : "bg-red-100 text-red-800"
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
                              ₹{item.price?.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ₹{(item.price * item.quantity)?.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-right font-bold text-lg border-t pt-4">
                  Total: ₹{viewOrder.totalAmount?.toFixed(2)}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gray-900 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Orders Management</h1>
          </div>

          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Staff
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders?.map(
                      (order) =>
                        order?._id && (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                              #{order._id?.substring(18)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {order.customerName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {order.staffId?.name || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <span className="capitalize">
                                {order.orderType}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                              ₹{order.totalAmount?.toFixed(2) || "0.00"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Preparing"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {order.status || "Pending"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {order.createdAt &&
                                new Date(order.createdAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button onClick={() => setViewOrder(order)}>
                                View
                              </button>
                              <button
                                onClick={() => {
                                  setEditOrder(order);
                                  setShowEditModal(true);
                                }}
                              >
                                Edit
                              </button>
                              <button onClick={() => deleteOrder(order._id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
