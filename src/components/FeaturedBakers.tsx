import { BakerCard } from "./BakerCard";
import { BakerProfile } from "@/types/baker";

export const FeaturedBakers = () => {
  const bakers: BakerProfile[] = [
    {
      name: "Sarah's Sweet Creations",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
      rating: 4.9,
      specialty: "Wedding Cakes, Custom Designs",
      location: "San Francisco, CA",
      description: "Specializing in custom wedding cakes and unique designs. Using only the finest ingredients to create memorable masterpieces for your special day.",
      pricing: {
        starting: 150,
        range: "Custom quotes available"
      },
      portfolio: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
      ],
      reviews: [
        {
          id: "1",
          customerName: "Emily Johnson",
          rating: 5,
          comment: "Sarah created the most beautiful wedding cake for us! Not only did it look stunning, but it tasted amazing too.",
          date: "2024-02-15"
        },
        {
          id: "2",
          customerName: "Michael Chen",
          rating: 4.8,
          comment: "Great attention to detail and very professional service.",
          date: "2024-02-10"
        }
      ]
    },
    {
      name: "Cake Master Mike",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
      rating: 4.8,
      specialty: "Birthday Cakes, Cupcakes",
      location: "Los Angeles, CA",
      description: "Creating joy through delicious birthday cakes and creative cupcake designs. Perfect for any celebration!",
      pricing: {
        starting: 75,
        range: "$75-$500"
      },
      portfolio: [
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
      ],
      reviews: [
        {
          id: "3",
          customerName: "Sarah Williams",
          rating: 5,
          comment: "Mike made an amazing birthday cake for my daughter. She loved it!",
          date: "2024-02-12"
        }
      ]
    },
    {
      name: "Sweet Dreams Bakery",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
      rating: 4.7,
      specialty: "Vegan Cakes, Gluten-Free",
      location: "New York, NY",
      description: "Specializing in vegan and gluten-free cakes that taste just as good as traditional ones. Everyone deserves a delicious cake!",
      pricing: {
        starting: 85,
        range: "$85-$400"
      },
      portfolio: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
      ],
      reviews: [
        {
          id: "4",
          customerName: "Lisa Thompson",
          rating: 4.5,
          comment: "Finally found a gluten-free cake that actually tastes amazing!",
          date: "2024-02-08"
        }
      ]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Bakers</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {bakers.map((baker) => (
            <BakerCard key={baker.name} {...baker} />
          ))}
        </div>
      </div>
    </section>
  );
};