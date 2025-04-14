// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   Outlet,
// } from "react-router-dom";
// import { AuthProvider } from "./components/context/authContext";
// import { CustomerProvider } from "./components/context/customerContext";
// import { StaffProvider } from "./components/context/staffContext";
// //import { useAuth, useCustomer, useStaff } from "./hooks/useAuth"; // Make sure these hooks exist

// import Navbar from "./components/CommonComponents/Navbar";
// import Footer from "./components/CommonComponents/footer";
// import Home from "./components/CommonComponents/home";
// import Menu from "./components/CommonComponents/menu";
// import StaffPage from "./pages/staff";
// import Login from "./components/AuthFunctions/logIn";
// import Signup from "./components/AuthFunctions/signUp";

// // Layout Components
// import AdminLayout from "./components/LayoutComponents/adminLayout";
// import CustomerLayout from "./components/LayoutComponents/customerLayout";
// import StaffLayout from "./components/LayoutComponents/staffLayout";
// import PublicLayout from "./components/LayoutComponents/publicLayout";

// // // Auth Components
// // import AdminLogin from "./components/AuthFunctions/logIn";
// // //import AdminSignup from "./components/AuthFunctions/signUp";
// import CustomerLogin from "./components/CustomerFunctions/customerLogin";
// // import AdminSignup from './components/AuthFunctions/signUp'
// import StaffLogin from "./components/StaffFunctions/staffLogin";
// import ChangePassword from "./components/CustomerFunctions/changePassword";

// // Admin Components
// import AdminDashboard from "./components/AdminFunctions/adminDashboard";
// import UserManagement from "./components/AdminFunctions/usersManagement";
// import StaffManagement from "./components/AdminFunctions/staffManagement";
// import OrderManagement from "./components/AdminFunctions/ordersManagement";
// import ReservationManagement from "./components/AdminFunctions/reservationManagement";
// import ProductManagement from "./components/AdminFunctions/productsManagement";
// import AnalyticsDashboard from "./components/AdminFunctions/analyticDasboard";

// // Customer Components
// import CustomerDashboard from "./components/CustomerFunctions/customerDashboard";
// import CustomerProfile from "./components/CustomerFunctions/customerProfile";
// import CustomerOrders from "./components/CustomerFunctions/customerOrders";
// import CustomerFeedback from "./components/CustomerFunctions/customerFeedback";
// //import Menu from "./components/CommonComponents/menu";
// import Reservations from "./components/CustomerFunctions/reservationForm";

// // Staff Components
// import StaffDashboard from "./components/StaffFunctions/staffDashboard";
// import StaffOrders from "./components/StaffFunctions/staffOrders";
// import StaffFeedback from "./components/StaffFunctions/staffFeedback";

// // Common Components
// import HomePage from "./components/CommonComponents/home";
// import NotFound from "./components/CommonComponents/notFound";
// import LoadingSpinner from "./components/CommonComponents/loadingSpinner";
// import "./App.css";
// import "./styles/admin.css";
// import "./styles/auth.css";
// import "./styles/common.css";
// import "./styles/customer.css";
// import "./styles/layout.css";
// import "./styles/staff.css";
// import "./main.css";

// // [Your other imports remain the same...]

// const ProtectedRoute = ({ role, children }) => {
//   const { user: admin, loading: adminLoading } = useAuth();
//   const { customer, loading: customerLoading } = useCustomer();
//   const { staff, loading: staffLoading } = useStaff();

//   if (adminLoading || customerLoading || staffLoading) {
//     return <LoadingSpinner fullPage />;
//   }

//   if (role === "Admin" && (!admin || admin.role !== "Admin")) {
//     return <Navigate to="/login" replace />;
//   }

//   if (role === "Customer" && (!customer || customer.role !== "Customer")) {
//     return <Navigate to="/customer/login" replace />;
//   }

//   if (role === "Staff" && (!staff || staff.role !== "Staff")) {
//     return <Navigate to="/staff/login" replace />;
//   }

//   return children ? children : <Outlet />;
// };

// const App = () => {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <CustomerProvider>
//           <StaffProvider>
//             <div className="app">
//               <Navbar />
//               <main className="container">
//                 <Routes>
//                   {/* Public Routes */}
//                   <Route path="/" element={<HomePage />} />
//                   <Route path="/menu" element={<Menu />} />
//                   <Route path="/staff" element={<StaffPage />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/signup" element={<Signup />} />
//                   <Route path="/customer/login" element={<CustomerLogin />} />
//                   <Route path="/staff/login" element={<StaffLogin />} />
//                   <Route path="/change-password" element={<ChangePassword />} />

//                   {/* Admin Routes */}
//                   <Route
//                     path="/admin"
//                     element={
//                       <ProtectedRoute role="Admin">
//                         <AdminLayout />
//                       </ProtectedRoute>
//                     }
//                   >
//                     <Route index element={<AdminDashboard />} />
//                     <Route path="dashboard" element={<AdminDashboard />} />
//                     <Route path="users" element={<UserManagement />} />
//                     <Route path="staff" element={<StaffManagement />} />
//                     <Route path="orders" element={<OrderManagement />} />
//                     <Route
//                       path="reservations"
//                       element={<ReservationManagement />}
//                     />
//                     <Route path="products" element={<ProductManagement />} />
//                     <Route path="analytics" element={<AnalyticsDashboard />} />
//                   </Route>

//                   {/* Customer Routes */}
//                   <Route
//                     path="/customer"
//                     element={
//                       <ProtectedRoute role="Customer">
//                         <CustomerLayout />
//                       </ProtectedRoute>
//                     }
//                   >
//                     <Route index element={<CustomerDashboard />} />
//                     <Route path="dashboard" element={<CustomerDashboard />} />
//                     <Route path="profile" element={<CustomerProfile />} />
//                     <Route path="orders" element={<CustomerOrders />} />
//                     <Route path="feedback" element={<CustomerFeedback />} />
//                     <Route path="reservations" element={<Reservations />} />
//                   </Route>

