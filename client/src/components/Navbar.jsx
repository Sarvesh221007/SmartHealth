// src/components/layout/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Brand Logo + Name */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo.jpeg" 
            alt="SmartHealth Logo" 
            className="h-10 w-15 object-contain"
          />
          <span className="text-2xl font-bold text-blue-600">
            SmartHealth
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>

          {user ? (
            <>
              {user.role === "doctor" ? (
                <Link to="/doctor" className="hover:text-blue-600 transition">Doctor Dashboard</Link>
              ) : (
                <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
              )}
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-600 transition">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={toggleMenu} className="hover:text-blue-600 transition">Home</Link>

          {user ? (
            <>
              {user.role === "doctor" ? (
                <Link to="/doctor" onClick={toggleMenu} className="hover:text-blue-600 transition">Doctor Dashboard</Link>
              ) : (
                <Link to="/dashboard" onClick={toggleMenu} className="hover:text-blue-600 transition">Dashboard</Link>
              )}
              <button
                onClick={() => { logout(); toggleMenu(); }}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="hover:text-blue-600 transition">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="hover:text-blue-600 transition">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
