import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Fuel, Settings, Star } from "lucide-react";
import BookingDialog from "./BookingDialog";

interface CarCardProps {
  car: {
    id: string;
    name: string;
    category: string;
    image: string;
    pricePerDay: number;
    passengers: number;
    transmission: string;
    fuelType: string;
    rating: number;
    features: string[];
  };
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card className="group hover:shadow-large transition-all duration-300 transform hover:-translate-y-1 bg-card-gradient border-border/50 overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
          {car.category}
        </Badge>
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-3 w-3 text-accent fill-accent" />
          <span className="text-xs font-medium">{car.rating}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-foreground">{car.name}</h3>
        
        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{car.passengers}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Settings className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Fuel className="h-4 w-4" />
            <span>{car.fuelType}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 mb-4">
          {car.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">${car.pricePerDay}</span>
            <span className="text-sm text-muted-foreground">/day</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <BookingDialog carId={car.id} carName={car.name}>
          <Button 
            className="w-full py-3 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            size="lg"
          >
            Book Now
          </Button>
        </BookingDialog>
      </CardFooter>
    </Card>
  );
};

export default CarCard;