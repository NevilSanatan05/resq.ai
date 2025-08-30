import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FiFilter, FiCalendar,FiChevronDown, FiAlertTriangle, FiUsers , FiClock,FiChevronUp } from 'react-icons/fi';

// Region and state data
const regions = [
  {
    name: 'Northern',
    states: [
      'Jammu & Kashmir',
      'Himachal Pradesh',
      'Punjab',
      'Uttarakhand',
      'Haryana',
      'Delhi',
      'Uttar Pradesh',
      'Ladakh'
    ]
  },
  {
    name: 'Western',
    states: [
      'Rajasthan',
      'Gujarat',
      'Goa',
      'Maharashtra'
    ]
  },
  {
    name: 'Southern',
    states: [
      'Karnataka',
      'Kerala',
      'Tamil Nadu',
      'Andhra Pradesh',
      'Telangana'
    ]
  },
  {
    name: 'Eastern',
    states: [
      'Bihar',
      'Jharkhand',
      'Odisha',
      'West Bengal'
    ]
  },
  {
    name: 'Northeastern',
    states: [
      'Assam',
      'Sikkim',
      'Arunachal Pradesh',
      'Nagaland',
      'Manipur',
      'Mizoram',
      'Tripura',
      'Meghalaya'
    ]
  },
  {
    name: 'Central',
    states: [
      'Madhya Pradesh',
      'Chhattisgarh'
    ]
  }
];

// District data for key states (simplified for demonstration)
const stateDistricts = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Kolhapur', 'Ratnagiri'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Kutch', 'Bhavnagar'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Palakkad', 'Idukki'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Vellore'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Allahabad', 'Agra', 'Gorakhpur'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Darjeeling'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tezpur', 'Dhubri']
};

// Sample data for disaster management dashboard
const sosData = [
  { name: 'Mon', critical: 12, high: 8, medium: 15 },
  { name: 'Tue', critical: 8, high: 5, medium: 10 },
  { name: 'Wed', critical: 15, high: 10, medium: 18 },
  { name: 'Thu', critical: 9, high: 6, medium: 12 },
  { name: 'Fri', critical: 18, high: 12, medium: 20 },
  { name: 'Sat', critical: 22, high: 15, medium: 25 },
  { name: 'Sun', critical: 10, high: 7, medium: 14 },
];

const responseTimeData = [
  { name: 'Jan', avgResponse: 45, target: 30 },
  { name: 'Feb', avgResponse: 42, target: 30 },
  { name: 'Mar', avgResponse: 38, target: 30 },
  { name: 'Apr', avgResponse: 35, target: 30 },
  { name: 'May', avgResponse: 32, target: 30 },
  { name: 'Jun', avgResponse: 28, target: 30 },
];

