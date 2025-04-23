import { useState, useEffect } from "react";
import axios from "axios";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");

      const response = await axios.get(`${apiUrl}/api/admin/list-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.user || response.data); // Handle both formats
      setLoading(false);
    } catch (err) {
      setLoading(false);

      if (err.response?.status === 401) {
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
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");

      await axios.post(
        `${apiUrl}/api/admin/add-user`,
        formData, // Axios automatically stringifies
        {
          headers: {
            //"Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add auth token
          },
        }
      );

      // Axios success status is 2xx, no need to check response.ok
      fetchUsers(); // Refresh user list

      setFormData({
        name: "",
        email: "",
        password: "", // Consider clearing password field first
        role: "Customer",
      });
    } catch (err) {
      // Better error handling
      setError(
        err.response?.data?.message ||
          err.response?.statusText ||
          "Failed to add user"
      );

      // Specific handling for 401 Unauthorized
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/adminDashboard");
      }
    }
  };
  const handleEditUser = (user) => {
    setEditUser(user);
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiUrl}/api/admin/update-user/${editUser._id}`,
        editUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
      setEditUser(null);
    } catch (error) {
      alert("Error updating user");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const token = localStorage.getItem("token");

        // Use axios.delete() for DELETE requests
        const response = await axios.delete(
          `${apiUrl}/api/admin/delete-user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add auth token
            },
          }
        );

        fetchUsers(); // Refresh the user list
      } catch (err) {
        // Enhanced error handling
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to delete user";
        setError(errorMessage);

        // Handle unauthorized (401) specifically
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="management-container">
      <h2>Users Management</h2>

      <div className="form-section">
        <h3>Add New User</h3>
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
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="Customer">Customer</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Add User
          </button>
        </form>
      </div>

      {editUser && (
        <form onSubmit={handleUpdateUser}>
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            required
          />
          <select
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
          >
            <option value="Customer">Customer</option>
            <option value="Staff">Staff</option>
          </select>
          <button type="submit">Update User</button>
          <button type="button" onClick={() => setEditUser(null)}>
            Cancel
          </button>
        </form>
      )}

      <div className="list-section">
        <h3>User List</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user._id)}
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

export default UsersManagement;
