
import { Hero } from "@/components/Hero";
import { CakeCategories } from "@/components/CakeCategories";
import { FeaturedBakers } from "@/components/FeaturedBakers";
import { NewBakers } from "@/components/NewBakers";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      <div className="pt-24">
        <Hero />
        <CakeCategories />
        <FeaturedBakers />
        <NewBakers />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