const disasterTypeData = [
  { name: 'Floods', value: 35 },
  { name: 'Earthquakes', value: 25 },
  { name: 'Landslides', value: 20 },
  { name: 'Fires', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD166', '#A5A5A5'];

const recentAlerts = [
  { id: 1, location: 'Mumbai, MH', type: 'Flood', severity: 'High', status: 'Active', time: '5 min ago' },
  { id: 2, location: 'Chennai, TN', type: 'Cyclone', severity: 'Critical', status: 'Active', time: '12 min ago' },
  { id: 3, location: 'Kerala', type: 'Landslide', severity: 'High', status: 'Active', time: '25 min ago' },
  { id: 4, location: 'Uttarakhand', type: 'Flash Flood', severity: 'Critical', status: 'Active', time: '42 min ago' },
  { id: 5, location: 'Assam', type: 'Flood', severity: 'Medium', status: 'Active', time: '1 hour ago' },
];

const teamStatus = [
  { id: 1, name: 'Mumbai Rescue', status: 'Deployed', members: 8, location: 'Mumbai, MH' },
  { id: 2, name: 'NDRF Team 1', status: 'On Standby', members: 10, location: 'Delhi' },
  { id: 3, name: 'SDRF Kerala', status: 'In Transit', members: 6, location: 'Kochi' },
  { id: 4, name: 'NDRF Team 2', status: 'Available', members: 12, location: 'Kolkata' },
];

const AdminDashboard = () => {
  const [currentDate] = useState(new Date());
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [availableStates, setAvailableStates] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);

  // Update available states when region changes
  useEffect(() => {
    if (selectedRegion) {
      const region = regions.find(r => r.name === selectedRegion);
      setAvailableStates(region ? region.states : []);
      setSelectedState('');
      setSelectedDistrict('');
    }
  }, [selectedRegion]);

  // Update available districts when state changes
  useEffect(() => {
    if (selectedState) {
      setAvailableDistricts(stateDistricts[selectedState] || []);
      setSelectedDistrict('');
    }
  }, [selectedState]);

  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'deployed': return 'bg-red-500';
      case 'in transit': return 'bg-yellow-500';
      case 'on standby': return 'bg-blue-500';
      case 'available': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar */}
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ResQ.AI Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="text-sm text-gray-400">
                  {format(currentDate, 'EEEE, MMMM d, yyyy')}
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Region Filter */}
            <div className="relative w-full md:w-64">
              <button
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                className="w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg text-left hover:bg-gray-600 transition-colors"
              >
                <span>{selectedRegion || 'Select Region'}</span>
                {showRegionDropdown ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              <AnimatePresence>
                {showRegionDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-1 w-full bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                  >
                    {regions.map((region) => (
                      <div
                        key={region.name}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          setSelectedRegion(region.name);
                          setShowRegionDropdown(false);
                        }}
                      >
                        {region.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* State Filter */}
            <div className="relative w-full md:w-64">
              <button
                onClick={() => selectedRegion && setShowStateDropdown(!showStateDropdown)}
                disabled={!selectedRegion}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-left transition-colors ${
                  selectedRegion ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{selectedState || 'Select State'}</span>
                {showStateDropdown ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              <AnimatePresence>
                {showStateDropdown && availableStates.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-1 w-full bg-gray-700 rounded-lg shadow-lg overflow-y-auto max-h-60"
                  >
                    {availableStates.map((state) => (
                      <div
                        key={state}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          setSelectedState(state);
                          setShowStateDropdown(false);
                        }}
                      >
                        {state}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* District Filter */}
            <div className="relative w-full md:w-64">
              <button
                onClick={() => selectedState && setShowDistrictDropdown(!showDistrictDropdown)}
                disabled={!selectedState}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-left transition-colors ${
                  selectedState ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{selectedDistrict || 'Select District'}</span>
                {showDistrictDropdown ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              <AnimatePresence>
                {showDistrictDropdown && availableDistricts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-1 w-full bg-gray-700 rounded-lg shadow-lg overflow-y-auto max-h-60"
                  >
                    {availableDistricts.map((district) => (
                      <div
                        key={district}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          setSelectedDistrict(district);
                          setShowDistrictDropdown(false);
                        }}
                      >
                        {district}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clear Filters Button */}
            {(selectedRegion || selectedState || selectedDistrict) && (
              <button
                onClick={() => {
                  setSelectedRegion('');
                  setSelectedState('');
                  setSelectedDistrict('');
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Disaster Response Dashboard</h2>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border">
              <FiCalendar className="text-gray-500" />
              <span className="text-gray-700">{format(currentDate, 'MMMM d, yyyy')}</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Active Alerts" 
              value="24" 
              change="+5 from yesterday" 
              isPositive={false} 
              icon={<FiAlertTriangle className="text-red-500" size={24} />}
              color="red"
            />
            <StatCard 
              title="Teams Deployed" 
              value="8" 
              change="3 in last hour" 
              isPositive={true} 
              icon={<FiUsers className="text-blue-500" size={24} />}
              color="blue"
            />
            <StatCard 
              title="Avg. Response Time" 
              value="28 mins" 
              change="12% faster" 
              isPositive={true} 
              icon={<FiClock className="text-green-500" size={24} />}
              color="green"
            />
            <StatCard 
              title="People Affected" 
              value="1.2K" 
              change="+320 today" 
              isPositive={false} 
              icon={<FiUsers className="text-purple-500" size={24} />}
              color="purple"
            />
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard title="SOS Alerts (Last 7 Days)">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sosData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="critical" stackId="a" fill="#FF6B6B" name="Critical" />
                  <Bar dataKey="high" stackId="a" fill="#FF9E7D" name="High" />
                  <Bar dataKey="medium" stackId="a" fill="#FFD166" name="Medium" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Response Time Trend">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={responseTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <Tooltip />
                  <Area type="monotone" dataKey="avgResponse" stroke="#4ECDC4" fillOpacity={1} fill="url(#colorResponse)" name="Avg. Response" />
                  <Line type="monotone" dataKey="target" stroke="#FF6B6B" strokeDasharray="5 5" name="Target" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard title="Disaster Types" className="lg:col-span-1">
              <div className="flex justify-center">
                <PieChart width={300} height={250}>
                  <Pie
                    data={disasterTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {disasterTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </ChartCard>

            <ChartCard title="Active Alerts" className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentAlerts.map((alert) => (
                      <tr key={alert.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {alert.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {alert.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {alert.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {alert.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartCard>
          </div>

          {/* Rescue Teams Status */}
          <div className="mt-8">
            <ChartCard title="Rescue Teams Status">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {teamStatus.map((team) => (
                  <div key={team.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{team.name}</h4>
                        <p className="text-sm text-gray-500">{team.location}</p>
                        <p className="text-sm mt-2">
                          <span className="font-medium">Members:</span> {team.members}
                        </p>
                      </div>
                      <span className={`h-3 w-3 rounded-full ${getStatusColor(team.status)}`} title={team.status}></span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Status:</span>
                        <span className="font-medium">{team.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
          </div>
         </main>
         </div>
      
  );
};

// Reusable Components

const StatCard = ({ title, value, change, isPositive, icon, color = 'blue' }) => {
  const colorVariants = {
    red: 'bg-red-500/10 border-red-500/30',
    blue: 'bg-blue-500/10 border-blue-500/30',
    green: 'bg-green-500/10 border-green-500/30',
    purple: 'bg-purple-500/10 border-purple-500/30',
  };

  const iconColors = {
    red: 'text-red-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`${colorVariants[color] || 'bg-blue-500/10'} p-6 rounded-xl border backdrop-blur-sm`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{value}</p>
          <div className={`inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
          }`}>
            <span className="text-sm font-medium">{change}</span>
            <svg
              className={`w-3 h-3 ml-1 ${!isPositive && 'transform rotate-180'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className={`p-2 rounded-lg bg-opacity-20 ${iconColors[color] || 'bg-blue-500/20'}`}>
          {React.cloneElement(icon, { className: `${icon.props.className} ${iconColors[color] || 'text-blue-400'}` })}
        </div>
      </div>
    </motion.div>
  );
};

const ChartCard = ({ title, children, className = '' }) => (
  <div className={`bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm ${className}`}>
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    {children}
  </div>
);

export default AdminDashboard;