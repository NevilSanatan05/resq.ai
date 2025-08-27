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

import Dashboard from "./pages/Dashboard";

import { AuthProvider } from "./context/AuthContext";
import { SOSProvider } from "./context/SOSContext";

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
                <Route path="/rescue" element={
                  <ProtectedRoute allowedRoles={["rescue"]}>
                    <Rescue />
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

                //dashboard
                <Route path="/dashboard" element={
                  <ProtectedRoute >
                    <Dashboard />
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
