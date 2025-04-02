import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/authContext';
import Navbar from './components/CommonComponents/Navbar';
import Footer from './components/CommonComponents/footer';
 import Home from './pages/home';
import Menu from './pages/menu';
import StaffPage from './pages/staff';
import Login from './components/authFunctions/logIn';
import Signup from './components/authFunctions/signUp';
import CustomerDashboard from './components/CustomerFunctions/customerDashboard';
import AdminDashboard from './components/AdminFunctions/adminDashboard';
import StaffDashboard from './components/StaffFunctions/staffDashboard';
import ProtectedRoute from './components/CommonComponents/protectedRoutes';
import NotFound from './pages/notFound';
import './App.scss';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/staff" element={<StaffPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route path="/customer" element={<ProtectedRoute allowedRoles={['Customer']} />}>
                <Route index element={<CustomerDashboard />} />
              </Route>
              
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']} />}>
                <Route index element={<AdminDashboard />} />
              </Route>
              
              <Route path="/staff-dashboard" element={<ProtectedRoute allowedRoles={['Staff']} />}>
                <Route index element={<StaffDashboard />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;