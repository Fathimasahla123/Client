import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="page">
      <h1>Staff Dashboard</h1>
      
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          Customer Feedback
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'orders' && (
          <div className="card">
            <h2>Assigned Orders</h2>
            {/* Orders list will be here */}
          </div>
        )}
        
        {activeTab === 'feedback' && (
          <div className="card">
            <h2>Customer Feedback</h2>
            {/* Feedback list will be here */}
          </div>
        )}
      </div>
      
      <Outlet />
    </div>
  );
};

export default StaffDashboard;