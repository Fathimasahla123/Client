import { useCustomer } from '../context/customerContext'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const CustomerLayout = () => {
  const { customer, logout } = useCustomer()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!customer) return <div>Loading...</div>

  return (
    <div className="customer-layout">
      <nav className="customer-navbar">
        <div className="navbar-brand">
          <Link to="/customer/dashboard">Restaurant App</Link>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link to="/customer/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/customer/profile">Profile</Link>
          </li>
          <li>
            <Link to="/customer/orders">My Orders</Link>
          </li>
          <li>
            <Link to="/customer/reservations">Reservations</Link>
          </li>
          <li>
            <Link to="/customer/feedback">Feedback</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
        </ul>
        <div className="navbar-actions">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <main className="customer-content">
        <Outlet />
      </main>
    </div>
  )
}

export default CustomerLayout