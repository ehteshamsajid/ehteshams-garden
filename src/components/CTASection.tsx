import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-primary/10 border border-primary/20 p-10 md:p-16 text-center"
        >
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative">
            <span className="text-primary text-sm font-medium uppercase tracking-widest">
              Ready to grow?
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Start your <span className="italic text-primary">green journey</span> today
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Browse curated collections, learn what thrives in your space, and get
              plants delivered with care.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              >
                Shop Plants <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 font-medium text-foreground hover:bg-muted transition-colors"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
