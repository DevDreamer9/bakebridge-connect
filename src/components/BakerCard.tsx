import { Star } from "lucide-react";

interface BakerCardProps {
  name: string;
  image: string;
  rating: number;
  specialty: string;
  location: string;
}

export const BakerCard = ({ name, image, rating, specialty, location }: BakerCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 animate-fade-up">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-outfit font-semibold text-lg">{name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{specialty}</p>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>
    </div>
  );
};