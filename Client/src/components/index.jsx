import React from 'react';
import AdminDashboard from './AdminFunctions/adminDashboard';
import TrainerDashboard from './StaffFunctions/staffDashboard';
import StudentDashboard from './CustomerFunctions/customerDashboard';

function Dashboard({ user }) {
  const renderDashboard = () => {
    switch (user.role) {
      case 'Admin':
        return <AdminDashboard user={user} />;
      case 'Staff':
        return <TrainerDashboard user={user} />;
      case 'Customer':
        return <StudentDashboard user={user} />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return renderDashboard();
}

export default Dashboard;