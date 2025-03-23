import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const { refreshAdminStatus } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      console.log("Attempting to sign in with email:", values.email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error("Login error:", error);
        toast.error(error.message);
        return;
      }

      if (data?.user) {
        console.log("Sign in successful for user ID:", data.user.id);
        toast.success("Login successful!");
        
        // Wait for auth state to update and check admin status
        setTimeout(async () => {
          const isAdmin = await refreshAdminStatus();
          console.log("Admin status after login:", isAdmin);
          
          if (isAdmin) {
            console.log("User is admin, redirecting to admin dashboard");
            navigate("/admin/dashboard");
          } else {
            console.log("User is not admin, redirecting to baker dashboard");
            navigate("/baker/dashboard");
          }
        }, 500); // Short delay to allow session to be established
      }
    } catch (error) {
      console.error("Login process error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    setIsDemoLoading(true);
    
    try {
      console.log("Starting demo admin login process");
      
      // First try to login
      let loginResponse = await supabase.auth.signInWithPassword({
        email: "admin@example.com",
        password: "admin123",
      });
      
      // If login fails due to user not existing, create the user
      if (loginResponse.error && loginResponse.error.message.includes("Invalid login credentials")) {
        console.log("Demo account doesn't exist, creating it");
        
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: "admin@example.com",
          password: "admin123",
          options: {
            data: {
              name: "Demo Admin"
            }
          }
        });
        
        if (signUpError) {
          console.error("Failed to create demo admin account:", signUpError);
          toast.error("Failed to create demo admin account");
          return;
        }
        
        if (signUpData?.user) {
          console.log("Demo admin account created with ID:", signUpData.user.id);
          
          // Create or update baker_profiles entry to ensure admin role
          const { error: profileError } = await supabase
            .from('baker_profiles')
            .upsert({
              id: signUpData.user.id,
              name: "Demo Admin",
              email: "admin@example.com",
              role: 'admin'
            });
            
          if (profileError) {
            console.error("Failed to create admin profile:", profileError);
          }
          
          // Wait a moment for the account to be fully created
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Try to login again with the newly created account
          loginResponse = await supabase.auth.signInWithPassword({
            email: "admin@example.com",
            password: "admin123",
          });
          
          if (loginResponse.error) {
            console.error("Demo admin login error after creation:", loginResponse.error);
            toast.error("Failed to login with newly created demo account");
            return;
          }
        }
      } else if (loginResponse.error) {
        console.error("Demo admin login error:", loginResponse.error);
        toast.error(`Failed to login as demo admin: ${loginResponse.error.message}`);
        return;
      }
      
      if (loginResponse.data?.user) {
        console.log("Demo admin login successful");
        
        // Force set admin role in database
        console.log("Updating role to admin for user:", loginResponse.data.user.id);
        const { error: updateError } = await supabase
          .from('baker_profiles')
          .upsert({ 
            id: loginResponse.data.user.id,
            name: "Demo Admin",
            email: "admin@example.com",
            role: 'admin'
          });
          
        if (updateError) {
          console.error("Failed to update admin role:", updateError);
          toast.error("Failed to set admin role, but login was successful");
        } else {
          console.log("Successfully updated role to admin");
        }
        
        toast.success("Logged in as demo admin!");
        
        // Add a delay to allow session to fully establish
        setTimeout(async () => {
          // Refresh admin status
          const isAdmin = await refreshAdminStatus();
          console.log("Admin status check result:", isAdmin);
          
          // Navigate based on admin status
          if (isAdmin) {
            navigate("/admin/dashboard");
          } else {
            // If admin status isn't set yet, go to debug page
            toast.info("Admin status not detected. Going to debug page.");
            navigate("/admin/debug");
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Demo admin login process error:", error);
      toast.error("Demo admin login failed");
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Log In</h1>
          <p className="text-gray-600 mt-2">
            Access your baker account or admin panel
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-800 mb-3">Quick Access</h3>
            <Button 
              onClick={handleDemoAdminLogin} 
              className="w-full bg-amber-600 hover:bg-amber-700"
              disabled={isDemoLoading}
            >
              {isDemoLoading ? "Logging in..." : "Login as Demo Admin"}
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              This will create/login as admin@example.com with password admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
