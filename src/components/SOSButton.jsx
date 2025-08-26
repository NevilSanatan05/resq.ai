import { useState, useContext } from "react";
import { SOSContext } from "../context/SOSContext";

function SOSButton() {
  const { sendSOS } = useContext(SOSContext);   // use global SOS context
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSOS = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!navigator.geolocation) {
      alert("❌ Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sosData = {
          id: Date.now(),
          name,
          contact,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          time: new Date().toLocaleString(),
        };

        sendSOS(sosData);   // 🔔 send to global state (Rescue + Admin will see)

        alert(
          `🚨 SOS Sent!\n\nName: ${sosData.name}\nContact: ${sosData.contact}\nLat: ${sosData.latitude}\nLong: ${sosData.longitude}`
        );

        setName("");
        setContact("");
        setLoading(false);
      },
      () => {
        alert("❌ Could not get location. Please allow location access.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <form
        onSubmit={handleSOS}
        className="bg-gray-800 p-4 rounded-xl shadow-lg space-y-3 w-72"
      >
        <h2 className="text-xl font-bold text-red-400 text-center">🚨 Quick SOS</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-gray-900 text-gray-200 border border-gray-600 p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="bg-gray-900 text-gray-200 border border-gray-600 p-2 w-full rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg w-full font-semibold"
        >
          {loading ? "⏳ Sending..." : "🚨 Send SOS"}
        </button>
      </form>
    </div>
  );
}

export default SOSButton;
