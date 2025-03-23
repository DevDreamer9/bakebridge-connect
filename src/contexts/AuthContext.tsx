
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  isLoading: boolean;
  refreshAdminStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Function to check if the user is an admin
  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('baker_profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        return false;
      }
      
      return data?.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  // Function to refresh admin status - can be called when needed
  const refreshAdminStatus = async (): Promise<boolean> => {
    if (user) {
      const isUserAdmin = await checkAdminStatus(user.id);
      setIsAdmin(isUserAdmin);
      return isUserAdmin;
    }
    return false;
  };

  useEffect(() => {
    let mounted = true;
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state change event:', event, newSession?.user?.email);
        
        if (mounted) {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          // Check if user is admin
          if (newSession?.user) {
            const isUserAdmin = await checkAdminStatus(newSession.user.id);
            console.log('Updated admin status on auth change:', isUserAdmin);
            setIsAdmin(isUserAdmin);
          } else {
            setIsAdmin(false);
          }
          
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: existingSession } }) => {
      console.log('Initial session check:', existingSession?.user?.email);
      
      if (mounted) {
        setSession(existingSession);
        setUser(existingSession?.user ?? null);
        
        // Check if user is admin
        if (existingSession?.user) {
          const isUserAdmin = await checkAdminStatus(existingSession.user.id);
          console.log('Initial admin status:', isUserAdmin);
          setIsAdmin(isUserAdmin);
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      navigate('/login');
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const value = {
    session,
    user,
    isAdmin,
    signOut,
    isLoading,
    refreshAdminStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
