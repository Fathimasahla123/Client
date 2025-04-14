import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const StaffManagement = () => {
  const [staffs, setStaffs] = useState([]);
  const [editStaff, setEditStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    incharge: 'Waiter', 
    tasks: '',
    attendance: 'Present', 
    role: 'Staff'
  });

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");

      const response = await axios.get(`${apiUrl}/api/admin/list-staffs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setStaffs(response.data.staff || response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      if (err.response?.status === 401) {
        // Handle unauthorized (token expired/invalid)
        localStorage.removeItem("token");
        navigate("/adminDahboard"); // Assuming you have access to navigate
        setError("Session expired. Please login again.");
      } else {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch users"
        );
      }
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
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");

      if (!formData.incharge || !formData.attendance) {
        throw new Error('Incharge and attendance fields are required');
      }

      await axios.post(
        `${apiUrl}/api/admin/add-staff`,
        formData, // Axios automatically stringifies
        {
          headers: {
            //"Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add auth token
          },
        }
      );
      
      fetchStaffs();
      setFormData({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        incharge: 'Waiter',
        tasks: '',
        attendance: 'Present',
        role: 'Staff'
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.statusText ||
        "Failed to add staff"
    );

    // Specific handling for 401 Unauthorized
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/adminDashboard");
    }
  }
};
const handleEditStaff = (staff) => {
  setEditStaff(staff);
};
const handleUpdateStaff = async (e) => {
  e.preventDefault();
  try {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
    const token = localStorage.getItem("token");
    await axios.put(
      `${apiUrl}/api/admin/update-staff/${editStaff._id}`,
      editStaff,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchStaffs();
    setEditStaff(null);
  } catch (error) {
    alert("Error updating staff");
  }
};

  
  const deleteStaff = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const token = localStorage.getItem("token");

        // Use axios.delete() for DELETE requests
        const response = await axios.delete(
          `${apiUrl}/api/admin/delete-staff/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add auth token
            },
          }
        );
        
        fetchStaffs();
      } catch (err) {
        const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete staff";
      setError(errorMessage);

      // Handle unauthorized (401) specifically
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }
};

  if (loading) return <div>Loading staff...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

 
  return (
    <div className="management-container">
      <h2>Staff Management</h2>
      
      <div className="form-section">
        <h3>Add New Staff</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Incharge Of:</label>
            <select
              name="incharge"
              value={formData.incharge}
              onChange={handleInputChange}
              required
            >
              <option value="Manager">Manager</option>
              <option value="Chef">Chef</option>
              <option value="Delivery">Delivery</option>
              <option value="Waiter">Waiter</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tasks:</label>
            <input
              type="text"
              name="tasks"
              value={formData.tasks}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Attendance:</label>
            <select
              name="attendance"
              value={formData.attendance}
              onChange={handleInputChange}
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
              
            </select>
          </div>
          <button type="submit" className="submit-btn">Add Staff</button>
        </form>
      </div>

      {editStaff && (
        <form onSubmit={handleUpdateStaff}>
          <h3>Edit Staff</h3>
          <input
              type="text"
              name="name"
              value={editStaff.name}
              onChange={(e) => setEditStaff({ ...editStaff, name: e.target.value })}
              required
            />
          
            <input
              type="email"
              placeholder="Email"
              value={editStaff.email}
              onChange={(e) => setEditStaff({ ...editStaff, email: e.target.value })}
              required
            />
          
            <input
              type="password"
              name="password"
              value={editStaff.password}
              onChange={(e) => setEditStaff({ ...editStaff, password: e.target.value })}
              required
            />
         
            <input
              type="text"
              name="phoneNumber"
              value={editStaff.phoneNumber}
              onChange={(e) => setEditStaff({ ...editStaff, phoneNumber: e.target.value })}
            />
          
          <select
              value={formData.incharge}
              onChange={(e) => setEditStaff({ ...editStaff, incharge: e.target.value })}
              required
            >
              <option value="Manager">Manager</option>
              <option value="Chef">Chef</option>
              <option value="Delivery">Delivery</option>
              <option value="Waiter">Waiter</option>
            </select>
            <input
              type="text"
              name="tasks"
              value={editStaff.tasks}
              onChange={(e) => setEditStaff({ ...editStaff, tasks: e.target.value })}
            />
          <select
              value={formData.attendance}
              onChange={(e) => setEditStaff({ ...editStaff, attendance: e.target.value })}
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            <select
            value={editStaff.role}
            onChange={(e) => setEditStaff({ ...editStaff, role: e.target.value })}
          >
            <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
          </select>
          <button type="submit">Update Staff</button>
          <button type="button" onClick={() => setEditStaff(null)}>
            Cancel
          </button>
        </form>
      )}
       


      <div className="list-section">
        <h3>Staff List</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Incharge</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map(staff => (
              <tr key={staff._id}>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.phoneNumber}</td>
                <td>{staff.incharge}</td>
                <td>
                  <button className="edit-btn"
                   onClick={() => handleEditStaff(staff)}
                   >Edit</button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteStaff(staff._id)}
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

export default StaffManagement;