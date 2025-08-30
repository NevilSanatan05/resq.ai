import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  FiAlertTriangle, FiMapPin, FiClock, FiUser, FiNavigation,
  FiActivity, FiCalendar, FiAlertCircle, FiMessageSquare,
  FiPackage, FiPlus, FiRadio, FiMap, FiUsers, FiTool, FiThermometer,
  FiDroplet, FiWind, FiAlertOctagon, FiCheckCircle, FiXCircle, FiLogOut
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { format, addHours, parseISO } from 'date-fns';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <h3 className="font-bold">Something went wrong</h3>
          <p className="text-sm">{this.state.error?.message || 'Please try again later'}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RescueDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // State management
  const [state, setState] = useState({
    loading: true,
    userProfile: null,
    activeTab: 'overview',
    currentLocation: null,
    isOnline: true,
    activeAlerts: [],
    teamStatus: [],
    responseMetrics: {
      avgResponseTime: '12m 34s',
      successRate: '92%',
      alertsHandled: 47
    }
  });

  // Memoized team members data
  const mockTeamMembers = React.useMemo(() => [
    { id: 1, name: 'Arjun Patel', role: 'Team Lead', status: 'online', avatar: 'A' },
    { id: 2, name: 'Priya Sharma', role: 'Medic', status: 'on-mission', avatar: 'P' },
    { id: 3, name: 'Rahul Kumar', role: 'Rescuer', status: 'online', avatar: 'R' },
    { id: 4, name: 'Ananya Reddy', role: 'Coordinator', status: 'offline', avatar: 'A' },
  ], []);

  // Initialize team status with mock data
  useEffect(() => {
    setState(prev => ({
      ...prev,
      teamStatus: mockTeamMembers,
      loading: false
    }));
  }, [mockTeamMembers]);

  // Update state helper
  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Fetch user profile
  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      if (!currentUser) {
        updateState({ loading: false });
        return;
      }

      try {
        const profile = {
          id: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || 'Rescue Team Member',
          role: 'Rescuer',
          team: 'Mumbai Rapid Response',
          status: 'online',
          lastActive: new Date().toISOString(),
        };

        if (isMounted) {
          updateState({
            userProfile: profile,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        if (isMounted) {
          updateState({ loading: false });
          alert('Error: Failed to load user profile');
        }
      }
    };

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, [currentUser, updateState]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      alert(`Logout Failed: ${error.message || 'Failed to log out'}`);
    }
  }, [logout, navigate]);

  // Handle tab change
  const handleTabChange = useCallback((tab) => {
    updateState({ activeTab: tab });
  }, [updateState]);

  // Toggle online status
  const toggleOnlineStatus = useCallback(() => {
    updateState(prev => ({
      isOnline: !prev.isOnline,
      userProfile: {
        ...prev.userProfile,
        status: !prev.isOnline ? 'online' : 'offline'
      }
    }));
  }, [updateState]);

  // Handle alert acceptance
  const handleAcceptAlert = useCallback((alertId) => {
    updateState(prev => ({
      activeAlerts: prev.activeAlerts.filter(alert => alert.id !== alertId)
    }));

    alert('Alert Accepted: You have accepted the alert and are now assigned to it.');
  }, [updateState]);

  

  // Destructure state for easier access
  const {
    userProfile,
    activeTab,
    currentLocation,
    isOnline,
    activeAlerts,
    responseMetrics
  } = state;

  // Chart data and colors - memoized to prevent unnecessary re-renders
  const { alertData, alertTypeData, colors: COLORS } = React.useMemo(() => ({
    alertData: [
      { name: 'Mon', alerts: 12 },
      { name: 'Tue', alerts: 19 },
      { name: 'Wed', alerts: 15 },
      { name: 'Thu', alerts: 27 },
      { name: 'Fri', alerts: 18 },
      { name: 'Sat', alerts: 23 },
      { name: 'Sun', alerts: 19 }
    ],
    alertTypeData: [
      { name: 'Medical', value: 35 },
      { name: 'Fire', value: 25 },
      { name: 'Flood', value: 20 },
      { name: 'Earthquake', value: 15 },
      { name: 'Other', value: 5 }
    ],
    colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
  }), []);

  // Get current location and initial data
  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        // Get current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (isMounted) {
                updateState({
                  currentLocation: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  }
                });
              }
            },
            (error) => {
              console.error('Error getting location:', error);
              alert('Location Error: Could not get your location. Some features may be limited.');
            }
          );
        }

        // Simulate fetching active alerts
        const mockAlerts = [
          {
            id: 1,
            type: 'Medical Emergency',
            location: '123 Main St, Downtown',
            distance: '1.2 km',
            priority: 'High',
            time: '2 min ago'
          },
          {
            id: 2,
            type: 'Fire',
            location: '456 Oak Ave, Uptown',
            distance: '3.5 km',
            priority: 'Critical',
            time: '5 min ago'
          }
        ];

        // Simulate team status
        const mockTeam = [
          { id: 1, name: 'John D.', status: 'On Call', role: 'Paramedic' },
          { id: 2, name: 'Sarah M.', status: 'Available', role: 'Firefighter' },
          { id: 3, name: 'Alex R.', status: 'On Break', role: 'EMT' },
          { id: 4, name: 'Mike T.', status: 'In Transit', role: 'Paramedic' }
        ];

        if (isMounted) {
          updateState({
            activeAlerts: mockAlerts,
            teamStatus: mockTeam,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error initializing dashboard:', error);
        if (isMounted) {
          updateState({ loading: false });
          alert('Initialization Error: Failed to load dashboard data. Please try refreshing the page.');
        }
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, [updateState]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-lg shadow-lg mb-6 p-4">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FiAlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ResQ AI</h1>
                <p className="text-sm text-gray-400">Rescue Operations Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {userProfile?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{userProfile?.name || 'Rescue Team'}</p>
                  <p className="text-xs text-gray-400">{userProfile?.role || 'Team Member'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleOnlineStatus}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${isOnline
                      ? 'bg-green-900/30 text-green-400 hover:bg-green-800/50'
                      : 'bg-red-900/30 text-red-400 hover:bg-red-800/50'
                    }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
                  <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="mt-4 flex space-x-1">
            {['overview', 'alerts', 'team', 'map', 'resources', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${activeTab === tab
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Response Time Card */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg. Response Time</p>
                <p className="text-2xl font-bold">12m 34s</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                <FiClock className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2">
              <div className="h-1 w-full bg-gray-700 rounded-full">
                <div className="h-1 bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">Faster than 85% of teams</p>
            </div>
          </div>

          {/* Success Rate Card */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <div className="p-3 rounded-full bg-green-500/20 text-green-400">
                <FiCheckCircle className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2">
              <div className="h-1 w-full bg-gray-700 rounded-full">
                <div className="h-1 bg-green-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">+2.5% from last week</p>
            </div>
          </div>

          {/* Active Alerts Card */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Alerts</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-400">
                <FiAlertTriangle className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-yellow-400 mr-1"></span>
                <span className="text-xs text-gray-400">3 high priority</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="h-2 w-2 rounded-full bg-red-400 mr-1"></span>
                <span className="text-xs text-gray-400">1 critical</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Alerts */}
            <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-medium">Active Alerts</h2>
                <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
                  {activeAlerts.length} Active
                </span>
              </div>
              <div className="divide-y divide-gray-700">
                {activeAlerts.length > 0 ? (
                  activeAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full ${alert.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          alert.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                          <FiAlertCircle className="h-5 w-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{alert.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${alert.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                              alert.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                              {alert.priority} priority
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <FiMapPin className="h-3.5 w-3.5 mr-1" />
                            <span>{alert.location}</span>
                            <span className="mx-2">•</span>
                            <FiClock className="h-3.5 w-3.5 mr-1" />
                            <span>{alert.timeAgo} ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <button
                          onClick={() => handleAcceptAlert(alert.id)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                        >
                          Accept
                        </button>
                        <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded-md transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <FiAlertCircle className="mx-auto h-12 w-12 text-gray-600" />
                    <h3 className="mt-2 text-sm font-medium text-gray-300">No active alerts</h3>
                    <p className="mt-1 text-sm text-gray-500">You're all caught up for now.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Weekly Activity</h2>
                <select className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-md px-3 py-1">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={alertData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: '#F3F4F6'
                      }}
                    />
                    <Bar
                      dataKey="alerts"
                      radius={[4, 4, 0, 0]}
                      className="fill-blue-500"
                    >
                      {alertData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          className={`${entry.alerts > 20 ? 'fill-blue-500' : 'fill-blue-400'
                            }`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Team Status */}
            <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700">
                <h2 className="text-lg font-medium">Team Status</h2>
              </div>
              <div className="divide-y divide-gray-700">
                {mockTeamMembers.map((member) => (
                  <div key={member.id} className="p-4 hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                          {member.avatar}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-gray-400">{member.role}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.status === 'online'
                        ? 'bg-green-500/20 text-green-400'
                        : member.status === 'on-mission'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'
                        }`}>
                        <span className={`h-2 w-2 rounded-full mr-1.5 ${member.status === 'online'
                          ? 'bg-green-400'
                          : member.status === 'on-mission'
                            ? 'bg-yellow-400'
                            : 'bg-gray-400'
                          }`}></span>
                        {member.status === 'on-mission' ? 'On Mission' : member.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Types */}
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Alert Types</h2>
                <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">
                  This Month
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={alertTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {alertTypeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          className="outline-none"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.375rem',
                        color: '#F3F4F6'
                      }}
                      formatter={(value, name) => [`${value} alerts`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {alertTypeData.map((type, index) => (
                    <div key={type.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span
                          className="h-3 w-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="text-gray-300">{type.name}</span>
                      </div>
                      <span className="font-medium">{type.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="p-2 rounded-full bg-blue-500/20 text-blue-400 mb-2">
                    <FiNavigation className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Navigate</span>
                </button>
                <button className="flex flex-col items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="p-2 rounded-full bg-green-500/20 text-green-400 mb-2">
                    <FiClock className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Log Hours</span>
                </button>
                <button className="flex flex-col items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="p-2 rounded-full bg-yellow-500/20 text-yellow-400 mb-2">
                    <FiAlertTriangle className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Report Issue</span>
                </button>
                <button className="flex flex-col items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="p-2 rounded-full bg-purple-500/20 text-purple-400 mb-2">
                    <FiMessageSquare className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Team Chat</span>
                </button>
              </div>
            </div>

            {/* Current Location */}
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Current Location</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Refresh
                </button>
              </div>
              <div className="h-48 bg-gray-700 rounded-lg overflow-hidden">
                {currentLocation ? (
                  <MapContainer
                    center={[currentLocation.lat, currentLocation.lng]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    className="z-0"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[currentLocation.lat, currentLocation.lng]}>
                      <Popup>Your current location</Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <p>Loading map...</p>
                  </div>
                )}
              </div>
              <div className="mt-3 text-sm">
                <p className="font-medium">Last updated: {new Date().toLocaleTimeString()}</p>
                <p className="text-gray-400 text-sm">
                  {currentLocation
                    ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`
                    : 'Location not available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiClock size={20} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Response</p>
              <p className="text-2xl font-semibold">{responseMetrics.avgResponseTime}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiActivity size={20} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Success Rate</p>
              <p className="text-2xl font-semibold">{responseMetrics.successRate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Active Alerts</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {activeAlerts.length > 0 ? (
            activeAlerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <FiAlertCircle
                        className={`mr-2 ${alert.priority === 'Critical' ? 'text-red-500' : 'text-yellow-500'
                          }`}
                      />
                      <h3 className="font-medium">{alert.type}</h3>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <FiMapPin className="mr-1" size={14} />
                      {alert.location} • {alert.distance} away
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                      {alert.priority}
                    </span>
                    <p className="mt-1 text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end space-x-2">
                  <button
                    onClick={() => handleAcceptAlert(alert.id)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Accept
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No active alerts at the moment</p>
            </div>
          )}
        </div>
      </div >

      {/* Activity Chart */}
      < div className="bg-white p-6 rounded-lg shadow" >
        <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Alerts</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={alertData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="alerts" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>

      <div className="space-y-6">
        {/* Team Status */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Team Status</h2>
          </div>
    <div className="divide-y divide-gray-200">
      {state.teamStatus.map((member) => (
        <div key={member.id} className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <FiUser size={18} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${member.status === 'Available'
                  ? 'bg-green-100 text-green-800'
                  : member.status === 'In Transit'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
            >
              {member.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div >

  {/* Alert Types */}
  < div className="bg-white p-6 rounded-lg shadow" >
    <h2 className="text-lg font-medium text-gray-900 mb-4">Alert Types</h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={alertTypeData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {alertTypeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} alerts`, 'Count']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div >

  {/* Quick Actions */}
  < div className="bg-white p-6 rounded-lg shadow" >
    <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
    <div className="grid grid-cols-2 gap-3">
      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2">
          <FiNavigation size={20} />
        </div>
        <span className="text-sm font-medium">Navigate</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="p-3 rounded-full bg-green-100 text-green-600 mb-2">
          <FiClock size={20} />
        </div>
        <span className="text-sm font-medium">Log Hours</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mb-2">
          <FiAlertTriangle size={20} />
        </div>
        <span className="text-sm font-medium">Report Issue</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-2">
          <FiCalendar size={20} />
        </div>
        <span className="text-sm font-medium">Schedule</span>
      </button>
    </div>
    </div>
    
    {/* Current Location Bar */}
    {currentLocation && (
      <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-2 text-center text-sm">
        
      </div>
    )}
      

      {/* Alert Types */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Alert Types</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={alertTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {alertTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} alerts`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2">
              <FiNavigation size={20} />
            </div>
            <span className="text-sm font-medium">Navigate</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mb-2">
              <FiClock size={20} />
            </div>
            <span className="text-sm font-medium">Log Hours</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mb-2">
              <FiAlertTriangle size={20} />
            </div>
            <span className="text-sm font-medium">Report Issue</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-2">
              <FiCalendar size={20} />
            </div>
            <span className="text-sm font-medium">Schedule</span>
          </button>
        </div>
      </div>

      {/* Current Location Bar */}
      {currentLocation && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-2 text-center text-sm">
          <p>
            Current Location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)} • Last
            updated: {format(new Date(), 'MMM d, yyyy h:mm a')}
          </p>
        </div>
      )}
        </div>
    </div>
  );
};

// Add PropTypes validation
RescueDashboard.propTypes = {
  // Add any props validation if needed
};

// Wrap with ErrorBoundary for better error handling
export default function RescueDashboardWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <RescueDashboard />
    </ErrorBoundary>
  );
}