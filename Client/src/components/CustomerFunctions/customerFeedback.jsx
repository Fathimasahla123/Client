// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CustomerFeedback = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
//   const [formData, setFormData] = useState({
//     staffId: '',
//     orderId: '',
//     reservationId: '',
//     rating: {
//       customerService: 0,
//       punctuality: 0
//     },
//     comment: '',
//     week: new Date().toISOString().slice(0, 10) // Current week in YYYY-MM-DD format
//   });
//   const [orders, setOrders] = useState([]);
//   const [staffMembers, setStaffMembers] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     totalPages: 1,
//     totalItems: 0
//   });

//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchFeedbacks();
//     fetchOrders();
//     fetchStaffMembers();
//     fetchReservations();
//   }, [pagination.page]);

//   const fetchFeedbacks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${apiUrl}/api/customer/feedback`, {
//         params: {
//           page: pagination.page,
//           limit: pagination.limit
//         },
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       setFeedbacks(response.data.data || []);
//       setPagination({
//         ...pagination,
//         totalPages: response.data.pagination?.totalPages || 1,
//         totalItems: response.data.pagination?.totalItems || 0
//       });
//       setLoading(false);
//     } catch (err) {
//       handleApiError(err, "fetch feedbacks");
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/customer/list-orders`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setOrders(response.data.order || response.data || []);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     }
//   };

//   const fetchStaffMembers = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/customer/list-staffs`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setStaffMembers(response.data.data || response.data || []);
//     } catch (err) {
//       console.error("Failed to fetch staff:", err);
//     }
//   };

//   const fetchReservations = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/customer/list-reservations`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setReservations(response.data.reservation || response.data || []);
//     } catch (err) {
//       console.error("Failed to fetch reservations:", err);
//     }
//   };

