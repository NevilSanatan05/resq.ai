import { useState } from "react";

export default function DisasterDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "resources", label: "Resources" },
    { id: "map", label: "Live Map" },
    { id: "alerts", label: "Alerts" },
    { id: "community", label: "Community" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Disaster Management Dashboard</h1>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">Report Incident</button>
      </header>

      {/* Tabs */}
      <nav className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              selectedTab === tab.id
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          {selectedTab === "overview" && (
            <>
              <h2 className="text-lg font-semibold mb-2">Disaster Forecast</h2>
              <p className="text-gray-400">Upcoming cyclone in Odisha - high risk zone. Relief teams are being mobilized.</p>
            </>
          )}

          {selectedTab === "resources" && (
            <>
              <h2 className="text-lg font-semibold mb-2">Resource Distribution</h2>
              <p className="text-gray-400">Food packs: 1,200 | Medical kits: 500 | Shelters: 35</p>
            </>
          )}

          {selectedTab === "map" && (
            <>
              <h2 className="text-lg font-semibold mb-2">Live Map</h2>
              <div className="bg-gray-800 h-56 rounded-xl flex items-center justify-center text-gray-500">
                [Map Placeholder]
              </div>
            </>
          )}

          {selectedTab === "alerts" && (
            <>
              <h2 className="text-lg font-semibold mb-2">Latest Alerts</h2>
              <ul className="text-gray-400 list-disc list-inside space-y-2">
                <li>Flood warning in Bihar - 24 hours notice</li>
                <li>Heatwave advisory in Maharashtra</li>
                <li>Landslide risk in Himachal Pradesh</li>
              </ul>
            </>
          )}

          {selectedTab === "community" && (
            <>
              <h2 className="text-lg font-semibold mb-2">Community Reports</h2>
              <p className="text-gray-400">Reports about blocked roads, missing persons, and urgent requests for medical supplies.</p>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-6 text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
        Emergency Helpline: <span className="text-red-400 font-semibold">112</span> | Disaster Relief: <span className="text-red-400 font-semibold">108</span>
      </footer>
    </div>
  );
}
