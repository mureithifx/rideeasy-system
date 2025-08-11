import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarCatalog from "@/components/CarCatalog";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CarCatalog />
      <Services />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
