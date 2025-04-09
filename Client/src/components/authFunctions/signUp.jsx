// import { useState } from "react";
// import { useAuth } from "../context/authContext";
// import { Link, useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await signup(formData);
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.msg || "Signup failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Register</h2>
//         {error && <div className="error-message">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               minLength="6"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="rolr">Role</label>
//             {/* <label for="role">Role</label> */}

//             <select name="role" id="role">
//               <option value="Admin">Admin</option>
//               <option value="Customer">Customer</option>
//               <option value="Staff">Staff</option>
//             </select>
//           </div>
//           <button type="submit" className="auth-btn" disabled={loading}>
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>
//         <div className="auth-footer">
//           Already have an account? <Link to="/login">Login</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import '../../App.css';

// // function Signup() {
// //     const apiUrl = import.meta.env.VITE_API_URL;

// function Signup() {
//   const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'; // Add fallback

//   if (!apiUrl) {
//     console.error('API_URL is not defined');
//     return <div>Application configuration error. Please contact support.</div>;
//   }

//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//       name: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     });
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.value
//       });
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setError('');

//       if (formData.password !== formData.confirmPassword) {
//         setError('Passwords do not match');
//         return;
//       }

//       if (formData.password.length < 6) {
//         setError('Password must be at least 6 characters long');
//         return;
//       }

//       try {
//          const response = await axios.post(`${apiUrl}/auth/signup`, {
//          name: formData.name,
//           email: formData.email,
//           password: formData.password
//         });

//         if (response.data.message) {
//           // Registration successful
//           alert('Registration successful! Please login.');
//           navigate('/login');
//         }
//       } catch (error) {
//         setError(error.response?.data?.message || 'Registration failed');
//       }
//     };

//     return (
//       <div className="register-container">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           {error && <div className="error-message">{error}</div>}

//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               placeholder="Enter your name"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password:</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               placeholder="Confirm your password"
//             />
//           </div>

//           <button type="submit">Register</button>

//           <div className="login-link">
//             Already have an account? <Link to="/login">Login here</Link>
//           </div>
//         </form>
//       </div>
//     );
//   }

//   export default Signup;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords don't match");
    //   return;
    // }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const response = await axios.post(`${apiUrl}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (response.data.success) {
        navigate("/login"); // Redirect after successful signup
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password (min 6 characters)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select name="role" id="role">
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div className="auth-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Signup;
