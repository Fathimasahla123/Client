import React from "react";
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from "@heroicons/react/24/outline";

const ContactPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Reach out to us with any questions or feedback.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Location Card */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-amber-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <MapPinIcon className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Our Location</h3>
            <p className="text-gray-600">123 Restaurant Row</p>
            <p className="text-gray-600">Foodie City, FC 12345</p>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-amber-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <PhoneIcon className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
            <p className="text-gray-600">Mon-Fri: 9am-9pm</p>
          </div>

          {/* Email Card */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-amber-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <EnvelopeIcon className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Email</h3>
            <p className="text-gray-600">info@eatos.com</p>
            <p className="text-gray-600">support@eatos.com</p>
          </div>

          {/* Hours Card */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-amber-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <ClockIcon className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Hours</h3>
            <p className="text-gray-600">Mon-Fri: 10am-10pm</p>
            <p className="text-gray-600">Sat-Sun: 9am-11pm</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Map Section */}
            <div className="md:w-1/2 bg-gray-100">
              <iframe
                title="Restaurant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209132576!2d-73.987844924525!3d40.74844097138992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                className="min-h-96"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Form Section */}
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-md transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;