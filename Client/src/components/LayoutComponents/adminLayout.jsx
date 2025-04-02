import { useAuth } from '../context/authContext'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="admin-layout">
      <nav className="admin-sidebar">
        <div className="admin-profile">
          <h3>Admin Dashboard</h3>
          <p>Welcome, {user.name}</p>
        </div>
        <ul className="admin-menu">
          <li>
            <Link to="/admin/dashboard">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <i className="fas fa-users"></i> Users
            </Link>
          </li>
          <li>
            <Link to="/admin/staff">
              <i className="fas fa-user-tie"></i> Staff
            </Link>
          </li>
          <li>
            <Link to="/admin/orders">
              <i className="fas fa-shopping-cart"></i> Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/reservations">
              <i className="fas fa-calendar-alt"></i> Reservations
            </Link>
          </li>
          <li>
            <Link to="/admin/products">
              <i className="fas fa-utensils"></i> Products
            </Link>
          </li>
          <li>
            <Link to="/admin/analytics">
              <i className="fas fa-chart-line"></i> Analytics
            </Link>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </nav>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout