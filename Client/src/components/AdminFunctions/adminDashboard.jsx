import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`tab-btn ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
        >
          Staff
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservations')}
        >
          Reservations
        </button>
        <button
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'dashboard' && (
          <div className="card">
            <h2>Admin Overview</h2>
            {/* Overview content will be here */}
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="card">
            <h2>User Management</h2>
            {/* Users management will be here */}
            <Link to="/admin/users/add" className="btn">
              Add New User
            </Link>
          </div>
        )}
        
        {activeTab === 'staff' && (
          <div className="card">
            <h2>Staff Management</h2>
            {/* Staff management will be here */}
            <Link to="/admin/staff/add" className="btn">
              Add New Staff
            </Link>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="card">
            <h2>Order Management</h2>
            {/* Orders management will be here */}
          </div>
        )}
        
        {activeTab === 'reservations' && (
          <div className="card">
            <h2>Reservation Management</h2>
            {/* Reservations management will be here */}
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="card">
            <h2>Analytics Dashboard</h2>
            {/* Analytics content will be here */}
          </div>
        )}
      </div>
      
      <Outlet />
    </div>
  );
};

export default AdminDashboard;