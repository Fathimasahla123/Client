import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Our Restaurant</h1>
        <p>Experience the finest dining with us</p>
        <div className="cta-buttons">
          <Link to="/menu" className="btn btn-primary">
            View Menu
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Customer Login
          </Link>
        </div>
      </section>
      
      <section className="features">
        <div className="feature-card">
          <h3>Online Ordering</h3>
          <p>Order your favorite dishes from anywhere</p>
        </div>
        <div className="feature-card">
          <h3>Table Reservation</h3>
          <p>Book your table in advance</p>
        </div>
        <div className="feature-card">
          <h3>Special Offers</h3>
          <p>Enjoy exclusive discounts and promotions</p>
        </div>
      </section>
    </div>
  )
}

export default Home