import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsBell, BsExclamationTriangle, BsFileEarmarkText, BsGeoAlt, BsBoxArrowRight } from "react-icons/bs";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

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
          <div className="hidden md:flex space-x-6 items-center">
            {!currentUser ? (
              <>
                <Link to="/" className="hover:text-teal-400">Home</Link>
                <Link to="/citizen" className="hover:text-teal-400">Citizen</Link>
                <Link to="/rescue" className="hover:text-teal-400">Rescue</Link>
              </>
            ) : (
              <>
                <Link to="/alerts" className="hover:text-teal-400 flex items-center">
                  <BsExclamationTriangle className="mr-1" /> Emergency Alerts
                </Link>
                <Link to="/report" className="hover:text-teal-400 flex items-center">
                  <BsFileEarmarkText className="mr-1" /> Report Incident
                </Link>
                <Link to="/my-reports" className="hover:text-teal-400 flex items-center">
                  <BsFileEarmarkText className="mr-1" /> My Reports
                </Link>
                <Link to="/evacuation" className="hover:text-teal-400 flex items-center">
                  <BsGeoAlt className="mr-1" /> Evacuation Routes
                </Link>
               
              </>
            )}
            
            {currentUser ? (
              <>
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center hover:text-teal-400 focus:outline-none"
                  >
                    <span className="mr-1">{currentUser.displayName || currentUser.email?.split('@')[0]}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-700 text-gray-200"
                      >
                        <BsBoxArrowRight className="mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Link to="/notifications" className="text-gray-300 hover:text-teal-400">
                    <BsBell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                  </Link>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Login
              </Link>
            )}
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
          {!currentUser ? (
            <>
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
            </>
          ) : null}
          
          {currentUser ? (
            <>
              <div className="border-t border-gray-700 my-2 pt-2">
                <p className="px-3 py-1 text-sm text-gray-400">User: {currentUser.displayName || currentUser.email?.split('@')[0]}</p>
              </div>
              
              <Link
                to="/alerts"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 rounded hover:bg-gray-700 hover:text-teal-400"
              >
                <BsExclamationTriangle className="mr-2" /> Emergency Alerts
              </Link>
              
              <Link
                to="/report"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 rounded hover:bg-gray-700 hover:text-teal-400"
              >
                <BsFileEarmarkText className="mr-2" /> Report Incident
              </Link>
              
              <Link
                to="/my-reports"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 rounded hover:bg-gray-700 hover:text-teal-400"
              >
                <BsFileEarmarkText className="mr-2" /> My Reports
              </Link>
              
              <Link
                to="/notifications"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 rounded hover:bg-gray-700 hover:text-teal-400"
              >
                <BsBell className="mr-2" /> Notifications
              </Link>
              
              <Link
                to="/evacuation"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 rounded hover:bg-gray-700 hover:text-teal-400"
              >
                <BsGeoAlt className="mr-2" /> Evacuation Routes
              </Link>
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-700 hover:text-teal-400"
              >
                <BsBoxArrowRight className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
