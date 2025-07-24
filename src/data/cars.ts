import bmwImage from "@/assets/bmw-3-series.jpg";
import audiImage from "@/assets/audi-q7.jpg";
import teslaImage from "@/assets/tesla-model-s.jpg";
import porscheImage from "@/assets/porsche-911.jpg";
import toyotaImage from "@/assets/toyota-camry.jpg";
import mercedesImage from "@/assets/mercedes-gls.jpg";

export const cars = [
  {
    id: "1",
    name: "BMW 3 Series",
    category: "Luxury Sedan",
    image: bmwImage,
    pricePerDay: 89,
    passengers: 5,
    transmission: "Automatic",
    fuelType: "Gasoline",
    rating: 4.8,
    features: ["GPS Navigation", "Bluetooth", "Leather Seats", "Sunroof"]
  },
  {
    id: "2",
    name: "Audi Q7",
    category: "Premium SUV",
    image: audiImage,
    pricePerDay: 129,
    passengers: 7,
    transmission: "Automatic",
    fuelType: "Gasoline",
    rating: 4.9,
    features: ["4WD", "Premium Audio", "Panoramic Roof", "Heated Seats"]
  },
  {
    id: "3",
    name: "Tesla Model S",
    category: "Electric Luxury",
    image: teslaImage,
    pricePerDay: 149,
    passengers: 5,
    transmission: "Automatic",
    fuelType: "Electric",
    rating: 4.9,
    features: ["Autopilot", "Premium Interior", "Supercharging", "Glass Roof"]
  },
  {
    id: "4",
    name: "Porsche 911",
    category: "Sports Car",
    image: porscheImage,
    pricePerDay: 299,
    passengers: 2,
    transmission: "Manual",
    fuelType: "Gasoline",
    rating: 4.7,
    features: ["Sport Mode", "Premium Sound", "Carbon Fiber", "Track Ready"]
  },
  {
    id: "5",
    name: "Toyota Camry",
    category: "Economy",
    image: toyotaImage,
    pricePerDay: 49,
    passengers: 5,
    transmission: "Automatic",
    fuelType: "Hybrid",
    rating: 4.6,
    features: ["Fuel Efficient", "Safety Features", "Comfort", "Reliable"]
  },
  {
    id: "6",
    name: "Mercedes GLS",
    category: "Luxury SUV",
    image: mercedesImage,
    pricePerDay: 179,
    passengers: 7,
    transmission: "Automatic",
    fuelType: "Gasoline",
    rating: 4.8,
    features: ["Massage Seats", "Premium Audio", "4MATIC", "Luxury Interior"]
  }
];