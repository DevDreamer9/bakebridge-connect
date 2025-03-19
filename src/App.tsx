
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import BakerProfilePage from "./pages/BakerProfilePage";
import BakerDashboardPage from "./pages/BakerDashboardPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminDebugPage from "./pages/AdminDebugPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/baker/:id" element={<BakerProfilePage />} />
            <Route 
              path="/baker/dashboard" 
              element={
                <ProtectedRoute>
                  <BakerDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/admin/debug" element={<AdminDebugPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
