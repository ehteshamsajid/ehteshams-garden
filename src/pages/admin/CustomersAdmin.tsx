import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Row = { id: string; full_name: string | null; phone: string | null; created_at: string; order_count: number; total_spent: number };

const CustomersAdmin = () => {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    (async () => {
      const { data: profiles } = await supabase.from("profiles").select("id, full_name, phone, created_at");
      const { data: orders } = await supabase.from("orders").select("user_id, total");
      const agg = new Map<string, { count: number; spent: number }>();
      (orders ?? []).forEach((o: any) => {
        if (!o.user_id) return;
        const cur = agg.get(o.user_id) ?? { count: 0, spent: 0 };
        cur.count++; cur.spent += Number(o.total);
        agg.set(o.user_id, cur);
      });
      setRows((profiles ?? []).map((p: any) => ({
        ...p,
        order_count: agg.get(p.id)?.count ?? 0,
        total_spent: agg.get(p.id)?.spent ?? 0,
      })));
    })();
  }, []);

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="font-serif text-3xl font-bold mb-1">Customers</h1>
        <p className="text-muted-foreground mb-8">{rows.length} registered</p>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Phone</TableHead><TableHead>Orders</TableHead><TableHead>Total spent</TableHead><TableHead>Joined</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.full_name || "—"}</TableCell>
                  <TableCell>{r.phone || "—"}</TableCell>
                  <TableCell>{r.order_count}</TableCell>
                  <TableCell>${r.total_spent.toFixed(2)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No customers yet</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CustomersAdmin;
