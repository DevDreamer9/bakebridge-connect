
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, CheckCircle, XCircle, LogOut } from "lucide-react";
import { toast } from "sonner";

interface PendingBaker {
  id: string;
  name: string;
  image: string;
  specialty: string;
  location: string;
  contact: {
    email: string;
    phone: string;
  };
  description: string;
  approved: boolean;
}

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [pendingBakers, setPendingBakers] = useState<PendingBaker[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if admin is logged in
    const storedAuth = localStorage.getItem("bakerAuth");
    if (!storedAuth) {
      toast.error("Please log in to access the admin dashboard");
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedAuth);
    if (user.role !== "admin") {
      toast.error("You don't have permission to access this page");
      navigate("/");
      return;
    }

    setUser(user);

    // Load pending bakers
    const storedPendingBakers = localStorage.getItem("pendingBakers");
    if (storedPendingBakers) {
      setPendingBakers(JSON.parse(storedPendingBakers));
    }
  }, [navigate]);

  const handleApproveBaker = (baker: PendingBaker) => {
    try {
      // Get existing approved bakers from data store
      const bakersFromStorage = localStorage.getItem("approvedBakers");
      const approvedBakers = bakersFromStorage ? JSON.parse(bakersFromStorage) : [];

      // Add the baker to approved bakers
      const approvedBaker = { ...baker, approved: true };
      
      // Check if this baker already exists in the approved list
      const existingIndex = approvedBakers.findIndex((b: any) => b.id === baker.id);
      if (existingIndex >= 0) {
        approvedBakers[existingIndex] = approvedBaker;
      } else {
        approvedBakers.push(approvedBaker);
      }
      
      localStorage.setItem("approvedBakers", JSON.stringify(approvedBakers));

      // Update baker's approval status in pending bakers list
      const updatedPendingBakers = pendingBakers.filter(b => b.id !== baker.id);
      setPendingBakers(updatedPendingBakers);
      localStorage.setItem("pendingBakers", JSON.stringify(updatedPendingBakers));

      // Update the user's approval status
      const bakerAuthKey = `bakerProfile-${baker.contact.email}`;
      const bakerProfile = localStorage.getItem(bakerAuthKey);
      if (bakerProfile) {
        const updatedProfile = { ...JSON.parse(bakerProfile), approved: true };
        localStorage.setItem(bakerAuthKey, JSON.stringify(updatedProfile));
      }

      toast.success(`${baker.name} has been approved`);
    } catch (error) {
      console.error("Error approving baker:", error);
      toast.error("Failed to approve baker");
    }
  };

  const handleRejectBaker = (baker: PendingBaker) => {
    try {
      // Remove baker from pending list
      const updatedPendingBakers = pendingBakers.filter(b => b.id !== baker.id);
      setPendingBakers(updatedPendingBakers);
      localStorage.setItem("pendingBakers", JSON.stringify(updatedPendingBakers));

      toast.success(`${baker.name} has been rejected`);
    } catch (error) {
      console.error("Error rejecting baker:", error);
      toast.error("Failed to reject baker");
    }
  };

  const handleViewBakerProfile = (baker: PendingBaker) => {
    // Navigate to baker's profile
    navigate(`/baker/${baker.id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("bakerAuth");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Manage baker applications</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
          
          {pendingBakers.length === 0 ? (
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No pending applications</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingBakers.map((baker) => (
                <Card key={baker.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{baker.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{baker.specialty}</p>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Location:</strong> {baker.location}
                      </div>
                      <div>
                        <strong>Email:</strong> {baker.contact.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {baker.contact.phone}
                      </div>
                      <div className="line-clamp-3">
                        <strong>Description:</strong> {baker.description}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewBakerProfile(baker)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleApproveBaker(baker)}
                        className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                      >
                        <CheckCircle className="h-4 w-4" /> Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRejectBaker(baker)}
                        className="flex items-center gap-1"
                      >
                        <XCircle className="h-4 w-4" /> Reject
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
