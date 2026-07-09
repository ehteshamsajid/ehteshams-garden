import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home,
  Trees,
  Flower2,
  Palmtree,
  Sprout,
  Apple,
  Carrot,
  TreePine,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import SafeImage from "./SafeImage";
import { CATEGORY_META, PLANT_CATEGORIES } from "@/data/plants";

const ICONS: Record<string, LucideIcon> = {
  Home,
  Trees,
  Flower2,
  Palmtree,
  Sprout,
  Apple,
  Carrot,
  TreePine,
};

// Uniform grid — every category card is the same size for clean alignment.


const Categories = () => {
  return (
    <section id="categories" className="py-24 px-6 bg-muted/30 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Shop by Category
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Find Your <span className="italic text-primary">Perfect Plant</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From sun-drenched palms to homegrown harvests — explore eight curated worlds of greenery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {PLANT_CATEGORIES.map((key, i) => {
            const meta = CATEGORY_META[key];
            const Icon = ICONS[meta.icon] ?? Home;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Link
                  to={`/plants/${key}`}
                  className="group relative block h-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl ring-1 ring-border/50"
                >
                  <SafeImage
                    src={meta.image}
                    alt={meta.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  {/* Dark scrim (uses dark background token) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
                  {/* Hover tint */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-500" />

                  {/* Floating icon badge */}
                  <motion.div
                    className="absolute top-5 left-5 h-11 w-11 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center text-foreground"
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-foreground">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary">
                      Collection
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold mt-1 mb-1.5 leading-tight">
                      {meta.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {meta.subtitle}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
