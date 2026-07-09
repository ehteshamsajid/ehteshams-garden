import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Msg = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
};

const MessagesAdmin = () => {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [open, setOpen] = useState<Msg | null>(null);

  const load = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMsgs((data as any) ?? []);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (m: Msg, status: Msg["status"]) => {
    const { error } = await supabase.from("contact_messages").update({ status }).eq("id", m.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Updated"); load();
    if (open) setOpen({ ...open, status });
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="font-serif text-3xl font-bold mb-1">Messages</h1>
        <p className="text-muted-foreground mb-8">{msgs.filter(m => m.status === "new").length} new</p>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead>From</TableHead><TableHead>Message</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
            <TableBody>
              {msgs.map((m) => (
                <TableRow key={m.id} className="cursor-pointer" onClick={() => { setOpen(m); if (m.status === "new") setStatus(m, "read"); }}>
                  <TableCell><p className="font-medium">{m.name}</p><p className="text-xs text-muted-foreground">{m.email}</p></TableCell>
                  <TableCell className="max-w-md truncate">{m.message}</TableCell>
                  <TableCell><span className={`text-xs px-2 py-1 rounded-full capitalize ${m.status === "new" ? "bg-blue-100 text-blue-700" : "bg-muted"}`}>{m.status}</span></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {msgs.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No messages yet</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{open?.subject || "Message"}</DialogTitle></DialogHeader>
          {open && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>{open.name} · {open.email}</span><span>{new Date(open.created_at).toLocaleString()}</span></div>
              <p className="whitespace-pre-wrap border border-border rounded-lg p-4 bg-muted/30">{open.message}</p>
              <div className="flex gap-2">
                <Button size="sm" variant={open.status === "replied" ? "default" : "outline"} onClick={() => setStatus(open, "replied")}>Mark replied</Button>
                <Button size="sm" variant="outline" asChild><a href={`mailto:${open.email}`}>Reply via email</a></Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default MessagesAdmin;
