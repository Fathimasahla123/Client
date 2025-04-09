// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';

// const CustomerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('profile');

//   return (
//     <div className="page">
//       <h1>Customer Dashboard</h1>
      
//       <div className="dashboard-tabs">
//         <button
//           className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
//           onClick={() => setActiveTab('profile')}
//         >
//           My Profile
//         </button>
//         <button
//           className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
//           onClick={() => setActiveTab('orders')}
//         >
//           My Orders
//         </button>
//         <button
//           className={`tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
//           onClick={() => setActiveTab('reservations')}
//         >
//           My Reservations
//         </button>
//         <button
//           className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
//           onClick={() => setActiveTab('feedback')}
//         >
//           My Feedback
//         </button>
//       </div>
      
//       <div className="dashboard-content">
//         {activeTab === 'profile' && (
//           <div className="card">
//             <h2>Profile Information</h2>
//             {/* Profile content will be here */}
//             <Link to="/customer/profile/edit" className="btn">
//               Edit Profile
//             </Link>
//           </div>
//         )}
        
//         {activeTab === 'orders' && (
//           <div className="card">
//             <h2>My Orders</h2>
//             {/* Orders list will be here */}
//             <Link to="/customer/order/new" className="btn">
//               Place New Order
//             </Link>
//           </div>
//         )}
        
//         {activeTab === 'reservations' && (
//           <div className="card">
//             <h2>My Reservations</h2>
//             {/* Reservations list will be here */}
//             <Link to="/customer/reservation/new" className="btn">
//               Make New Reservation
//             </Link>
//           </div>
//         )}
        
//         {activeTab === 'feedback' && (
//           <div className="card">
//             <h2>My Feedback</h2>
//             {/* Feedback list will be here */}
//             <Link to="/customer/feedback/new" className="btn">
//               Submit New Feedback
//             </Link>
//           </div>
//         )}
//       </div>
      
//       <Outlet />
//     </div>
//   );
// };

// export default CustomerDashboard;

import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="page">
      <h1>Customer Dashboard</h1>
      
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservations')}
        >
          My Reservations
        </button>
        <button
          className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          My Feedback
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="card">
            <h2>Profile Information</h2>
            <Link to="/customer/profile/edit" className="btn">
              Edit Profile
            </Link>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="card">
            <h2>My Orders</h2>
            <Link to="/customer/order/new" className="btn">
              Place New Order
            </Link>
          </div>
        )}
        
        {activeTab === 'reservations' && (
          <div className="card">
            <h2>My Reservations</h2>
            <Link to="/customer/reservation/new" className="btn">
              Make New Reservation
            </Link>
          </div>
        )}
        
        {activeTab === 'feedback' && (
          <div className="card">
            <h2>My Feedback</h2>
            <Link to="/customer/feedback/new" className="btn">
              Submit New Feedback
            </Link>
          </div>
        )}
      </div>
      
      <Outlet />
    </div>
  );
};

export default CustomerDashboard;