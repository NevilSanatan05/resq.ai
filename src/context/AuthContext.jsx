// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';

const API_URL = 'http://localhost:5000/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const hasPredictedRef = useRef(false);

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Register user
  const register = async (name, email, password, passwordConfirm) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
        passwordConfirm
      });
      
      // Show success toast
      showToast(response.data.message || 'Account created successfully! Please log in.', 'success');
      
      // Redirect to login page
      navigate('/login');
      
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, data } = response.data;
      setAuthToken(token);
      setCurrentUser(data.user);
      
      // Show success toast
      showToast(`Welcome back, ${data.user.name || 'User'}!`, 'success');

      // Trigger flood risk prediction after login (non-blocking)
      requestLocationAndPredict();
      
      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (data.user.role === 'rescue') {
        navigate('/rescue-dashboard');
      } else {
        navigate('/dashboard');
      }
      
      return data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    setAuthToken(null);
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
    navigate('/login');
  };

  // Check if user is logged in
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return false;
    }

    try {
      setAuthToken(token);
      const response = await axios.get(`${API_URL}/auth/me`);
      setCurrentUser(response.data.data.user);
      // Trigger prediction on initial auth check if not yet run
      requestLocationAndPredict();
      return true;
    } catch (err) {
      setAuthToken(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check auth state on initial load
  useEffect(() => {
    checkAuth();
  }, []);

  // Request geolocation and call flood risk API (runs once per session)
  const requestLocationAndPredict = () => {
    try {
      if (hasPredictedRef.current) return;
      if (!currentUser) return;
      if (!navigator.geolocation) {
        return; // silently skip on unsupported
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            await axios.post('/api/risk/flood', { lat, lon });
            // We rely on Navbar polling to display the persisted notification.
            // Also show a toast immediately for better UX by fetching risk result.
            // Make a second call to get response for toast (alternatively, use the same response if backend exposes CORS to API_URL)
            const res = await axios.post('/api/risk/flood', { lat, lon });
            const data = res?.data?.data || {};
            const level = data.riskLevel || 'info';
            const typeMap = { low: 'info', medium: 'warning', high: 'error' };
            const toastType = typeMap[level] || 'info';
            const msg = data.message || 'Flood risk updated for your location';
            showToast(msg, toastType);
            hasPredictedRef.current = true;
          } catch (e) {
            // Optional silent failure
          }
        },
        () => {
          // user denied location; skip silently to avoid annoyance
        }
      );
    } catch (e) {
      // ignore
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register: async (...args) => {
      try {
        return await register(...args);
      } catch (error) {
        showToast(error.response?.data?.message || 'Registration failed', 'error');
        throw error;
      }
    },
    login: async (...args) => {
      try {
        return await login(...args);
      } catch (error) {
        showToast(error.response?.data?.message || 'Login failed', 'error');
        throw error;
      }
    },
    logout: () => {
      showToast('Logged out successfully', 'info');
      logout();
    },
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
