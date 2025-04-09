// import { useState, useEffect } from 'react';
// import { BarChart, PieChart, LineChart } from 'recharts';
// //import api from '../utils/api';

// const AnalyticsDashboard = () => {
//   const [analytics, setAnalytics] = useState({
//     revenue: 0,
//     popularDishes: [],
//     satisfaction: { averageRating: 0, totalFeedbacks: 0 },
//     deliveryPerformance: { rate: '0%', delivered: 0, total: 0 },
//     turnoverRate: { rate: '0%', completed: 0, total: 0 }
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeRange, setTimeRange] = useState('week');

//   useEffect(() => {
//     fetchAnalytics();
//   }, [timeRange]);

//   const fetchAnalytics = async () => {
//     try {
//       const [
//         revenueRes,
//         dishesRes,
//         satisfactionRes,
//         deliveryRes,
//         turnoverRes
//       ] = await Promise.all([
//         api.get(`/admin/analytics/revenue?range=${timeRange}`),
//         api.get(`/admin/analytics/popular-dishes?range=${timeRange}`),
//         api.get(`/admin/analytics/customer-satisfaction?range=${timeRange}`),
//         api.get(`/admin/analytics/delivery-performance?range=${timeRange}`),
//         api.get(`/admin/analytics/table-turnover?range=${timeRange}`)
//       ]);

