import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Restaurant Name</h3>
            <p>Delicious food served with love since 2023</p>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>123 Main Street, City</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@restaurant.com</p>
          </div>
          
          <div className="footer-section">
            <h3>Opening Hours</h3>
            <p>Monday - Friday: 11am - 10pm</p>
            <p>Saturday - Sunday: 10am - 11pm</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Restaurant Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;