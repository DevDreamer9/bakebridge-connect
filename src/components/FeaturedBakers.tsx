
import { useEffect, useState } from "react";
import { BakerCard } from "./BakerCard";
import { bakers as defaultBakers } from "@/data/bakers";
import { BakerProfile } from "@/types/baker";

export const FeaturedBakers = () => {
  const [bakers, setBakers] = useState<BakerProfile[]>(defaultBakers);
  
  useEffect(() => {
    // Load approved bakers from local storage
    const approvedBakersJSON = localStorage.getItem("approvedBakers");
    if (approvedBakersJSON) {
      const approvedBakers = JSON.parse(approvedBakersJSON);
      
      // Create a map of existing baker IDs to avoid duplicates
      const bakerMap = new Map();
      defaultBakers.forEach(baker => bakerMap.set(baker.id, baker));
      
      // Add approved bakers, potentially overriding defaults with same ID
      approvedBakers.forEach(baker => bakerMap.set(baker.id, baker));
      
      // Convert map back to array
      setBakers(Array.from(bakerMap.values()));
    }
  }, []);
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Bakers</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {bakers.map((baker) => (
            <BakerCard key={baker.id} baker={baker} />
          ))}
        </div>
      </div>
    </section>
  );
};
