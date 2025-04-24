import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const StaffOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [expandedOrder, setExpandedOrder] = useState(null);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${apiUrl}/api/staff/view-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.data);
        setPagination(response.data.pagination);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchOrders();
  }, [pagination.currentPage, navigate]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  const toggleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-amber-500" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
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
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-8">
              Assigned Orders
            </h1>
            {orders.length > 0 && (
              <div className="bg-amber-100 px-4 py-2 rounded-full">
                <span className="text-m font-bold text-amber-500">
                  {pagination.totalItems} total orders
                </span>
              </div>
            )}
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Order #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Feedback
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center">
                        <div className="text-gray-500 text-sm">
                          No orders assigned to you yet
                        </div>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <>
                        <tr
                          key={order.orderId}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleExpandOrder(order.orderId)}
                        >
                          {/* Order Number */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              #{order.orderId.slice(-6).toUpperCase()}
                            </div>
                          </td>

                          {/* Customer Info */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                                <span className="text-amber-700 font-medium">
                                  {order.Customer?.name?.charAt(0) || "C"}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {order.customer?.name || "Anonymous"}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {order.customer?.email || ""}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{order.totalAmount.toFixed(2)}
                          </td>

                          {/* Feedback */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order.feedback ? (
                              <div className="flex">
                                {renderStars(
                                  order.feedback.rating.customerService
                                )}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">
                                No feedback
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpandOrder(order.orderId);
                              }}
                              className="text-amber-600 hover:text-amber-700 flex items-center gap-1"
                            >
                              {expandedOrder === order.orderId ? (
                                <>
                                  <ChevronUpIcon className="w-4 h-4" />
                                  Hide
                                </>
                              ) : (
                                <>
                                  <ChevronDownIcon className="w-4 h-4" />
                                  View
                                </>
                              )}
                            </button>
                          </td>
                        </tr>

                        {/* Expanded Details */}
                        {expandedOrder === order.orderId && (
                          <tr className="bg-gray-50">
                            <td colSpan="7" className="px-6 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                                {/* Order Items */}
                                <div className="bg-white p-4 rounded-lg border border-gray-200">
                                  <h3 className="text-sm font-medium text-amber-600 mb-4">
                                    ORDER ITEMS
                                  </h3>
                                  <ul className="space-y-4">
                                    {order.items.map((item, index) => (
                                      <li
                                        key={index}
                                        className="flex justify-between items-start"
                                      >
                                        <div>
                                          <div className="text-gray-900 font-medium">
                                            {item.name}
                                          </div>
                                          {item.specialInstructions && (
                                            <p className="text-xs text-gray-500 mt-1">
                                              Note: {item.specialInstructions}
                                            </p>
                                          )}
                                        </div>
                                        <span className="text-gray-700 text-sm">
                                          {item.quantity} × ₹
                                          {item.price.toFixed(2)}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Feedback Section */}
                                {order.feedback && (
                                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-sm font-medium text-amber-600 mb-4">
                                      CUSTOMER FEEDBACK
                                    </h3>
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-xs text-gray-600 mb-2">
                                            Service Quality
                                          </p>
                                          <div className="flex items-center gap-2">
                                            {renderStars(
                                              order.feedback.rating
                                                .customerService
                                            )}
                                            <span className="text-xs text-amber-600">
                                              (
                                              {
                                                order.feedback.rating
                                                  .customerService
                                              }
                                              /5)
                                            </span>
                                          </div>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-2">
                                            Punctuality
                                          </p>
                                          <div className="flex items-center gap-2">
                                            {renderStars(
                                              order.feedback.rating.punctuality
                                            )}
                                            <span className="text-xs text-amber-600">
                                              (
                                              {
                                                order.feedback.rating
                                                  .punctuality
                                              }
                                              /5)
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      {order.feedback.comment && (
                                        <div className="border-t border-gray-200 pt-4">
                                          <p className="text-gray-700 text-sm italic">
                                            "{order.feedback.comment}"
                                          </p>
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
            <div className="mt-8 flex justify-center">
              <nav className="flex space-x-2">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[40px] h-10 rounded-lg flex items-center justify-center text-sm ${
                      pagination.currentPage === page
                        ? "bg-amber-500 text-white font-bold"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } transition-colors border border-gray-200`}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffOrders;
