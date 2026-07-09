import { motion } from "framer-motion";
import { Leaf, Truck, Heart, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Sustainably Grown",
    description: "All our plants are grown using eco-friendly practices with minimal environmental impact.",
  },
  {
    icon: Truck,
    title: "Safe Delivery",
    description: "Expert packaging ensures your plants arrive healthy and ready to brighten your home.",
  },
  {
    icon: Heart,
    title: "Plant Care Support",
    description: "Get personalized care guides and ongoing support from our team of plant experts.",
  },
  {
    icon: ShieldCheck,
    title: "30-Day Guarantee",
    description: "Not thriving? We'll replace your plant or give you a full refund, no questions asked.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-6 bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">Why Us</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3">
            Rooted in <span className="italic text-primary">Quality</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 text-primary mb-5">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
