import React from 'react';

const StaffCard = ({ staff }) => {
  return (
    <div className="card staff-card">
      <div className="staff-card-image">
        <img src={staff.image || '/images/staff-placeholder.jpg'} alt={staff.name} />
      </div>
      <div className="staff-card-content">
        <h3>{staff.name}</h3>
        <p className="role">{staff.role}</p>
        <p className="incharge">Incharge: {staff.incharge}</p>
        <p className="email">{staff.email}</p>
      </div>
    </div>
  );
};

export default StaffCard;