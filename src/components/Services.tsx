import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, MapPin, Headphones, CreditCard, Users } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Comprehensive insurance coverage for complete peace of mind during your rental period."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you whenever and wherever you need help."
    },
    {
      icon: MapPin,
      title: "Multiple Locations",
      description: "Convenient pickup and drop-off locations across the city for your convenience."
    },
    {
      icon: Headphones,
      title: "Customer Service",
      description: "Dedicated customer service team committed to making your rental experience exceptional."
    },
    {
      icon: CreditCard,
      title: "Easy Payment",
      description: "Secure and flexible payment options including online payments and mobile apps."
    },
    {
      icon: Users,
      title: "Group Discounts",
      description: "Special rates for corporate clients and group bookings with customized packages."
    }
  ];

  return (
    <section id="services" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RideEasy?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide more than just car rentals. Experience premium service, 
            reliability, and convenience with every booking.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 bg-card-gradient border-border/50"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;