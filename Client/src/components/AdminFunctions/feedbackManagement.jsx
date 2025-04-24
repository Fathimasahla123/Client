import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${apiUrl}/api/admin/list-feedbacks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setFeedbacks(response.data.feedback || response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setError(error.response?.data?.message || error.message);
        setLoading(false);
        toast.error("Failed to load feedbacks");
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading feedbacks...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gray-900 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Customer Feedbacks</h1>
          </div>

          <div className="p-6">
            {feedbacks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No feedbacks available</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Week</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Punctuality</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Comment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {feedbacks.map(feedback => (
                      <tr key={feedback._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                          #{feedback.orderId?.slice(-6) || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{feedback.week}</td>
                        
                        {/* Customer Service Rating */}
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xl ${i < feedback.rating.customerService ? 'text-amber-500' : 'text-gray-300'}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Punctuality Rating */}
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xl ${i < feedback.rating.punctuality ? 'text-amber-500' : 'text-gray-300'}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs break-words">
                          {feedback.comment || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;