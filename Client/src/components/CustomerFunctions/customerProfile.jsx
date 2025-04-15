import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/customer/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomer(response.data.data);
      setFormData({
        name: response.data.data.name || '',
        email: response.data.data.email || ''
        
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) setProfileImage(e.target.files[0]);
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    try {
      const response = await axios.post(
        `${apiUrl}/api/customer/upload-profile`, 
        formData,
        { headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }}
      );
      return response.data.profileImageUrl;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Image upload failed');
    }
  };

  const updateProfile = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/customer/update-profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Update failed');
    }
  };

  const changePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      throw new Error("New passwords don't match");
    }

    try {
      await axios.put(
        `${apiUrl}/api/customer/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      return true;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Password change failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      let imageUrl = customer?.profileImageUrl;
      if (profileImage) imageUrl = await uploadProfileImage();
      await updateProfile();
      setSuccess('Profile updated successfully');
      fetchProfile(); // Refresh data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await changePassword();
      setSuccess('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !customer) return <div>Loading...</div>;
  if (!customer) return <div>Failed to load profile</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      {error && <div className="alert alert-error mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="avatar mb-4">
            <div className="w-48 h-48 rounded-full">
              {customer.profileImageUrl ? (
                <img src={customer.profileImageUrl} alt="Profile" />
              ) : (
                <div className="bg-neutral text-neutral-content rounded-full w-full h-full flex items-center justify-center text-6xl">
                  {customer.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <label className="btn btn-primary">
            Change Photo
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
          <button 
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="btn btn-secondary mt-4 block"
          >
            {showPasswordForm ? 'Hide Password Change' : 'Change Password'}
          </button>
        </div>

        <div className="md:w-2/3">
          {showPasswordForm ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-4 mb-6">
              <h2 className="text-xl font-semibold">Change Password</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Password</span>
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;