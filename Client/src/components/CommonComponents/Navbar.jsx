import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard"> Dashboard </Link>
        </li>

        {/* Admin Navigation */}

        {user?.role === "Admin" && (
          <>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/reservations">Reservations</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/analytic">Analytic</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
          </>
        )}

        {/* Student Navigation */}
        {user?.role === "Customer" && (
          <>
            <li>
              <Link to="/view-profile">View Profile</Link>
            </li>
            <li>
              <Link to="/update-profile">Update Profile</Link>
            </li>
            <li>
              <Link to="/update-profile-picture">Update Profile Picture</Link>
            </li>
            <li>
              <Link to="/order-details">View Orders</Link>
            </li>
            <li>
              <Link to="/submit-feedback">Submit Feedback</Link>
            </li>
            <li>
              <Link to="/feedback">View Feedback</Link>
            </li>
          </>
        )}

        {/* Trainer Navigation */}
        {user?.role === "Staff" && (
          <>
            <li>
              <Link to="/view-orders">View Orders</Link>
            </li>
            <li>
              <Link to="/received-feedback">Received Feedback & Ratings</Link>
            </li>
          </>
        )}

        <li>
          <button onClick={onLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;