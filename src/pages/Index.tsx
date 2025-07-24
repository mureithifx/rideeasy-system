import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarCatalog from "@/components/CarCatalog";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CarCatalog />
      <Services />
      <Footer />
    </div>
  );
};

export default Index;
