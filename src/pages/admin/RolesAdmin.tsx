import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield, ShieldOff } from "lucide-react";
import { toast } from "sonner";

type Row = {
  user_id: string;
  full_name: string | null;
  is_admin: boolean;
};

const RolesAdmin = () => {
  const [rows, setRows] = useState<Row[]>([]);

  const load = async () => {
    const { data: profiles } = await supabase.from("profiles").select("id, full_name");
    const { data: roles } = await supabase.from("user_roles").select("user_id, role").eq("role", "admin");
    const admins = new Set((roles ?? []).map((r: any) => r.user_id));
    setRows((profiles ?? []).map((p: any) => ({
      user_id: p.id,
      full_name: p.full_name,
      is_admin: admins.has(p.id),
    })));
  };
  useEffect(() => { load(); }, []);

  const toggle = async (r: Row) => {
    if (r.is_admin) {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", r.user_id).eq("role", "admin");
      if (error) { toast.error(error.message); return; }
      toast.success("Admin role removed");
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: r.user_id, role: "admin" } as any);
      if (error) { toast.error(error.message); return; }
      toast.success("Promoted to admin");
    }
    load();
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        <h1 className="font-serif text-3xl font-bold mb-1">Roles</h1>
        <p className="text-muted-foreground mb-8">Manage admin access</p>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Role</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.user_id}>
                  <TableCell className="font-medium">{r.full_name || r.user_id.slice(0, 8)}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full ${r.is_admin ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {r.is_admin ? "Admin" : "Customer"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant={r.is_admin ? "outline" : "default"} onClick={() => toggle(r)}>
                      {r.is_admin ? <><ShieldOff className="h-4 w-4" /> Demote</> : <><Shield className="h-4 w-4" /> Make admin</>}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RolesAdmin;
