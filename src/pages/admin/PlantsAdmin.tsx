import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { PLANT_CATEGORIES, CATEGORY_META, PlantCategory } from "@/data/plants";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type PlantRow = Database["public"]["Tables"]["plants"]["Row"];
type PlantDifficulty = Database["public"]["Enums"]["plant_difficulty"];

type Plant = Omit<PlantRow, "gallery" | "care" | "category" | "difficulty"> & {
  category: PlantCategory;
  difficulty: PlantDifficulty;
  gallery: string[];
  care: Record<string, string>;
};

const mapRow = (r: PlantRow): Plant => ({
  ...r,
  category: r.category as PlantCategory,
  difficulty: r.difficulty,
  gallery: Array.isArray(r.gallery) ? (r.gallery as string[]) : [],
  care: (r.care as Record<string, string>) ?? {},
});


const empty: Plant = {
  id: "", name: "", species: "", description: "", price: 0,
  category: "indoor", difficulty: "Easy" as PlantDifficulty, size: "", light: "", water: "",
  pet_friendly: false, image_url: "", gallery: [], care: {}, in_stock: true,
} as Plant;

const PlantsAdmin = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [editing, setEditing] = useState<Plant | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("plants").select("*").order("name");
    setPlants(((data as PlantRow[]) ?? []).map(mapRow));
  };
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.id || !editing.name) {
      toast.error("ID and name are required");
      return;
    }
    const payload = { ...editing, price: Number(editing.price), gallery: editing.gallery, care: editing.care };
    const { error } = isNew
      ? await supabase.from("plants").insert(payload as Database["public"]["Tables"]["plants"]["Insert"])
      : await supabase.from("plants").update(payload as Database["public"]["Tables"]["plants"]["Update"]).eq("id", editing.id);
    if (error) { toast.error(error.message); return; }
    toast.success(isNew ? "Plant created" : "Plant updated");
    setEditing(null); setIsNew(false); load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this plant?")) return;
    const { error } = await supabase.from("plants").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted"); load();
  };

  const handleUpload = async (file: File) => {
    if (!editing) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${editing.id || crypto.randomUUID()}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("plant-images").upload(path, file);
    if (error) { toast.error(error.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("plant-images").getPublicUrl(path);
    setEditing({ ...editing, image_url: publicUrl });
    setUploading(false);
    toast.success("Image uploaded");
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold">Plants</h1>
            <p className="text-muted-foreground">{plants.length} in catalog</p>
          </div>
          <Button onClick={() => { setEditing({ ...empty }); setIsNew(true); }}>
            <Plus className="h-4 w-4" /> Add Plant
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plants.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={p.image_url} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.species}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{p.category}</TableCell>
                  <TableCell>${Number(p.price).toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full ${p.in_stock ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                      {p.in_stock ? "In stock" : "Out"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setEditing({ ...p, gallery: p.gallery ?? [], care: p.care ?? {} }); setIsNew(false); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "New plant" : "Edit plant"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium block mb-1">ID (slug)</label>
                  <Input value={editing.id} disabled={!isNew} onChange={(e) => setEditing({ ...editing, id: e.target.value })} placeholder="monstera-deliciosa" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Name</label>
                  <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Species</label>
                  <Input value={editing.species} onChange={(e) => setEditing({ ...editing, species: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Price ($)</label>
                  <Input type="number" step="0.01" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Category</label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as PlantCategory })}>
                    {PLANT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{CATEGORY_META[c].title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Difficulty</label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={editing.difficulty} onChange={(e) => setEditing({ ...editing, difficulty: e.target.value as PlantDifficulty })}>                     <option>Easy</option><option>Moderate</option><option>Expert</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Light</label>
                  <Input value={editing.light ?? ""} onChange={(e) => setEditing({ ...editing, light: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Water</label>
                  <Input value={editing.water ?? ""} onChange={(e) => setEditing({ ...editing, water: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Size</label>
                  <Input value={editing.size ?? ""} onChange={(e) => setEditing({ ...editing, size: e.target.value })} />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.in_stock} onChange={(e) => setEditing({ ...editing, in_stock: e.target.checked })} /> In stock</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.pet_friendly} onChange={(e) => setEditing({ ...editing, pet_friendly: e.target.checked })} /> Pet friendly</label>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Description</label>
                <Textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Main image URL</label>
                <div className="flex gap-2">
                  <Input value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
                  <Button type="button" variant="outline" disabled={uploading} asChild>
                    <label className="cursor-pointer"><Upload className="h-4 w-4" />
                      <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                    </label>
                  </Button>
                </div>
                {editing.image_url && <img src={editing.image_url} alt="" className="mt-2 h-24 w-24 object-cover rounded-lg" />}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default PlantsAdmin;