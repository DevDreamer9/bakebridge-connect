
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const AddListingButton = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const storedAuth = localStorage.getItem("bakerAuth");
    setIsLoggedIn(!!storedAuth);
  }, []);
  
  const handleClick = () => {
    if (isLoggedIn) {
      // If logged in, navigate to dashboard
      navigate("/baker/dashboard");
    } else {
      // If not logged in, navigate to signup
      toast.info("Please sign up to add your baker listing");
      navigate("/signup");
    }
  };
  
  return (
    <Button 
      onClick={handleClick}
      className="flex items-center gap-2"
    >
      <Plus className="h-4 w-4" />
      Add Listing
    </Button>
  );
};
