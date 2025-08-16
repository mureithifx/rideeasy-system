import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingForm from "./BookingForm";
import { useCars } from "@/hooks/useCars";

interface BookingDialogProps {
  children: React.ReactNode;
  carId?: string;
  carName?: string;
}

const BookingDialog = ({ children, carId, carName }: BookingDialogProps) => {
  const [open, setOpen] = useState(false);
  const { cars } = useCars();

  const effectiveCarId = carId ?? cars[0]?.id;
  const effectiveCarName = carName ?? cars[0]?.name;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">
          {effectiveCarName ? `Book ${effectiveCarName}` : "Book a Car"}
        </DialogTitle>
        <BookingForm 
          carId={effectiveCarId} 
          carName={effectiveCarName} 
          onClose={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;