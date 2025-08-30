import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "@chakra-ui/react";

// List of allowed rescue team emails
const RESCUE_TEAM_EMAILS = [
  "rescue1@example.com",
  "rescue2@example.com",
  "rescue@resqai.com"
];

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  // Check if user has required role
  if (allowedRoles) {
    // Special case for admin - check by email
    if (currentUser.email === 'admin@123gmail.com' && window.location.pathname.includes('admin-dashboard')) {
      return children;
    }
    
    // Special case for rescue team - check by email
    const isRescueTeam = RESCUE_TEAM_EMAILS.includes(currentUser.email?.toLowerCase());
    
    if (allowedRoles.includes('rescue') && isRescueTeam) {
      return children;
    }
    
    // If user doesn't have required role, redirect to unauthorized
    if (allowedRoles.length > 0) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
