import { useState, useEffect } from 'react';
import api from '../utils/api';

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerId: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reservationsRes, customersRes] = await Promise.all([
        api.get('/admin/reservations'),
        api.get('/admin/customers')
      ]);
      
      setReservations(reservationsRes.data.reservation);
      setCustomers(customersRes.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/reservations/add', formData);
      fetchData();
      setFormData({
        customerName: '',
        customerId: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
      });
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
    }
  };

  const deleteReservation = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await api.delete(`/admin/reservations/${id}`);
        fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading reservations...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="management-container">
      <h2>Reservations Management</h2>
      
      <div className="form-section">
        <h3>Create New Reservation</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Customer:</label>
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
            >
              <option value="">Select Customer (optional)</option>
              {customers.map(customer => (
                <option key={customer._id} value={customer._id}>
                  {customer.name} ({customer.email})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Number of Guests:</label>
            <input
              type="number"
              name="guests"
              min="1"
              max="20"
              value={formData.guests}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Special Requests:</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="submit-btn">Create Reservation</button>
        </form>
      </div>

      <div className="list-section">
        <h3>Reservation List</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation._id}>
                <td>{reservation.customerName}</td>
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{reservation.time}</td>
                <td>{reservation.guests}</td>
                <td>{reservation.status || 'Pending'}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteReservation(reservation._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsManagement;