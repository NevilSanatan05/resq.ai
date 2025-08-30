import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Citizen from "./pages/Citizen";
import Rescue from "./pages/Rescue";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import SOSButton from "./components/SOSButton";
import Login from "./pages/Login";
import Register from "./pages/Signup"; // Import the Register componen
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

import Dashboard from "./pages/Dashboard";

import { AuthProvider } from "./context/AuthContext";
import { SOSProvider } from "./context/SOSContext";
import RescueDashboard from "./pages/RescueDashboard";

function App() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      <Router>
        <AuthProvider>
          <SOSProvider>
            <Navbar />
            <div className="flex-grow p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/citizen" element={<Citizen />} />
                {/* Rescue Dashboard Route */}
                <Route path="/rescue" element={
                  <ProtectedRoute >
                    <RescueDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Admin />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />

                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                <Route path="/admin-dashboard" element={
                  <ProtectedRoute >
                    <AdminDashboard />
                  </ProtectedRoute>
                } />

                


              </Routes>
            </div>
            <SOSButton />
            <Footer />
          </SOSProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
