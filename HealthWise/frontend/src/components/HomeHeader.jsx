import React from "react";
import { Link } from "react-router-dom";

const HomeHeader = () => {
  return (
    <header className="bg-gradient-to-r bg-white py-4 shadow-md rounded-b-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-3xl font-bold text-orange-600 tracking-wide">
          @HealthWise
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-10 mt-2 md:mt-0 text-l font-medium text-gray-700">
          <a
            href="/#benefits"
            className="hover:text-orange-600 transition"
          >
            Why Use Our Tool
          </a>
          <a
            href="/#how-it-works"
            className="hover:text-orange-600 transition"
          >
            How It Works
          </a>
          <a
            href="/#faq"
            className="hover:text-orange-600 transition"
          >
            FAQ
          </a>
          <Link
            to="/quiz"
            className="hover:text-orange-600 transition"
          >
            Let's Connect
          </Link>
          <Link
            to="/login"
            className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1.5 rounded-md transition-all"
          >
            Login / Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
