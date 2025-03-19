import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, isAdmin, isLoading, refreshAdminStatus } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Refresh admin status when accessing protected routes
    if (user && !isLoading) {
      refreshAdminStatus();
    }
  }, [user, isLoading, refreshAdminStatus, location.pathname]);

  // If authentication is still loading, show loading indicator
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    toast.error("You must be logged in to access this page");
    return <Navigate to="/login" />;
  }

  // If route requires admin privileges and user is not admin, redirect
  if (requireAdmin && !isAdmin) {
    console.log("Access denied: Admin privileges required");
    toast.error("You don't have permission to access this page");
    return <Navigate to="/" />;
  }

  console.log("Protected route rendering, isAdmin:", isAdmin, "requireAdmin:", requireAdmin);
  
  // Otherwise, show the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
