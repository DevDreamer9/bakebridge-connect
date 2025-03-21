
import { useState, useEffect } from "react";
import { BakerCard } from "./BakerCard";
import { bakers as defaultBakers } from "@/data/bakers";
import { BakerProfile } from "@/types/baker";

export const NewBakers = () => {
  const [newBakers, setNewBakers] = useState<BakerProfile[]>([]);
  
  useEffect(() => {
    // This is a simple example just showing the most recent bakers
    // In a real application, you might want to fetch this data from the server
    
    // Get a subset of bakers and mark them as "new"
    const recentBakers = defaultBakers
      .slice(0, 2) // Just take the first two bakers for demo
      .map(baker => ({
        ...baker,
        id: `new-${baker.id}`, // Ensure unique IDs
        name: `${baker.name} (New)`, // Mark as new in name
      }));
    
    // Also check local storage for any newly created bakers
    const approvedBakersJSON = localStorage.getItem("approvedBakers");
    if (approvedBakersJSON) {
      try {
        const approvedBakers = JSON.parse(approvedBakersJSON);
        // Get the 3 most recently added bakers
        const recentApproved = approvedBakers
          .slice(-3)
          .filter(baker => baker && baker.id); // Ensure valid baker objects
        
        setNewBakers([...recentApproved, ...recentBakers].slice(0, 3));
      } catch (e) {
        console.error("Error parsing approved bakers:", e);
        setNewBakers(recentBakers);
      }
    } else {
      setNewBakers(recentBakers);
    }
  }, []);
  
  if (newBakers.length === 0) {
    return null; // Don't show section if no new bakers
  }
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">New Bakers</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {newBakers.map((baker) => (
            <BakerCard key={baker.id} baker={baker} />
          ))}
        </div>
      </div>
    </section>
  );
};
