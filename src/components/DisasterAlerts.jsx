import React, { useState, useEffect } from "react"; // <-- add this
export default function DisasterAlerts({ userCoordinates }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Haversine formula
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (!userCoordinates.lat || !userCoordinates.lon) return;

    const fetchDisasters = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/disasters/all");
        if (!res.ok) throw new Error("Failed to fetch disaster data");

        const data = await res.json();
        const nearby = (data.events || []).filter((event) => {
          const coords = event.geometry?.[0]?.coordinates; // [lon, lat]
          if (!coords) return false;
          const distance = getDistanceFromLatLonInKm(
            userCoordinates.lat,
            userCoordinates.lon,
            coords[1],
            coords[0]
          );
          return distance <= 200; // 200 km radius
        });

        setEvents(nearby);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
  }, [userCoordinates]);

  return (
    <div className="p-4 bg-gray-900 rounded-xl text-white mt-6">
      <h2 className="text-2xl font-bold mb-4">🚨 Disaster Alerts Near You</h2>

      {loading && <p className="text-gray-400">Fetching disaster alerts...</p>}
      {error && <p className="text-red-400">⚠ {error}</p>}
      {!loading && events.length === 0 && (
        <p className="text-gray-400">✅ No major disasters near your location.</p>
      )}

      <ul className="space-y-3">
        {events.map((event) => (
          <li
            key={event.id}
            className="p-4 bg-gray-800 rounded-lg border border-gray-700"
          >
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-300">
              {event.categories?.[0]?.title || "General Event"}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(event.geometry?.[0]?.date).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              🌍 {event.geometry?.[0]?.coordinates?.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}