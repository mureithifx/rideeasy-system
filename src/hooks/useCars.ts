import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Import car images
import audiQ7 from '@/assets/audi-q7.jpg';
import bmwSeries from '@/assets/bmw-3-series.jpg';
import carFleet from '@/assets/car-fleet.jpg';
import heroCar from '@/assets/hero-car.jpg';
import mercedesGLS from '@/assets/mercedes-gls.jpg';
import porsche911 from '@/assets/porsche-911.jpg';
import teslaModelS from '@/assets/tesla-model-s.jpg';
import toyotaCamry from '@/assets/toyota-camry.jpg';
import { cars as staticCars } from '@/data/cars';

// Image mapping
const imageMap: { [key: string]: string } = {
  '/src/assets/audi-q7.jpg': audiQ7,
  '/src/assets/bmw-3-series.jpg': bmwSeries,
  '/src/assets/car-fleet.jpg': carFleet,
  '/src/assets/hero-car.jpg': heroCar,
  '/src/assets/mercedes-gls.jpg': mercedesGLS,
  '/src/assets/porsche-911.jpg': porsche911,
  '/src/assets/tesla-model-s.jpg': teslaModelS,
  '/src/assets/toyota-camry.jpg': toyotaCamry,
};

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

      console.log('Attempting to fetch cars...');

      let { data, error: fetchError } = await supabase
        .from('cars')
        .select('*')
        .eq('available', true)
        .order('name');

      if (fetchError && (fetchError as any).code === '42703') {
        console.warn('Column "available" missing in local DB, refetching without filter');
        const { data: dataNoFilter, error: err2 } = await supabase
          .from('cars')
          .select('*')
          .order('name');
        if (err2) throw err2;
        
        // Map database image paths to imported images
        const carsWithImages = (dataNoFilter || []).map((car: any) => ({
          ...car,
          image: imageMap[car.image] || car.image,
        }));

        if (!carsWithImages.length) {
          console.warn('No cars in DB (no-filter), using fallback sample data');
          const fallback = staticCars.map((c: any) => ({
            id: crypto.randomUUID(),
            name: c.name,
            category: c.category,
            image: c.image,
            price_per_day: c.pricePerDay,
            passengers: c.passengers,
            transmission: c.transmission,
            fuel_type: c.fuelType,
            rating: c.rating,
            features: c.features,
            available: true,
          }));
          setCars(fallback);
          return;
        }
        
        setCars(carsWithImages);
        return;
      }

      if (fetchError) throw fetchError;

      // Map database image paths to imported images
      const carsWithImages = (data || []).map((car: any) => ({
        ...car,
        image: imageMap[car.image] || car.image,
      }));

      if (!carsWithImages.length) {
        console.warn('No cars in DB, using fallback sample data');
        const fallback = staticCars.map((c: any) => ({
          id: crypto.randomUUID(),
          name: c.name,
          category: c.category,
          image: c.image,
          price_per_day: c.pricePerDay,
          passengers: c.passengers,
          transmission: c.transmission,
          fuel_type: c.fuelType,
          rating: c.rating,
          features: c.features,
          available: true,
        }));
        setCars(fallback);
      } else {
        setCars(carsWithImages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching cars');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  return { cars, loading, error, refetch: fetchCars };
};