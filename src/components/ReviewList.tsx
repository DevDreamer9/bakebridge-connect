
import { Review } from "@/types/baker";

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="max-h-[200px] overflow-y-auto w-full rounded-md border p-4">
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{review.customerName}</span>
            </div>
            <p className="text-gray-600 text-sm">{review.comment}</p>
            <span className="text-xs text-gray-400 mt-2 block">{review.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
