import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data as any);
    setSending(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Message sent!", { description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", message: "" });
  };

  const channels = [
    { icon: Mail, label: "Email", value: "hello@botanica.shop" },
    { icon: Phone, label: "Phone", value: "+1 (555) 010-2030" },
    { icon: MapPin, label: "Studio", value: "221 Fern Lane, Portland OR" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Get in Touch</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mt-3 mb-4">
              Let's <span className="italic text-primary">Talk Plants</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Questions about care, custom orders, or wholesale? Drop us a line — we love hearing from fellow plant lovers.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-4"
            >
              {channels.map((c) => (
                <div key={c.label} className="flex gap-4 p-5 rounded-2xl bg-card border border-border/50">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{c.label}</p>
                    <p className="font-medium text-foreground">{c.value}</p>
                  </div>
                </div>
              ))}
              <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20">
                <p className="font-serif text-lg font-semibold text-foreground mb-1">Studio Hours</p>
                <p className="text-sm text-muted-foreground">Mon–Fri · 9am – 6pm PST</p>
                <p className="text-sm text-muted-foreground">Saturday · 10am – 4pm PST</p>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="lg:col-span-3 bg-card border border-border/50 rounded-3xl p-8 space-y-5"
            >
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              >
                <Send className="h-4 w-4" /> Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
