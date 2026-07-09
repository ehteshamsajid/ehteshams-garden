import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Categories from "@/components/Categories";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <Categories />
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
