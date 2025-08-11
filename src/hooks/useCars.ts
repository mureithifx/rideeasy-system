import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Car {
  id: string;
  name: string;
  category: string;
  image: string;
  price_per_day: number;
  passengers: number;
  transmission: string;
  fuel_type: string;
  rating: number;
  features: string[];
  available: boolean;
}

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('cars')
        .select('*')
        .eq('available', true)
        .order('name');

      if (fetchError) {
        throw fetchError;
      }

      setCars(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching cars');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  return { cars, loading, error, refetch: fetchCars };
};