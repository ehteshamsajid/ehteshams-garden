import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "My monstera arrived in perfect shape and has already put out two new leaves. The care guide was a game changer.",
    name: "Amelia R.",
    role: "Plant parent · Karachi",
  },
  {
    quote:
      "Beautifully packaged, healthy roots, and honestly the best-looking fiddle leaf fig I've ever bought online.",
    name: "Daniyal S.",
    role: "Interior stylist",
  },
  {
    quote:
      "The team helped me pick low-light plants for my apartment. Six months in and everything is still thriving.",
    name: "Hira K.",
    role: "First-time collector",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            From Our Community
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3">
            Loved by <span className="italic text-primary">Plant People</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg transition-shadow"
            >
              <Quote className="h-8 w-8 text-primary/60 mb-4" />
              <p className="text-foreground leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="font-serif font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
