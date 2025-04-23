// import React from 'react';

// function CustomerDashboard({ user }) {
//   return (
//     <div className="dashboard">
//       <h2>Welcome  {user.name}</h2>
//       <div className="dashboard-stats">
        
//       </div>

//     </div>
    
//   );
// }


// export default CustomerDashboard;

// import React from 'react';
// import { Link } from "react-router-dom";

// function CustomerDashboard({ user }) {
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Welcome Header */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//         <h2 className="text-3xl font-bold text-gray-900 font-serif tracking-tight">
//           Welcome back, <span className="text-amber-600">{user.name}</span>
//         </h2>
//         <p className="text-gray-600 mt-2">Here's what's happening with your restaurant experience</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* Upcoming Reservation */}
//         <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
//           <h3 className="text-lg font-medium text-gray-500">Upcoming Reservation</h3>
//           <p className="text-2xl font-bold text-gray-900 mt-2">Tomorrow, 7:30 PM</p>
//           <p className="text-gray-500 text-sm mt-1">Table for 4</p>
//         </div>

//         {/* Recent Orders */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-lg font-medium text-gray-500">Recent Orders</h3>
//           <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
//           <p className="text-gray-500 text-sm mt-1">Last order: 2 days ago</p>
//         </div>

//         {/* Loyalty Points */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-lg font-medium text-gray-500">Loyalty Points</h3>
//           <p className="text-2xl font-bold text-gray-900 mt-2">1,250</p>
//           <p className="text-gray-500 text-sm mt-1">Earn 250 more for a free meal</p>
//         </div>

//         {/* Favorite Dishes */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-lg font-medium text-gray-500">Favorite Dishes</h3>
//           <p className="text-2xl font-bold text-gray-900 mt-2">5</p>
//           <p className="text-gray-500 text-sm mt-1">Most ordered: Spaghetti Carbonara</p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//   <Link 
//     to="/reservation" 
//     className="flex justify-center items-center bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition duration-150"
//   >
//     Make Reservation
//   </Link>
//   <Link 
//     to="/order" 
//     className="flex justify-center items-center bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg text-sm font-medium transition duration-150"
//   >
//     Place Order
//   </Link>
//   <Link 
//     to="/products" 
//     className="flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition duration-150"
//   >
//     View Menu
//   </Link>
//   <Link 
//     to="/feedbacks" 
//     className="flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition duration-150"
//   >
//     Give Feedback
//   </Link>
// </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
//         <div className="space-y-4">
//           <div className="flex items-start pb-4 border-b border-gray-100">
//             <div className="bg-amber-100 p-2 rounded-full mr-4">
//               <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <div>
//               <p className="font-medium text-gray-900">Reservation confirmed</p>
//               <p className="text-sm text-gray-500">Table for 4 on Friday at 7:30 PM</p>
//               <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
//             </div>
//           </div>
//           <div className="flex items-start pb-4 border-b border-gray-100">
//             <div className="bg-amber-100 p-2 rounded-full mr-4">
//               <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <div>
//               <p className="font-medium text-gray-900">Order in progress</p>
//               <p className="text-sm text-gray-500">Your food is being prepared</p>
//               <p className="text-xs text-gray-400 mt-1">1 day ago</p>
//             </div>
//           </div>
//           <div className="flex items-start">
//             <div className="bg-amber-100 p-2 rounded-full mr-4">
//               <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//               </svg>
//             </div>
//             <div>
//               <p className="font-medium text-gray-900">Feedback submitted</p>
//               <p className="text-sm text-gray-500">You rated your experience 5 stars</p>
//               <p className="text-xs text-gray-400 mt-1">3 days ago</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerDashboard;


// import React from 'react';
// import { Link } from "react-router-dom";

// function CustomerDashboard({ user }) {
//   // Restaurant photos gallery
//   const restaurantPhotos = [
//     {
//       id: 1,
//       url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//       alt: "Restaurant interior"
//     },
//     {
//       id: 2,
//       url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
//       alt: "Chef preparing food"
//     },
//     {
//       id: 3,
//       url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
//       alt: "Delicious food"
//     }
//   ];

//   // Customer testimonials
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       comment: "The ambiance was perfect and the steak cooked to perfection!",
//       rating: 5,
//       photo: "https://randomuser.me/api/portraits/women/44.jpg",
//       date: "2 days ago"
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       comment: "Best service in town. The staff made our anniversary special!",
//       rating: 5,
//       photo: "https://randomuser.me/api/portraits/men/32.jpg",
//       date: "1 week ago"
//     }
//   ];

