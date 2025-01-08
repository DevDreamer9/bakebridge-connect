import { BakerCard } from "./BakerCard";

export const FeaturedBakers = () => {
  const bakers = [
    {
      name: "Sarah's Sweet Creations",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
      rating: 4.9,
      specialty: "Wedding Cakes, Custom Designs",
      location: "San Francisco, CA",
    },
    {
      name: "Cake Master Mike",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
      rating: 4.8,
      specialty: "Birthday Cakes, Cupcakes",
      location: "Los Angeles, CA",
    },
    {
      name: "Sweet Dreams Bakery",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
      rating: 4.7,
      specialty: "Vegan Cakes, Gluten-Free",
      location: "New York, NY",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Bakers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bakers.map((baker) => (
            <BakerCard key={baker.name} {...baker} />
          ))}
        </div>
      </div>
    </section>
  );
};