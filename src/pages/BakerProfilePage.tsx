
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Instagram, Facebook, Twitter, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { bakers as defaultBakers } from "@/data/bakers"; // We'll create this file next
import { BakerProfile } from "@/types/baker";
import { useEffect, useState } from "react";

const BakerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [baker, setBaker] = useState<BakerProfile | undefined>(undefined);
  
  useEffect(() => {
    // First check default bakers
    let foundBaker = defaultBakers.find(b => b.id === id);
    
    // If not found, check approved bakers from localStorage
    if (!foundBaker) {
      const approvedBakersJSON = localStorage.getItem("approvedBakers");
      if (approvedBakersJSON) {
        const approvedBakers = JSON.parse(approvedBakersJSON);
        foundBaker = approvedBakers.find(b => b.id === id);
      }
    }
    
    setBaker(foundBaker);
  }, [id]);

  if (!baker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold mb-4">Baker not found</h2>
          <p className="mb-6">We couldn't find the baker you're looking for.</p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-[300px] relative">
            <img 
              src={baker.image} 
              alt={baker.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{baker.name}</h1>
                <p className="text-gray-600">{baker.specialty}</p>
                <p className="text-gray-500">{baker.location}</p>
              </div>
              <div className="flex items-center">
                <Star className="w-6 h-6 fill-yellow-400 stroke-yellow-400" />
                <span className="ml-2 text-xl font-semibold">{baker.rating}</span>
              </div>
            </div>

            <p className="mt-6 text-gray-700">{baker.description}</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{baker.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>{baker.contact.email}</span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-4">Social Media</h2>
                <div className="flex gap-4">
                  {baker.socialLinks.instagram && (
                    <a href={baker.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-6 h-6 text-gray-600 hover:text-pink-500" />
                    </a>
                  )}
                  {baker.socialLinks.facebook && (
                    <a href={baker.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <Facebook className="w-6 h-6 text-gray-600 hover:text-blue-600" />
                    </a>
                  )}
                  {baker.socialLinks.twitter && (
                    <a href={baker.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-6 h-6 text-gray-600 hover:text-blue-400" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Menu</h2>
                <div className="space-y-4">
                  {baker.menu.map((item, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{item.name}</h3>
                        <span className="text-green-600">${item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <span className="text-xs text-gray-500">{item.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Portfolio</h2>
              <PortfolioGallery images={baker.portfolio} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakerProfilePage;