//   // Featured staff
//   const featuredStaff = [
//     {
//       id: 1,
//       name: "Chef Antonio",
//       role: "Head Chef",
//       specialty: "Italian Cuisine",
//       photo: "https://randomuser.me/api/portraits/men/22.jpg",
//       experience: "12 years"
//     },
//     {
//       id: 2,
//       name: "Sophia",
//       role: "Pastry Chef",
//       specialty: "Desserts",
//       photo: "https://randomuser.me/api/portraits/women/33.jpg",
//       experience: "8 years"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Hero Section with Restaurant Photo */}
//       <div className="relative rounded-xl shadow-md overflow-hidden mb-8 h-64">
//         {/* <img 
//           src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
//           alt="Restaurant interior" 
//           className="w-full h-full object-cover"
//           filter= "blur(8px)"
//           transform= "scale(1.05)" 
//         /> */}
//           <div 
//         className="absolute inset-0 bg-cover bg-center scale-105"
//         style={{
//           backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
//           filter: "blur(4px)",
//           transform: "scale(1.05)" // Prevents white edges from blur
//         }}
//       ></div>
//         <div className="absolute inset-0 bg-grey-500 bg-opacity-40 flex items-center justify-center">
//           <div className="text-center text-white">
//             <h1 className="text-4xl font-bold mb-2">WELCOME TO EATOS</h1>
//             <p className="text-xl">Where Every Bite Tells a Story</p>
//           </div>
//         </div>
//       </div>

//       {/* Welcome Message */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <div className="flex flex-col md:flex-row items-center">
//           <div className="md:w-2/3">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">
//               Hello, <span className="text-amber-600">{user.name}</span>
//             </h2>
//             <p className="text-gray-600 text-lg">
//               We're delighted to have you back. Here's what's happening at your favorite restaurant.
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0 md:w-1/3 flex justify-end">
//             <img 
//               src={user.photo || "https://randomuser.me/api/portraits/men/1.jpg"} 
//               alt="User" 
//               className="h-20 w-20 rounded-full object-cover border-4 border-amber-500"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Restaurant Gallery */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Restaurant</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {restaurantPhotos.map((photo) => (
//             <div key={photo.id} className="overflow-hidden rounded-lg shadow-md">
//               <img 
//                 src={photo.url} 
//                 alt={photo.alt} 
//                 className="w-full h-48 object-cover hover:scale-105 transition duration-300"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <h3 className="text-2xl font-bold text-gray-900 mb-6">What would you like to do?</h3>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Link 
//             to="/reservation" 
//             className="bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-lg flex flex-col items-center transition duration-300"
//           >
//             <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             Make Reservation
//           </Link>
//           <Link 
//             to="/order" 
//             className="bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-lg flex flex-col items-center transition duration-300"
//           >
//             <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             Place Order
//           </Link>
//           <Link 
//             to="/menu" 
//             className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-4 px-6 rounded-lg flex flex-col items-center transition duration-300"
//           >
//             <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             View Menu
//           </Link>
//           <Link 
//             to="/feedback" 
//             className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-4 px-6 rounded-lg flex flex-col items-center transition duration-300"
//           >
//             <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//             </svg>
//             Give Feedback
//           </Link>
//         </div>
//       </div>

//       {/* Customer Testimonials */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <h3 className="text-2xl font-bold text-gray-900 mb-6">What Our Guests Say</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {testimonials.map((testimonial) => (
//             <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
//               <div className="flex items-center mb-4">
//                 <img 
//                   src={testimonial.photo} 
//                   alt={testimonial.name} 
//                   className="w-12 h-12 rounded-full object-cover mr-4"
//                 />
//                 <div>
//                   <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
//                   <div className="flex">
//                     {[...Array(testimonial.rating)].map((_, i) => (
//                       <svg 
//                         key={i} 
//                         className="w-5 h-5 text-amber-500" 
//                         fill="currentColor" 
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <p className="text-gray-700 italic mb-2">"{testimonial.comment}"</p>
//               <p className="text-gray-500 text-sm">{testimonial.date}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Meet Our Team */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <h3 className="text-2xl font-bold text-gray-900 mb-6">Meet Our Culinary Team</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {featuredStaff.map((staff) => (
//             <div key={staff.id} className="flex items-center">
//               <img 
//                 src={staff.photo} 
//                 alt={staff.name} 
//                 className="w-24 h-24 rounded-full object-cover border-4 border-amber-500 mr-6"
//               />
//               <div>
//                 <h4 className="text-xl font-bold text-gray-900">{staff.name}</h4>
//                 <p className="text-amber-600 font-medium">{staff.role}</p>
//                 <p className="text-gray-600 mt-2">Specialty: {staff.specialty}</p>
//                 <p className="text-gray-500 text-sm">Experience: {staff.experience}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Special Offers */}
//       <div className="bg-amber-50 rounded-xl shadow-md p-6 mb-8 border border-amber-200">
//         <h3 className="text-2xl font-bold text-gray-900 mb-4">Today's Special</h3>
//         <div className="flex flex-col md:flex-row items-center">
//           <div className="md:w-1/3 mb-4 md:mb-0">
//             <img 
//               src="https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80" 
//               alt="Special dish" 
//               className="w-full h-48 object-cover rounded-lg"
//             />
//           </div>
//           <div className="md:w-2/3 md:pl-8">
//             <h4 className="text-xl font-bold text-gray-900 mb-2">Truffle Pasta</h4>
//             <p className="text-gray-600 mb-4">
//               Our chef's signature dish with fresh truffles imported from Italy. 
//               Served with homemade pasta and a creamy sauce.
//             </p>
//             <div className="flex items-center">
//               <span className="text-2xl font-bold text-gray-900 mr-4">$24.99</span>
//               <span className="text-sm bg-amber-500 text-white px-3 py-1 rounded-full">20% off</span>
//             </div>
//             <button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg">
//               Order Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerDashboard;



