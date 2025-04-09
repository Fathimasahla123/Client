// import { useState, useEffect } from 'react';
// //import api from '../utils/api';
// import { useCustomer } from '../context/customerContext';

// const CustomerFeedback = () => {
//   const { customer } = useCustomer();
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0
//   });

//   useEffect(() => {
//     if (customer) {
//       fetchFeedbacks();
//     }
//   }, [customer, pagination.page]);

//   const fetchFeedbacks = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/customer/feedback', {
//         params: {
//           page: pagination.page,
//           limit: pagination.limit
//         }
//       });
      
//       setFeedbacks(response.data.data);
//       setPagination(prev => ({
//         ...prev,
//         total: response.data.pagination.totalItems,
//         totalPages: response.data.pagination.totalPages
//       }));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch feedbacks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//   };

//   if (!customer) return <div>Loading...</div>;

//   return (
//     <div className="feedback-container">
//       <h2>My Feedback</h2>
      
//       {error && <div className="error-message">{error}</div>}

//       {loading ? (
//         <div>Loading feedback...</div>
//       ) : (
//         <>
//           {feedbacks.length === 0 ? (
//             <div className="no-feedback">You haven't submitted any feedback yet.</div>
//           ) : (
//             <>
//               <div className="feedback-list">
//                 {feedbacks.map(feedback => (
//                   <div key={feedback._id} className="feedback-card">
//                     <div className="feedback-header">
//                       <h4>Feedback for {feedback.staffId?.name || 'Staff'}</h4>
//                       <span className="feedback-date">
//                         {new Date(feedback.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
                    
//                     {feedback.orderId && (
//                       <div className="feedback-order">
//                         <strong>Order:</strong> #{feedback.orderId._id.substring(18)}
//                         <br />
//                         <strong>Amount:</strong> ${feedback.orderId.totalAmount.toFixed(2)}
//                       </div>
//                     )}
                    
//                     <div className="feedback-ratings">
//                       <div>
//                         <strong>Customer Service:</strong> {feedback.rating.customerService}/5
//                       </div>
//                       <div>
//                         <strong>Punctuality:</strong> {feedback.rating.punctuality}/5
//                       </div>
//                     </div>
                    
//                     {feedback.comment && (
//                       <div className="feedback-comment">
//                         <strong>Comment:</strong> {feedback.comment}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="pagination">
//                 <button
//                   onClick={() => handlePageChange(pagination.page - 1)}
//                   disabled={pagination.page === 1}
//                 >
//                   Previous
//                 </button>
//                 <span>
//                   Page {pagination.page} of {pagination.totalPages}
//                 </span>
//                 <button
//                   onClick={() => handlePageChange(pagination.page + 1)}
//                   disabled={pagination.page === pagination.totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default CustomerFeedback;

import { useState, useEffect } from 'react';

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  // Mock customer data
  const [customer] = useState({
    id: '123',
    name: 'John Doe'
  });

  useEffect(() => {
    if (customer) {
      fetchFeedbacks();
    }
  }, [customer, pagination.page]);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      // Mock API response
      const mockResponse = {
        data: {
          data: [
            {
              _id: '1',
              staffId: { name: 'Staff Member' },
              orderId: { 
                _id: 'order123456789012345678',
                totalAmount: 25.99 
              },
              rating: {
                customerService: 4,
                punctuality: 5
              },
              comment: 'Great service!',
              createdAt: new Date()
            }
          ],
          pagination: {
            totalItems: 1,
            totalPages: 1
          }
        }
      };
      
      setFeedbacks(mockResponse.data.data);
      setPagination(prev => ({
        ...prev,
        total: mockResponse.data.pagination.totalItems,
        totalPages: mockResponse.data.pagination.totalPages
      }));
    } catch (err) {
      setError(err.message || 'Failed to fetch feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="feedback-container">
      <h2>My Feedback</h2>
      
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div>Loading feedback...</div>
      ) : (
        <>
          {feedbacks.length === 0 ? (
            <div className="no-feedback">You haven't submitted any feedback yet.</div>
          ) : (
            <>
              <div className="feedback-list">
                {feedbacks.map(feedback => (
                  <div key={feedback._id} className="feedback-card">
                    <div className="feedback-header">
                      <h4>Feedback for {feedback.staffId?.name || 'Staff'}</h4>
                      <span className="feedback-date">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {feedback.orderId && (
                      <div className="feedback-order">
                        <strong>Order:</strong> #{feedback.orderId._id.substring(18)}
                        <br />
                        <strong>Amount:</strong> ${feedback.orderId.totalAmount.toFixed(2)}
                      </div>
                    )}
                    
                    <div className="feedback-ratings">
                      <div>
                        <strong>Customer Service:</strong> {feedback.rating.customerService}/5
                      </div>
                      <div>
                        <strong>Punctuality:</strong> {feedback.rating.punctuality}/5
                      </div>
                    </div>
                    
                    {feedback.comment && (
                      <div className="feedback-comment">
                        <strong>Comment:</strong> {feedback.comment}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerFeedback;