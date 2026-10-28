"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { createBanner, updateBanner, deleteBanner } from "@/actions/content-actions";
import { useRouter } from "next/navigation";

interface Banner { id: string; title: string; imageUrl: string; buttonText: string | null; buttonLink: string | null; order: number; isActive: boolean; publishStart: Date | null; publishEnd: Date | null; }

export function BannersClient({ banners }: { banners: Banner[] }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [saving, setSaving] = useState(false);

  const openCreate = () => { setEditing(null); setTitle(""); setImageUrl(""); setButtonText(""); setButtonLink(""); setDialogOpen(true); };
  const openEdit = (b: Banner) => { setEditing(b); setTitle(b.title); setImageUrl(b.imageUrl); setButtonText(b.buttonText || ""); setButtonLink(b.buttonLink || ""); setDialogOpen(true); };

  const handleSave = async () => {
    if (!title.trim() || !imageUrl.trim()) return;
    setSaving(true);
    const data = { title, imageUrl, buttonText: buttonText || undefined, buttonLink: buttonLink || undefined, order: editing?.order ?? 0, isActive: editing?.isActive ?? true };
    if (editing) { await updateBanner(editing.id, data); } else { await createBanner(data); }
    setSaving(false); setDialogOpen(false); router.refresh();
  };

  const handleDelete = async (id: string) => { if (confirm("Silmek istediğinize emin misiniz?")) { await deleteBanner(id); router.refresh(); } };
  const handleToggle = async (b: Banner) => { await updateBanner(b.id, { ...b, title: b.title, imageUrl: b.imageUrl, buttonText: b.buttonText || undefined, buttonLink: b.buttonLink || undefined, isActive: !b.isActive }); router.refresh(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-[#101114]">Banner Yönetimi</h1><p className="text-[#737B86] text-sm">{banners.length} banner</p></div>
        <Button onClick={openCreate} className="bg-[#E30613] hover:bg-[#c00511] text-white"><Plus className="w-4 h-4 mr-2" />Yeni Banner</Button>
      </div>
      <div className="grid gap-4">
        {banners.map((b) => (
          <Card key={b.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-32 h-20 bg-gray-100 rounded overflow-hidden shrink-0"><img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" /></div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#101114]">{b.title}</h3>
                <p className="text-xs text-[#737B86]">{b.buttonText || "Buton yok"} {b.buttonLink ? `→ ${b.buttonLink}` : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToggle(b)}>{b.isActive ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-gray-400" />}</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(b)}><Edit className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(b.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {banners.length === 0 && <Card><CardContent className="p-8 text-center text-[#737B86]">Henüz banner eklenmemiş.</CardContent></Card>}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent><DialogHeader><DialogTitle>{editing ? "Banner Düzenle" : "Yeni Banner"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Başlık *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
            <div><Label>Görsel URL *</Label><Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Buton Metni</Label><Input value={buttonText} onChange={(e) => setButtonText(e.target.value)} /></div>
              <div><Label>Buton Link</Label><Input value={buttonLink} onChange={(e) => setButtonLink(e.target.value)} /></div>
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-[#E30613] hover:bg-[#c00511] text-white">{saving ? "Kaydediliyor..." : editing ? "Güncelle" : "Oluştur"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
