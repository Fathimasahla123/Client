import React from "react";
import Footer from "../CommonComponents/footer";
import { Link } from "react-router-dom";
import {
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

function StaffDashboard({ user }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div
        className="relative bg-gray-900 py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-amber-500 mb-4">
            Welcome, Chef {user.name.split(" ")[0]}!
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Your dedication creates unforgettable dining experiences
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/view-orders"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
            >
              <ClipboardDocumentCheckIcon className="w-5 h-5 mr-2" />
              Active Orders
            </Link>
            <Link
              to="/received-feedback"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
            >
              <ChatBubbleLeftEllipsisIcon className="w-5 h-5 mr-2" />
              Customer Feedback
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Stats Card 1 */}
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
              <UserGroupIcon className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Today's Covers
            </h3>
            <p className="text-3xl font-bold text-amber-500">84</p>
            <p className="text-gray-400 text-sm">+12% from yesterday</p>
          </div>

          {/* Stats Card 2 */}
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
              <ClipboardDocumentCheckIcon className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Active Orders
            </h3>
            <p className="text-3xl font-bold text-amber-500">15</p>
            <p className="text-gray-400 text-sm">3 waiting for pickup</p>
          </div>

          {/* Stats Card 3 */}
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
              <ChartBarIcon className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Avg. Rating
            </h3>
            <p className="text-3xl font-bold text-amber-500">4.8</p>
            <div className="flex justify-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-500">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Service Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kitchen Timeline */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-amber-500 mb-4">
              Order Timeline
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white">Table #12 - 4 pax</h4>
                    <p className="text-gray-400 text-sm">2x Burger, 1x Salad</p>
                  </div>
                  <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-sm">
                    Preparing
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">15 mins remaining</p>
              </div>
              {/* Add more timeline items */}
            </div>
          </div>

          {/* Special Requests */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-amber-500 mb-4">
              Special Requests
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <div>
                    <h4 className="text-white">
                      Table #5 - Birthday Celebration
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Please bring cake with sparklers
                    </p>
                  </div>
                </div>
              </div>
              {/* Add more special requests */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StaffDashboard;
