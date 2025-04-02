import { useStaff } from '../context/staffContext'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const StaffLayout = () => {
  const { staff, logout } = useStaff()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/staff/login')
  }

  if (!staff) return <div>Loading...</div>

  return (
    <div className="staff-layout">
      <nav className="staff-sidebar">
        <div className="staff-profile">
          <h3>Staff Dashboard</h3>
          <p>{staff.name}</p>
          <p className="incharge">Incharge: {staff.incharge}</p>
        </div>
        <ul className="staff-menu">
          <li>
            <Link to="/staff/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/staff/orders">My Orders</Link>
          </li>
          <li>
            <Link to="/staff/feedback">My Feedback</Link>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <main className="staff-content">
        <Outlet />
      </main>
    </div>
  )
}

export default StaffLayout