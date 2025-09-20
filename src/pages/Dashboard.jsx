import { useState, useEffect } from "react";
import { MapPin, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import axios from "axios";

import Alerts from "../components/Alerts";
import ReportModal from "../components/ReportModal";
import RequestJoinTeam from "../components/RequestJoinTeam";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function DisasterDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Weather
  const [weather, setWeather] = useState(null);
  const [riskLevel, setRiskLevel] = useState("Low");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);

  // Admin alerts
  const [adminAlert, setAdminAlert] = useState(null);

  // Multilingual
  const [language, setLanguage] = useState("en");
  const [translatedWeather, setTranslatedWeather] = useState("");
  const [translatedAdminAlert, setTranslatedAdminAlert] = useState("");

  const { currentUser } = useAuth();
  const { showToast } = useToast();

  /** Translate helper */
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
      setFn(text);
    }
  };

  /** Fetch weather */
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

      translateText(
        `${data.main}: ${data.description}, ${data.temperature}°C`,
        setTranslatedWeather
      );
    } catch (err) {
      console.error("Weather fetch error:", err);
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
        showToast("New Admin Alert!", "info");
      }
    } catch (err) {
      console.error("Admin alert fetch error:", err);
    }
  };

  /** Submit user report */
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

  /** Get location on mount */
  useEffect(() => {
    const fallback = { lat: 20.2961, lon: 85.8245 }; // Bhubaneswar fallback
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoordinates({ lat: latitude, lon: longitude });
          fetchWeatherFromServer(latitude, longitude);
        },
        () => {
          setCoordinates(fallback);
          fetchWeatherFromServer(fallback.lat, fallback.lon);
        }
      );
    } else {
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

  /** Re-translate when language changes */
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

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded ${
              activeTab === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`px-4 py-2 rounded ${
              activeTab === "alerts"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Alerts
          </button>
        </div>

        {/* Coordinates */}
        {coordinates.lat && coordinates.lon && (
          <p className="text-gray-300 mb-4">
            🌍 Lat {coordinates.lat.toFixed(4)}, Lon {coordinates.lon.toFixed(4)}
          </p>
        )}

        {/* Language Selector */}
        <div className="mb-4">
          <label className="text-gray-300 mr-2">🌐 Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded"
          >
           <option value="en">English</option>
<option value="hi">हिन्दी</option>
<option value="bn">বাংলা</option>
<option value="te">తెలుగు</option>
<option value="mr">मराठी</option>
<option value="ta">தமிழ்</option>
<option value="ur">اردو</option>
<option value="gu">ગુજરાતી</option>
<option value="kn">ಕನ್ನಡ</option>
<option value="ml">മലയാളം</option>
<option value="or">ଓଡ଼ିଆ</option>
<option value="pa">ਪੰਜਾਬੀ</option>
<option value="as">অসমীয়া</option>
<option value="fr">Français</option>
          </select>
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <>
            {loading && <p className="text-gray-400">Fetching live weather...</p>}
            {error && <p className="text-red-400">⚠ Error: {error}</p>}

            {!loading && weather && (
              <div className="bg-gray-800 p-4 rounded-xl mb-4">
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
          </>
        )}

        {activeTab === "alerts" && (
          <div className="space-y-4">
            <Alerts coordinates={coordinates} />
            {adminAlert && (
              <div className="bg-red-900 p-4 rounded-xl flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-300" />
                <p className="text-yellow-100 font-medium">
                  {translatedAdminAlert || adminAlert.message}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        {isReportModalOpen && (
          <ReportModal
            onClose={() => setIsReportModalOpen(false)}
            onSubmit={handleReportSubmit}
          />
        )}
        {isJoinTeamModalOpen && (
          <RequestJoinTeam onClose={() => setIsJoinTeamModalOpen(false)} />
        )}
      </div>
    </div>
  );
}
