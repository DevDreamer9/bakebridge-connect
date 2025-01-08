import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { BakerProfile } from "@/types/baker";
import { BakerProfileModal } from "./BakerProfileModal";

interface BakerCardProps {
  baker: BakerProfile;
}

export const BakerCard = ({ baker }: BakerCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card 
        className="overflow-hidden transition-transform hover:-translate-y-1 animate-fade-up cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader className="p-0">
          <img src={baker.image} alt={baker.name} className="w-full h-48 object-cover" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-outfit font-semibold text-xl">{baker.name}</h3>
              <p className="text-gray-600 text-sm">{baker.specialty}</p>
              <p className="text-gray-500 text-sm">{baker.location}</p>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
              <span className="ml-1 font-semibold">{baker.rating}</span>
            </div>
          </div>
          <p className="mt-4 text-gray-700 line-clamp-2">{baker.description}</p>
          <div className="mt-2 text-sm">
            <span className="font-semibold">Starting at:</span>{" "}
            <span className="text-green-600">${baker.pricing.starting}</span>
          </div>
        </CardContent>
      </Card>

      <BakerProfileModal 
        baker={baker}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};