-- Ensure RLS is enabled and permissive policies exist for local 'bookings'

-- Enable RLS (no-op if already enabled)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create INSERT policy if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'bookings' 
      AND policyname = 'Enable insert for all users'
  ) THEN
    CREATE POLICY "Enable insert for all users"
    ON public.bookings
    FOR INSERT
    TO public
    WITH CHECK (true);
  END IF;
END $$;

-- Create SELECT policy if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'bookings' 
      AND policyname = 'Enable select for all users'
  ) THEN
    CREATE POLICY "Enable select for all users"
    ON public.bookings
    FOR SELECT
    TO public
    USING (true);
  END IF;
END $$;
