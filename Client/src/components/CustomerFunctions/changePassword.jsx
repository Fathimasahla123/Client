// import { useState, useEffect } from 'react';
// import { useCustomer } from '../context/customerContext';
// import { useNavigate } from 'react-router-dom';

// const ChangePassword = () => {
//   const [formData, setFormData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { customer, changePassword } = useCustomer();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (customer && !customer.isFirstLogin) {
//       navigate('/dashboard');
//     }
//   }, [customer, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (formData.newPassword !== formData.confirmPassword) {
//       setError('New passwords do not match');
//       return;
//     }

//     setError('');
//     setLoading(true);

//     try {
//       await changePassword({
//         currentPassword: formData.currentPassword,
//         newPassword: formData.newPassword
//       });
//       setSuccess('Password changed successfully');
//       setTimeout(() => navigate('/dashboard'), 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to change password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Change Password</h2>
//         <p className="info-text">Please change your password to continue</p>
        
//         {error && <div className="error-message">{error}</div>}
//         {success && <div className="success-message">{success}</div>}
        
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Current Password:</label>
//             <input
//               type="password"
//               name="currentPassword"
//               value={formData.currentPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>New Password:</label>
//             <input
//               type="password"
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleChange}
//               required
//               minLength="6"
//             />
//           </div>
//           <div className="form-group">
//             <label>Confirm New Password:</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               minLength="6"
//             />
//           </div>
//           <button type="submit" disabled={loading} className="auth-btn">
//             {loading ? 'Changing...' : 'Change Password'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock customer data - in a real app, this would come from authentication
  const [customer, setCustomer] = useState({
    isFirstLogin: true // This would normally come from your auth system
  });

  useEffect(() => {
    // Check if user needs to change password (first login)
    if (customer && !customer.isFirstLogin) {
      navigate('/dashboard');
    }
  }, [customer, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const changePassword = async (passwordData) => {
    // This would be your actual API call in a real app
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock successful password change
        resolve({ success: true });
        // Mock error response
        // reject({ response: { data: { message: 'Current password is incorrect' } } });
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setSuccess('Password changed successfully');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Change Password</h2>
        <p className="info-text">Please change your password to continue</p>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;