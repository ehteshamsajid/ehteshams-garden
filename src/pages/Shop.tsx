import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantCollection from "@/components/PlantCollection";

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <PlantCollection />
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
