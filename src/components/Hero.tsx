
import { Search, Cake, MapPin } from "lucide-react";
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
  const [searchType, setSearchType] = useState<"location" | "cakeType">("location");
  const navigate = useNavigate();

  // Get unique locations from bakers
  const locations = [...new Set(bakers.map(baker => baker.location))];
  
  // Get unique cake types from bakers' specialties
  const cakeTypes = [...new Set(bakers.flatMap(baker => 
    baker.specialty.split(', ').map(s => s.trim())
  ))];

  // Filter based on search term and type
  const filteredResults = searchType === "location" 
    ? locations.filter(location => 
        location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : cakeTypes.filter(cakeType => 
        cakeType.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleSearch = () => {
    // If there's a direct match, navigate to that result
    if (filteredResults.length === 1) {
      if (searchType === "location") {
        console.log(`Searching for bakers in ${filteredResults[0]}`);
        const firstMatchingBaker = bakers.find(baker => 
          baker.location.toLowerCase() === filteredResults[0].toLowerCase()
        );
        if (firstMatchingBaker) {
          navigate(`/baker/${firstMatchingBaker.id}`);
        }
      } else {
        // Handle cake type search
        console.log(`Searching for bakers who make ${filteredResults[0]}`);
        const firstMatchingBaker = bakers.find(baker => 
          baker.specialty.toLowerCase().includes(filteredResults[0].toLowerCase())
        );
        if (firstMatchingBaker) {
          navigate(`/baker/${firstMatchingBaker.id}`);
        }
      }
    }
  };

  const handleResultSelect = (result: string) => {
    if (searchType === "location") {
      // Find a baker in this location and navigate to their profile
      const baker = bakers.find(b => b.location === result);
      if (baker) {
        navigate(`/baker/${baker.id}`);
      }
    } else {
      // Find a baker with this cake type and navigate to their profile
      const baker = bakers.find(b => b.specialty.includes(result));
      if (baker) {
        navigate(`/baker/${baker.id}`);
      }
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
          <div className="bg-white rounded-2xl shadow-lg p-3 mb-4 inline-flex gap-2">
            <button
              onClick={() => setSearchType("location")}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                searchType === "location" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <MapPin className="w-4 h-4" />
              Location
            </button>
            <button
              onClick={() => setSearchType("cakeType")}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                searchType === "cakeType" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Cake className="w-4 h-4" />
              Cake Type
            </button>
          </div>
          
          <div className="relative flex items-center bg-white rounded-full shadow-lg">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(e.target.value.length > 0);
              }}
              placeholder={searchType === "location" ? "Search by location..." : "Search by cake type..."}
              className="w-full pl-12 pr-20 py-3 h-14 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-0 text-base bg-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {searchType === "location" ? (
                <MapPin className="w-5 h-5" />
              ) : (
                <Cake className="w-5 h-5" />
              )}
            </div>
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          
          {showResults && searchTerm && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
              <Command className="rounded-lg border-none shadow-none">
                <CommandList>
                  {filteredResults.length === 0 ? (
                    <CommandEmpty>No results found</CommandEmpty>
                  ) : (
                    <CommandGroup heading={searchType === "location" ? "Locations" : "Cake Types"}>
                      {filteredResults.map((result) => (
                        <CommandItem 
                          key={result} 
                          value={result}
                          onSelect={() => handleResultSelect(result)}
                          className="cursor-pointer hover:bg-gray-100 py-2"
                        >
                          {searchType === "location" ? (
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          ) : (
                            <Cake className="w-4 h-4 mr-2 text-gray-400" />
                          )}
                          {result}
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
