import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SOSProvider } from './context/SOSContext';
import { ToastProvider } from './context/ToastContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SOSButton from './components/SOSButton';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Citizen from './pages/Citizen';
import RescueDashboard from './pages/RescueDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ToastTest from './components/ToastTest';

// A wrapper to handle authentication redirects
const AuthWrapper = ({ children }) => {
  const { currentUser } = useAuth();
  
  // If user is logged in, redirect to appropriate dashboard
  if (currentUser) {
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (currentUser.role === 'rescue') {
      return <Navigate to="/rescue-dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      <ToastProvider>
        <Router>
          <AuthProvider>
            <SOSProvider>
              <Navbar />
              <div className="flex-grow p-4 md:p-6">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/citizen" element={<Citizen />} />
                <Route path="/test-toast" element={<ToastTest />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={
                  <AuthWrapper>
                    <Login />
                  </AuthWrapper>
                } />
                <Route path="/register" element={
                  <AuthWrapper>
                    <Register />
                  </AuthWrapper>
                } />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                <Route path="/admin-dashboard/*" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />

                <Route path="/rescue-dashboard/*" element={
                  <ProtectedRoute allowedRoles={['rescue']}>
                    <RescueDashboard />
                  </ProtectedRoute>
                }/>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </div>
              <Footer />
              <SOSButton />
            </SOSProvider>
          </AuthProvider>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
