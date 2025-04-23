import React from 'react';

function StaffDashboard({ user }) {
  return (
    <div className="dashboard">
      <h2>Welcome  {user.name}</h2>
      <div className="dashboard-stats">
        
      </div>

    </div>
    
  );
}


export default StaffDashboard;