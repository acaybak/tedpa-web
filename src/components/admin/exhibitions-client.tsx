"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, MapPin, Calendar } from "lucide-react";
import { createExhibition, updateExhibition, deleteExhibition } from "@/actions/content-actions";
import { useRouter } from "next/navigation";

interface Exhibition { id: string; name: string; slug: string; country: string | null; city: string | null; startDate: Date; endDate: Date; status: string; boothNumber: string | null; }

const statusLabels: Record<string, string> = { UPCOMING: "Yaklaşan", ONGOING: "Devam Eden", COMPLETED: "Tamamlandı", CANCELLED: "İptal" };
const statusColors: Record<string, string> = { UPCOMING: "bg-blue-100 text-blue-700", ONGOING: "bg-green-100 text-green-700", COMPLETED: "bg-gray-100 text-gray-700", CANCELLED: "bg-red-100 text-red-700" };

export function ExhibitionsClient({ exhibitions }: { exhibitions: Exhibition[] }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Exhibition | null>(null);
  const [name, setName] = useState(""); const [country, setCountry] = useState(""); const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(""); const [endDate, setEndDate] = useState(""); const [boothNumber, setBoothNumber] = useState("");
  const [status, setStatus] = useState("UPCOMING"); const [saving, setSaving] = useState(false);

  const openCreate = () => { setEditing(null); setName(""); setCountry(""); setCity(""); setStartDate(""); setEndDate(""); setBoothNumber(""); setStatus("UPCOMING"); setDialogOpen(true); };
  const openEdit = (e: Exhibition) => { setEditing(e); setName(e.name); setCountry(e.country || ""); setCity(e.city || ""); setStartDate(new Date(e.startDate).toISOString().split("T")[0]); setEndDate(new Date(e.endDate).toISOString().split("T")[0]); setBoothNumber(e.boothNumber || ""); setStatus(e.status); setDialogOpen(true); };

  const handleSave = async () => {
    if (!name.trim() || !startDate || !endDate) return;
    setSaving(true);
    const data = { name, country: country || undefined, city: city || undefined, startDate, endDate, boothNumber: boothNumber || undefined, status, description: undefined, websiteUrl: undefined, coverImage: undefined, type: undefined };
    if (editing) { await updateExhibition(editing.id, data); } else { await createExhibition(data); }
    setSaving(false); setDialogOpen(false); router.refresh();
  };

  const handleDelete = async (id: string) => { if (confirm("Silmek istediğinize emin misiniz?")) { await deleteExhibition(id); router.refresh(); } };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-[#101114]">Fuarlar ve Etkinlikler</h1><p className="text-[#737B86] text-sm">{exhibitions.length} fuar</p></div>
        <Button onClick={openCreate} className="bg-[#E30613] hover:bg-[#c00511] text-white"><Plus className="w-4 h-4 mr-2" />Yeni Fuar</Button>
      </div>
      <div className="grid gap-4">
        {exhibitions.map((e) => (
          <Card key={e.id}><CardContent className="p-4 flex items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-[#101114]">{e.name}</h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-[#737B86]">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.city}{e.country ? `, ${e.country}` : ""}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(e.startDate).toLocaleDateString("tr-TR")} - {new Date(e.endDate).toLocaleDateString("tr-TR")}</span>
                {e.boothNumber && <span>Stand: {e.boothNumber}</span>}
              </div>
            </div>
            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusColors[e.status] || ""}`}>{statusLabels[e.status] || e.status}</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(e)}><Edit className="w-3 h-3" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(e.id)}><Trash2 className="w-3 h-3" /></Button>
            </div>
          </CardContent></Card>
        ))}
        {exhibitions.length === 0 && <Card><CardContent className="p-8 text-center text-[#737B86]">Henüz fuar eklenmemiş.</CardContent></Card>}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>{editing ? "Fuar Düzenle" : "Yeni Fuar"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Fuar Adı *</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Ülke</Label><Input value={country} onChange={(e) => setCountry(e.target.value)} /></div>
            <div><Label>Şehir</Label><Input value={city} onChange={(e) => setCity(e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Başlangıç *</Label><Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
            <div><Label>Bitiş *</Label><Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Stand No</Label><Input value={boothNumber} onChange={(e) => setBoothNumber(e.target.value)} /></div>
            <div><Label>Durum</Label><Select value={status} onValueChange={(v: string | null) => v && setStatus(v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="UPCOMING">Yaklaşan</SelectItem><SelectItem value="ONGOING">Devam Eden</SelectItem><SelectItem value="COMPLETED">Tamamlandı</SelectItem><SelectItem value="CANCELLED">İptal</SelectItem></SelectContent></Select></div>
          </div>
          <Button onClick={handleSave} disabled={saving} className="w-full bg-[#E30613] hover:bg-[#c00511] text-white">{saving ? "Kaydediliyor..." : editing ? "Güncelle" : "Oluştur"}</Button>
        </div>
      </DialogContent></Dialog>
    </div>
  );
}
