import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-car.jpg";
import BookingDialog from "@/components/BookingDialog";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury car rental"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Hero Text */}
        <div className="text-left animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Premium Car
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Rental Service
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Experience luxury and comfort with our premium fleet of vehicles. 
            Perfect for business trips, family vacations, or special occasions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <BookingDialog>
              <Button 
                type="button"
                size="lg" 
                className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book Your Ride
              </Button>
            </BookingDialog>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95 hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Fleet
            </Button>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="animate-slide-up">
          <Card className="bg-card-gradient shadow-large backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-6 text-center">Quick Booking</h3>
              
              <div className="space-y-4">
                {/* Pick-up Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Pick-up Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>Select pick-up location</option>
                      <option>Airport Terminal</option>
                      <option>Downtown Office</option>
                      <option>Hotel District</option>
                      <option>City Center</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Pick-up Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Drop-off Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Passengers */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3 Passengers</option>
                      <option>4 Passengers</option>
                      <option>5+ Passengers</option>
                    </select>
                  </div>
                </div>

                <BookingDialog>
                  <Button 
                    type="button"
                    className="w-full py-4 mt-6 text-base font-semibold bg-accent hover:bg-accent/90 transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    size="lg"
                  >
                    Search Available Cars
                  </Button>
                </BookingDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;