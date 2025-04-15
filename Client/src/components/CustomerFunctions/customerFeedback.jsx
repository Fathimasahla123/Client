import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [formData, setFormData] = useState({
    staffId: '',
    orderId: '',
    reservationId: '',
    rating: {
      customerService: 0,
      punctuality: 0
    },
    comment: '',
    week: new Date().toISOString().slice(0, 10) // Current week in YYYY-MM-DD format
  });
  const [orders, setOrders] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0
  });

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFeedbacks();
    fetchOrders();
    fetchStaffMembers();
    fetchReservations();
  }, [pagination.page]);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/customer/feedback`, {
        params: {
          page: pagination.page,
          limit: pagination.limit
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setFeedbacks(response.data.data || []);
      setPagination({
        ...pagination,
        totalPages: response.data.pagination?.totalPages || 1,
        totalItems: response.data.pagination?.totalItems || 0
      });
      setLoading(false);
    } catch (err) {
      handleApiError(err, "fetch feedbacks");
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/customer/list-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.order || response.data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const fetchStaffMembers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/customer/list-staffs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStaffMembers(response.data.staff || response.data || []);
    } catch (err) {
      console.error("Failed to fetch staff:", err);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/customer/list-reservations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(response.data.reservation || response.data || []);
    } catch (err) {
      console.error("Failed to fetch reservations:", err);
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
        err.response?.data?.message || 
        `Failed to ${action}. Please try again.`
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (field, value) => {
    setFormData({
      ...formData,
      rating: {
        ...formData.rating,
        [field]: parseInt(value)
      }
    });
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      // Validate ratings
      if (formData.rating.customerService < 1 || formData.rating.punctuality < 1) {
        throw new Error("Please provide ratings for all categories");
      }

      await axios.post(`${apiUrl}/api/customer/submit-feedback`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowFeedbackModal(false);
      fetchFeedbacks();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to submit feedback");
    }
  };

  const resetForm = () => {
    setFormData({
      staffId: '',
      orderId: '',
      reservationId: '',
      rating: {
        customerService: 0,
        punctuality: 0
      },
      comment: '',
      week: new Date().toISOString().slice(0, 10)
    });
  };

  if (loading) return <div className="text-center py-8">Loading feedbacks...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Feedback</h1>
        <button 
          onClick={() => setShowFeedbackModal(true)} 
          className="btn btn-primary"
        >
          Submit New Feedback
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Staff</th>
              <th>Order</th>
              <th>Customer Service</th>
              <th>Punctuality</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback._id}>
                <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                <td>{feedback.staffId?.name || 'N/A'}</td>
                <td>
                  {feedback.orderId ? 
                    `Order #${feedback.orderId._id?.substring(0, 6)}...` : 
                    feedback.reservationId ?
                    `Reservation` : 'N/A'}
                </td>
                <td>
                  <div className="rating rating-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={`service-${star}`}
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked={feedback.rating?.customerService === star}
                        readOnly
                      />
                    ))}
                  </div>
                </td>
                <td>
                  <div className="rating rating-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={`punctuality-${star}`}
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked={feedback.rating?.punctuality === star}
                        readOnly
                      />
                    ))}
                  </div>
                </td>
                <td>
                  {feedback.comment?.substring(0, 30)}
                  {feedback.comment?.length > 30 && '...'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <div className="btn-group">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setPagination({...pagination, page})}
              className={`btn ${pagination.page === page ? 'btn-active' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Submit Feedback</h3>
            <form onSubmit={handleSubmitFeedback}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-control">
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
                    <span className="label-text">Order</span>
                  </label>
                  <select
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Order (Optional)</option>
                    {orders.map(order => (
                      <option key={order._id} value={order._id}>
                        Order #{order._id.substring(0, 6)} - ${order.totalAmount?.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Reservation</span>
                  </label>
                  <select
                    name="reservationId"
                    value={formData.reservationId}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Reservation (Optional)</option>
                    {reservations.map(res => (
                      <option key={res._id} value={res._id}>
                        Reservation {new Date(res.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Week</span>
                  </label>
                  <input
                    type="week"
                    name="week"
                    value={formData.week}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Ratings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Customer Service</span>
                    </label>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={`service-${star}`}
                          type="radio"
                          name="customerService"
                          className="mask mask-star-2 bg-orange-400"
                          checked={formData.rating.customerService === star}
                          onChange={() => handleRatingChange('customerService', star)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Punctuality</span>
                    </label>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={`punctuality-${star}`}
                          type="radio"
                          name="punctuality"
                          className="mask mask-star-2 bg-orange-400"
                          checked={formData.rating.punctuality === star}
                          onChange={() => handleRatingChange('punctuality', star)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Comments</span>
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered"
                  rows="3"
                  placeholder="Your feedback..."
                />
              </div>

              <div className="modal-action">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowFeedbackModal(false);
                    resetForm();
                  }}
                  className="btn"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFeedback;