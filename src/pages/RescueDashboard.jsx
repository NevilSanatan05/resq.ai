import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiMapPin, FiClock, FiUser, FiNavigation, FiActivity, FiCalendar, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';

const RescueDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [teamStatus, setTeamStatus] = useState([]);
  const [responseMetrics, setResponseMetrics] = useState({
    avgResponseTime: '12m 34s',
    successRate: '92%',
    alertsHandled: 47
  });

  // Sample data for charts
  const alertData = [
    { name: 'Mon', alerts: 12 },
    { name: 'Tue', alerts: 19 },
    { name: 'Wed', alerts: 15 },
    { name: 'Thu', alerts: 27 },
    { name: 'Fri', alerts: 18 },
    { name: 'Sat', alerts: 23 },
    { name: 'Sun', alerts: 19 }
  ];

  const alertTypeData = [
    { name: 'Medical', value: 35 },
    { name: 'Fire', value: 25 },
    { name: 'Flood', value: 20 },
    { name: 'Earthquake', value: 15 },
    { name: 'Other', value: 5 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
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
    setActiveAlerts(mockAlerts);

    // Simulate team status
    const mockTeam = [
      { id: 1, name: 'John D.', status: 'On Call', role: 'Paramedic' },
      { id: 2, name: 'Sarah M.', status: 'Available', role: 'Firefighter' },
      { id: 3, name: 'Alex R.', status: 'On Break', role: 'EMT' },
      { id: 4, name: 'Mike T.', status: 'In Transit', role: 'Paramedic' }
    ];
    setTeamStatus(mockTeam);
  }, []);

  const handleStatusChange = (status) => {
    setIsOnline(status);
    // In a real app, this would update the server
    console.log(`Status changed to: ${status ? 'Online' : 'Offline'}`);
  };

  const handleAcceptAlert = (alertId) => {
    // In a real app, this would update the server
    setActiveAlerts(activeAlerts.filter(alert => alert.id !== alertId));
    console.log(`Accepted alert ${alertId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rescue Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Rescue Team</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
            <button
              onClick={() => handleStatusChange(!isOnline)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isOnline
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <FiAlertTriangle size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Alerts</p>
                    <p className="text-2xl font-semibold">{activeAlerts.length}</p>
                  </div>
                </div>
              </div>
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
            <div className="bg-white rounded-lg shadow overflow-hidden">
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
                              className={`mr-2 ${
                                alert.priority === 'Critical' ? 'text-red-500' : 'text-yellow-500'
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
            </div>

            {/* Activity Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
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

          {/* Right Column */}
          <div className="space-y-6">
            {/* Team Status */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Team Status</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {teamStatus.map((member) => (
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
                        className={`px-2 py-1 text-xs rounded-full ${
                          member.status === 'Available'
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
            </div>

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
          </div>
        </div>
      </main>

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
  );
};

export default RescueDashboard;