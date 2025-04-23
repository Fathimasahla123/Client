import { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${apiUrl}/api/admin/list-feedbacks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setFeedbacks(response.data.feedback || response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading feedbacks...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Customer Feedbacks</h2>
      
      {feedbacks.length === 0 ? (
        <p>No feedbacks available</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Order ID</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Week</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Customer Service</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Punctuality</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Comment</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}>#{feedback.orderId?.slice(-6) || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{feedback.week}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex' }}>
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        style={{ 
                          color: i < feedback.rating.customerService ? '#ffc107' : '#e0e0e0',
                          fontSize: '18px'
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex' }}>
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        style={{ 
                          color: i < feedback.rating.punctuality ? '#ffc107' : '#e0e0e0',
                          fontSize: '18px'
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '12px', maxWidth: '300px' }}>
                  {feedback.comment || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeedbackList;