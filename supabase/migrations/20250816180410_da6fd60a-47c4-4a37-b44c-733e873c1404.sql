-- Remove pickup_location and return_location columns from bookings table
ALTER TABLE public.bookings 
DROP COLUMN pickup_location,
DROP COLUMN return_location;