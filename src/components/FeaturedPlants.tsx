import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Droplets } from "lucide-react";
import SafeImage from "./SafeImage";
import { usePlants } from "@/hooks/usePlants";

const picks = ["monstera-deliciosa", "fiddle-leaf-fig", "areca-palm", "lavender"];

const FeaturedPlants = () => {
  const { plants } = usePlants();
  let featured = picks
    .map((id) => plants.find((p) => p.id === id))
    .filter(Boolean) as typeof plants;
  if (featured.length < 4) {
    featured = plants.slice(0, 4);
  }

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-widest">
              Handpicked This Season
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3">
              Featured <span className="italic text-primary">Plants</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
          >
            Browse full collection <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((plant, i) => (
            <Link key={plant.id} to={`/plant/${plant.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer h-full"
              >
                <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-xl transition-shadow duration-500 h-full flex flex-col">
                  <div className="relative overflow-hidden h-64">
                    <SafeImage
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="glass-card rounded-full px-3 py-1 text-xs font-medium text-foreground flex items-center gap-1">
                        <Sun className="h-3 w-3" /> {plant.light}
                      </span>
                      <span className="glass-card rounded-full px-3 py-1 text-xs font-medium text-foreground flex items-center gap-1">
                        <Droplets className="h-3 w-3" /> {plant.water}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {plant.species}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        {plant.name}
                      </h3>
                      <span className="text-primary font-semibold">{plant.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlants;
