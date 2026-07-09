import { motion } from "framer-motion";
import { Leaf, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-semibold text-foreground">Ehtesham's Garden</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              A moody, hand-curated collection of rare plants — bringing depth, texture, and life into your space.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Categories", to: "/categories" },
                { label: "Shop", to: "/shop" },
                { label: "Indoor", to: "/plants/indoor" },
                { label: "Outdoor", to: "/plants/outdoor" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Cart", to: "/cart" },
                { label: "FAQ", to: "/contact" },
                { label: "Shipping", to: "/contact" },
                { label: "Plant Care", to: "/about" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground">© 2026 Ehtesham's Garden. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
