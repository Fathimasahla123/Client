import { useState, useEffect } from 'react';
import axios from "axios";

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${apiUrl}/api/admin/list-reservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations(response.data.reservation || response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setError("Session expired. Please login again.");
        } else {
          setError(
            err.response?.data?.message || err.message || "Failed to fetch reservations"
          );
        }
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <div className="loading">Loading reservations...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="reservations-container">
      <div className="reservations-header">
        <h2>Reservations List</h2>
      </div>
      
      <div className="reservations-table-container">
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Special Requests</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation._id}>
                <td>{reservation.customerName || reservation.customerId?.name || 'N/A'}</td>
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{reservation.time}</td>
                <td>{reservation.guests}</td>
                <td className={`status-${reservation.status?.toLowerCase() || 'pending'}`}>
                  {reservation.status || 'Pending'}
                </td>
                <td className="special-requests">
                  {reservation.specialRequests || 'None'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsList;