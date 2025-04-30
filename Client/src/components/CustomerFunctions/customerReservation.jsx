import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [editReservation, setEditReservation] = useState(null);
  const [viewReservation, setViewReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
    status: "Pending",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/api/customer/my-reservations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReservations(response.data.data || response.data);
      setLoading(false);
    } catch (err) {
      handleApiError(err, "fetch reservations");
    }
  };

  const handleApiError = (err, action) => {
    setLoading(false);
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post(
        `${apiUrl}/api/customer/add-reservation`,
        {
          ...formData,
          customerId: user._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchReservations();
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      handleApiError(err, "add reservation");
    }
  };

  const handleEdit = (reservation) => {
    setEditReservation(reservation);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/api/customer/update-reservation/${editReservation._id}`,
        editReservation,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReservations();
      setShowEditModal(false);
    } catch (err) {
      handleApiError(err, "update reservation");
    }
  };

  const handleView = (reservation) => {
    setViewReservation(reservation);
    setShowViewModal(true);
  };

  const deleteReservation = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await axios.delete(`${apiUrl}/api/customer/delete-reservation/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchReservations();
      } catch (err) {
        handleApiError(err, "delete reservation");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      date: "",
      time: "",
      guests: 2,
      specialRequests: "",
      status: "Pending",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reservations...</p>
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
                Reservation Management
              </h1>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150"
              >
                Add New Reservation
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Guests
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
                  {reservations.map((reservation) => (
                    <tr key={reservation._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(reservation.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.guests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            reservation.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : reservation.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleView(reservation)}
                            className="text-amber-600 hover:text-amber-800"
                          >
                            View
                          </button>
                          {reservation.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleEdit(reservation)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  deleteReservation(reservation._id)
                                }
                                className="text-red-600 hover:text-red-800"
                              >
                                Cancel
                              </button>
                            </>
                          )}
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

      {/* Add Reservation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add New Reservation
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
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
                    Book Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Reservation Modal */}
      {showEditModal && editReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Edit Reservation
              </h3>
              <form onSubmit={handleUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={editReservation.customerName}
                      onChange={(e) =>
                        setEditReservation({
                          ...editReservation,
                          customerName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={
                          new Date(editReservation.date)
                            .toISOString()
                            .split("T")[0]
                        }
                        onChange={(e) =>
                          setEditReservation({
                            ...editReservation,
                            date: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={editReservation.time}
                        onChange={(e) =>
                          setEditReservation({
                            ...editReservation,
                            time: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      value={editReservation.specialRequests || ""}
                      onChange={(e) =>
                        setEditReservation({
                          ...editReservation,
                          specialRequests: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
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
                    Update Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Reservation Modal */}
      {showViewModal && viewReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Reservation Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Date</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(viewReservation.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Time</h4>
                    <p className="text-sm text-gray-600">
                      {viewReservation.time}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">Customer</h4>
                  <p className="text-sm text-gray-600">
                    {viewReservation.customerName}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">Guests</h4>
                  <p className="text-sm text-gray-600">
                    {viewReservation.guests}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">Status</h4>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      viewReservation.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : viewReservation.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {viewReservation.status}
                  </span>
                </div>

                {viewReservation.specialRequests && (
                  <div>
                    <h4 className="font-semibold text-gray-700">
                      Special Requests
                    </h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {viewReservation.specialRequests}
                    </p>
                  </div>
                )}

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

export default CustomerReservations;
