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
    // Only refresh admin status when accessing routes that require it
    const checkAdminStatus = async () => {
      if (user && !isLoading && requireAdmin) {
        console.log("Checking admin status for protected route");
        const adminStatus = await refreshAdminStatus();
        console.log("Admin status check result:", adminStatus);
      }
    };
    
    checkAdminStatus();
  }, [user, isLoading, refreshAdminStatus, requireAdmin]);

  // If authentication is still loading, show loading indicator
  if (isLoading) {
    console.log("Auth still loading...");
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    console.log("Not authenticated, redirecting to login");
    toast.error("You must be logged in to access this page");
    return <Navigate to="/login" />;
  }

  // If route requires admin privileges and user is not admin, redirect
  if (requireAdmin && !isAdmin) {
    console.log("Access denied: Admin privileges required. Current admin status:", isAdmin);
    toast.error("You don't have permission to access this page");
    return <Navigate to="/" />;
  }

  console.log("Protected route rendering, isAdmin:", isAdmin, "requireAdmin:", requireAdmin);
  
  // Otherwise, show the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
