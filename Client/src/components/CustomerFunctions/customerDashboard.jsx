import React from 'react';

function CustomerDashboard({ user }) {
  return (
    <div className="dashboard">
      <h2>Welcome  {user.name}</h2>
      <div className="dashboard-stats">
        
      </div>

    </div>
    
  );
}


export default CustomerDashboard;