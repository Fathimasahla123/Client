import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, LineChart, Line } from 'recharts';
import { useNavigate } from 'react-router-dom';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    revenue: 0,
    popularDishes: [],
    satisfaction: { averageRating: 0, totalFeedbacks: 0 },
    deliveryPerformance: { rate: '0%', delivered: 0, total: 0 },
    turnoverRate: { rate: '0%', completed: 0, total: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const [
          revenueRes,
          dishesRes,
          satisfactionRes,
          deliveryRes,
          turnoverRes
        ] = await Promise.all([
          axios.get(`${apiUrl}/api/analytic/revenue`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${apiUrl}/api/analytic/popular-dishes`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${apiUrl}/api/analytic/customer-satisfaction`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${apiUrl}/api/analytic/delivery-performance`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${apiUrl}/api/analytic/table-turnover`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setAnalytics({
          revenue: revenueRes.data.totalRevenue || 0,
          popularDishes: dishesRes.data.popularDishes || [],
          satisfaction: {
            averageRating: parseFloat(satisfactionRes.data.averageRating) || 0,
            totalFeedbacks: satisfactionRes.data.totalFeedbacks || 0
          },
          deliveryPerformance: {
            rate: deliveryRes.data.performance || '0%',
            delivered: deliveryRes.data.delivered || 0,
            total: deliveryRes.data.total || 0
          },
          turnoverRate: {
            rate: turnoverRes.data.turnoverRate || '0%',
            completed: turnoverRes.data.completed || 0,
            total: turnoverRes.data.total || 0
          }
        });
        setLoading(false);
      } catch (err) {
        console.error('Analytics fetch error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load analytics');
        setLoading(false);
        
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  if (loading) return <div className="loading-screen">Loading analytics...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  // Prepare data for charts
  const revenueData = [
    { name: 'Revenue', value: analytics.revenue }
  ];

  const dishesData = analytics.popularDishes.map(dish => ({
    name: dish._id,
    value: dish.totalOrders
  }));

  const satisfactionData = [
    { name: 'Rating', value: analytics.satisfaction.averageRating }
  ];

  return (
    <div className="analytics-container">
      <h2>Analytics Dashboard</h2>
      
      <div className="time-range-selector">
        {['day', 'week', 'month', 'year'].map((range) => (
          <button
            key={range}
            className={timeRange === range ? 'active' : ''}
            onClick={() => handleTimeRangeChange(range)}
          >
            {range === 'day' ? 'Today' : 
             range === 'week' ? 'This Week' : 
             range === 'month' ? 'This Month' : 'This Year'}
          </button>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Revenue</h3>
          <div className="chart-container">
            <BarChart width={300} height={200} data={revenueData}>
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
          <p className="big-number">${analytics.revenue.toLocaleString()}</p>
        </div>

        <div className="analytics-card">
          <h3>Popular Dishes</h3>
          <div className="chart-container">
            <PieChart width={300} height={200}>
              <Pie
                data={dishesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              />
            </PieChart>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Customer Satisfaction</h3>
          <div className="chart-container">
            <LineChart width={300} height={200} data={satisfactionData}>
              <Line type="monotone" dataKey="value" stroke="#ff7300" />
            </LineChart>
          </div>
          <p className="big-number">
            {analytics.satisfaction.averageRating.toFixed(1)}/5
          </p>
          <p>from {analytics.satisfaction.totalFeedbacks} feedbacks</p>
        </div>

        <div className="analytics-card">
          <h3>Delivery Performance</h3>
          <div className="performance-circle">
            <div className="circle-progress" style={{ 
              background: `conic-gradient(#0088fe ${parseInt(analytics.deliveryPerformance.rate) * 3.6}deg, #ddd 0deg)`
            }}>
              <span>{analytics.deliveryPerformance.rate}</span>
            </div>
          </div>
          <p>{analytics.deliveryPerformance.delivered} delivered out of {analytics.deliveryPerformance.total}</p>
        </div>

        <div className="analytics-card">
          <h3>Table Turnover Rate</h3>
          <div className="performance-circle">
            <div className="circle-progress" style={{ 
              background: `conic-gradient(#00c49f ${parseInt(analytics.turnoverRate.rate) * 3.6}deg, #ddd 0deg)`
            }}>
              <span>{analytics.turnoverRate.rate}</span>
            </div>
          </div>
          <p>{analytics.turnoverRate.completed} completed out of {analytics.turnoverRate.total}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;