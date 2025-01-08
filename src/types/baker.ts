export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface BakerProfile {
  id: string;
  name: string;
  image: string;
  rating: number;
  specialty: string;
  location: string;
  description: string;
  pricing: {
    starting: number;
    range: string;
  };
  portfolio: string[];
  reviews: Review[];
  contact: {
    phone: string;
    email: string;
  };
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  menu: MenuItem[];
}