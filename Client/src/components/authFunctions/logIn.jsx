import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const response = await axios.post(`${apiUrl}/api/auth/login`,formData); 
      
      const { token, user } = response.data;

      if (response.data.success) {
        if (user.role === 'Admin') {
        navigate("/adminDashboard"); // Redirect after successful login
      }
     } else {
        setError(response.data.message || "Login failed");
      }
      // if (response.data.success) {
      //   const { token, user } = response.data;
      //   localStorage.setItem('authToken', token); // Store token
      //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //   if (user.role === 'Admin') {
      //     navigate("/adminDashboard");
      //   } else {
      //     navigate("/login"); // Or other appropriate route for non-admins
      //   }
      // } else {
      //   setError(response.data.message || "Login failed");
      // }

      

      if (token && user) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        onLogin(user, token);
        //localStorage.setItem('authToken', token);
      } else {
        setError("Invalid email or password");
     }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="register-link">
          Don't have an account? <Link to="/signup">Register here</Link>
        </div>
      </form>
    </div>
  );
};


export default Login;