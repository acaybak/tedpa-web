"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { createCategory, updateCategory, deleteCategory } from "@/actions/product-actions";
import { useRouter } from "next/navigation";

interface Category { id: string; name: string; slug: string; order: number; isActive: boolean; parent: { name: string } | null; }

export function CategoriesClient({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState(""); const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const openCreate = () => { setEditing(null); setName(""); setDescription(""); setDialogOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); setName(c.name); setDescription(c.slug); setDialogOpen(true); };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const data = { name, description: description || undefined };
    if (editing) { await updateCategory(editing.id, data); } else { await createCategory(data); }
    setSaving(false); setDialogOpen(false); router.refresh();
  };

  const handleDelete = async (id: string) => { if (confirm("Silmek istediğinize emin misiniz?")) { await deleteCategory(id); router.refresh(); } };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-[#101114]">Kategoriler</h1><p className="text-[#737B86] text-sm">{categories.length} kategori</p></div>
        <Button onClick={openCreate} className="bg-[#E30613] hover:bg-[#c00511] text-white"><Plus className="w-4 h-4 mr-2" />Yeni Kategori</Button>
      </div>
      <div className="grid gap-3">
        {categories.map((c) => (
          <Card key={c.id}><CardContent className="p-4 flex items-center gap-4">
            <div className="flex-1"><h3 className="font-semibold text-[#101114]">{c.name}</h3><p className="text-xs text-[#737B86]">/{c.slug}{c.parent ? ` · Üst: ${c.parent.name}` : ""}</p></div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(c)}><Edit className="w-3 h-3" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(c.id)}><Trash2 className="w-3 h-3" /></Button>
          </CardContent></Card>
        ))}
        {categories.length === 0 && <Card><CardContent className="p-8 text-center text-[#737B86]">Henüz kategori eklenmemiş.</CardContent></Card>}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>{editing ? "Kategori Düzenle" : "Yeni Kategori"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Kategori Adı *</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Açıklama</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} /></div>
          <Button onClick={handleSave} disabled={saving} className="w-full bg-[#E30613] hover:bg-[#c00511] text-white">{saving ? "Kaydediliyor..." : editing ? "Güncelle" : "Oluştur"}</Button>
        </div>
      </DialogContent></Dialog>
    </div>
  );
}
