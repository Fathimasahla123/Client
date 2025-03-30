import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          {" "}
          <Link to="/dashboard"> Dashboard </Link>{" "}
        </li>

        {user?.role === "Admin" && (
          <>
            <li>
              {" "}
              <Link to="/users"> Users </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/staffs"> Staffs </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/orders"> Orders </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/reservations"> Reservations </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/products"> Products </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/analytic"> Analytic </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/feedback"> Feedback</Link>{" "}
            </li>
          </>
        )}

        {user?.role === "Customer" && (
          <>
            <li>
              {" "}
              <Link to="/view-profile"> View Profile </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/change-password"> Change Password</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/update-profile"> Update Profile </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/update-profile-picture">
                {" "}
                Update Profile Picture{" "}
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/order-details"> Order Details </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/submit-feedback"> Submit Feedback </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/view-feedback"> View Feedback </Link>{" "}
            </li>
          </>
        )}

        {user?.role === "Staff" && (
          <>
            <li>
              {" "}
              <Link to="/view-order-details">View Order Details</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/recieved-feedbacks"> Recieved Feedbacks</Link>{" "}
            </li>
          </>
        )}

        <li>
          <button onClick={onLogout}> Logout </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
