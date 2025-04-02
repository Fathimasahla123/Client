import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Restaurant Name
        </Link>
        
        <div className="nav-links">
          <Link to="/menu">Menu</Link>
          <Link to="/staff">Our Staff</Link>
          
          {isAuthenticated() ? (
            <>
              {user.role === 'Customer' && <Link to="/customer">Dashboard</Link>}
              {user.role === 'Admin' && <Link to="/admin">Admin Panel</Link>}
              {user.role === 'Staff' && <Link to="/staff-dashboard">Staff Dashboard</Link>}
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;