import React from 'react';
import { Link } from "react-router-dom";

function CustomerDashboard({ user }) {
  // Restaurant photos gallery
  const restaurantPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alt: "Restaurant interior"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      alt: "Chef preparing food"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      alt: "Delicious food"
    }
  ];

  // Customer testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      comment: "The ambiance was perfect and the steak cooked to perfection!",
      rating: 5,
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      comment: "Best service in town. The staff made our anniversary special!",
      rating: 5,
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "1 week ago"
    }
  ];

  // Featured staff
  const featuredStaff = [
    {
      id: 1,
      name: "Chef Antonio",
      role: "Head Chef",
      specialty: "Italian Cuisine",
      photo: "https://randomuser.me/api/portraits/men/22.jpg",
      experience: "12 years"
    },
    {
      id: 2,
      name: "Sophia",
      role: "Pastry Chef",
      specialty: "Desserts",
      photo: "https://randomuser.me/api/portraits/women/33.jpg",
      experience: "8 years"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            filter: "brightness(0.7)"
          }}
        ></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">WELCOME TO EATOS</h1>
            <p className="text-xl md:text-2xl text-white mb-8">Where Every Bite Tells a Story</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/menu" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
              >
                View Our Menu
              </Link>
              <Link 
                to="/reservation" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg text-lg font-medium"
              >
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Message */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Hello, <span className="text-amber-600">{user.name}</span>
              </h2>
              <p className="text-gray-600 text-lg">
                We're delighted to have you back. Here's what's happening at your favorite restaurant.
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:w-1/3 flex justify-end">
              {/* <img 
                src={user.photo || "https://randomuser.me/api/portraits/men/1.jpg"} 
                alt="User" 
                className="h-20 w-20 rounded-full object-cover border-4 border-amber-500"
              /> */}
            </div>
          </div>
        </div>

        {/* Restaurant Gallery */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Restaurant</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurantPhotos.map((photo) => (
              <div key={photo.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <img 
                  src={photo.url} 
                  alt={photo.alt} 
                  className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">What would you like to do?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link 
              to="/reservation" 
              className="bg-amber-600 hover:bg-amber-700 text-white py-6 px-4 rounded-lg flex flex-col items-center transition duration-300"
            >
              <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-center">Make Reservation</span>
            </Link>
            <Link 
              to="/order" 
              className="bg-gray-900 hover:bg-gray-800 text-white py-6 px-4 rounded-lg flex flex-col items-center transition duration-300"
            >
              <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-center">Place Order</span>
            </Link>
            <Link 
              to="/about" 
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-6 px-4 rounded-lg flex flex-col items-center transition duration-300"
            >
              <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-center">View About</span>
            </Link>
            <Link 
              to="/feedbacks" 
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-6 px-4 rounded-lg flex flex-col items-center transition duration-300"
            >
              <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-center">Give Feedback</span>
            </Link>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">What Our Guests Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg 
                          key={i} 
                          className="w-5 h-5 text-amber-500" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-3">"{testimonial.comment}"</p>
                <p className="text-gray-500 text-sm">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Meet Our Culinary Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredStaff.map((staff) => (
              <div key={staff.id} className="flex items-center">
                <img 
                  src={staff.photo} 
                  alt={staff.name} 
                  className="w-28 h-28 rounded-full object-cover border-4 border-amber-500 mr-6"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{staff.name}</h4>
                  <p className="text-amber-600 font-medium">{staff.role}</p>
                  <p className="text-gray-600 mt-2">Specialty: {staff.specialty}</p>
                  <p className="text-gray-500 text-sm mt-1">Experience: {staff.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div className="bg-amber-50 rounded-xl shadow-md p-8 mb-12 border border-amber-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Today's Special</h3>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80" 
                alt="Special dish" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Truffle Pasta</h4>
              <p className="text-gray-600 mb-6 text-lg">
                Our chef's signature dish with fresh truffles imported from Italy. 
                Served with homemade pasta and a creamy sauce.
              </p>
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-gray-900 mr-6">$24.99</span>
                <span className="text-sm bg-amber-500 text-white px-4 py-2 rounded-full">20% off</span>
              </div>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-lg font-medium">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-500 mb-4">EATOS</h3>
              <p className="text-gray-400">
                Where every bite tells a story. Experience culinary excellence in the heart of the city.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Monday - Thursday: 11am - 10pm</li>
                <li>Friday - Saturday: 11am - 11pm</li>
                <li>Sunday: 11am - 9pm</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Gourmet Street</li>
                <li>Foodville, NY 10001</li>
                <li>info@eatos.com</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to receive updates on special offers and events.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-900"
                />
                <button className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-r-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} EATOS Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CustomerDashboard;