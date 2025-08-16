import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface BookingData {
  car_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_date: string;
  return_date: string;
  total_days: number;
  total_price: number;
}

export const useBookings = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createBooking = async (bookingData: BookingData) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Booking Confirmed!",
        description: "Your booking has been successfully submitted. We'll contact you shortly.",
      });

      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create booking';
      
      toast({
        title: "Booking Failed",
        description: errorMessage,
        variant: "destructive"
      });

      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading };
};