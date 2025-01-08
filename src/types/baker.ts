export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BakerProfile {
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
}