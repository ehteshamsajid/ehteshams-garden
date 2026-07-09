import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Sun, Droplets, Thermometer, Wind, Flower2, Beaker, ShieldCheck, PawPrint, Ruler, Minus, Plus, ShoppingCart } from "lucide-react";
import { usePlant } from "@/hooks/usePlants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PlantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { plant, loading } = usePlant(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Plant not found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to collection</Link>
        </div>
      </div>
    );
  }

  const careItems = [
    { icon: Sun, label: "Light", value: plant.care.light },
    { icon: Droplets, label: "Water", value: plant.care.water },
    { icon: Thermometer, label: "Temperature", value: plant.care.temperature },
    { icon: Wind, label: "Humidity", value: plant.care.humidity },
    { icon: Flower2, label: "Soil", value: plant.care.soil },
    { icon: Beaker, label: "Fertilizer", value: plant.care.fertilizer },
  ];

  const difficultyColor = {
    Easy: "bg-primary/15 text-primary",
    Moderate: "bg-accent/30 text-accent-foreground",
    Expert: "bg-destructive/15 text-destructive",
  };

  const priceNum = parseFloat(plant.price.replace(/[^0-9.]/g, ""));

  const handleAddToCart = () => {
    addItem(
      { id: plant.id, name: plant.name, species: plant.species, image: plant.image, price: priceNum },
      quantity
    );
    toast.success(`Added ${quantity}x ${plant.name} to cart`, {
      description: `Total: $${(priceNum * quantity).toFixed(2)}`,
      action: { label: "View cart", onClick: () => navigate("/cart") },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to collection
          </Link>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl overflow-hidden bg-card border border-border/50 mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={plant.gallery[selectedImage]}
                  alt={plant.name}
                  className="w-full aspect-square object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop"; }}
                />
              </AnimatePresence>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {plant.gallery.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedImage(i)}
                  className={`rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-primary" : "border-transparent hover:border-border"
                  }`}
                >
                  <img src={img} alt={`${plant.name} view ${i + 1}`} className="w-full aspect-square object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop"; }} />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">{plant.species}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${difficultyColor[plant.difficulty]}`}>
                {plant.difficulty}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{plant.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{plant.description}</p>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                <Ruler className="h-3.5 w-3.5" /> {plant.size}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                <Sun className="h-3.5 w-3.5" /> {plant.light}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                <Droplets className="h-3.5 w-3.5" /> {plant.water}
              </span>
              <span className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full ${plant.petFriendly ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                <PawPrint className="h-3.5 w-3.5" /> {plant.petFriendly ? "Pet safe" : "Not pet safe"}
              </span>
            </div>

            {/* Price & Add to cart */}
            <div className="border border-border rounded-2xl p-6 mb-8 bg-card">
              <div className="flex items-center justify-between mb-5">
                <span className="font-serif text-3xl font-bold text-foreground">{plant.price}</span>
                <span className="text-sm text-primary font-medium">✓ In stock</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-medium text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                >
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </motion.button>
              </div>
            </div>

            {/* Care Guide */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-5">Care Guide</h2>
              <div className="space-y-4">
                {careItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 p-4 rounded-xl bg-muted/50 border border-border/50"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-0.5">{item.label}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlantDetail;
