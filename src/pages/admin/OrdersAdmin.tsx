import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  phone: string;
  address: string;
  payment_method: string;
  status: string;
  total: number;
  created_at: string;
};

type OrderItem = {
  id: string;
  plant_name: string;
  quantity: number;
  unit_price: number;
};

const statuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

const OrdersAdmin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);

  const load = async () => {
    let q = supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter as any);
    const { data } = await q;
    setOrders((data as any) ?? []);
  };
  useEffect(() => { load(); }, [filter]);

  const openOrder = async (o: Order) => {
    setSelected(o);
    const { data } = await supabase.from("order_items").select("*").eq("order_id", o.id);
    setItems((data as any) ?? []);
  };

  const updateStatus = async (status: string) => {
    if (!selected) return;
    const { error } = await supabase.from("orders").update({ status: status as any }).eq("id", selected.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Status updated");
    setSelected({ ...selected, status });
    load();
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground">{orders.length} {filter === "all" ? "total" : filter}</p>
          </div>
          <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All statuses</option>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id} className="cursor-pointer" onClick={() => openOrder(o)}>
                  <TableCell>
                    <p className="font-medium">{o.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{o.customer_email}</p>
                  </TableCell>
                  <TableCell className="uppercase text-xs">{o.payment_method}</TableCell>
                  <TableCell>${Number(o.total).toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted capitalize">{o.status}</span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No orders yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Order details</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-muted-foreground">Customer</p><p className="font-medium">{selected.customer_name}</p></div>
                <div><p className="text-muted-foreground">Phone</p><p className="font-medium">{selected.phone}</p></div>
                <div className="col-span-2"><p className="text-muted-foreground">Email</p><p className="font-medium">{selected.customer_email}</p></div>
                <div className="col-span-2"><p className="text-muted-foreground">Address</p><p className="font-medium">{selected.address}</p></div>
                <div><p className="text-muted-foreground">Method</p><p className="font-medium uppercase">{selected.payment_method}</p></div>
                <div><p className="text-muted-foreground">Total</p><p className="font-medium">${Number(selected.total).toFixed(2)}</p></div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Items</p>
                <div className="space-y-1">
                  {items.map((it) => (
                    <div key={it.id} className="flex justify-between border-b border-border py-1.5">
                      <span>{it.plant_name} × {it.quantity}</span>
                      <span>${(it.unit_price * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Update status</p>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((s) => (
                    <Button key={s} size="sm" variant={selected.status === s ? "default" : "outline"} onClick={() => updateStatus(s)}>
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default OrdersAdmin;
