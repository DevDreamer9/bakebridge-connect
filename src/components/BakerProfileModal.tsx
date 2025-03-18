
import { Dialog, DialogContent } from "./ui/dialog";
import { BakerProfile } from "@/types/baker";
import { Star, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { PortfolioGallery } from "./PortfolioGallery";

interface BakerProfileModalProps {
  baker: BakerProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const BakerProfileModal = ({ baker, isOpen, onClose }: BakerProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div className="relative h-48">
            <img src={baker.image} alt={baker.name} className="w-full h-full object-cover rounded-t-lg" />
          </div>

          <div className="space-y-4 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold">{baker.name}</h2>
                <p className="text-gray-600">{baker.specialty}</p>
                <p className="text-gray-500">{baker.location}</p>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                <span className="ml-1 font-semibold">{baker.rating}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Contact Information</h3>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{baker.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{baker.contact.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Social Media</h3>
              <div className="flex space-x-4">
                {baker.socialLinks.instagram && (
                  <a href={baker.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                  </a>
                )}
                {baker.socialLinks.facebook && (
                  <a href={baker.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                  </a>
                )}
                {baker.socialLinks.twitter && (
                  <a href={baker.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                  </a>
                )}
              </div>
            </div>

            <div>
              <p className="text-gray-700">{baker.description}</p>
              <div className="mt-2">
                <span className="font-semibold">Starting at:</span>{" "}
                <span className="text-green-600">${baker.pricing.starting}</span>
                <span className="text-gray-500 ml-2">({baker.pricing.range})</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Menu</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {baker.menu.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-green-600 mt-2">${item.price}</p>
                    <span className="text-xs text-gray-500">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Portfolio</h3>
              <PortfolioGallery images={baker.portfolio} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
