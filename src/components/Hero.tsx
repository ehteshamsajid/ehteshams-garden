import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SafeImage from "./SafeImage";

const Hero = () => {
  const navigate = useNavigate();
  const scrollToCollection = () => {
    navigate("/shop");
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23228B22' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            🌿 Curated Plant Collection
          </motion.span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] text-foreground mb-6">
            Bring Nature
            <br />
            <span className="italic text-primary">Into Your</span>
            <br />
            Living Space
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
            Discover our hand-picked collection of rare and beautiful plants,
            each one carefully nurtured to thrive in your home.
          </p>
          <div className="flex gap-4">
            <motion.button
              onClick={scrollToCollection}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-primary px-8 py-3.5 text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
            >
              Browse Plants
            </motion.button>
            <motion.button
              onClick={() => navigate("/about")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-border px-8 py-3.5 font-medium text-foreground hover:bg-muted transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <div className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-2xl overflow-hidden shadow-xl row-span-2 h-[420px]"
            >
              <SafeImage src="https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=600&h=800&fit=crop" alt="Lush green monstera plant" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="rounded-2xl overflow-hidden shadow-xl h-[200px]">
              <SafeImage src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&h=300&fit=crop" alt="Beautiful succulent plant" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="rounded-2xl overflow-hidden shadow-xl h-[200px]">
              <SafeImage src="https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&h=300&fit=crop" alt="Indoor plants collection" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-lg">🌱</span>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">200+ Species</p>
                <p className="text-xs text-muted-foreground">Rare & exotic plants</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToCollection}
      >
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default Hero;
