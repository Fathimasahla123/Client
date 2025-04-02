import { Link, Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <header className="public-header">
        <div className="container">
          <Link to="/" className="logo">
            Restaurant App
          </Link>
          <nav className="public-nav">
            <Link to="/menu">Menu</Link>
            <Link to="/login">Customer Login</Link>
            <Link to="/admin/login">Admin Login</Link>
            <Link to="/staff/login">Staff Login</Link>
          </nav>
        </div>
      </header>
      <main className="public-content">
        <Outlet />
      </main>
      <footer className="public-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Restaurant App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout