import { useState, useEffect } from 'react';
import { useStaff } from '../context/staffContext';
import api from '../utils/api';

const StaffFeedback = () => {
  const { staff } = useStaff();
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({
    avgService: 0,
    avgPunctuality: 0,
    totalFeedbacks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (staff) {
      fetchFeedback();
    }
  }, [staff]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await api.get('/staff/feedback');
      
      setFeedbacks(response.data.data);
      setStats(response.data.statistics);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };

  if (!staff) return null;

  return (
    <div className="staff-feedback">
      <h2>My Feedback</h2>
      
      {error && <div className="error-message">{error}</div>}

      <div className="feedback-stats">
        <h3>Performance Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.avgService.toFixed(1)}</div>
            <div className="stat-label">Avg. Service Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.avgPunctuality.toFixed(1)}</div>
            <div className="stat-label">Avg. Punctuality Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalFeedbacks}</div>
            <div className="stat-label">Total Feedbacks</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div>Loading feedback...</div>
      ) : (
        <>
          {feedbacks.length === 0 ? (
            <div className="no-feedback">No feedback received yet.</div>
          ) : (
            <div className="feedback-list">
              {feedbacks.map(feedback => (
                <div key={feedback._id} className="feedback-card">
                  <div className="feedback-header">
                    <div>
                      <strong>Customer:</strong> {feedback.customerId.name} ({feedback.customerId.email})
                    </div>
                    <div className="feedback-date">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {feedback.orderId && (
                    <div className="feedback-order">
                      <strong>Order:</strong> ${feedback.orderId.totalAmount.toFixed(2)} - {feedback.orderId.items.length} items
                    </div>
                  )}
                  
                  <div className="feedback-ratings">
                    <div>
                      <strong>Service:</strong> {feedback.rating.customerService}/5
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
          )}
        </>
      )}
    </div>
  );
};

export default StaffFeedback;