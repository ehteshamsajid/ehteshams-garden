import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPlants from "@/components/FeaturedPlants";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedPlants />
      <Features />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
