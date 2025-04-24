import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          filter: "blur(8px)",
          transform: "scale(1.05)", // Prevents white edges from blur
        }}
      ></div>

      {/* Content */}
      <div className="z-10 text-center px-4 w-full">
        <h1 className="text-5xl md:text-8xl font-bold text-black mb-8 font-sans tracking-wide">
          <span className="block">EATOS</span>
          {/* <div className="w-24 h-1.5 bg-amber-500 mx-auto mt-4 mb-8"></div> */}
        </h1>
        <p className="text-xl text-white mb-8 font-light tracking-wider italic">
          " Where Every Bite Tells a Story "
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-gray-800 font-medium rounded-md hover:bg-gray-100 transition duration-200 text-lg shadow-sm"
          >
            Sign in
          </Link>

          <Link
            to="/signup"
            className="px-8 py-3 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition duration-200 text-lg shadow-sm"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
