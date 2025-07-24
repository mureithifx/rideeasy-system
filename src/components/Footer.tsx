import { Car, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold">RideEasy</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Premium car rental service providing luxury vehicles for all your transportation needs. 
              Experience comfort, reliability, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-background/60 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-background/60 hover:text-accent cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-background/60 hover:text-accent cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-background/60 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Home</a></li>
              <li><a href="#cars" className="text-background/80 hover:text-accent transition-colors">Our Fleet</a></li>
              <li><a href="#services" className="text-background/80 hover:text-accent transition-colors">Services</a></li>
              <li><a href="#about" className="text-background/80 hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-background/80 hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-background/80">123 Business District, Downtown City, DC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-background/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-background/80">info@rideeasy.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-background/80 text-sm mb-4">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
              />
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/80 text-sm">
              © 2024 RideEasy. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/80 hover:text-accent transition-colors">Privacy</a>
              <a href="#" className="text-background/80 hover:text-accent transition-colors">Terms</a>
              <a href="#" className="text-background/80 hover:text-accent transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;