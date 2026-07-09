import { motion } from "framer-motion";
import { Sun, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { usePlants } from "@/hooks/usePlants";
import SafeImage from "./SafeImage";

const PlantCard = ({ id, name, species, image, light, water, price, index }: { id: string; name: string; species: string; image: string; light: string; water: string; price: string; index: number }) => {
  return (
    <Link to={`/plant/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group cursor-pointer"
      >
        <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-xl transition-shadow duration-500">
          <div className="relative overflow-hidden h-72">
            <SafeImage
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="glass-card rounded-full px-3 py-1 text-xs font-medium text-foreground flex items-center gap-1">
                <Sun className="h-3 w-3" /> {light}
              </span>
              <span className="glass-card rounded-full px-3 py-1 text-xs font-medium text-foreground flex items-center gap-1">
                <Droplets className="h-3 w-3" /> {water}
              </span>
            </div>
          </div>
          <div className="p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{species}</p>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-foreground">{name}</h3>
              <span className="text-primary font-semibold">{price}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const PlantCollection = () => {
  const { plants, loading } = usePlants();
  return (
    <section id="collection" className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">Our Collection</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Handpicked <span className="italic text-primary">Greenery</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Each plant in our collection is selected for its beauty, resilience, and ability to transform any space.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-muted-foreground py-16">Loading plants…</div>
        ) : plants.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">No plants available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant, i) => (
              <PlantCard key={plant.id} {...plant} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlantCollection;
