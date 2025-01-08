import { AspectRatio } from "./ui/aspect-ratio";

interface PortfolioGalleryProps {
  images: string[];
}

export const PortfolioGallery = ({ images }: PortfolioGalleryProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative overflow-hidden rounded-lg">
          <AspectRatio ratio={1}>
            <img
              src={image}
              alt={`Portfolio item ${index + 1}`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  );
};