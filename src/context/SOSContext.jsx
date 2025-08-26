import { createContext, useState, useEffect } from "react";

export const SOSContext = createContext();

export function SOSProvider({ children }) {
  // Load saved data from localStorage on init
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("sos_requests");
    return saved ? JSON.parse(saved) : [];
  });

  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem("sos_missions");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever requests or missions change
  useEffect(() => {
    localStorage.setItem("sos_requests", JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem("sos_missions", JSON.stringify(missions));
  }, [missions]);

  // Citizen sends SOS
  const sendSOS = (sosData) => {
    setRequests((prev) => [...prev, sosData]);
  };

  // Rescue accepts SOS
  const acceptMission = (sosId, team) => {
    const sos = requests.find((r) => r.id === sosId);
    if (!sos) return;
    setRequests((prev) => prev.filter((r) => r.id !== sosId));
    setMissions((prev) => [...prev, { ...sos, acceptedBy: team, status: "Accepted" }]);
  };

  // Admin/Rescue updates mission status
  const updateMissionStatus = (missionId, newStatus) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId ? { ...m, status: newStatus } : m
      )
    );
  };

  return (
    <SOSContext.Provider
      value={{ requests, missions, sendSOS, acceptMission, updateMissionStatus }}
    >
      {children}
    </SOSContext.Provider>
  );
}
