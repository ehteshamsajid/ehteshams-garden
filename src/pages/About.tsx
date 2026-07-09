import { motion } from "framer-motion";
import { Leaf, Heart, Sprout, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";

const values = [
  { icon: Leaf, title: "Ethically Sourced", text: "Every plant is grown by trusted partners using sustainable practices." },
  { icon: Heart, title: "Hand Selected", text: "We personally inspect each plant for health, shape, and lasting beauty." },
  { icon: Sprout, title: "Care Promise", text: "Free care guides and lifetime support so your plants truly thrive." },
  { icon: Globe, title: "Carbon Neutral", text: "All shipments are offset through verified reforestation projects." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Our Story</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mt-3 mb-6">
              Growing <span className="italic text-primary">Greener</span> Homes Since 2018
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Botanica began as a small greenhouse with a simple belief: every home deserves a touch of living beauty.
              Today we work with nurseries across three continents to deliver thoughtfully cultivated plants to plant
              lovers everywhere.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From the first cutting to your front door, we obsess over the details — soil quality, root health, packaging,
              and the care guidance you receive. Plants are living things, and we treat them that way.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl overflow-hidden shadow-xl h-[480px]"
          >
            <SafeImage
              src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=900&h=1100&fit=crop"
              alt="Botanica greenhouse"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">What We Stand For</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Four principles that shape every decision we make.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border/50 rounded-2xl p-6"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
