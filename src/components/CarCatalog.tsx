import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import CarCard from "./CarCard";
import { useCars } from "@/hooks/useCars";

const CarCatalog = () => {
  const { cars, loading, error } = useCars();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  const categories = ["All", "Economy", "Luxury Sedan", "Premium SUV", "Sports Car", "Electric Luxury", "Luxury SUV"];
  const priceRanges = ["All", "Under $75", "$75-$150", "Over $150"];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === "Under $75") {
      matchesPrice = car.price_per_day < 75;
    } else if (priceRange === "$75-$150") {
      matchesPrice = car.price_per_day >= 75 && car.price_per_day <= 150;
    } else if (priceRange === "Over $150") {
      matchesPrice = car.price_per_day > 150;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (error) {
    return (
      <section id="cars" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Error Loading Cars</h2>
          <p className="text-lg text-destructive">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="cars" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Fleet</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our extensive collection of premium vehicles, 
            each maintained to the highest standards for your comfort and safety.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="bg-background rounded-lg shadow-soft border border-border p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categories */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Vehicle Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Price Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <Badge
                      key={range}
                      variant={priceRange === range ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setPriceRange(range)}
                    >
                      {range}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCars.length} of {cars.length} vehicles
          </p>
        </div>

        {/* Car Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2 text-lg">Loading vehicles...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              No vehicles found matching your criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setPriceRange("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarCatalog;