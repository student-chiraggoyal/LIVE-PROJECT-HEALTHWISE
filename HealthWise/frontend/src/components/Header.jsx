import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-orange-600">
          @HealthWise
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 font-medium text-gray-700 text-lg">
          <Link
            to="/"
            className={`hover:text-orange-600 transition ${
              isActive("/") ? "text-orange-600 font-semibold" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/quiz"
            className={`hover:text-orange-600 transition ${
              isActive("/quiz") ? "text-orange-600 font-semibold" : ""
            }`}
          >
            Quiz
          </Link>

          <Link
            to="/dashboard"
            className={`hover:text-orange-600 transition ${
              isActive("/dashboard") ? "text-orange-600 font-semibold" : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className={`hover:text-orange-600 transition ${
              isActive("/history") ? "text-orange-600 font-semibold" : ""
            }`}
          >
            History
          </Link>

          <Link
            to="/recommendations"
            className={`hover:text-orange-600 transition ${
              isActive("/recommendations") ? "text-orange-600 font-semibold" : ""
            }`}
          >
            Recommendations
          </Link>

          {/* User Info & Auth Actions */}
          {user ? (
            <>
              <span className="hidden md:block text-gray-600 text-sm">
                Welcome,{" "}
                <span className="font-semibold">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm transition"
            >
              Login / Sign Up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
