
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { 
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command";
import { bakers } from "@/data/bakers";

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Get unique locations from bakers
  const locations = [...new Set(bakers.map(baker => baker.location))];
  
  // Filter locations based on search term
  const filteredLocations = locations.filter(location => 
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    // If there's a direct match, navigate to that location's results
    if (filteredLocations.length === 1) {
      console.log(`Searching for bakers in ${filteredLocations[0]}`);
      const firstMatchingBaker = bakers.find(baker => 
        baker.location.toLowerCase() === filteredLocations[0].toLowerCase()
      );
      if (firstMatchingBaker) {
        navigate(`/baker/${firstMatchingBaker.id}`);
      }
    }
  };

  const handleLocationSelect = (location: string) => {
    // Find a baker in this location and navigate to their profile
    const baker = bakers.find(b => b.location === location);
    if (baker) {
      navigate(`/baker/${baker.id}`);
    }
    setShowResults(false);
  };

  return (
    <div className="hero-gradient py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-accent mb-6 animate-fade-up">
          Find the Perfect Baker for Your Special Moment
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 animate-fade-up">
          Connect with talented local bakers who create amazing custom cakes
        </p>
        <div className="max-w-xl mx-auto relative animate-fade-up">
          <div className="relative flex items-center">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(e.target.value.length > 0);
              }}
              placeholder="Search by location..."
              className="w-full pl-12 pr-16 py-3 h-14 rounded-full border-2 border-gray-200 shadow-sm focus:border-primary focus:ring-0 text-base"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          
          {showResults && searchTerm && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
              <Command className="rounded-lg border-none shadow-none">
                <CommandList>
                  {filteredLocations.length === 0 ? (
                    <CommandEmpty>No locations found</CommandEmpty>
                  ) : (
                    <CommandGroup heading="Locations">
                      {filteredLocations.map((location) => (
                        <CommandItem 
                          key={location} 
                          value={location}
                          onSelect={() => handleLocationSelect(location)}
                          className="cursor-pointer hover:bg-gray-100 py-2"
                        >
                          <Search className="w-4 h-4 mr-2 text-gray-400" />
                          {location}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
