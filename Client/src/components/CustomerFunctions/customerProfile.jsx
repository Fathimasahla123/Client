// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: ''
//   });
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [profileImage, setProfileImage] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [customer, setCustomer] = useState(null);
//   const [showPasswordForm, setShowPasswordForm] = useState(false);

//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
//   const token = localStorage.getItem("token");

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${apiUrl}/api/customer/profile`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setCustomer(response.data.data);
//       setFormData({
//         name: response.data.data.name || '',
//         email: response.data.data.email || ''
        
//       });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchProfile(); }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) setProfileImage(e.target.files[0]);
//   };

//   const uploadProfileImage = async () => {
//     const formData = new FormData();
//     formData.append('profileImage', profileImage);
//     try {
//       const response = await axios.post(
//         `${apiUrl}/api/customer/upload-profile`, 
//         formData,
//         { headers: { 
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`
//         }}
//       );
//       return response.data.profileImageUrl;
//     } catch (err) {
//       throw new Error(err.response?.data?.message || 'Image upload failed');
//     }
//   };

//   const updateProfile = async () => {
//     try {
//       const response = await axios.put(
//         `${apiUrl}/api/customer/update-profile`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` }}
//       );
//       return response.data;
//     } catch (err) {
//       throw new Error(err.response?.data?.message || 'Update failed');
//     }
//   };

//   const changePassword = async () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       throw new Error("New passwords don't match");
//     }

//     try {
//       await axios.put(
//         `${apiUrl}/api/customer/change-password`,
//         {
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword
//         },
//         { headers: { Authorization: `Bearer ${token}` }}
//       );
//       return true;
//     } catch (err) {
//       throw new Error(err.response?.data?.message || 'Password change failed');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     try {
//       let imageUrl = customer?.profileImageUrl;
//       if (profileImage) imageUrl = await uploadProfileImage();
//       await updateProfile();
//       setSuccess('Profile updated successfully');
//       fetchProfile(); // Refresh data
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     try {
//       await changePassword();
//       setSuccess('Password changed successfully');
//       setPasswordData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
//       setShowPasswordForm(false);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !customer) return <div>Loading...</div>;
//   if (!customer) return <div>Failed to load profile</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
//       {error && <div className="alert alert-error mb-4">{error}</div>}
//       {success && <div className="alert alert-success mb-4">{success}</div>}

//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="md:w-1/3">
//           <div className="avatar mb-4">
//             <div className="w-48 h-48 rounded-full">
//               {customer.profileImageUrl ? (
//                 <img src={customer.profileImageUrl} alt="Profile" />
//               ) : (
//                 <div className="bg-neutral text-neutral-content rounded-full w-full h-full flex items-center justify-center text-6xl">
//                   {customer.name?.charAt(0).toUpperCase()}
//                 </div>
//               )}
//             </div>
//           </div>
//           <label className="btn btn-primary">
//             Change Photo
//             <input type="file" className="hidden" onChange={handleImageChange} />
//           </label>
//           <button 
//             onClick={() => setShowPasswordForm(!showPasswordForm)}
//             className="btn btn-secondary mt-4 block"
//           >
//             {showPasswordForm ? 'Hide Password Change' : 'Change Password'}
//           </button>
//         </div>

//         <div className="md:w-2/3">
//           {showPasswordForm ? (
//             <form onSubmit={handlePasswordSubmit} className="space-y-4 mb-6">
//               <h2 className="text-xl font-semibold">Change Password</h2>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Current Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="currentPassword"
//                   value={passwordData.currentPassword}
//                   onChange={handlePasswordChange}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">New Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="newPassword"
//                   value={passwordData.newPassword}
//                   onChange={handlePasswordChange}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Confirm New Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={passwordData.confirmPassword}
//                   onChange={handlePasswordChange}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>
//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="btn btn-primary"
//               >
//                 {loading ? 'Changing...' : 'Change Password'}
//               </button>
//             </form>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>
            
//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="btn btn-primary"
//               >
//                 {loading ? 'Saving...' : 'Save Changes'}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gray-900 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-6 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row p-6">
            {/* Left Column - Profile Image */}
            <div className="md:w-1/3 pr-6 mb-6 md:mb-0">
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-amber-500">
                  {customer?.profileImageUrl ? (
                    <img 
                      src={customer.profileImageUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-6xl font-bold text-gray-600">
                      {customer?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <label className="mt-4 cursor-pointer">
                  <span className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-150 inline-block">
                    Change Photo
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleImageChange} 
                      accept="image/*"
                    />
                  </span>
                </label>

                <button 
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition duration-150"
                >
                  {showPasswordForm ? 'Hide Password Form' : 'Change Password'}
                </button>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="md:w-2/3">
              {showPasswordForm ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-70"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-70"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;