import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Car } from "lucide-react";
import SignInDialog from "@/components/SignInDialog";
import BookingDialog from "@/components/BookingDialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">RideEasy</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#cars" className="text-foreground hover:text-primary transition-colors">
              Cars
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <SignInDialog>
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 active:scale-95"
              >
                Sign In
              </Button>
            </SignInDialog>
            <BookingDialog>
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90 transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                Book Now
              </Button>
            </BookingDialog>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Home
              </a>
              <a href="#cars" className="block px-3 py-2 text-foreground hover:text-primary">
                Cars
              </a>
              <a href="#services" className="block px-3 py-2 text-foreground hover:text-primary">
                Services
              </a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary">
                About
              </a>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:text-primary">
                Contact
              </a>
              <div className="pt-4 border-t border-border space-y-3">
                <SignInDialog>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200 active:scale-[0.98]"
                  >
                    Sign In
                  </Button>
                </SignInDialog>
                <BookingDialog>
                  <Button 
                    className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] shadow-md"
                  >
                    Book Now
                  </Button>
                </BookingDialog>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;