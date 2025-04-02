import { useState, useEffect } from 'react';
import { useCustomer } from '../context/customerContext';
import api from '../utils/api';

const CustomerProfile = () => {
  const { customer, updateProfile, uploadProfileImage } = useCustomer();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phoneNumber: customer.phoneNumber || ''
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Upload image first if selected
      if (profileImage) {
        await uploadProfileImage(profileImage);
      }

      // Update profile data
      await updateProfile(formData);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="profile-content">
        <div className="profile-image-section">
          <div className="profile-image-container">
            {customer.profileImageUrl ? (
              <img 
                src={customer.profileImageUrl} 
                alt="Profile" 
                className="profile-image"
              />
            ) : (
              <div className="profile-image-placeholder">
                {customer.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="image-upload">
            <label htmlFor="profile-image" className="upload-btn">
              Change Photo
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerProfile;