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
  rating NUMERIC NOT NULL DEFAULT 4.5,
  features TEXT[] NOT NULL DEFAULT '{}',
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id UUID NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  return_date DATE NOT NULL,
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

-- Create policies for bookings (allow anonymous booking creation)
CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anon select bookings" 
ON public.bookings 
FOR SELECT 
USING (true);

-- Insert sample car data
INSERT INTO public.cars (name, category, image, price_per_day, passengers, transmission, fuel_type, rating, features) VALUES
('Toyota Corolla', 'Economy', '/src/assets/toyota-camry.jpg', 25, 5, 'Automatic', 'Petrol', 4.2, ARRAY['Air Conditioning', 'Bluetooth', 'USB Charging']),
('BMW 3 Series', 'Luxury', '/src/assets/bmw-3-series.jpg', 80, 5, 'Automatic', 'Petrol', 4.8, ARRAY['Leather Seats', 'Navigation', 'Premium Sound']),
('Mercedes GLS', 'SUV', '/src/assets/mercedes-gls.jpg', 120, 7, 'Automatic', 'Petrol', 4.9, ARRAY['Third Row Seating', '4WD', 'Premium Interior']),
('Audi Q7', 'Luxury SUV', '/src/assets/audi-q7.jpg', 150, 7, 'Automatic', 'Petrol', 4.7, ARRAY['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen Sound']),
('Tesla Model S', 'Electric', '/src/assets/tesla-model-s.jpg', 200, 5, 'Automatic', 'Electric', 4.9, ARRAY['Autopilot', 'Supercharging', 'Premium Interior']),
('Porsche 911', 'Sports', '/src/assets/porsche-911.jpg', 300, 2, 'Manual', 'Petrol', 4.8, ARRAY['Sport Seats', 'Sport Chrono', 'BOSE Surround Sound']);

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