import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav>
      <ul>
       

        {/* Admin Navigation */}

        {user?.role === "Admin" && (
          <>
           <li>
          <Link to="/adminDashboard"> Dashboard </Link>
        </li>
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
              <Link to="/staffs">Staffs</Link>
            </li>
          </>
        )}

        {/* Student Navigation */}
        {user?.role === "Customer" && (
          <>
           <li>
          <Link to="/customerDashboard"> Dashboard </Link>
        </li>
            <li>
              <Link to="/profile"> Profile</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <Link to="/reservation">Reservation</Link>
            </li>
            <li>
              <Link to="/feedbacks">Feedbacks</Link>
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