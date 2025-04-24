import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StaffManagement = () => {
  const [staffs, setStaffs] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
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
        headers: { Authorization: `Bearer ${token}` }
      });
      setStaffs(response.data.data || response.data);
      setLoading(false);
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    setLoading(false);
    setError(err.response?.data?.message || err.message);
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/adminDashboard");
      toast.error("Session expired. Please login again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");
      await axios.post(`${apiUrl}/api/admin/add-staff`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Staff added successfully!");
      fetchStaffs();
      setFormData({
        name: '', email: '', password: '', phoneNumber: '',
        incharge: 'Waiter', tasks: '', attendance: 'Present', role: 'Staff'
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add staff");
    }
  };

  const handleEditStaff = (staff) => {
    setEditingStaff(staff);
    setFormData(staff);
  };

  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const token = localStorage.getItem("token");
      await axios.put(`${apiUrl}/api/admin/update-staff/${editingStaff._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Staff updated successfully!");
      fetchStaffs();
      setEditingStaff(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update staff");
    }
  };

  const deleteStaff = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const token = localStorage.getItem("token");
        await axios.delete(`${apiUrl}/api/admin/delete-staff/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Staff deleted successfully!");
        fetchStaffs();
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete staff");
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading staff...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
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
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gray-900 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Staff Management</h1>
          </div>

          <div className="p-6 space-y-8">
            {/* Add/Edit Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2 border-amber-500">
                {editingStaff ? 'Edit Staff Member' : 'Add New Staff'}
              </h3>
              
              <form onSubmit={editingStaff ? handleUpdateStaff : handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    >
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                      <option value="Customer">Customer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Incharge Of</label>
                    <select
                      name="incharge"
                      value={formData.incharge}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    >
                      <option value="Manager">Manager</option>
                      <option value="Chef">Chef</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Waiter">Waiter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attendance</label>
                    <select
                      name="attendance"
                      value={formData.attendance}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tasks</label>
                  <input
                    type="text"
                    name="tasks"
                    value={formData.tasks}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3">
                  {editingStaff && (
                    <button
                      type="button"
                      onClick={() => setEditingStaff(null)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  >
                    {editingStaff ? 'Update Staff' : 'Add Staff'}
                  </button>
                </div>
              </form>
            </div>

            {/* Staff List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <h3 className="text-xl font-semibold text-gray-800 p-6 border-b border-gray-200">
                Staff Members
              </h3>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staffs.map(staff => (
                    <div key={staff._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-lg text-gray-800">{staff.name}</h4>
                        <span className={`px-2 py-1 text-sm rounded-full ${
                          staff.attendance === 'Present' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {staff.attendance}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600">{staff.email}</p>
                        <p className="text-gray-600">{staff.phoneNumber}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {staff.incharge}
                          </span>
                          <span className="text-sm text-amber-600">{staff.role}</span>
                        </div>
                        {staff.tasks && (
                          <p className="text-sm text-gray-500 mt-2">Tasks: {staff.tasks}</p>
                        )}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEditStaff(staff)}
                          className="flex-1 px-3 py-2 text-sm bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteStaff(staff._id)}
                          className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;