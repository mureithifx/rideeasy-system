-- Fix RLS policies for bookings table
-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Allow anon insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow anon select bookings" ON public.bookings;
DROP POLICY IF EXISTS "Only admins can view all bookings" ON public.bookings;

-- Create proper RLS policies for bookings
CREATE POLICY "Enable insert for all users" ON public.bookings
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Enable select for all users" ON public.bookings
  FOR SELECT 
  USING (true);