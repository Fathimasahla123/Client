import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CustomerDashboard({ user }) {
  const navigate = useNavigate();
  // Restaurant photos gallery
  const restaurantPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alt: "Restaurant interior",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      alt: "Chef preparing food",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      alt: "Delicious food",
    },
  ];

  // Customer testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      comment: "The ambiance was perfect and the steak cooked to perfection!",
      rating: 5,
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      comment: "Best service in town. The staff made our anniversary special!",
      rating: 5,
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "1 week ago",
    },
  ];

  // Featured staff
  const featuredStaff = [
    {
      id: 1,
      name: "Chef Antonio",
      role: "Head Chef",
      specialty: "Italian Cuisine",
      photo: "https://randomuser.me/api/portraits/men/22.jpg",
      experience: "12 years",
    },
    {
      id: 2,
      name: "Sophia",
      role: "Pastry Chef",
      specialty: "Desserts",
      photo: "https://randomuser.me/api/portraits/women/33.jpg",
      experience: "8 years",
    },
  ];
  const handleOrderNow = () => {
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            filter: "blur(4px)",
          }}
        ></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              WELCOME TO{" "}
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold text-amber-500 mb-6">
              EATOS{" "}
            </h1>

            <p className="text-xl text-white mb-8 font-light tracking-wider italic">
              " Where Every Bite Tells a Story "
            </p>
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
                We're delighted to have you back. Here's what's happening at
                your favorite restaurant.
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Our Restaurant
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurantPhotos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            What would you like to do?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link
              to="/reservation"
              className="bg-amber-600 hover:bg-amber-700 text-white py-6 px-4 rounded-lg flex flex-col items-center transition duration-300"
            >
              <svg
                className="w-10 h-10 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-center">Make Reservation</span>
            </Link>
            <Link
              to="/order"
              className="bg-gray-900 hover:bg-gray-800 text-white py-6 px-4 rounded-lg flex flex-col items-center transition duration-300"
            >
              <svg
                className="w-10 h-10 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-center">Place Order</span>
            </Link>
            <Link
              to="/about"
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-6 px-4 rounded-lg flex flex-col items-center transition duration-300"
            >
              <svg
                className="w-10 h-10 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-center">View About</span>
            </Link>
            <Link
              to="/feedbacks"
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-6 px-4 rounded-lg flex flex-col items-center transition duration-300"
            >
              <svg
                className="w-10 h-10 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span className="text-center">Give Feedback</span>
            </Link>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            What Our Guests Say
          </h3>
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
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
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
                <p className="text-gray-700 italic mb-3">
                  "{testimonial.comment}"
                </p>
                <p className="text-gray-500 text-sm">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Meet Our Culinary Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredStaff.map((staff) => (
              <div key={staff.id} className="flex items-center">
                <img
                  src={staff.photo}
                  alt={staff.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-amber-500 mr-6"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {staff.name}
                  </h4>
                  <p className="text-amber-600 font-medium">{staff.role}</p>
                  <p className="text-gray-600 mt-2">
                    Specialty: {staff.specialty}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Experience: {staff.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div className="bg-amber-50 rounded-xl shadow-md p-8 mb-12 border border-amber-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Today's Special
          </h3>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img
                src="https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg"
                alt="Special dish"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                Barbeque Pizza
              </h4>
              <p className="text-gray-600 mb-6 text-lg">
                Our chef's signature dish with fresh barbeque imported from
                Italy. Served with homemade pasta and a creamy sauce.
              </p>
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-gray-900 mr-6">
                  ₹500
                </span>
                <span className="text-sm bg-amber-500 text-white px-4 py-2 rounded-full">
                  20% off
                </span>
              </div>
              <button
                onClick={handleOrderNow}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
              >
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
                Where every bite tells a story. Experience culinary excellence
                in the heart of the city.
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
            <p>
              © {new Date().getFullYear()} EATOS Restaurant. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CustomerDashboard;
