// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const StaffFeedback = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [stats, setStats] = useState({
//     avgService: 0,
//     avgPunctuality: 0,
//     totalFeedbacks: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get(`${apiUrl}/api/staff/received-feedback`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setFeedbacks(response.data.data);
//         setStats(response.data.statistics);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//         setLoading(false);
//         if (err.response?.status === 401) {
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//       }
//     };

//     fetchFeedback();
//   }, [navigate]);

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <span 
//         key={i} 
//         className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
//       >
//         ★
//       </span>
//     ));
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//       <strong>Error:</strong> {error}
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Customer Feedback</h1>
//         <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
//           Total Feedback: {stats.totalFeedbacks}
//         </div>
//       </div>

//       {/* Statistics Card */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//           <h3 className="text-lg font-semibold mb-2">Average Service Rating</h3>
//           <div className="flex items-center">
//             {renderStars(Math.round(stats.avgService))}
//             <span className="ml-2 text-gray-700">
//               ({stats.avgService.toFixed(1)}/5)
//             </span>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//           <h3 className="text-lg font-semibold mb-2">Average Punctuality Rating</h3>
//           <div className="flex items-center">
//             {renderStars(Math.round(stats.avgPunctuality))}
//             <span className="ml-2 text-gray-700">
//               ({stats.avgPunctuality.toFixed(1)}/5)
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Feedback List */}
//       <div className="space-y-6">
//         {feedbacks.length === 0 ? (
//           <div className="bg-gray-100 p-8 text-center rounded-lg">
//             <p className="text-gray-600">No feedback received yet</p>
//           </div>
//         ) : (
//           feedbacks.map(feedback => (
//             <div key={feedback._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//               <div className="p-6">
//                 <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
//                   <div>
//                     <h3 className="text-lg font-semibold">
//                       Order #{feedback.orderId?._id.toString().slice(-6) || 'N/A'}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       Week: {feedback.week} • {new Date(feedback.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="mt-2 md:mt-0">
//                     <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                       ${feedback.orderId?.totalAmount?.toFixed(2) || '0.00'}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <h4 className="font-medium mb-2">Customer:</h4>
//                   <div className="flex items-center">
//                     <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
//                       <span className="text-blue-600 font-medium">
//                         {feedback.customerId?.name?.charAt(0) || 'C'}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="font-medium">{feedback.customerId?.name || 'Anonymous'}</p>
//                       <p className="text-sm text-gray-500">{feedback.customerId?.email || ''}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <h4 className="font-medium mb-1">Customer Service:</h4>
//                     <div className="flex items-center">
//                       {renderStars(feedback.rating.customerService)}
//                       <span className="ml-2 text-gray-700">
//                         ({feedback.rating.customerService}/5)
//                       </span>
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="font-medium mb-1">Punctuality:</h4>
//                     <div className="flex items-center">
//                       {renderStars(feedback.rating.punctuality)}
//                       <span className="ml-2 text-gray-700">
//                         ({feedback.rating.punctuality}/5)
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {feedback.comment && (
//                   <div className="mt-4">
//                     <h4 className="font-medium mb-1">Comment:</h4>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-gray-700">"{feedback.comment}"</p>
//                     </div>
//                   </div>
//                 )}

//                 {feedback.orderId?.items && (
//                   <div className="mt-4">
//                     <h4 className="font-medium mb-2">Order Items:</h4>
//                     <ul className="space-y-1">
//                       {feedback.orderId.items.map((item, index) => (
//                         <li key={index} className="flex justify-between text-sm">
//                           <span>{item.name}</span>
//                           <span className="text-gray-600">
//                             {item.quantity} × ${item.price.toFixed(2)}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default StaffFeedback;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StaffFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({
    avgService: 0,
    avgPunctuality: 0,
    totalFeedbacks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/staff/received-feedback`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setFeedbacks(response.data.data);
        setStats(response.data.statistics);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchFeedback();
  }, [navigate]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline ml-1">{error}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Customer Feedback</h1>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          Total Feedback: <span className="font-bold">{stats.totalFeedbacks}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-md font-semibold mb-2 text-gray-700">Average Service Rating</h3>
          <div className="flex items-center">
            {renderStars(Math.round(stats.avgService))}
            <span className="ml-3 text-gray-600">
              {stats.avgService.toFixed(1)}/5
            </span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-md font-semibold mb-2 text-gray-700">Average Punctuality Rating</h3>
          <div className="flex items-center">
            {renderStars(Math.round(stats.avgPunctuality))}
            <span className="ml-3 text-gray-600">
              {stats.avgPunctuality.toFixed(1)}/5
            </span>
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order/Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Punctuality
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No feedback received yet
                  </td>
                </tr>
              ) : (
                feedbacks.map(feedback => (
                  <tr key={feedback._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {feedback.orderId ? `Order #${feedback.orderId._id?.toString().slice(-6)}` : 'General'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {feedback.customerId?.name?.charAt(0) || 'A'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {feedback.customerId?.name || 'Anonymous'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {feedback.customerId?.email || ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStars(feedback.rating.customerService)}
                        <span className="ml-2 text-sm text-gray-500">
                          ({feedback.rating.customerService}/5)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStars(feedback.rating.punctuality)}
                        <span className="ml-2 text-sm text-gray-500">
                          ({feedback.rating.punctuality}/5)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {feedback.comment || 'No comment'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {feedback.orderId ? `$${feedback.orderId.totalAmount?.toFixed(2)}` : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Items Modal - Would appear when a row is clicked */}
    </div>
  );
};

export default StaffFeedback;