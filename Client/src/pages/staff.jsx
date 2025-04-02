import React, { useState, useEffect } from 'react';
import StaffCard from '../components/CommonComponents/staffCard';
import api from '../components/services/api';

const StaffPage = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await api.get('/staff');
        setStaffMembers(response.data?.staff || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) return <div className="page">Loading staff...</div>;
  if (error) return <div className="page">Error: {error}</div>;
  if (!staffMembers || staffMembers.length === 0) {
    return <div className="page">No staff members available</div>;
  }
  
  return (
    <div className="page">
      <h1>Our Staff</h1>
      <div className="card-grid">
        {staffMembers.map((staff) => (
          <StaffCard key={staff._id} staff={staff} />
        ))}
      </div>
    </div>
  );
};

export default StaffPage;