import { motion } from "framer-motion";
import { Leaf, Menu, X, ShoppingCart, LogIn, LogOut, LayoutDashboard, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { count } = useCart();
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-semibold text-foreground">Ehtesham's Garden</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/cart"
            className="relative h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-primary/30 text-primary px-3 py-1.5 text-xs font-medium hover:bg-primary/5"
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={async () => { await signOut(); navigate("/"); }}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-2 text-xs font-medium text-foreground hover:bg-muted/80"
              title={user.email ?? undefined}
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          ) : (
            <Link
              to="/auth"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <LogIn className="h-3.5 w-3.5" /> Sign in
            </Link>
          )}
          <button
            className="md:hidden h-9 w-9 flex items-center justify-center text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          {isAdmin && (
            <Link to="/admin" className="block text-sm font-medium text-primary" onClick={() => setMobileOpen(false)}>Admin Panel</Link>
          )}
          {user ? (
            <button onClick={async () => { await signOut(); setMobileOpen(false); navigate("/"); }} className="block w-full text-left text-sm font-medium text-foreground">Sign out</button>
          ) : (
            <Link to="/auth" className="block text-sm font-medium text-primary" onClick={() => setMobileOpen(false)}>Sign in</Link>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
