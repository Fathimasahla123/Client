import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
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
        if (!token) throw new Error('Authentication required');

        const responses = await Promise.all([
          axios.get(`${apiUrl}/api/analytic/revenue`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${apiUrl}/api/analytic/popular-dishes`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${apiUrl}/api/analytic/customer-satisfaction`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${apiUrl}/api/analytic/delivery-performance`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${apiUrl}/api/analytic/table-turnover`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setAnalytics({
          revenue: responses[0].data.totalRevenue || 0,
          popularDishes: responses[1].data.popularDishes || [],
          satisfaction: {
            averageRating: parseFloat(responses[2].data.averageRating) || 0,
            totalFeedbacks: responses[2].data.totalFeedbacks || 0
          },
          deliveryPerformance: responses[3].data,
          turnoverRate: responses[4].data
        });
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || err.message);
        if (err.response?.status === 401) navigate('/login');
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const chartData = [
    { name: 'Revenue', value: analytics.revenue },
    { name: 'Avg Rating', value: analytics.satisfaction.averageRating }
  ];

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-amber-500 text-lg">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8  text-black">Restaurant Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Revenue Card */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-amber-500">Revenue</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#d97706" />
                  <YAxis stroke="#d97706" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    itemStyle={{ color: '#d97706' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#d97706" 
                    radius={[4, 4, 0, 0]}
                    className="shadow-lg"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-3xl font-bold mt-4 text-center">
              ₹{analytics.revenue.toLocaleString('en-IN')}
            </p>
          </div>

          {/* Popular Dishes */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-amber-500">Popular Dishes</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.popularDishes}
                    dataKey="totalOrders"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#d97706"
                    label
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    itemStyle={{ color: '#d97706' }}
                  />
                  <Legend wrapperStyle={{ color: '#d97706' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-amber-500">Customer Satisfaction</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" stroke="#d97706" />
                  <YAxis stroke="#d97706" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    itemStyle={{ color: '#d97706' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#d97706" 
                    strokeWidth={2}
                    dot={{ fill: '#d97706', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center mt-4">
              <span className="text-3xl font-bold">{analytics.satisfaction.averageRating.toFixed(1)}</span>
              <span className="text-gray-400 ml-2">/5 from {analytics.satisfaction.totalFeedbacks} reviews</span>
            </p>
          </div>

          {/* Delivery Performance */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-amber-500">Delivery Performance</h2>
            <div className="flex flex-col items-center justify-center h-64">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="absolute w-full h-full rounded-full"
                    style={{
                      background: `conic-gradient(#d97706 ${parseFloat(analytics.deliveryPerformance.rate) * 3.6}deg, #374151 0deg)`
                    }}
                  ></div>
                  <div className="absolute inset-2 bg-gray-900 rounded-full"></div>
                </div>
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                  <span className="text-2xl font-bold text-amber-500">
                    {analytics.deliveryPerformance.rate}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-center">
                {analytics.deliveryPerformance.delivered} / {analytics.deliveryPerformance.total} deliveries
              </p>
            </div>
          </div>

          {/* Table Turnover */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-amber-500">Table Turnover</h2>
            <div className="flex flex-col items-center justify-center h-64">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="absolute w-full h-full rounded-full"
                    style={{
                      background: `conic-gradient(#d97706 ${parseFloat(analytics.turnoverRate.rate) * 3.6}deg, #374151 0deg)`
                    }}
                  ></div>
                  <div className="absolute inset-2 bg-gray-900 rounded-full"></div>
                </div>
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                  <span className="text-2xl font-bold text-amber-500">
                    {analytics.turnoverRate.rate}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-center">
                {analytics.turnoverRate.completed} / {analytics.turnoverRate.total} reservations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;