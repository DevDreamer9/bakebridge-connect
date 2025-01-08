import { Star } from "lucide-react";
import { Review } from "@/types/baker";
import { ScrollArea } from "./ui/scroll-area";

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{review.customerName}</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{review.comment}</p>
            <span className="text-xs text-gray-400 mt-2 block">{review.date}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};