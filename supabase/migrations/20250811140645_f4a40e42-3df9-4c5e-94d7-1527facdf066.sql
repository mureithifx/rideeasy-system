-- Enable RLS (safe to run even if already enabled)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous (anon) role to insert bookings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'bookings' AND policyname = 'Allow anon insert bookings'
  ) THEN
    CREATE POLICY "Allow anon insert bookings"
    ON public.bookings
    FOR INSERT
    TO anon
    WITH CHECK (true);
  END IF;
END $$;

-- Allow anonymous (anon) role to select bookings (needed for return=representation after insert)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'bookings' AND policyname = 'Allow anon select bookings'
  ) THEN
    CREATE POLICY "Allow anon select bookings"
    ON public.bookings
    FOR SELECT
    TO anon
    USING (true);
  END IF;
END $$;