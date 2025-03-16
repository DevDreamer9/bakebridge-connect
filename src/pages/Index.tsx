
import { Hero } from "@/components/Hero";
import { FeaturedBakers } from "@/components/FeaturedBakers";
import { CakeCategories } from "@/components/CakeCategories";
import { AddListingButton } from "@/components/AddListingButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <AddListingButton />
        </div>
      </div>
      <CakeCategories />
      <FeaturedBakers />
    </div>
  );
};

export default Index;
