import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookings } from "@/hooks/useBookings";
import { useCars } from "@/hooks/useCars";
import { useToast } from "@/components/ui/use-toast";

interface BookingFormProps {
  carId?: string;
  carName?: string;
  onClose?: () => void;
}

const BookingForm = ({ carId, carName, onClose }: BookingFormProps) => {
  const { createBooking, loading } = useBookings();
  const { cars, loading: carsLoading } = useCars();
  const { toast } = useToast();
  const [selectedCarId, setSelectedCarId] = useState<string | undefined>(carId);
  const [formData, setFormData] = useState({
    pickupDate: "",
    dropoffDate: "",
    fullName: "",
    email: "",
    phone: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const activeCarIdCheck = carId ?? selectedCarId;
    if (!formData.pickupDate || !formData.fullName || !formData.email || !activeCarIdCheck) {
      toast({
        title: "Missing information",
        description: "Please select a car and complete all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Calculate total days and price
    const pickupDate = new Date(formData.pickupDate);
    const returnDate = formData.dropoffDate ? new Date(formData.dropoffDate) : new Date(pickupDate.getTime() + 24 * 60 * 60 * 1000);
    const totalDays = Math.max(1, Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)));
    const activeCarId = (carId ?? selectedCarId) as string;
    const pricePerDay = cars.find((c) => c.id === activeCarId)?.price_per_day ?? 100;
    
    const bookingData = {
      car_id: activeCarId,
      customer_name: formData.fullName,
      customer_email: formData.email,
      customer_phone: formData.phone || "",
      pickup_date: formData.pickupDate,
      return_date: formData.dropoffDate || formData.pickupDate,
      total_days: totalDays,
      total_price: totalDays * pricePerDay
    };

    const { error } = await createBooking(bookingData);
    
    if (!error) {
      // Reset form
      setFormData({
        pickupDate: "",
        dropoffDate: "",
        fullName: "",
        email: "",
        phone: ""
      });

      if (onClose) onClose();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {carName ? `Book ${carName}` : "Complete Your Booking"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!carId && (
            <div className="space-y-2">
              <Label htmlFor="car">Select Car *</Label>
              <Select value={selectedCarId} onValueChange={setSelectedCarId}>
                <SelectTrigger>
                  <SelectValue placeholder={carsLoading ? "Loading cars..." : "Choose a car"} />
                </SelectTrigger>
                <SelectContent>
                  {cars.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} - ${c.price_per_day}/day
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupDate">Pickup Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  id="pickupDate"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dropoffDate">Drop-off Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  id="dropoffDate"
                  value={formData.dropoffDate}
                  onChange={(e) => handleInputChange("dropoffDate", e.target.value)}
                  className="pl-10"
                  min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

          </div>

          {/* Contact Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            {onClose && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;