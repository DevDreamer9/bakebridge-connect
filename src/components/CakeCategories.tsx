import { Cake, Heart, Gift, Star } from "lucide-react";

export const CakeCategories = () => {
  const categories = [
    {
      icon: <Cake className="w-8 h-8" />,
      name: "Wedding Cakes",
      description: "Beautiful custom wedding cakes",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      name: "Birthday Cakes",
      description: "Celebrate with a special cake",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      name: "Custom Designs",
      description: "Your unique cake vision",
    },
    {
      icon: <Star className="w-8 h-8" />,
      name: "Special Diet",
      description: "Vegan and gluten-free options",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-6 rounded-lg text-center transition-transform hover:-translate-y-1 animate-fade-up"
            >
              <div className="text-primary mb-4">{category.icon}</div>
              <h3 className="font-outfit font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};