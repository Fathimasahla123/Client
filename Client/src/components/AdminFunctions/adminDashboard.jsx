import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard({ user }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Restaurant Background */}
      <header className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            alt="Restaurant background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-center">
            <div>
              {/* <h1 className="text-3xl font-bold text-white">
                <span className="text-amber-500">EATOS</span> Admin {user.name}
              </h1> */}
              <h1 className="text-4xl font-bold text-amber-500 mb-4">
            Welcome, Admin{user.name.split(' ')[0]}!
          </h1>
              <p className="text-white">Restaurant Management System</p>
            </div>
            <div className="flex items-center space-x-4">
            
            </div>
          </div>
        </div>
       
      </header>
    
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Card with Restaurant Image */}
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-90"></div>
          <img
            className="w-full h-64 object-cover"
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            alt="Restaurant interior"
          />
          <div className="relative z-10 p-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Restaurant Overview
            </h2>
            <p className="text-gray-300 max-w-lg">
              Manage all aspects of your restaurant from this dashboard. Monitor performance, update menus, and track reservations.
            </p>
          </div>
        </div>

        {/* Stats Cards with Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Today's Orders */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-amber-500">
            <div className="p-6 flex items-center">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Orders</p>
                <p className="text-2xl font-bold text-gray-800">42</p>
                <p className="text-xs text-green-500">↑ 12% from yesterday</p>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-green-500">
            <div className="p-6 flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Revenue</p>
                <p className="text-2xl font-bold text-gray-800">₹85,420</p>
                <p className="text-xs text-green-500">↑ 8% from yesterday</p>
              </div>
            </div>
          </div>

          {/* Reservations */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-blue-500">
            <div className="p-6 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Reservations</p>
                <p className="text-2xl font-bold text-gray-800">18</p>
                <p className="text-xs text-red-500">↓ 3% from yesterday</p>
              </div>
            </div>
          </div>

          {/* Customer Rating */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-purple-500">
            <div className="p-6 flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Customer Rating</p>
                <p className="text-2xl font-bold text-gray-800">4.7/5</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions with Food Icons */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link
              to="/products"
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="p-6">
                <div className="bg-amber-50 p-3 rounded-lg inline-block mb-4 group-hover:bg-amber-100 transition duration-300">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-amber-600 transition duration-300">Product Management</h3>
                <p className="text-sm text-gray-500 mt-1">Add, edit or remove products</p>
              </div>
            </Link>

            <Link
              to="/orders"
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="p-6">
                <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4 group-hover:bg-blue-100 transition duration-300">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition duration-300">Order Tracking</h3>
                <p className="text-sm text-gray-500 mt-1">View and manage orders</p>
              </div>
            </Link>

            <Link
              to="/reservations"
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="p-6">
                <div className="bg-green-50 p-3 rounded-lg inline-block mb-4 group-hover:bg-green-100 transition duration-300">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition duration-300">Reservations</h3>
                <p className="text-sm text-gray-500 mt-1">Manage bookings</p>
              </div>
            </Link>

            <Link
              to="/staffs"
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="p-6">
                <div className="bg-purple-50 p-3 rounded-lg inline-block mb-4 group-hover:bg-purple-100 transition duration-300">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition duration-300">Staff Management</h3>
                <p className="text-sm text-gray-500 mt-1">Manage employees</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity with Food Theme */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center">
                <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Recent Orders
              </h3>
              <Link to="/orders" className="text-sm text-amber-400 hover:text-amber-300">
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((order) => (
                <div key={order} className="p-6 hover:bg-gray-50 transition duration-150">
                  <div className="flex items-start">
                    <img 
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                      src={`https://source.unsplash.com/random/200x200/?food,${order}`}
                      alt="Order item"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">Order #ORD-789{order}</h4>
                          <p className="text-sm text-gray-500">2 items • ₹1,{850 + order * 100}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order === 1 ? 'bg-green-100 text-green-800' : 
                          order === 2 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order === 1 ? 'Completed' : order === 2 ? 'Preparing' : 'On the way'}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Customer: John Doe</p>
                        <p>Time: {order === 1 ? '12:30 PM' : order === 2 ? '1:45 PM' : '3:15 PM'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Reservations */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center">
                <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upcoming Reservations
              </h3>
              <Link to="/reservations" className="text-sm text-amber-400 hover:text-amber-300">
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((reservation) => (
                <div key={reservation} className="p-6 hover:bg-gray-50 transition duration-150">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-lg bg-amber-50 flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">Reservation #RES-45{reservation}</h4>
                          <p className="text-sm text-gray-500">{reservation === 1 ? 'Today' : reservation === 2 ? 'Tomorrow' : 'Tomorrow'} • {reservation === 1 ? '7:30 PM' : reservation === 2 ? '8:00 PM' : '1:00 PM'}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Confirmed
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Guests: {reservation === 1 ? '4' : reservation === 2 ? '2' : '6'}</p>
                        <p>Special Request: {reservation === 1 ? 'Anniversary' : reservation === 2 ? 'Window table' : 'Business meeting'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

     {/* Popular Items Section */}
<div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
  <div className="bg-gray-900 px-6 py-4">
    <h3 className="text-lg font-bold text-white flex items-center">
      <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
      Popular Menu Items
    </h3>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    {[
      { 
        name: "Barbeque Pizza", 
        orders: 128, 
        image: "https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg" 
      },
      { 
        name: "Pasta Carbonara", 
        orders: 95, 
        image: "data:image/jpeg;base64,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" 
      },
      { 
        name: "Chocolate Lava Cake", 
        orders: 76, 
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80" 
      }
    ].map((item, index) => (
      <div key={index} className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
        <img
          className="w-full h-48 object-cover"
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h4 className="text-xl font-bold text-white">{item.name}</h4>
          <p className="text-amber-300">{item.orders} orders this week</p>
        </div>
        <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          #{index + 1}
        </div>
      </div>
    ))}
  </div>
</div>
</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Restaurant Info */}
          <div className="footer-section">
            <h3 className="text-xl font-bold font-serif mb-4 text-amber-500">EATOS</h3>
            <p className="text-gray-300">Delicious food served with love since 2023</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="text-xl font-bold font-serif mb-4 text-amber-500">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">123 Main Street, City</p>
              <p className="mb-2">Phone: <a href="tel:1234567890" className="hover:text-amber-500 transition-colors">(123) 456-7890</a></p>
              <p>Email: <a href="mailto:info@restaurant.com" className="hover:text-amber-500 transition-colors">info@eatos.com</a></p>
            </address>
          </div>
          
          {/* Opening Hours */}
          <div className="footer-section">
            <h3 className="text-xl font-bold font-serif mb-4 text-amber-500">Opening Hours</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>11am - 10pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday - Sunday:</span>
                <span>10am - 11pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} EATOS. All rights reserved. | 
            <a href="#" className="hover:text-amber-500 transition-colors ml-2">Privacy Policy</a> | 
            <a href="#" className="hover:text-amber-500 transition-colors ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
};
export default AdminDashboard;


    

