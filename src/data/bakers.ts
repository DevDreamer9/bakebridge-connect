import { BakerProfile } from "@/types/baker";

export const bakers: BakerProfile[] = [
    {
      id: "1",
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
      contact: {
        phone: "+1 (415) 555-0123",
        email: "sarah@sweetcreations.com"
      },
      socialLinks: {
        instagram: "https://instagram.com/sarahsweets",
        facebook: "https://facebook.com/sarahsweets",
        twitter: "https://twitter.com/sarahsweets"
      },
      portfolio: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
      ],
      menu: [
        {
          name: "Classic Wedding Cake",
          description: "Three-tier vanilla cake with buttercream frosting",
          price: 450,
          category: "Wedding"
        },
        {
          name: "Custom Birthday Cake",
          description: "Personalized design with your choice of flavors",
          price: 150,
          category: "Birthday"
        }
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
      id: "2",
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
      contact: {
        phone: "+1 (310) 555-0199",
        email: "mike@cakemaster.com"
      },
      socialLinks: {
        instagram: "https://instagram.com/cakemastermike",
        facebook: "https://facebook.com/cakemastermike",
        twitter: "https://twitter.com/cakemastermike"
      },
      portfolio: [
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
      ],
      menu: [
        {
          name: "Chocolate Cupcakes",
          description: "Rich chocolate cupcakes topped with creamy frosting",
          price: 30,
          category: "Cupcakes"
        },
        {
          name: "Birthday Cake",
          description: "Customizable birthday cake with your choice of flavors",
          price: 200,
          category: "Birthday"
        }
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
      id: "3",
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
      contact: {
        phone: "+1 (212) 555-0145",
        email: "info@sweetdreamsbakery.com"
      },
      socialLinks: {
        instagram: "https://instagram.com/sweetdreamsbakery",
        facebook: "https://facebook.com/sweetdreamsbakery",
        twitter: "https://twitter.com/sweetdreamsbakery"
      },
      portfolio: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800",
      ],
      menu: [
        {
          name: "Vegan Chocolate Cake",
          description: "Delicious chocolate cake made without any animal products",
          price: 90,
          category: "Vegan"
        },
        {
          name: "Gluten-Free Vanilla Cake",
          description: "Light and fluffy vanilla cake that everyone can enjoy",
          price: 85,
          category: "Gluten-Free"
        }
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
