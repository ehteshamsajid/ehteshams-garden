import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, CreditCard, Smartphone, Wallet, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type PaymentMethod = "jazzcash" | "easypaisa" | "card";

const Cart = () => {
  const { items, updateQty, removeItem, total, clear } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [method, setMethod] = useState<PaymentMethod>("jazzcash");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const shipping = items.length > 0 ? 5 : 0;
  const grand = total + shipping;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to place an order");
      navigate("/auth");
      return;
    }
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill in your details");
      return;
    }
    if (method === "card" && (!form.cardNumber || !form.expiry || !form.cvv)) {
      toast.error("Please fill in card details");
      return;
    }
    setProcessing(true);
    try {
      const { data: order, error: oerr } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          customer_name: form.name,
          customer_email: user.email ?? "",
          phone: form.phone,
          address: form.address,
          payment_method: method,
          total: grand,
        } as any)
        .select()
        .single();
      if (oerr) throw oerr;
      const itemsPayload = items.map((it) => ({
        order_id: order.id,
        plant_id: it.id,
        plant_name: it.name,
        quantity: it.quantity,
        unit_price: it.price,
      }));
      const { error: ierr } = await supabase.from("order_items").insert(itemsPayload as any);
      if (ierr) throw ierr;
      setSuccess(true);
      clear();
      toast.success(`Order placed! Total $${grand.toFixed(2)} via ${method.toUpperCase()}`);
    } catch (err: any) {
      toast.error(err.message || "Could not place order");
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 pb-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-3">Order Confirmed</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. Your plants are on their way!
            </p>
            <button
              onClick={() => navigate("/")}
              className="rounded-full bg-primary px-8 py-3 text-primary-foreground font-medium"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">Your Cart</h1>
        <p className="text-muted-foreground mb-10">
          Review your items and choose how you'd like to pay.
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="h-20 w-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl text-foreground mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Browse our collection and add some greenery.</p>
            <Link to="/" className="inline-block rounded-full bg-primary px-8 py-3 text-primary-foreground font-medium">
              Browse Plants
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Items + Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Items review */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Items ({items.length})</h2>
                <div className="space-y-3">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 p-4 rounded-2xl border border-border bg-card"
                      >
                        <Link to={`/plant/${item.id}`} className="h-24 w-24 rounded-xl overflow-hidden flex-shrink-0">
                          <SafeImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.species}</p>
                          <Link to={`/plant/${item.id}`} className="font-serif text-lg font-semibold text-foreground hover:text-primary">
                            {item.name}
                          </Link>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-border rounded-full">
                              <button
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-destructive"
                                aria-label="Remove"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Payment Method</h2>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { id: "jazzcash" as const, label: "JazzCash", icon: Smartphone },
                    { id: "easypaisa" as const, label: "EasyPaisa", icon: Wallet },
                    { id: "card" as const, label: "Credit Card", icon: CreditCard },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-colors ${
                        method === m.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <m.icon className={`h-6 w-6 ${method === m.id ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${method === m.id ? "text-primary" : "text-foreground"}`}>
                        {m.label}
                      </span>
                    </button>
                  ))}
                </div>

                <form onSubmit={handlePay} className="space-y-4 p-6 rounded-2xl border border-border bg-card">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Full name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="03XX XXXXXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Delivery address</label>
                    <input
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Street, city, postal code"
                    />
                  </div>

                  {method === "card" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Card number</label>
                        <input
                          value={form.cardNumber}
                          onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">Expiry</label>
                          <input
                            value={form.expiry}
                            onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">CVV</label>
                          <input
                            value={form.cvv}
                            onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {(method === "jazzcash" || method === "easypaisa") && (
                    <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                      You'll receive a payment confirmation request on your {method === "jazzcash" ? "JazzCash" : "EasyPaisa"} account linked to the phone number above.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={processing}
                    whileHover={{ scale: processing ? 1 : 1.01 }}
                    whileTap={{ scale: processing ? 1 : 0.99 }}
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-primary-foreground font-medium shadow-lg shadow-primary/25 disabled:opacity-60"
                  >
                    {processing ? "Processing…" : `Pay $${grand.toFixed(2)}`}
                  </motion.button>
                </form>
              </section>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border my-3" />
                  <div className="flex justify-between text-foreground font-semibold text-lg">
                    <span>Total</span>
                    <span>${grand.toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Secure checkout. Your details are protected.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
