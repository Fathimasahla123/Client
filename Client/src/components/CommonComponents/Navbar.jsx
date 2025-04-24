import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Navbar = ({ user, onLogout, cartItemCount = 0 }) => {
  // Left-aligned primary customer links
  const customerPrimaryLinks = [
    { to: "/customerDashboard", text: "Home", highlight: true },
    { to: "/menu", text: "Menu", highlight: true },
    { to: "/about", text: "About", highlight: true },
    { to: "/contact", text: "Contact", highlight: true }
  ];

  // Right-aligned customer actions
  const customerAccountLinks = [
    { to: "/cart",   icon: true },
    { to: "/profile", text: "Profile" },
    { to: "/order", text: "Order" },
    { to: "/reservation", text: "Reservation" },
    { to: "/feedbacks", text: "Feedback" }
  ];

  // Admin links
  const adminLinks = [
    { to: "/adminDashboard", text: "Home" },
    { to: "/users", text: "Users" },
    { to: "/orders", text: "Orders" },
    { to: "/reservations", text: "Reservations" },
    { to: "/products", text: "Products" },
    { to: "/analytic", text: "Analytics" },
    { to: "/staffs", text: "Staff" },
    { to: "/feedback", text: "Feedback" }
  ];

  // Staff links
  const staffLinks = [
    { to: "/staffDashboard", text: "Home" },
    { to: "/view-orders", text: "View Orders" },
    { to: "/received-feedback", text: "Feedback & Ratings" }
  ];

  const renderNavLink = (link) => (
    <Link
      key={link.to}
      to={link.to}
      className={`${link.highlight ? 
        'bg-amber-500 hover:bg-amber-600 text-white' : 
        'text-gray-300 hover:text-amber-500'
      } px-3 py-2 rounded-md text-sm font-medium transition duration-150 flex items-center gap-1`}
    >
      {link.icon && (
        <div className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
      )}
      {link.text}
    </Link>
  );

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Brand and primary links */}
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className="text-amber-500 font-serif text-xl font-bold tracking-tight hover:text-amber-400 transition-colors"
            >
              EATOS
            </Link>
            
            {/* Primary customer links */}
            {user?.role === "Customer" && (
              <div className="hidden md:flex space-x-2">
                {customerPrimaryLinks.map(renderNavLink)}
              </div>
            )}
          </div>

          {/* Right side - Account links and actions */}
          <div className="flex items-center space-x-2">
            {/* Customer account links */}
            {user?.role === "Customer" && customerAccountLinks.map(renderNavLink)}

            {/* Admin Navigation */}
            {user?.role === "Admin" && adminLinks.map(renderNavLink)}

            {/* Staff Navigation */}
            {user?.role === "Staff" && staffLinks.map(renderNavLink)}

            {/* Logout button */}
            {user && (
              <button
                onClick={onLogout}
                className="ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu - remains the same */}
      <div className="md:hidden bg-gray-800">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Customer links */}
          {user?.role === "Customer" && (
            <>
              {customerPrimaryLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${link.highlight ? 
                    'bg-amber-500 text-white' : 
                    'text-gray-300 hover:bg-gray-700'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                >
                  {link.text}
                </Link>
              ))}
              
              {customerAccountLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium ${
                    link.icon ? 'flex items-center' : ''
                  }`}
                >
                  {link.text}
                  {link.icon && cartItemCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              ))}
            </>
          )}

          {/* Admin links */}
          {user?.role === "Admin" && adminLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {link.text}
            </Link>
          ))}

          {/* Staff links */}
          {user?.role === "Staff" && staffLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {link.text}
            </Link>
          ))}

          {user && (
            <button
              onClick={onLogout}
              className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;