//       setAnalytics({
//         revenue: revenueRes.data.totalRevenue,
//         popularDishes: dishesRes.data.popularDishes,
//         satisfaction: {
//           averageRating: satisfactionRes.data.averageRating,
//           totalFeedbacks: satisfactionRes.data.totalFeedbacks
//         },
//         deliveryPerformance: {
//           rate: deliveryRes.data.performance,
//           delivered: deliveryRes.data.delivered,
//           total: deliveryRes.data.total
//         },
//         turnoverRate: {
//           rate: turnoverRes.data.turnoverRate,
//           completed: turnoverRes.data.completed,
//           total: turnoverRes.data.total
//         }
//       });
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleTimeRangeChange = (range) => {
//     setTimeRange(range);
//   };

//   if (loading) return <div>Loading analytics...</div>;
//   if (error) return <div className="error-message">Error: {error}</div>;

//   // Prepare data for charts
//   const revenueData = [
//     { name: 'Revenue', value: analytics.revenue }
//   ];

//   const dishesData = analytics.popularDishes.map(dish => ({
//     name: dish._id,
//     value: dish.totalOrders
//   }));

//   const satisfactionData = [
//     { name: 'Rating', value: parseFloat(analytics.satisfaction.averageRating) }
//   ];

//   return (
//     <div className="analytics-container">
//       <h2>Analytics Dashboard</h2>
      
//       <div className="time-range-selector">
//         <button 
//           className={timeRange === 'day' ? 'active' : ''}
//           onClick={() => handleTimeRangeChange('day')}
//         >
//           Today
//         </button>
//         <button 
//           className={timeRange === 'week' ? 'active' : ''}
//           onClick={() => handleTimeRangeChange('week')}
//         >
//           This Week
//         </button>
//         <button 
//           className={timeRange === 'month' ? 'active' : ''}
//           onClick={() => handleTimeRangeChange('month')}
//         >
//           This Month
//         </button>
//         <button 
//           className={timeRange === 'year' ? 'active' : ''}
//           onClick={() => handleTimeRangeChange('year')}
//         >
//           This Year
//         </button>
//       </div>

//       <div className="analytics-grid">
//         <div className="analytics-card">
//           <h3>Total Revenue</h3>
//           <div className="chart-container">
//             <BarChart
//               width={300}
//               height={200}
//               data={revenueData}
//               margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
//             >
//               <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//           </div>
//           <p className="big-number">${analytics.revenue.toFixed(2)}</p>
//         </div>

//         <div className="analytics-card">
//           <h3>Popular Dishes</h3>
//           <div className="chart-container">
//             <PieChart width={300} height={200}>
//               <Pie
//                 data={dishesData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#82ca9d"
//                 label
//               />
//             </PieChart>
//           </div>
//           <ul className="dish-list">
//             {analytics.popularDishes.map((dish, index) => (
//               <li key={index}>
//                 {dish._id}: {dish.totalOrders} orders
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="analytics-card">
//           <h3>Customer Satisfaction</h3>
//           <div className="chart-container">
//             <LineChart
//               width={300}
//               height={200}
//               data={satisfactionData}
//               margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
//             >
//               <Line type="monotone" dataKey="value" stroke="#ff7300" />
//             </LineChart>
//           </div>
//           <p className="big-number">
//             {analytics.satisfaction.averageRating}/5
//           </p>
//           <p>from {analytics.satisfaction.totalFeedbacks} feedbacks</p>
//         </div>

//         <div className="analytics-card">
//           <h3>Delivery Performance</h3>
//           <div className="performance-circle">
//             <div className="circle-progress" style={{ 
//               background: `conic-gradient(#0088fe ${parseFloat(analytics.deliveryPerformance.rate)}deg, #ddd 0deg)`
//             }}>
//               <span>{analytics.deliveryPerformance.rate}</span>
//             </div>
//           </div>
//           <p>
//             {analytics.deliveryPerformance.delivered} delivered out of {analytics.deliveryPerformance.total}
//           </p>
//         </div>

//         <div className="analytics-card">
//           <h3>Table Turnover Rate</h3>
//           <div className="performance-circle">
//             <div className="circle-progress" style={{ 
//               background: `conic-gradient(#00c49f ${parseFloat(analytics.turnoverRate.rate)}deg, #ddd 0deg)`
//             }}>
//               <span>{analytics.turnoverRate.rate}</span>
//             </div>
//           </div>
//           <p>
//             {analytics.turnoverRate.completed} completed out of {analytics.turnoverRate.total}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;

import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line } from 'recharts';

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

  // API implementation
  const api = {
    get: async (url) => {
      console.log(`API GET request to: ${url}`);
      
      // Mock data based on time range
      const baseRevenue = {
        day: 2500,
        week: 12500,
        month: 50000,
        year: 600000
      };
      
      const mockDishes = [
        { _id: 'Margherita Pizza', totalOrders: 45 },
        { _id: 'Caesar Salad', totalOrders: 32 },
        { _id: 'Pasta Carbonara', totalOrders: 28 },
        { _id: 'Chocolate Cake', totalOrders: 22 }
      ];

      if (url.includes('/admin/analytics/revenue')) {
        return {
          data: {
            totalRevenue: baseRevenue[timeRange] || 0
          }
        };
      }
      if (url.includes('/admin/analytics/popular-dishes')) {
        return {
          data: {
            popularDishes: mockDishes
          }
        };
      }
      if (url.includes('/admin/analytics/customer-satisfaction')) {
        return {
          data: {
            averageRating: 4.3,
            totalFeedbacks: 125
          }
        };
      }
      if (url.includes('/admin/analytics/delivery-performance')) {
        return {
          data: {
            performance: '92%',
            delivered: 46,
            total: 50
          }
        };
      }
      if (url.includes('/admin/analytics/table-turnover')) {
        return {
          data: {
            turnoverRate: '85%',
            completed: 68,
            total: 80
          }
        };
      }
      throw new Error('Endpoint not implemented');
    }
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [
          revenueRes,
          dishesRes,
          satisfactionRes,
          deliveryRes,
          turnoverRes
        ] = await Promise.all([
          api.get(`/admin/analytics/revenue?range=${timeRange}`),
          api.get(`/admin/analytics/popular-dishes?range=${timeRange}`),
          api.get(`/admin/analytics/customer-satisfaction?range=${timeRange}`),
          api.get(`/admin/analytics/delivery-performance?range=${timeRange}`),
          api.get(`/admin/analytics/table-turnover?range=${timeRange}`)
        ]);

        setAnalytics({
          revenue: revenueRes.data.totalRevenue,
          popularDishes: dishesRes.data.popularDishes,
          satisfaction: {
            averageRating: satisfactionRes.data.averageRating,
            totalFeedbacks: satisfactionRes.data.totalFeedbacks
          },
          deliveryPerformance: {
            rate: deliveryRes.data.performance,
            delivered: deliveryRes.data.delivered,
            total: deliveryRes.data.total
          },
          turnoverRate: {
            rate: turnoverRes.data.turnoverRate,
            completed: turnoverRes.data.completed,
            total: turnoverRes.data.total
          }
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
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
    { name: 'Rating', value: parseFloat(analytics.satisfaction.averageRating) }
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