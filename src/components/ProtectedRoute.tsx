
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, isAdmin, isLoading } = useAuth();

  // If authentication is still loading, show loading indicator
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If route requires admin privileges and user is not admin, redirect
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  // Otherwise, show the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
