import { Search } from "lucide-react";

export const Hero = () => {
  return (
    <div className="hero-gradient py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-accent mb-6 animate-fade-up">
          Find the Perfect Baker for Your Special Moment
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 animate-fade-up">
          Connect with talented local bakers who create amazing custom cakes
        </p>
        <div className="max-w-2xl mx-auto relative animate-fade-up">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by location or cake type..."
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};