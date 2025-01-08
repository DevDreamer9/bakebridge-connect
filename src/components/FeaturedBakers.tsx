import { BakerCard } from "./BakerCard";
import { bakers } from "@/data/bakers";

export const FeaturedBakers = () => {
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