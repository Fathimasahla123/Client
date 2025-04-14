// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import UsersManagement from './AdminFunctions/usersManagement';
// import StaffManagement from './AdminFunctions/staffManagement';
// import OrdersManagement from './AdminFunctions/ordersManagement';
// import ReservationsManagement from './AdminFunctions/reservationManagement';
// import AnalyticsDashboard from './AdminFunctions/analyticDasboard';
// import ProductsManagement from './AdminFunctions/productsManagement';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
//   withCredentials: true,
// });

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quickStats, setQuickStats] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch user data
//         const userResponse = await api.get('/api/admin/add-user');
//         if (userResponse.data.role !== 'Admin') {
//           navigate('/');
//           return;
//         }
//         setUser(userResponse.data);

//         // Fetch dashboard data
//         const dashboardResponse = await api.get('/api/admin/adminDashboard');
//         setQuickStats(dashboardResponse.data.quickStats);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load dashboard');
//         navigate('/login');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       await api.post('/api/auth/logout');
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Logout failed');
//     }
//   };

//   if (loading) {
//     return <div className="loading">Loading dashboard...</div>;
//   }

//   if (error) {
//     return (
//       <div className="error">
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-container">
//       <nav className="admin-sidebar">
//         <div className="admin-profile">
//           <h3>Admin Dashboard</h3>
//           <p>Welcome, {user?.name}</p>
//           {quickStats && (
//             <div className="quick-stats">
//               <div>Users: {quickStats.totalUsers}</div>
//               <div>Staff: {quickStats.totalStaff}</div>
//               <div>Orders: {quickStats.totalOrders}</div>
//               <div>Reservations: {quickStats.totalReservations}</div>
//               <div>Products: {quickStats.totalProducts}</div>
//             </div>
//           )}
//         </div>

//         <ul className="admin-menu">
//           {[
//             { path: '', icon: 'tachometer-alt', label: 'Dashboard', key: 'dashboard' },
//             { path: 'users', icon: 'users', label: 'Users', key: 'users' },
//             { path: 'staff', icon: 'user-tie', label: 'Staff', key: 'staff' },
//             { path: 'orders', icon: 'shopping-cart', label: 'Orders', key: 'orders' },
//             { path: 'reservations', icon: 'calendar-alt', label: 'Reservations', key: 'reservations' },
//             { path: 'products', icon: 'utensils', label: 'Products', key: 'products' },
//             // { path: 'analytics', icon: 'chart-line', label: 'Analytics', key: 'analytics' },
//           ].map((item) => (
//             <li key={item.key} className={activeTab === item.key ? 'active' : ''}>
//               <Link to={`/admin/${item.path}`} onClick={() => setActiveTab(item.key)}>
//                 <i className={`fas fa-${item.icon}`}></i> {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <button className="logout-btn" onClick={handleLogout}>
//           <i className="fas fa-sign-out-alt"></i> Logout
//         </button>
//       </nav>

//       <main className="admin-content">
//         <Routes>
//         <Route index element={<AnalyticsDashboard api={api} />} />
//           {/* <Route path="/" element={<AdminDashboard api={api} />} /> */}
//           <Route path="users" element={<UsersManagement api={api} />} />
//           <Route path="staff" element={<StaffManagement api={api} />} />
//           <Route path="orders" element={<OrdersManagement api={api} />} />
//           <Route path="reservations" element={<ReservationsManagement api={api} />} />
//           <Route path="products" element={<ProductsManagement api={api} />} />
//           {/* <Route path="analytics" element={<AnalyticsDashboard api={api} />} /> */}
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// // Wrapper component to provide Router context
// export default function AdminDashboardWrapper() {
//   return (
//     <Router>
//       <AdminDashboard />
//     </Router>
//   );
// }

// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import UsersManagement from './AdminFunctions/usersManagement';
// import StaffManagement from './AdminFunctions/staffManagement';
// import OrdersManagement from './AdminFunctions/ordersManagement';
// import ReservationsManagement from './AdminFunctions/reservationManagement';
// import AnalyticsDashboard from './AdminFunctions/analyticDasboard';
// import ProductsManagement from './AdminFunctions/productsManagement';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // API implementation
//   const api = {
//     get: async (url) => {
//       // In a real implementation, this would be an actual API call
//       console.log(`API GET request to: ${url}`);
//       return {
//         data: {
//           name: 'Admin User',
//           email: 'admin@example.com',
//           role: 'Admin'
//         }
//       };
//     },
//     post: async (url) => {
//       console.log(`API POST request to: ${url}`);
//       return { data: { success: true } };
//     }
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await api.get('/auth/me');
//         if (response.data.role !== 'Admin') {
//           window.location.href = '/';
//         }
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         window.location.href = '/login';
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await api.post('/auth/logout');
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   if (loading) {
//     return <div className="loading-screen">Loading...</div>;
//   }

//   if (!user) {
//     return <div className="error-message">Failed to load user data</div>;
//   }

//   return (
//     <Router>
//       <div className="admin-container">
//         <nav className="admin-sidebar">
//           <div className="admin-profile">
//             <h3>Admin Dashboard</h3>
//             <p>Welcome, {user.name}</p>
//           </div>
//           <ul className="admin-menu">
//             <li className={activeTab === 'dashboard' ? 'active' : ''}>
//               <Link to="/admin" onClick={() => setActiveTab('dashboard')}>
//                 <i className="fas fa-tachometer-alt"></i> Dashboard
//               </Link>
//             </li>
//             <li className={activeTab === 'users' ? 'active' : ''}>
//               <Link to="/admin/users" onClick={() => setActiveTab('users')}>
//                 <i className="fas fa-users"></i> Users
//               </Link>
//             </li>
//             <li className={activeTab === 'staff' ? 'active' : ''}>
//               <Link to="/admin/staff" onClick={() => setActiveTab('staff')}>
//                 <i className="fas fa-user-tie"></i> Staff
//               </Link>
//             </li>
//             <li className={activeTab === 'orders' ? 'active' : ''}>
//               <Link to="/admin/orders" onClick={() => setActiveTab('orders')}>
//                 <i className="fas fa-shopping-cart"></i> Orders
//               </Link>
//             </li>
//             <li className={activeTab === 'reservations' ? 'active' : ''}>
//               <Link to="/admin/reservations" onClick={() => setActiveTab('reservations')}>
//                 <i className="fas fa-calendar-alt"></i> Reservations
//               </Link>
//             </li>
//             <li className={activeTab === 'products' ? 'active' : ''}>
//               <Link to="/admin/products" onClick={() => setActiveTab('products')}>
//                 <i className="fas fa-utensils"></i> Products
//               </Link>
//             </li>
//             <li className={activeTab === 'analytics' ? 'active' : ''}>
//               <Link to="/admin/analytics" onClick={() => setActiveTab('analytics')}>
//                 <i className="fas fa-chart-line"></i> Analytics
//               </Link>
//             </li>
//           </ul>
//           <button className="logout-btn" onClick={handleLogout}>
//             <i className="fas fa-sign-out-alt"></i> Logout
//           </button>
//         </nav>

//         <main className="admin-content">
//           <Routes>
//             <Route path="/admin" element={<AnalyticsDashboard />} />
//             <Route path="/admin/users" element={<UsersManagement />} />
//             <Route path="/admin/staff" element={<StaffManagement />} />
//             <Route path="/admin/orders" element={<OrdersManagement />} />
//             <Route path="/admin/reservations" element={<ReservationsManagement />} />
//             <Route path="/admin/products" element={<ProductsManagement />} />
//             <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default AdminDashboard;

import React from 'react';

function AdminDashboard({ user }) {
  return (
    <div className="dashboard">
      <h2>Welcome Admin, {user.name}</h2>
      <div className="dashboard-stats">
        
      </div>

    </div>
    
  );
}


export default AdminDashboard;

