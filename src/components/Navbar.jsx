import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BsBell, 
  BsExclamationTriangle, 
  BsFileEarmarkText, 
  BsBoxArrowRight, 
  BsPeople, 
  BsGear,
  BsShieldCheck,
  BsPersonCircle
} from 'react-icons/bs';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const isAdmin = currentUser?.role === 'admin';
  const isRescue = currentUser?.role === 'rescue';
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [window.location.pathname]);

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-teal-400">Home</Link>
            <Link to="/citizen" className="hover:text-teal-400">Citizen</Link>
            
            {currentUser ? (
              <>
                {isAdmin && (
                  <Link 
                    to="/admin-dashboard" 
                    className="flex items-center bg-teal-900/30 px-3 py-1 rounded hover:bg-teal-800/50"
                  >
                    <BsShieldCheck className="mr-1" /> Admin Panel
                  </Link>
                )}
                
                {isRescue && (
                  <Link 
                    to="/rescue-dashboard" 
                    className="flex items-center bg-blue-900/30 px-3 py-1 rounded hover:bg-blue-800/50"
                  >
                    <BsPeople className="mr-1" /> Rescue Dashboard
                  </Link>
                )}
                
                {!isAdmin && !isRescue && (
                  <>
                    <Link to="/report" className="hover:text-teal-400 flex items-center">
                      <BsFileEarmarkText className="mr-1" /> Report
                    </Link>
                    <Link to="/alerts" className="hover:text-teal-400 flex items-center">
                      <BsExclamationTriangle className="mr-1" /> Alerts
                    </Link>
                  </>
                )}
                
                {/* Notifications */}
                <div className="relative">
                  <Link to="/notifications" className="text-gray-300 hover:text-teal-400">
                    <BsBell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                  </Link>
                </div>
                
                {/* User Dropdown */}
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(!dropdownOpen);
                    }}
                    className="flex items-center space-x-2 hover:text-teal-400 focus:outline-none"
                  >
                    <BsPersonCircle className="text-xl" />
                    <span>{currentUser.name || currentUser.email?.split('@')[0]}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {dropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-xl py-1 z-50 border border-gray-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm font-medium">{currentUser.name || 'User'}</p>
                        <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <BsPersonCircle className="mr-2" /> Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <BsGear className="mr-2" /> Settings
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <BsShieldCheck className="mr-2" /> Admin Settings
                          </Link>
                        )}
                        <div className="border-t border-gray-700 my-1"></div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                        >
                          <BsBoxArrowRight className="mr-2" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800" onClick={(e) => e.stopPropagation()}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/citizen"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Citizen
            </Link>
            
            {currentUser ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin-dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                {isRescue && (
                  <Link
                    to="/rescue-dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Rescue Dashboard
                  </Link>
                )}
                
                {!isAdmin && !isRescue && (
                  <>
                    <Link
                      to="/report"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Report Incident
                    </Link>
                    <Link
                      to="/alerts"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Emergency Alerts
                    </Link>
                  </>
                )}
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <BsPersonCircle className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {currentUser.name || 'User'}
                      </div>
                      <div className="text-sm font-medium text-gray-400">
                        {currentUser.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-white hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
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
      )}

          {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 space-y-1">
          {!currentUser ? (
            <>
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/citizen"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Citizen
              </Link>
              <Link
                to="/rescue"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Rescue
              </Link>
              <div className="pt-4 border-t border-gray-700">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </div>
            </>
          ) : isAdmin ? (
            <>
              <div className="px-3 py-2 text-teal-400 font-semibold border-b border-gray-700 mb-2">
                Admin Panel
              </div>
              <Link
                to="/admin/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 bg-teal-900/30"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <BsFileEarmarkText className="mr-2" /> Admin Dashboard
                </div>
              </Link>
              <Link
                to="/admin/users"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <BsPeople className="mr-2" /> Manage Users
                </div>
              </Link>
              <Link
                to="/admin/reports"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <BsClipboardData className="mr-2" /> All Reports
                </div>
              </Link>
              <Link
                to="/admin/analytics"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <BsGraphUp className="mr-2" /> Analytics
                </div>
              </Link>
              <div className="pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <BsBoxArrowRight className="mr-2" /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-3 py-2 text-teal-400 font-semibold border-b border-gray-700 mb-2">
                Menu
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
              <div className="pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <BsBoxArrowRight className="mr-2" /> Logout
                </button>
              </div>
              <div className="text-xs text-gray-400 px-3 py-1">
                Logged in as: {currentUser?.email}
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
