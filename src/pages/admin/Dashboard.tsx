import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Leaf, ShoppingBag, DollarSign, MessageSquare, Users, Clock } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    plants: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
    messages: 0,
    customers: 0,
  });

  useEffect(() => {
    (async () => {
      const [p, o, m, c, paid] = await Promise.all([
        supabase.from("plants").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("total, status", { count: "exact" }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("total").in("status", ["paid", "shipped", "delivered"]),
      ]);
      const orders = o.data ?? [];
      const pending = orders.filter((x: any) => x.status === "pending").length;
      const revenue = (paid.data ?? []).reduce((s: number, r: any) => s + Number(r.total), 0);
      setStats({
        plants: p.count ?? 0,
        orders: o.count ?? 0,
        revenue,
        pending,
        messages: m.count ?? 0,
        customers: c.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Plants in catalog", value: stats.plants, icon: Leaf, tint: "bg-primary/15 text-primary ring-primary/25" },
    { label: "Total orders", value: stats.orders, icon: ShoppingBag, tint: "bg-accent/15 text-accent ring-accent/25" },
    { label: "Revenue", value: `$${stats.revenue.toFixed(2)}`, tint: "bg-primary/15 text-primary ring-primary/25", icon: DollarSign },
    { label: "Pending orders", value: stats.pending, icon: Clock, tint: "bg-accent/15 text-accent ring-accent/25" },
    { label: "New messages", value: stats.messages, icon: MessageSquare, tint: "bg-primary/15 text-primary ring-primary/25" },
    { label: "Customers", value: stats.customers, icon: Users, tint: "bg-accent/15 text-accent ring-accent/25" },
  ];

  return (
    <AdminLayout>
      <div className="p-8 max-w-6xl">
        <h1 className="font-serif text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Overview of your garden store</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-3 ring-1 ${c.tint}`}>
                <c.icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <p className="text-2xl font-bold mt-1 font-serif">{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
