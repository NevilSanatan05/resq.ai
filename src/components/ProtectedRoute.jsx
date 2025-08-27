import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useAuth(); // custom hook use kar

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Agar role check karna hai to custom claim ya db me role store karna padega
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
