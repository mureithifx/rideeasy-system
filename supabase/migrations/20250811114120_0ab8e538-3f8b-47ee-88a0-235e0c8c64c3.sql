-- Create cars table
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  price_per_day INTEGER NOT NULL,
  passengers INTEGER NOT NULL,
  transmission TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.5,
  features TEXT[] NOT NULL DEFAULT '{}',
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  return_date DATE NOT NULL,
  pickup_location TEXT NOT NULL,
  return_location TEXT NOT NULL,
  total_days INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for cars (public read access)
CREATE POLICY "Cars are viewable by everyone" 
ON public.cars 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage cars" 
ON public.cars 
FOR ALL 
USING (false);

-- Create policies for bookings (public can create, but not view others)
CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (false);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample car data
INSERT INTO public.cars (name, category, image, price_per_day, passengers, transmission, fuel_type, rating, features) VALUES
('BMW 3 Series', 'Luxury Sedan', '/src/assets/bmw-3-series.jpg', 89, 5, 'Automatic', 'Gasoline', 4.8, ARRAY['GPS Navigation', 'Bluetooth', 'Leather Seats', 'Sunroof']),
('Audi Q7', 'Premium SUV', '/src/assets/audi-q7.jpg', 129, 7, 'Automatic', 'Gasoline', 4.9, ARRAY['4WD', 'Premium Audio', 'Panoramic Roof', 'Heated Seats']),
('Tesla Model S', 'Electric Luxury', '/src/assets/tesla-model-s.jpg', 149, 5, 'Automatic', 'Electric', 4.9, ARRAY['Autopilot', 'Premium Interior', 'Supercharging', 'Glass Roof']),
('Porsche 911', 'Sports Car', '/src/assets/porsche-911.jpg', 299, 2, 'Manual', 'Gasoline', 4.7, ARRAY['Sport Mode', 'Premium Sound', 'Carbon Fiber', 'Track Ready']),
('Toyota Camry', 'Economy', '/src/assets/toyota-camry.jpg', 49, 5, 'Automatic', 'Hybrid', 4.6, ARRAY['Fuel Efficient', 'Safety Features', 'Comfort', 'Reliable']),
('Mercedes GLS', 'Luxury SUV', '/src/assets/mercedes-gls.jpg', 179, 7, 'Automatic', 'Gasoline', 4.8, ARRAY['Massage Seats', 'Premium Audio', '4MATIC', 'Luxury Interior']);