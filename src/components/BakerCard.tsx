import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ReviewList } from "./ReviewList";
import { PortfolioGallery } from "./PortfolioGallery";
import { BakerProfile } from "@/types/baker";

interface BakerCardProps extends BakerProfile {}

export const BakerCard = ({
  name,
  image,
  rating,
  specialty,
  location,
  description,
  pricing,
  portfolio,
  reviews,
}: BakerCardProps) => {
  return (
    <Card className="overflow-hidden transition-transform hover:-translate-y-1 animate-fade-up">
      <CardHeader className="p-0">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-outfit font-semibold text-xl">{name}</h3>
            <p className="text-gray-600 text-sm">{specialty}</p>
            <p className="text-gray-500 text-sm">{location}</p>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <span className="ml-1 font-semibold">{rating}</span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">{description}</p>
          <div className="mt-2 text-sm">
            <span className="font-semibold">Starting at:</span>{" "}
            <span className="text-green-600">${pricing.starting}</span>
            <span className="text-gray-500 ml-2">({pricing.range})</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3">Portfolio</h4>
          <PortfolioGallery images={portfolio} />
        </div>

        <div>
          <h4 className="font-semibold mb-3">Customer Reviews</h4>
          <ReviewList reviews={reviews} />
        </div>
      </CardContent>
    </Card>
  );
};