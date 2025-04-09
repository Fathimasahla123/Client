
// import { useState, useEffect } from 'react';
// import { useStaff } from '../context/staffContext';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// //import api from '../utils/api';

// const StaffDashboard = () => {
//   const { staff, logout } = useStaff();
//   const [activeTab, setActiveTab] = useState('orders');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!staff) {
//       navigate('/staff/login');
//     }
//   }, [staff, navigate]);

//   const handleLogout = () => {
//     logout();
//   };

//   if (!staff) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="dashboard-container">
//       <nav className="dashboard-sidebar">
//         <div className="profile-info">
//           <h3>Staff Dashboard</h3>
//           <p>{staff.name}</p>
//           <p className="incharge">Incharge: {staff.incharge}</p>
//         </div>
//         <ul className="dashboard-menu">
//           <li className={activeTab === 'orders' ? 'active' : ''}>
//             <Link to="/staff/dashboard/orders" onClick={() => setActiveTab('orders')}>
//               My Orders
//             </Link>
//           </li>
//           <li className={activeTab === 'feedback' ? 'active' : ''}>
//             <Link to="/staff/dashboard/feedback" onClick={() => setActiveTab('feedback')}>
//               My Feedback
//             </Link>
//           </li>
//         </ul>
//         <button onClick={handleLogout} className="logout-btn">
//           Logout
//         </button>
//       </nav>
//       <main className="dashboard-content">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default StaffDashboard;

// Define context + hook at top of staffDashboard.jsx or staffLogin.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

// 1. Create the context
const StaffContext = createContext();
export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};
// Define context + hook at top of staffDashboard.jsx or staffLogin.jsx

//export const useStaff = () => useContext(StaffContext);


// 2. Create a provider component (to be used in your App.js)
export function StaffProvider({ children }) {
  const [staff, setStaff] = useState(null);
  
  // Login function would be called after successful authentication
  const login = (staffData) => {
    setStaff(staffData);
  };

  const logout = () => {
    setStaff(null);
    // You might want to add cleanup like removing tokens here
  };

  return (
    <StaffContext.Provider value={{ staff, login, logout }}>
      {children}
    </StaffContext.Provider>
  );
}

// 3. Custom hook to use the context


// Main Dashboard Component
const StaffDashboard = () => {
  const { staff, logout } = useStaff();
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  useEffect(() => {
    if (!staff) {
      navigate('/staff/login');
    }
  }, [staff, navigate]);

  const handleLogout = () => {
    logout();
  };

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-sidebar">
        <div className="profile-info">
          <h3>Staff Dashboard</h3>
          <p>{staff.name}</p>
          <p className="incharge">Incharge: {staff.incharge}</p>
        </div>
        <ul className="dashboard-menu">
          <li className={activeTab === 'orders' ? 'active' : ''}>
            <Link to="/staff/dashboard/orders" onClick={() => setActiveTab('orders')}>
              My Orders
            </Link>
          </li>
          <li className={activeTab === 'feedback' ? 'active' : ''}>
            <Link to="/staff/dashboard/feedback" onClick={() => setActiveTab('feedback')}>
              My Feedback
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffDashboard;