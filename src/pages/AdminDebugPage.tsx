
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const AdminDebugPage = () => {
  const { user, isAdmin, refreshAdminStatus } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (user) {
      checkUserRole();
    }
  }, [user]);
  
  const checkUserRole = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('baker_profiles')
        .select('role')
        .eq('id', user?.id)
        .single();
      
      if (error) {
        console.error('Error fetching role:', error);
        setUserRole('Error fetching role');
      } else {
        console.log('Role data from database:', data);
        setUserRole(data?.role || 'No role found');
      }
    } catch (err) {
      console.error('Exception while fetching role:', err);
      setUserRole('Exception occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRefresh = async () => {
    const result = await refreshAdminStatus();
    toast.success(`Admin status refreshed: ${result ? 'You are an admin' : 'You are not an admin'}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Admin Status Debug</CardTitle>
          <CardDescription>Check your current admin status and role information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">User Information</h3>
            <p><strong>User ID:</strong> {user?.id || 'Not logged in'}</p>
            <p><strong>Email:</strong> {user?.email || 'Not available'}</p>
            <p><strong>Is Admin (context):</strong> {isAdmin ? 'Yes' : 'No'}</p>
            <p><strong>Role (from database):</strong> {loading ? 'Loading...' : userRole}</p>
          </div>
          
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={handleRefresh}>Refresh Admin Status</Button>
            <Button variant="outline" onClick={checkUserRole}>Re-check Role</Button>
            <Button variant="secondary" asChild>
              <Link to="/admin/dashboard">Go to Admin Dashboard</Link>
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t text-sm text-gray-600">
            <p className="font-medium">Troubleshooting:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Make sure your user's role is set to "admin" in the baker_profiles table</li>
              <li>Try logging out and logging back in after changing the role</li>
              <li>Click "Refresh Admin Status" to update your permissions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDebugPage;