//   const handleApiError = (err, action) => {
//     setLoading(false);
//     if (err.response?.status === 401) {
//       localStorage.removeItem("token");
//       navigate("/login");
//       setError(`Session expired. Please login again.`);
//     } else {
//       setError(
//         err.response?.data?.message || 
//         `Failed to ${action}. Please try again.`
//       );
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRatingChange = (field, value) => {
//     setFormData({
//       ...formData,
//       rating: {
//         ...formData.rating,
//         [field]: parseInt(value)
//       }
//     });
//   };

//   const handleSubmitFeedback = async (e) => {
//     e.preventDefault();
//     try {
//       // Validate ratings
//       if (formData.rating.customerService < 1 || formData.rating.punctuality < 1) {
//         throw new Error("Please provide ratings for all categories");
//       }

//       await axios.post(`${apiUrl}/api/customer/submit-feedback`, formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       setShowFeedbackModal(false);
//       fetchFeedbacks();
//       resetForm();
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to submit feedback");
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       staffId: '',
//       orderId: '',
//       reservationId: '',
//       rating: {
//         customerService: 0,
//         punctuality: 0
//       },
//       comment: '',
//       week: new Date().toISOString().slice(0, 10)
//     });
//   };

//   if (loading) return <div className="text-center py-8">Loading feedbacks...</div>;
//   if (error) return <div className="alert alert-error">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">My Feedback</h1>
//         <button 
//           onClick={() => setShowFeedbackModal(true)} 
//           className="btn btn-primary"
//         >
//           Submit New Feedback
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Staff</th>
//               <th>Order</th>
//               <th>Customer Service</th>
//               <th>Punctuality</th>
//               <th>Comment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feedbacks.map(feedback => (
//               <tr key={feedback._id}>
//                 <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
//                 <td>{feedback.staffId?.name || 'N/A'}</td>
//                 <td>
//                   {feedback.orderId ? 
//                     `Order #${feedback.orderId._id?.substring(0, 6)}...` : 
//                     feedback.reservationId ?
//                     `Reservation` : 'N/A'}
//                 </td>
//                 <td>
//                   <div className="rating rating-sm">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <input
//                         key={`service-${star}`}
//                         type="radio"
//                         className="mask mask-star-2 bg-orange-400"
//                         checked={feedback.rating?.customerService === star}
//                         readOnly
//                       />
//                     ))}
//                   </div>
//                 </td>
//                 <td>
//                   <div className="rating rating-sm">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <input
//                         key={`punctuality-${star}`}
//                         type="radio"
//                         className="mask mask-star-2 bg-orange-400"
//                         checked={feedback.rating?.punctuality === star}
//                         readOnly
//                       />
//                     ))}
//                   </div>
//                 </td>
//                 <td>
//                   {feedback.comment?.substring(0, 30)}
//                   {feedback.comment?.length > 30 && '...'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-center mt-6">
//         <div className="btn-group">
//           {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
//             <button
//               key={page}
//               onClick={() => setPagination({...pagination, page})}
//               className={`btn ${pagination.page === page ? 'btn-active' : ''}`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Feedback Modal */}
//       {showFeedbackModal && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-2xl">
//             <h3 className="font-bold text-lg mb-4">Submit Feedback</h3>
//             <form onSubmit={handleSubmitFeedback}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Staff Member</span>
//                   </label>
//                   <select
//                     name="staffId"
//                     value={formData.staffId}
//                     onChange={handleInputChange}
//                     className="select select-bordered w-full"
//                     required
//                   >
//                     <option value="">Select Staff</option>
//                     {staffMembers.map(staff => (
//                       <option key={staff._id} value={staff._id}>
//                         {staff.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Order</span>
//                   </label>
//                   <select
//                     name="orderId"
//                     value={formData.orderId}
//                     onChange={handleInputChange}
//                     className="select select-bordered w-full"
//                   >
//                     <option value="">Select Order (Optional)</option>
//                     {orders.map(order => (
//                       <option key={order._id} value={order._id}>
//                         Order #{order._id.substring(0, 6)} - ${order.totalAmount?.toFixed(2)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Reservation</span>
//                   </label>
//                   <select
//                     name="reservationId"
//                     value={formData.reservationId}
//                     onChange={handleInputChange}
//                     className="select select-bordered w-full"
//                   >
//                     <option value="">Select Reservation (Optional)</option>
//                     {reservations.map(res => (
//                       <option key={res._id} value={res._id}>
//                         Reservation {new Date(res.date).toLocaleDateString()}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Week</span>
//                   </label>
//                   <input
//                     type="week"
//                     name="week"
//                     value={formData.week}
//                     onChange={handleInputChange}
//                     className="input input-bordered w-full"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <h4 className="font-semibold mb-2">Ratings</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Customer Service</span>
//                     </label>
//                     <div className="rating">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <input
//                           key={`service-${star}`}
//                           type="radio"
//                           name="customerService"
//                           className="mask mask-star-2 bg-orange-400"
//                           checked={formData.rating.customerService === star}
//                           onChange={() => handleRatingChange('customerService', star)}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Punctuality</span>
//                     </label>
//                     <div className="rating">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <input
//                           key={`punctuality-${star}`}
//                           type="radio"
//                           name="punctuality"
//                           className="mask mask-star-2 bg-orange-400"
//                           checked={formData.rating.punctuality === star}
//                           onChange={() => handleRatingChange('punctuality', star)}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="form-control mb-4">
//                 <label className="label">
//                   <span className="label-text">Comments</span>
//                 </label>
//                 <textarea
//                   name="comment"
//                   value={formData.comment}
//                   onChange={handleInputChange}
//                   className="textarea textarea-bordered"
//                   rows="3"
//                   placeholder="Your feedback..."
//                 />
//               </div>

//               <div className="modal-action">
//                 <button 
//                   type="button" 
//                   onClick={() => {
//                     setShowFeedbackModal(false);
//                     resetForm();
//                   }}
//                   className="btn"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Submit Feedback
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerFeedback;

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
    week: new Date().toISOString().slice(0, 10)
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
      setStaffMembers(response.data.data || response.data || []);
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
      setError("Session expired. Please login again.");
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-amber-500 text-lg font-medium">Loading feedbacks...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <div className="text-red-500 font-medium">{error}</div>
        <button 
          onClick={() => setError(null)} 
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    // <div className="min-h-screen bg-gray-100 p-6">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="flex justify-between items-center mb-8">
    //       <h1 className="text-3xl font-bold text-gray-900">Customer Feedback</h1>
    //       <button 
    //         onClick={() => setShowFeedbackModal(true)} 
    //         className="px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition"
    //       >
    //         Submit New Feedback
    //       </button>
    //     </div>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Feedback Management</h1>
            <button 
               onClick={() => setShowFeedbackModal(true)} 
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150"
            >
              Add New Feedback
            </button>
          </div>
        </div>
        

        <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider ">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Customer Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Punctuality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Comment</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbacks.map(feedback => (
                  <tr key={feedback._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {feedback.staffId?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {feedback.orderId ? 
                        `Order #${feedback.orderId._id?.substring(0, 6)}...` : 
                        feedback.reservationId ?
                        'Reservation' : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={`service-${star}`}
                            className={`w-5 h-5 ${feedback.rating?.customerService >= star ? 'text-amber-500' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={`punctuality-${star}`}
                            className={`w-5 h-5 ${feedback.rating?.punctuality >= star ? 'text-amber-500' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {feedback.comment?.substring(0, 30)}
                      {feedback.comment?.length > 30 && '...'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {feedbacks.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500">
              No feedback records found
            </div>
          )}
          </div>

          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing page {pagination.page} of {pagination.totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPagination({...pagination, page: Math.max(1, pagination.page - 1)})}
                disabled={pagination.page === 1}
                className={`px-4 py-2 rounded-md ${pagination.page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-600'}`}
              >
                Previous
              </button>
              <button
                onClick={() => setPagination({...pagination, page: Math.min(pagination.totalPages, pagination.page + 1)})}
                disabled={pagination.page === pagination.totalPages}
                className={`px-4 py-2 rounded-md ${pagination.page === pagination.totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-600'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Submit Feedback</h3>
                <button 
                  onClick={() => {
                    setShowFeedbackModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitFeedback}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Staff Member *</label>
                    <select
                      name="staffId"
                      value={formData.staffId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md border"
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

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Order</label>
                    <select
                      name="orderId"
                      value={formData.orderId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md border"
                    >
                      <option value="">Select Order (Optional)</option>
                      {orders.map(order => (
                        <option key={order._id} value={order._id}>
                          Order #{order._id.substring(0, 6)} - ${order.totalAmount?.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Reservation</label>
                    <select
                      name="reservationId"
                      value={formData.reservationId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md border"
                    >
                      <option value="">Select Reservation (Optional)</option>
                      {reservations.map(res => (
                        <option key={res._id} value={res._id}>
                          Reservation {new Date(res.date).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Week *</label>
                    <input
                      type="week"
                      name="week"
                      value={formData.week}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md border"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Ratings *</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Customer Service</label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={`service-${star}`}
                            type="button"
                            onClick={() => handleRatingChange('customerService', star)}
                            className={`p-1 rounded-full ${formData.rating.customerService >= star ? 'text-amber-500' : 'text-gray-300'}`}
                          >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Punctuality</label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={`punctuality-${star}`}
                            type="button"
                            onClick={() => handleRatingChange('punctuality', star)}
                            className={`p-1 rounded-full ${formData.rating.punctuality >= star ? 'text-amber-500' : 'text-gray-300'}`}
                          >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">Comments</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    rows="3"
                    placeholder="Your feedback..."
                  />
                </div>

                {error && (
                  <div className="mb-4 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowFeedbackModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default CustomerFeedback;