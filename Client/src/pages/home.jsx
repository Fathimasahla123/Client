import React from 'react';
import { Link } from 'react-router-dom';
//import restaurantImage from '../assets/images/restaurant-interior.jpg'; // Update with your actual image path
// import './Home.scss'; // Optional styling file

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Restaurant</h1>
          <p>Experience the finest dining in town</p>
          <div className="cta-buttons">
            <Link to="/menu" className="btn btn-primary">
              View Menu
            </Link>
            <Link to="/order" className="btn btn-secondary">
              Make Order
            </Link>
          </div>
        </div>
        {/* <div className="hero-image">
          <img src={restaurantImage} alt="Restaurant interior" />
        </div> */}
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="icon">🍽️</div>
            <h3>Quality Food</h3>
            <p>Fresh ingredients prepared by our expert chefs</p>
          </div>
          <div className="feature-card">
            <div className="icon">🍷</div>
            <h3>Fine Drinks</h3>
            <p>Extensive selection of wines and cocktails</p>
          </div>
          <div className="feature-card">
            <div className="icon">🌟</div>
            <h3>Excellent Service</h3>
            <p>Attentive staff dedicated to your comfort</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"The best dining experience I've had this year!"</p>
            <div className="author">- Sarah Johnson</div>
          </div>
          <div className="testimonial-card">
            <p>"Amazing food and atmosphere. Highly recommend!"</p>
            <div className="author">- Michael Chen</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;