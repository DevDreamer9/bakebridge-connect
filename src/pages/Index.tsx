import { Hero } from "@/components/Hero";
import { FeaturedBakers } from "@/components/FeaturedBakers";
import { CakeCategories } from "@/components/CakeCategories";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CakeCategories />
      <FeaturedBakers />
    </div>
  );
};

export default Index;