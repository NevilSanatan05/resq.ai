import { useState, useEffect } from "react";
import { MapPin, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import axios from "axios";

import ReportModal from "../components/ReportModal";
import RequestJoinTeam from "../components/RequestJoinTeam";

const API_URL = "https://resq-ai-server-2tme.onrender.com";

export default function DisasterDashboard() {
  const [activeTab, setActiveTab] = useState("alerts");
  const [weather, setWeather] = useState(null);
  const [riskLevel, setRiskLevel] = useState("Low");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);

  const [adminAlert, setAdminAlert] = useState(null);

  // Multilingual states
  const [language, setLanguage] = useState("en");
  const [translatedWeather, setTranslatedWeather] = useState("");
  const [translatedAdminAlert, setTranslatedAdminAlert] = useState("");

  const { currentUser } = useAuth();
  const { showToast } = useToast();

  /** Helper: translate text via API */
  const translateText = async (text, setFn) => {
    try {
      if (language === "en") {
        setFn(text);
        return;
      }
      const res = await axios.post(`${API_URL}/api/translate`, {
        text,
        targetLang: language,
      });
      setFn(res.data.translated || text);
    } catch (err) {
      console.error("Translation error:", err);
      setFn(text); // fallback
    }
  };

  /** Fetch weather from server */
  const fetchWeatherFromServer = async (lat, lon) => {
    if (lat == null || lon == null) return;
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/api/weather?lat=${lat}&lon=${lon}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch weather");
      }

      setWeather(data);
      setRiskLevel(data.risk || "Low");

      // Translate immediately
      translateText(
        `${data.main}: ${data.description}, ${data.temperature}°C`,
        setTranslatedWeather
      );
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err.message);
      setWeather(null);
      setRiskLevel("Low");
    } finally {
      setLoading(false);
    }
  };

  /** Fetch admin alerts */
  const fetchAdminAlerts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/alerts`);
      if (res.data?.latest) {
        setAdminAlert(res.data.latest);
        translateText(res.data.latest.message, setTranslatedAdminAlert);
        showToast("🚨 New Admin Alert!", "info");
      }
    } catch (err) {
      console.error("Admin alert fetch error:", err);
    }
  };

  /** Submit report */
  const handleReportSubmit = async (reportData) => {
    try {
      await axios.post(`${API_URL}/api/reports`, reportData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      showToast("Report submitted successfully", "success");
      setIsReportModalOpen(false);
    } catch (e) {
      console.error(e);
      showToast(e.response?.data?.message || "Failed to submit report", "error");
    }
  };

  /** Get user location on mount */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoordinates({ lat: latitude, lon: longitude });
          fetchWeatherFromServer(latitude, longitude);
        },
        () => {
          const fallback = { lat: 20.2961, lon: 85.8245 }; // Bhubaneswar fallback
          setCoordinates(fallback);
          fetchWeatherFromServer(fallback.lat, fallback.lon);
        }
      );
    } else {
      const fallback = { lat: 20.2961, lon: 85.8245 };
      setCoordinates(fallback);
      fetchWeatherFromServer(fallback.lat, fallback.lon);
    }
  }, []);

  /** Poll admin alerts every 10s */
  useEffect(() => {
    fetchAdminAlerts();
    const interval = setInterval(fetchAdminAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  /** Re-translate existing texts on language change */
  useEffect(() => {
    if (weather) {
      translateText(
        `${weather.main}: ${weather.description}, ${weather.temperature}°C`,
        setTranslatedWeather
      );
    }
    if (adminAlert) {
      translateText(adminAlert.message, setTranslatedAdminAlert);
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Disaster Dashboard</h1>
        </div>

        {/* Coordinates */}
        {coordinates.lat && coordinates.lon && (
          <p className="text-gray-300 mb-4">
            🌍 Lat {coordinates.lat.toFixed(4)}, Lon {coordinates.lon.toFixed(4)}
          </p>
        )}

        {/* Language selector */}
        <div className="mb-4">
          <label className="text-gray-300 mr-2">🌐 Language:</label>
          <select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  className="bg-gray-800 text-white p-2 rounded"
>
  <option value="en">English</option>
  <option value="hi">Hindi</option>
  <option value="bn">Bengali</option>
  <option value="te">Telugu</option>
  <option value="mr">Marathi</option>
  <option value="ta">Tamil</option>
  <option value="ur">Urdu</option>
  <option value="gu">Gujarati</option>
  <option value="kn">Kannada</option>
  <option value="ml">Malayalam</option>
  <option value="or">Odia</option>
  <option value="pa">Punjabi</option>
  <option value="as">Assamese</option>
  <option value="fr">French</option> {/* optional */}
</select>
        </div>

        {/* Alerts */}
        {activeTab === "alerts" && (
          <div className="space-y-4">
            {loading && <p className="text-gray-400">Fetching live weather...</p>}
            {error && <p className="text-red-400">⚠ Error: {error}</p>}

            {!loading && weather && (
              <div className="bg-gray-800 p-4 rounded-xl">
                <h3 className="text-sm text-gray-400 mb-2">Live Weather Alert</h3>
                <div className="flex items-center justify-between">
                  <p className="text-white">🌡 {translatedWeather}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
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

            {/* Admin Alerts */}
            {adminAlert && (
              <div className="bg-red-900 p-4 rounded-xl flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-300" />
                <p className="text-yellow-100 font-medium">
                  🚨 {translatedAdminAlert || adminAlert.message}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        {isReportModalOpen && (
          <ReportModal onClose={() => setIsReportModalOpen(false)} onSubmit={handleReportSubmit} />
        )}
        {isJoinTeamModalOpen && <RequestJoinTeam onClose={() => setIsJoinTeamModalOpen(false)} />}
      </div>
    </div>
  );
}
