// src/components/Alerts.jsx
import React from "react";
import DisasterAlerts from "./DisasterAlerts";

export default function Alerts({ weather, riskLevel, loading, error, coordinates }) {
  return (
    <div className="space-y-6">
      {/* Existing Weather Alert */}
      <div className="space-y-4">
        {loading && <p className="text-gray-400">Fetching live weather data...</p>}
        {error && <p className="text-red-400">⚠ Error: {error}</p>}
        {!loading && weather && (
          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Live Weather Alert
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-white">
                🌡 {weather.main}: {weather.description}, {weather.temperature}°C
              </p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  riskLevel === "High"
                    ? "bg-red-600 text-white"
                    : riskLevel === "Medium"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-600 text-white"
                }`}
              >
                {riskLevel} Risk
              </span>
            </div>
          </div>
        )}
      </div>

      {/* NASA Disaster Alerts */}
      {coordinates.lat != null && coordinates.lon != null && (
        <DisasterAlerts userCoordinates={coordinates} />
      )}
    </div>
  );
}