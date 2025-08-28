import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BsExclamationTriangle, BsFileEarmarkText, BsGeoAlt, BsBell, BsBarChart, BsGear, BsPeople } from "react-icons/bs";

export default function DisasterDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { currentUser } = useAuth();

  const tabs = [
    { id: "overview", label: "Overview", icon: <BsBarChart /> },
    { id: "resources", label: "Resources", icon: <BsFileEarmarkText /> },
    { id: "map", label: "Live Map", icon: <BsGeoAlt /> },
    { id: "alerts", label: "Alerts", icon: <BsExclamationTriangle /> },
    { id: "community", label: "Community", icon: <BsPeople /> },
    { id: "settings", label: "Settings", icon: <BsGear /> },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Disaster Management Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back, {currentUser?.email?.split('@')[0] || 'User'}</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full">
              <BsBell className="text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
          </div>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center">
            <BsExclamationTriangle className="mr-2" /> Report Incident
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center ${
              selectedTab === tab.id
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          {selectedTab === "overview" && (
            <>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <BsBarChart className="mr-2" /> Disaster Forecast & Analytics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Active Incidents</h3>
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-xs text-green-400 mt-1">↑ 12% from last week</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">People Affected</h3>
                  <p className="text-2xl font-bold text-white">1,240</p>
                  <p className="text-xs text-red-400 mt-1">↑ 8% from last week</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Resources Deployed</h3>
                  <p className="text-2xl font-bold text-white">85%</p>
                  <p className="text-xs text-yellow-400 mt-1">↓ 5% capacity remaining</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Response Time</h3>
                  <p className="text-2xl font-bold text-white">18 min</p>
                  <p className="text-xs text-green-400 mt-1">↓ 22% improvement</p>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-xl mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Upcoming Weather Alerts</h3>
                <p className="text-white">Cyclone approaching Odisha coast - high risk zone. Relief teams are being mobilized.</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Updated 20 minutes ago</span>
                  <button className="text-xs text-teal-400 hover:underline">View Details</button>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-xl">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Activity</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-white flex justify-between">
                    <span>New evacuation route added</span>
                    <span className="text-gray-400">2h ago</span>
                  </li>
                  <li className="text-sm text-white flex justify-between">
                    <span>Resource allocation updated</span>
                    <span className="text-gray-400">4h ago</span>
                  </li>
                  <li className="text-sm text-white flex justify-between">
                    <span>Alert notification sent</span>
                    <span className="text-gray-400">6h ago</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          {selectedTab === "resources" && (
            <>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <BsFileEarmarkText className="mr-2" /> Resource Distribution
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Food Packs</h3>
                  <div className="flex justify-between items-end">
                    <p className="text-2xl font-bold text-white">1,200</p>
                    <p className="text-xs text-green-400">85% remaining</p>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Medical Kits</h3>
                  <div className="flex justify-between items-end">
                    <p className="text-2xl font-bold text-white">500</p>
                    <p className="text-xs text-yellow-400">42% remaining</p>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Shelters</h3>
                  <div className="flex justify-between items-end">
                    <p className="text-2xl font-bold text-white">35</p>
                    <p className="text-xs text-red-400">12% available</p>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-xl mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Resource Allocation</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="text-left py-2">Location</th>
                      <th className="text-center py-2">Food</th>
                      <th className="text-center py-2">Medical</th>
                      <th className="text-center py-2">Shelter</th>
                      <th className="text-right py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Bhubaneswar</td>
                      <td className="text-center">450</td>
                      <td className="text-center">200</td>
                      <td className="text-center">12</td>
                      <td className="text-right"><span className="text-green-400">●</span> Active</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Cuttack</td>
                      <td className="text-center">320</td>
                      <td className="text-center">150</td>
                      <td className="text-center">8</td>
                      <td className="text-right"><span className="text-green-400">●</span> Active</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Puri</td>
                      <td className="text-center">280</td>
                      <td className="text-center">100</td>
                      <td className="text-center">10</td>
                      <td className="text-right"><span className="text-yellow-400">●</span> Low</td>
                    </tr>
                    <tr>
                      <td className="py-2">Balasore</td>
                      <td className="text-center">150</td>
                      <td className="text-center">50</td>
                      <td className="text-center">5</td>
                      <td className="text-right"><span className="text-red-400">●</span> Critical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm">
                  Request Additional Resources
                </button>
              </div>
            </>
          )}

          {selectedTab === "map" && (
            <>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <BsGeoAlt className="mr-2" /> Live Disaster Map
              </h2>
              
              <div className="bg-gray-800 h-96 rounded-xl flex flex-col">
                <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-xs">Incidents</button>
                    <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-xs">Shelters</button>
                    <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-xs">Resources</button>
                  </div>
                  <div>
                    <select className="bg-gray-700 text-white text-xs rounded px-2 py-1 border-0">
                      <option>Last 24 hours</option>
                      <option>Last 3 days</option>
                      <option>Last week</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  [Interactive Map Placeholder]
                </div>
                
                <div className="p-3 border-t border-gray-700 flex justify-between text-xs text-gray-400">
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span> Incidents
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span> Shelters
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Resources
                    </div>
                  </div>
                  <div>Last updated: 5 minutes ago</div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Evacuation Routes</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Bhubaneswar to Cuttack</span>
                      <span className="text-green-400">Clear</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Puri to Bhubaneswar</span>
                      <span className="text-yellow-400">Partial blockage</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Balasore to Cuttack</span>
                      <span className="text-red-400">Blocked</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Safe Zones</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Bhubaneswar Stadium</span>
                      <span className="text-yellow-400">75% capacity</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Cuttack Convention Center</span>
                      <span className="text-green-400">40% capacity</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Puri Community Hall</span>
                      <span className="text-red-400">98% capacity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {selectedTab === "alerts" && (
            <>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <BsExclamationTriangle className="mr-2" /> Emergency Alerts & Live Updates
              </h2>
              
              <div className="space-y-4">
                <div className="bg-red-900/30 border border-red-800 p-4 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="bg-red-500 p-1 rounded-lg mr-3">
                        <BsExclamationTriangle className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Flood Warning: Bihar</h3>
                        <p className="text-sm text-gray-300 mt-1">Expected within 24 hours. Evacuation recommended for low-lying areas.</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">2h ago</span>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs bg-red-800/50 text-red-200 px-2 py-1 rounded">CRITICAL</span>
                    <button className="text-xs text-white bg-red-700 hover:bg-red-600 px-3 py-1 rounded">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="bg-yellow-900/30 border border-yellow-800 p-4 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="bg-yellow-500 p-1 rounded-lg mr-3">
                        <BsExclamationTriangle className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Heatwave Advisory: Maharashtra</h3>
                        <p className="text-sm text-gray-300 mt-1">Temperatures expected to reach 45°C. Stay hydrated and avoid outdoor activities.</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">5h ago</span>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs bg-yellow-800/50 text-yellow-200 px-2 py-1 rounded">WARNING</span>
                    <button className="text-xs text-white bg-yellow-700 hover:bg-yellow-600 px-3 py-1 rounded">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="bg-orange-900/30 border border-orange-800 p-4 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="bg-orange-500 p-1 rounded-lg mr-3">
                        <BsExclamationTriangle className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Landslide Risk: Himachal Pradesh</h3>
                        <p className="text-sm text-gray-300 mt-1">Heavy rainfall has increased landslide risk in mountainous regions. Avoid travel on affected routes.</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">8h ago</span>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs bg-orange-800/50 text-orange-200 px-2 py-1 rounded">ALERT</span>
                    <button className="text-xs text-white bg-orange-700 hover:bg-orange-600 px-3 py-1 rounded">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-lg mr-3">
                        <BsExclamationTriangle className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Cyclone Update: Odisha Coast</h3>
                        <p className="text-sm text-gray-300 mt-1">Cyclone has changed direction. Now expected to make landfall 50km south of previous prediction.</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">12h ago</span>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs bg-blue-800/50 text-blue-200 px-2 py-1 rounded">UPDATE</span>
                    <button className="text-xs text-white bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedTab === "community" && (
            <>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <BsPeople className="mr-2" /> Community Reports & Requests
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">Blocked Road Report</h3>
                    <span className="text-xs bg-yellow-800/50 text-yellow-200 px-2 py-1 rounded">PENDING</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Tree fallen across main road connecting Puri and Konark. Unable to pass with vehicles.</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-400">Reported by: Amit S. • 3h ago</span>
                    <div className="flex space-x-2">
                      <button className="text-xs text-white bg-teal-700 hover:bg-teal-600 px-3 py-1 rounded">Verify</button>
                      <button className="text-xs text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">Details</button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">Missing Person</h3>
                    <span className="text-xs bg-red-800/50 text-red-200 px-2 py-1 rounded">URGENT</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Elderly man missing from Cuttack shelter since morning. Last seen wearing blue shirt and gray pants.</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-400">Reported by: Priya M. • 5h ago</span>
                    <div className="flex space-x-2">
                      <button className="text-xs text-white bg-teal-700 hover:bg-teal-600 px-3 py-1 rounded">Respond</button>
                      <button className="text-xs text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">Details</button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">Medical Supply Request</h3>
                    <span className="text-xs bg-green-800/50 text-green-200 px-2 py-1 rounded">FULFILLED</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Urgent need for insulin at Balasore community shelter. At least 5 people require it within 24 hours.</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-400">Reported by: Dr. Sharma • 12h ago</span>
                    <div className="flex space-x-2">
                      <button className="text-xs text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">Details</button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">Water Contamination</h3>
                    <span className="text-xs bg-blue-800/50 text-blue-200 px-2 py-1 rounded">IN PROGRESS</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Water supply in eastern Bhubaneswar appears contaminated. Multiple reports of illness after consumption.</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-400">Reported by: Rahul K. • 1d ago</span>
                    <div className="flex space-x-2">
                      <button className="text-xs text-white bg-teal-700 hover:bg-teal-600 px-3 py-1 rounded">Update</button>
                      <button className="text-xs text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">Details</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Submit New Report
                </button>
              </div>
            </>
          )}
          {selectedTab === "settings" && (
            <>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <BsGear className="mr-2" /> Settings & Preferences
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="font-medium text-white mb-3">Notification Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Emergency Alerts</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked readOnly />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-teal-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Community Reports</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked readOnly />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-teal-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Resource Updates</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-teal-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Weather Forecasts</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked readOnly />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-teal-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="font-medium text-white mb-3">Location Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-300">Share My Location</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked readOnly />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-teal-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-300 block mb-1">Default Location</label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                        <option>Bhubaneswar</option>
                        <option>Cuttack</option>
                        <option>Puri</option>
                        <option>Balasore</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-300 block mb-1">Alert Radius</label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                        <option>5 km</option>
                        <option>10 km</option>
                        <option>25 km</option>
                        <option>50 km</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h3 className="font-medium text-white mb-3">Account Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-300 block mb-1">Email</label>
                      <input type="email" value={currentUser?.email || ''} readOnly className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-300 block mb-1">Phone Number</label>
                      <input type="tel" placeholder="+91 XXXXXXXXXX" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    
                    <div className="pt-2">
                      <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          
          <div className="space-y-3">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium flex items-center justify-center">
              <BsExclamationTriangle className="mr-2" /> SOS Emergency
            </button>
            
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium flex items-center justify-center">
              <BsFileEarmarkText className="mr-2" /> Report Incident
            </button>
            
            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg font-medium flex items-center justify-center">
              <BsGeoAlt className="mr-2" /> Find Safe Zone
            </button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Notifications</h3>
            <div className="space-y-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-red-500 p-1 rounded-lg mr-2">
                    <BsExclamationTriangle className="text-white text-xs" />
                  </div>
                  <div>
                    <p className="text-xs text-white">New flood warning issued for your area</p>
                    <span className="text-xs text-gray-400">10m ago</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-blue-500 p-1 rounded-lg mr-2">
                    <BsBell className="text-white text-xs" />
                  </div>
                  <div>
                    <p className="text-xs text-white">Your incident report has been reviewed</p>
                    <span className="text-xs text-gray-400">2h ago</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-green-500 p-1 rounded-lg mr-2">
                    <BsGeoAlt className="text-white text-xs" />
                  </div>
                  <div>
                    <p className="text-xs text-white">New evacuation route added near you</p>
                    <span className="text-xs text-gray-400">1d ago</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full text-center text-xs text-teal-400 hover:underline mt-3">
              View All Notifications
            </button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Emergency Contacts</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">National Disaster Response</span>
                <span className="text-sm font-semibold text-red-400">1078</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">Police Emergency</span>
                <span className="text-sm font-semibold text-red-400">100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">Medical Emergency</span>
                <span className="text-sm font-semibold text-red-400">108</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">Fire Emergency</span>
                <span className="text-sm font-semibold text-red-400">101</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-6 text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            Emergency Helpline: <span className="text-red-400 font-semibold">112</span> | 
            Disaster Relief: <span className="text-red-400 font-semibold">108</span>
          </div>
          <div className="mt-2 md:mt-0">
            © {new Date().getFullYear()} ResQ.AI | <a href="#" className="text-teal-400 hover:underline">Terms</a> | <a href="#" className="text-teal-400 hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
