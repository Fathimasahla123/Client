import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon 
} from "@heroicons/react/24/outline";

const Navbar = ({ user, onLogout, cartItemCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const navigation = {
    customer: {
      primary: [
        { to: "/customerDashboard", text: "Home" },
        { to: "/menu", text: "Menu" },
        { to: "/about", text: "About" },
        { to: "/contact", text: "Contact" }
      ],
      secondary: [
        { to: "/cart", icon: true },
        { to: "/profile", text: "Profile" },
        { to: "/order", text: "Order" },
        { to: "/reservation", text: "Reservation" },
        { to: "/feedbacks", text: "Feedback" }
      ]
    },
    admin: [
      { to: "/adminDashboard", text: "Home" },
      { to: "/users", text: "Users" },
      { to: "/orders", text: "Orders" },
      { to: "/reservations", text: "Reservations" },
      { to: "/products", text: "Products" },
      { to: "/analytic", text: "Analytics" },
      { to: "/staffs", text: "Staff" },
      { to: "/feedback", text: "Feedback" }
    ],
    staff: [
      { to: "/staffDashboard", text: "Home" },
      { to: "/view-orders", text: "View Orders" },
      { to: "/received-feedback", text: "Feedback & Ratings" }
    ]
  };

  const NavLink = ({ to, text, icon, closeMenu }) => (
    <Link
      to={to}
      onClick={closeMenu}
      className="text-gray-300 hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
    >
      {icon && (
        <div className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
      )}
      {text}
    </Link>
  );

  const MobileMenu = ({ closeMenu }) => (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900 border-t border-gray-700">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {user?.role === "Customer" && (
          <>
            {navigation.customer.primary.map((link) => (
              <NavLink key={link.to} {...link} closeMenu={closeMenu} />
            ))}
            {navigation.customer.secondary.map((link) => (
              <NavLink key={link.to} {...link} closeMenu={closeMenu} />
            ))}
          </>
        )}

        {user?.role === "Admin" &&
          navigation.admin.map((link) => (
            <NavLink key={link.to} {...link} closeMenu={closeMenu} />
          ))}

        {user?.role === "Staff" &&
          navigation.staff.map((link) => (
            <NavLink key={link.to} {...link} closeMenu={closeMenu} />
          ))}

        {user && (
          <button
            onClick={() => {
              onLogout();
              closeMenu();
            }}
            className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
         
          <div className="flex items-center">
            <Link
              to="/"
              className="text-amber-500 font-serif text-xl font-bold tracking-tight hover:text-amber-400 transition-colors"
            >
              EATOS
            </Link>

           
            <div className="hidden md:flex items-center ml-4 space-x-2">
              {user?.role === "Customer" && (
                <>
                  {navigation.customer.primary.map((link) => (
                    <NavLink key={link.to} {...link} />
                  ))}
                </>
              )}
            </div>
          </div>

        
          <div className="hidden md:flex items-center space-x-2">
            {user?.role === "Customer" &&
              navigation.customer.secondary.map((link) => (
                <NavLink key={link.to} {...link} />
              ))}

            {(user?.role === "Admin" || user?.role === "Staff") &&
              navigation[user.role.toLowerCase()].map((link) => (
                <NavLink key={link.to} {...link} />
              ))}

            {user && (
              <button
                onClick={onLogout}
                className="ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-amber-500 p-2 rounded-md focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

   
      {isOpen && <MobileMenu closeMenu={() => setIsOpen(false)} />}
    </nav>
  );
};

export default Navbar;