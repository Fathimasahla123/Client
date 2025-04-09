import React from "react";
import { Link } from "react-router-dom";
import "../App.css";


function LandingPage() {
  return (
    <div className="landing-container">
      <h1>WELCOME TO OUR RESTAURANT</h1>
      <div className="auth-buttons">
        <Link to="/login">Login</Link>
        <Link to="/signup">Register as Admin</Link>
      </div>
    </div>
  );
}

export default LandingPage;