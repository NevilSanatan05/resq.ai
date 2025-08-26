import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-gray-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-teal-400 hover:text-teal-300">
              RESQ.AI
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-teal-400">Home</Link>
            <Link to="/citizen" className="hover:text-teal-400">Citizen</Link>
            <Link to="/rescue" className="hover:text-teal-400">Rescue</Link>
            <Link to="/admin" className="hover:text-teal-400">Admin</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-700 hover:text-teal-400"
          >
            Home
          </Link>
          <Link
            to="/citizen"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-700 hover:text-teal-400"
          >
            Citizen
          </Link>
          <Link
            to="/rescue"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-700 hover:text-teal-400"
          >
            Rescue
          </Link>
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-700 hover:text-teal-400"
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
