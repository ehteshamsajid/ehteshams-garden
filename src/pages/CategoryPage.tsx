import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Droplets, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORY_META, PLANT_CATEGORIES, PlantCategory } from "@/data/plants";
import { usePlantsByCategory } from "@/hooks/usePlants";
import SafeImage from "@/components/SafeImage";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const isValidCategory = !!category && (PLANT_CATEGORIES as string[]).includes(category);
  const cat = (isValidCategory ? category : PLANT_CATEGORIES[0]) as PlantCategory;

  // Hooks must run unconditionally on every render, regardless of route validity.
  const { plants: list, loading } = usePlantsByCategory(cat);

  if (!isValidCategory) {
    return <Navigate to="/" replace />;
  }

  const { title, subtitle } = CATEGORY_META[cat];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest">
              Collection
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mt-3 mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center text-muted-foreground py-16">Loading plants…</div>
          ) : list.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">No plants in this category yet.</div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((plant, i) => (
              <Link key={plant.id} to={`/plant/${plant.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-xl transition-shadow duration-500">
                    <div className="relative overflow-hidden h-72">
                      <SafeImage
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="glass-card rounded-full px-3 py-1 text-xs font-medium text-foreground flex items-center gap-1">
                          <Sun className="h-3 w-3" /> {plant.light}
                        </span>
                        <span className="glass-card rounded-full px-3 py-1 text-xs font-medium text-foreground flex items-center gap-1">
                          <Droplets className="h-3 w-3" /> {plant.water}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {plant.species}
                      </p>
                      <div className="flex items-center justify-between">
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
