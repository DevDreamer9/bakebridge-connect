
import { Hero } from "@/components/Hero";
import { FeaturedBakers } from "@/components/FeaturedBakers";
import { CakeCategories } from "@/components/CakeCategories";
import { AddListingButton } from "@/components/AddListingButton";
import { NewBakers } from "@/components/NewBakers";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <AddListingButton />
        </div>
      </div>
      <CakeCategories />
      <FeaturedBakers />
      <NewBakers />
      <Footer />
    </div>
  );
};

export default Index;
