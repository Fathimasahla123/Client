import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/AuthFunctions/Login";
import Signup from "./components/AuthFunctions/Signup";
import Navbar from "./components/CommonComponents/Navbar";
import Footer from "./components/CommonComponents/footer";
import Users from "./components/AdminFunctions/usersManagement";
import Staffs from "./components/AdminFunctions/staffManagement";
import Feedback from "./components/AdminFunctions/feedbackManagement";
import AdminDashboard from "./components/AdminFunctions/adminDashboard";
import CustomerDashboard from "./components/CustomerFunctions/customerDashboard";
import StaffDashboard from "./components/StaffFunctions/staffDashboard";
import Orders from "./components/AdminFunctions/ordersManagement";
import Reservations from "./components/AdminFunctions/reservationManagement";
import Analytic from "./components/AdminFunctions/analyticDasboard";
import LandingPage from "./components/LandingPage";
import Profile from "./components/CustomerFunctions/customerProfile";
import Products from "./components/AdminFunctions/productsManagement";
import Reservation from "./components/CustomerFunctions/customerReservation";
import Order from "./components/CustomerFunctions/customerOrders";
import Feedbacks from "./components/CustomerFunctions/customerFeedback";
import ViewOrders from "./components/StaffFunctions/staffOrders";
import RecievedFeedbacks from "./components/StaffFunctions/staffFeedback";
import Menu from "./components/CommonComponents/menu";
import About from "./components/CommonComponents/About"; 
import Cart from "./components/CommonComponents/Cart";
import Contact from "./components/CommonComponents/Contact";
import CheckoutPage from "./components/CommonComponents/checkoutPage";
import OrderConfirmation from "./components/CheckoutSteps/orderConfirmation";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const getDashboardRedirect = () => {
    if (user?.role === "Admin") return "/adminDashboard";
    if (user?.role === "Customer") return "/customerDashboard";
    if (user?.role === "Staff") return "/staffDashboard";
    return "/login";
  };

  // Create a wrapper component to access the current location
  const AppContent = () => {
    const location = useLocation();
    
    const shouldShowFooter = () => {
      // List of routes where footer should be hidden
      const noFooterRoutes = [
        "/adminDashboard",
        "/customerDashboard",
        "/staffDashboard",
        // Add any other dashboard or admin routes where you don't want footer
      ];
      
      return !noFooterRoutes.some(route => location.pathname.startsWith(route));
    };

    return (
      <>
        {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
        <div className="main-content" style={{ minHeight: "calc(100vh - 120px)" }}>
          <Routes>
            <Route
              path="/"
              element={!isAuthenticated ? <LandingPage /> : <Navigate to={getDashboardRedirect()} />}
            />

            {/* Auth Routes */}
            <Route
              path="/signup"
              element={!isAuthenticated ? <Signup /> : <Navigate to={getDashboardRedirect()} />}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to={getDashboardRedirect()} />}
            />

            {/* Public Routes */}
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />

            {/* Dashboard Routes */}
            <Route
              path="/adminDashboard"
              element={isAuthenticated && user?.role === "Admin" ? <AdminDashboard user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/customerDashboard"
              element={isAuthenticated && user?.role === "Customer" ? <CustomerDashboard user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/staffDashboard"
              element={isAuthenticated && user?.role === "Staff" ? <StaffDashboard user={user} /> : <Navigate to="/login" />}
            />

            {/* Admin Only Routes */}
            <Route
              path="/users"
              element={isAuthenticated && user?.role === "Admin" ? <Users /> : <Navigate to="/adminDashboard" />}
            />
            <Route
              path="/staffs"
              element={isAuthenticated && user?.role === "Admin" ? <Staffs /> : <Navigate to="/adminDashboard" />}
            />
            <Route
              path="/orders"
              element={isAuthenticated && user?.role === "Admin" ? <Orders /> : <Navigate to="/adminDashboard" />}
            />
            <Route
              path="/reservations"
              element={isAuthenticated && user?.role === "Admin" ? <Reservations /> : <Navigate to="/adminDashboard" />}
            />
            <Route
              path="/analytic"
              element={isAuthenticated && user?.role === "Admin" ? <Analytic /> : <Navigate to="/adminDashboard" />}
            />
            <Route
              path="/products"
              element={isAuthenticated && user?.role === "Admin" ? <Products /> : <Navigate to="/adminDashboard" />}
            />
            <Route
              path="/feedback"
              element={isAuthenticated && user?.role === "Admin" ? <Feedback /> : <Navigate to="/adminDashboard" />}
            />
            
            {/* Customer Only Routes */}
            <Route
              path="/profile"
              element={isAuthenticated && user?.role === "Customer" ? <Profile /> : <Navigate to="/customerDashboard" />}
            />
            <Route
              path="/order"
              element={isAuthenticated && user?.role === "Customer" ? <Order /> : <Navigate to="/customerDashboard" />}
            />
            <Route
              path="/reservation"
              element={isAuthenticated && user?.role === "Customer" ? <Reservation /> : <Navigate to="/customerDashboard" />}
            />
            <Route
              path="/feedbacks"
              element={isAuthenticated && user?.role === "Customer" ? <Feedbacks /> : <Navigate to="/customerDashboard" />}
            />
          
            {/* Staff Only Routes */}
            <Route
              path="/view-orders"
              element={isAuthenticated && user?.role === "Staff" ? <ViewOrders /> : <Navigate to="/staffDashboard" />}
            />
            <Route
              path="/received-feedback"
              element={isAuthenticated && user?.role === "Staff" ? <RecievedFeedbacks /> : <Navigate to="/staffDashboard" />}
            />

            {/* Catch-all Route */}
            <Route
              path="*"
              element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to={getDashboardRedirect()} />}
            />
          </Routes>
        </div>
        {shouldShowFooter() && <Footer />}
      </>
    );
  };

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;