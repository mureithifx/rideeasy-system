import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookingForm from "./BookingForm";

interface BookingDialogProps {
  children: React.ReactNode;
  carId?: string;
  carName?: string;
}

const BookingDialog = ({ children, carId, carName }: BookingDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <BookingForm 
          carId={carId} 
          carName={carName} 
          onClose={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;