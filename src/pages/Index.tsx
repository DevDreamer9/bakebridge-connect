
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { CakeCategories } from "@/components/CakeCategories";
import { FeaturedBakers } from "@/components/FeaturedBakers";
import { NewBakers } from "@/components/NewBakers";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { bakers as allBakers } from "@/data/bakers";
import { BakerProfile } from "@/types/baker";

const Index = () => {
  const [filteredBakers, setFilteredBakers] = useState<BakerProfile[]>(allBakers);

  const handleFilterChange = (newFilteredBakers: BakerProfile[]) => {
    setFilteredBakers(newFilteredBakers);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      <div className="pt-24">
        <Hero onFilterChange={handleFilterChange} />
        <CakeCategories />
        <FeaturedBakers customBakers={filteredBakers} />
        <NewBakers />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
