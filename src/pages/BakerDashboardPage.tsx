
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { MenuItem } from "@/types/baker";
import { MenuItemForm } from "@/components/MenuItemForm";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  specialty: z.string().min(2, { message: "Specialty is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  pricingStarting: z.coerce.number().min(1, { message: "Starting price is required" }),
  pricingRange: z.string().optional(),
  phone: z.string().min(5, { message: "Phone number is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  instagramLink: z.string().optional(),
  facebookLink: z.string().optional(),
  twitterLink: z.string().optional(),
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }),
});

const BakerDashboardPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const storedAuth = localStorage.getItem("bakerAuth");
    if (!storedAuth) {
      toast.error("Please log in to access your dashboard");
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(storedAuth);
    setUser(user);
    
    // Check if profile already exists
    const storedProfile = localStorage.getItem(`bakerProfile-${user.email}`);
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      form.reset({
        name: profile.name,
        specialty: profile.specialty,
        location: profile.location,
        description: profile.description,
        pricingStarting: profile.pricing.starting,
        pricingRange: profile.pricing.range,
        phone: profile.contact.phone,
        email: profile.contact.email,
        instagramLink: profile.socialLinks.instagram || "",
        facebookLink: profile.socialLinks.facebook || "",
        twitterLink: profile.socialLinks.twitter || "",
        imageUrl: profile.image,
      });
      
      setMenuItems(profile.menu || []);
    }
  }, []);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      specialty: "",
      location: "",
      description: "",
      pricingStarting: 0,
      pricingRange: "",
      phone: "",
      email: "",
      instagramLink: "",
      facebookLink: "",
      twitterLink: "",
      imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Create baker profile from form values
      const bakerProfile = {
        id: crypto.randomUUID(),
        name: values.name,
        image: values.imageUrl,
        rating: 0,
        specialty: values.specialty,
        location: values.location,
        description: values.description,
        pricing: {
          starting: values.pricingStarting,
          range: values.pricingRange || `From $${values.pricingStarting}`,
        },
        contact: {
          phone: values.phone,
          email: values.email,
        },
        socialLinks: {
          instagram: values.instagramLink || undefined,
          facebook: values.facebookLink || undefined,
          twitter: values.twitterLink || undefined,
        },
        portfolio: [values.imageUrl],
        menu: menuItems,
        reviews: [],
        approved: user.approved || false,
      };
      
      // Store in local storage for demo
      localStorage.setItem(`bakerProfile-${user.email}`, JSON.stringify(bakerProfile));
      
      // Store in pending bakers if not approved
      if (!user.approved) {
        const pendingBakers = JSON.parse(localStorage.getItem("pendingBakers") || "[]");
        
        // Update if exists, add if not
        const existingIndex = pendingBakers.findIndex((b: any) => b.contact.email === values.email);
        if (existingIndex >= 0) {
          pendingBakers[existingIndex] = bakerProfile;
        } else {
          pendingBakers.push(bakerProfile);
        }
        
        localStorage.setItem("pendingBakers", JSON.stringify(pendingBakers));
      }
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddMenuItem = (item: MenuItem) => {
    setMenuItems([...menuItems, item]);
  };
  
  const handleRemoveMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };
  
  const handleLogout = () => {
    localStorage.removeItem("bakerAuth");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Baker Dashboard</h1>
            <p className="text-gray-600">
              {user?.approved 
                ? "Your profile is approved and visible to customers" 
                : "Your profile is pending admin approval"}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Your Profile</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bakery Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your bakery name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialty</FormLabel>
                      <FormControl>
                        <Input placeholder="Wedding Cakes, Custom Designs, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormDescription>URL to your bakery's main image</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pricingStarting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Starting Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pricingRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Range (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="$50-$500" {...field} />
                      </FormControl>
                      <FormDescription>Example: $50-$500</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@yourbakery.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="instagramLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://instagram.com/yourbakery" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="facebookLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://facebook.com/yourbakery" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="twitterLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/yourbakery" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell customers about your bakery..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Menu Items</h3>
                
                <MenuItemForm onAddItem={handleAddMenuItem} />
                
                {menuItems.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-medium mb-2">Your Menu</h4>
                    <div className="space-y-3">
                      {menuItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-start border p-3 rounded-md">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <h5 className="font-medium">{item.name}</h5>
                              <span className="text-sm text-green-600">${item.price}</span>
                            </div>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-500" 
                            onClick={() => handleRemoveMenuItem(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BakerDashboardPage;
