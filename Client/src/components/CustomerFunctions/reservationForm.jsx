import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ReservationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reservations', formData);
      navigate('/customer');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to make reservation');
    }
  };

  return (
    <div className="page">
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Number of Guests</label>
          <input
            type="number"
            name="guests"
            min="1"
            max="20"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Special Requests</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
          />
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <button type="submit" className="btn">
          Make Reservation
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;