//                   {/* Staff Routes */}
//                   <Route
//                     path="/staff-dashboard" // Changed from '/staff' to avoid conflict
//                     element={
//                       <ProtectedRoute role="Staff">
//                         <StaffLayout />
//                       </ProtectedRoute>
//                     }
//                   >
//                     <Route index element={<StaffDashboard />} />
//                     <Route path="dashboard" element={<StaffDashboard />} />
//                     <Route path="orders" element={<StaffOrders />} />
//                     <Route path="feedback" element={<StaffFeedback />} />
//                   </Route>

//                   {/* Fallback Routes */}
//                   <Route path="/404" element={<NotFound />} />
//                   <Route path="*" element={<Navigate to="/404" replace />} />
//                 </Routes>
//               </main>
//               <Footer />
//             </div>
//           </StaffProvider>
//         </CustomerProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/AuthFunctions/logIn";
import Signup from "./components/AuthFunctions/signUp";
import Navbar from "./components/CommonComponents/Navbar";
import Users from "./components/AdminFunctions/usersManagement";
import Staffs from "./components/AdminFunctions/staffManagement";
import AdminDashboard from "./components/adminDashboard";
import CustomerDashboard from "./components/CustomerFunctions/customerDashboard"
import StaffDashboard from "./components/StaffFunctions/staffDashboard"; // Added Trainer Dashboard
import Orders from "./components/AdminFunctions/ordersManagement";
import Reservations from "./components/AdminFunctions/reservationManagement";
import Analytic from "./components/AdminFunctions/analyticDasboard";
import LandingPage from "./components/LandingPage";
import ProfileImageUpload from "./components/CustomerFunctions/customerProfile";
import Products from "./components/AdminFunctions/productsManagement";
import CustomerLogin from "./components/CustomerFunctions/customerLogin";
import ChangePassword from "./components/CustomerFunctions/changePassword";
import OrderDetails from "./components/CustomerFunctions/customerOrders";
import Feedbacks from "./components/CustomerFunctions/customerFeedback";
import StaffLogin from "./components/StaffFunctions/staffLogin";
import ViewOrders from "./components/StaffFunctions/staffOrders";
import RecievedFeedbacks from "./components/StaffFunctions/staffFeedback";


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

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
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

        {/* Dashboard Routes */}
        <Route
          path="/adminDashboard/*"
          element={isAuthenticated && user?.role === "Admin" ? <AdminDashboard user={user} /> : <Navigate to="/adminDashboard" />}
        />
        <Route
          path="/customerDashboard"
          element={isAuthenticated && user?.role === "Customer" ? <CustomerDashboard user={user} /> : <Navigate to="/customerDashboard" />}
        />
        <Route
          path="/staffDashboard"
          element={isAuthenticated && user?.role === "Staff" ? <StaffDashboard user={user} /> : <Navigate to="/login" />}
        />

        {/* Admin Only Routes */}
      
        <Route
          path="users"
          element={isAuthenticated && user?.role === "Admin" ? <Users /> : <Navigate to="/adminDashboard" />}
        />
        <Route
          path="staffs"
          element={isAuthenticated && user?.role === "Admin" ? <Staffs /> : <Navigate to="/adminDashboard" />}
        />
        <Route
          path="orders"
          element={isAuthenticated && user?.role === "Admin" ? <Orders /> : <Navigate to="/adminDashboard" />}
        />
        <Route
          path="reservations"
          element={isAuthenticated && user?.role === "Admin" ? <Reservations /> : <Navigate to="/adminDashboard" />}
        />
        <Route
          path="analytic"
          element={isAuthenticated && user?.role === "Admin" ? <Analytic /> : <Navigate to="/adminDashboard" />}
        />
        <Route
          path="products"
          element={isAuthenticated && user?.role === "Admin" ? <Products/> : <Navigate to="/adminDashboard" />}
        />
       

        {/* Customer Only Routes */}
        <Route
          path="/customer-login"
          element={isAuthenticated && user?.role === "Customer" ? <CustomerLogin /> : <Navigate to="/customerDashboard" />}
        />
        <Route
          path="/change-password"
          element={isAuthenticated && user?.role === "Customer" ? <ChangePassword /> : <Navigate to="/customerDashboard" />}
        />
        <Route
          path="/customer-profile"
          element={isAuthenticated && user?.role === "Customer" ? <ProfileImageUpload /> : <Navigate to="/customerDashboard" />}
        />
         <Route
          path="/order-details"
          element={isAuthenticated && user?.role === "Customer" ? <OrderDetails /> : <Navigate to="/customerDashboard" />}
        />
        <Route
          path="/feedbacks"
          element={isAuthenticated && user?.role === "Customer" ? <Feedbacks /> : <Navigate to="/customerDashboard" />}
        />
      
       {/* Staff Only Routes */}
       
      <Route
          path="/staff-login"
          element={isAuthenticated && user?.role === "Staff" ? <StaffLogin /> : <Navigate to="/staffDashboard" />}
        />
         <Route
          path="/view-orders"
          element={isAuthenticated && user?.role === "Staff" ? <ViewOrders /> : <Navigate to="/staffDashboard" />}
        />
        <Route
          path="/recieved-feedbacks"
          element={isAuthenticated && user?.role === "Staff" ? <RecievedFeedbacks /> : <Navigate to="/staffDashboard" />}
          />
          

        {/* Catch-all Route */}
        <Route
          path="*"
          element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to={getDashboardRedirect()} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;