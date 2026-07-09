import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const getInitial = () => {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("theme");
  if (stored === "light") return false;
  if (stored === "dark") return true;
  return document.documentElement.classList.contains("dark");
};

const ThemeToggle = () => {
  const [dark, setDark] = useState<boolean>(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setDark((d) => !d)}
      className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </motion.button>
  );
};

export default ThemeToggle;
