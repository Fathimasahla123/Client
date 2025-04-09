// import { useState, useEffect } from 'react';
// //import api from '../utils/api';

// const StaffManagement = () => {
//   const [staffs, setStaffs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     incharge: '',
//     tasks: '',
//     attendance: '',
//     role: 'Staff'
//   });

//   useEffect(() => {
//     fetchStaffs();
//   }, []);

//   const fetchStaffs = async () => {
//     try {
//       const response = await api.get('/admin/staffs');
//       setStaffs(response.data.staff);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/admin/staffs/add', formData);
//       fetchStaffs();
//       setFormData({
//         name: '',
//         email: '',
//         password: '',
//         phoneNumber: '',
//         incharge: '',
//         tasks: '',
//         attendance: '',
//         role: 'Staff'
//       });
//     } catch (err) {
//       setError(err.response?.data?.msg || err.message);
//     }
//   };

//   const deleteStaff = async (id) => {
//     if (window.confirm('Are you sure you want to delete this staff member?')) {
//       try {
//         await api.delete(`/admin/staffs/${id}`);
//         fetchStaffs();
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   if (loading) return <div>Loading staff...</div>;
//   if (error) return <div className="error-message">Error: {error}</div>;

//   return (
//     <div className="management-container">
//       <h2>Staff Management</h2>
      
//       <div className="form-section">
//         <h3>Add New Staff</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Phone Number:</label>
//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Incharge Of:</label>
//             <input
//               type="text"
//               name="incharge"
//               value={formData.incharge}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Tasks:</label>
//             <input
//               type="text"
//               name="tasks"
//               value={formData.tasks}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Attendance:</label>
//             <input
//               type="text"
//               name="attendance"
//               value={formData.attendance}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type="submit" className="submit-btn">Add Staff</button>
//         </form>
//       </div>

//       <div className="list-section">
//         <h3>Staff List</h3>
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Incharge</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffs.map(staff => (
//               <tr key={staff._id}>
//                 <td>{staff.name}</td>
//                 <td>{staff.email}</td>
//                 <td>{staff.phoneNumber}</td>
//                 <td>{staff.incharge}</td>
//                 <td>
//                   <button className="edit-btn">Edit</button>
//                   <button 
//                     className="delete-btn"
//                     onClick={() => deleteStaff(staff._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StaffManagement;

import { useState, useEffect } from 'react';

const StaffManagement = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    incharge: '',
    tasks: '',
    attendance: '',
    role: 'Staff'
  });

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/admin/staffs`);
      const data = await response.json();
      
      setStaffs(data.staff);
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
      const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/admin/staffs/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add staff');
      }
      
      fetchStaffs();
      setFormData({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        incharge: '',
        tasks: '',
        attendance: '',
        role: 'Staff'
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteStaff = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api';
        const response = await fetch(`${baseUrl}/admin/staffs/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete staff');
        }
        
        fetchStaffs();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading staff...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="management-container">
      <h2>Staff Management</h2>
      
      {/* ... rest of the component remains the same ... */}
    </div>
  );
};

export default StaffManagement;