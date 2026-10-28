"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Download, FileText } from "lucide-react";
import { createCatalog, updateCatalog, deleteCatalog } from "@/actions/content-actions";
import { useRouter } from "next/navigation";

interface Catalog { id: string; title: string; slug: string; pdfUrl: string; coverImage: string | null; category: string | null; language: string; isActive: boolean; }

export function CatalogsClient({ catalogs }: { catalogs: Catalog[] }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Catalog | null>(null);
  const [title, setTitle] = useState(""); const [pdfUrl, setPdfUrl] = useState(""); const [category, setCategory] = useState(""); const [language, setLanguage] = useState("tr");
  const [saving, setSaving] = useState(false);

  const openCreate = () => { setEditing(null); setTitle(""); setPdfUrl(""); setCategory(""); setLanguage("tr"); setDialogOpen(true); };
  const openEdit = (c: Catalog) => { setEditing(c); setTitle(c.title); setPdfUrl(c.pdfUrl); setCategory(c.category || ""); setLanguage(c.language); setDialogOpen(true); };

  const handleSave = async () => {
    if (!title.trim() || !pdfUrl.trim()) return;
    setSaving(true);
    const data = { title, pdfUrl, category: category || undefined, language, coverImage: undefined, isActive: editing?.isActive ?? true };
    if (editing) { await updateCatalog(editing.id, data); } else { await createCatalog(data); }
    setSaving(false); setDialogOpen(false); router.refresh();
  };

  const handleDelete = async (id: string) => { if (confirm("Silmek istediğinize emin misiniz?")) { await deleteCatalog(id); router.refresh(); } };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-[#101114]">Kataloglar</h1><p className="text-[#737B86] text-sm">{catalogs.length} katalog</p></div>
        <Button onClick={openCreate} className="bg-[#E30613] hover:bg-[#c00511] text-white"><Plus className="w-4 h-4 mr-2" />Yeni Katalog</Button>
      </div>
      <div className="grid gap-4">
        {catalogs.map((c) => (
          <Card key={c.id}><CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded flex items-center justify-center shrink-0"><FileText className="w-6 h-6 text-[#E30613]" /></div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#101114]">{c.title}</h3>
              <p className="text-xs text-[#737B86]">{c.category || "Kategorisiz"} · {c.language.toUpperCase()}</p>
            </div>
            <a href={c.pdfUrl} target="_blank" rel="noopener noreferrer"><Button variant="ghost" size="icon" className="h-8 w-8"><Download className="w-4 h-4" /></Button></a>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(c)}><Edit className="w-3 h-3" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(c.id)}><Trash2 className="w-3 h-3" /></Button>
          </CardContent></Card>
        ))}
        {catalogs.length === 0 && <Card><CardContent className="p-8 text-center text-[#737B86]">Henüz katalog eklenmemiş.</CardContent></Card>}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>{editing ? "Katalog Düzenle" : "Yeni Katalog"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Başlık *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div><Label>PDF URL *</Label><Input value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} placeholder="https://..." /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Kategori</Label><Input value={category} onChange={(e) => setCategory(e.target.value)} /></div>
            <div><Label>Dil</Label><Input value={language} onChange={(e) => setLanguage(e.target.value)} /></div>
          </div>
          <Button onClick={handleSave} disabled={saving} className="w-full bg-[#E30613] hover:bg-[#c00511] text-white">{saving ? "Kaydediliyor..." : editing ? "Güncelle" : "Oluştur"}</Button>
        </div>
      </DialogContent></Dialog>
    </div>
  );
}
