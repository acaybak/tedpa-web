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
import { Plus, Edit, Trash2 } from "lucide-react";
import { createNewsArticle, updateNewsArticle, deleteNewsArticle } from "@/actions/content-actions";
import { useRouter } from "next/navigation";

interface Article { id: string; title: string; slug: string; status: string; author: string | null; publishDate: Date | null; category: { id: string; name: string } | null; }
interface Category { id: string; name: string; }

const statusLabels: Record<string, string> = { DRAFT: "Taslak", SCHEDULED: "Zamanlanmış", PUBLISHED: "Yayında", ARCHIVED: "Arşiv" };
const statusColors: Record<string, string> = { DRAFT: "bg-gray-100 text-gray-700", PUBLISHED: "bg-green-100 text-green-700", SCHEDULED: "bg-blue-100 text-blue-700", ARCHIVED: "bg-orange-100 text-orange-700" };

export function NewsClient({ articles, categories }: { articles: Article[]; categories: Category[] }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [title, setTitle] = useState(""); const [excerpt, setExcerpt] = useState(""); const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(""); const [author, setAuthor] = useState(""); const [status, setStatus] = useState("DRAFT");
  const [saving, setSaving] = useState(false);

  const openCreate = () => { setEditing(null); setTitle(""); setExcerpt(""); setContent(""); setCategoryId(""); setAuthor(""); setStatus("DRAFT"); setDialogOpen(true); };
  const openEdit = (a: Article) => { setEditing(a); setTitle(a.title); setCategoryId(a.category?.id || ""); setStatus(a.status); setAuthor(a.author || ""); setDialogOpen(true); };

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    const data = { title, excerpt: excerpt || undefined, content: content || undefined, categoryId: categoryId || null, author: author || undefined, status, tags: [] as string[] };
    if (editing) { await updateNewsArticle(editing.id, data); } else { await createNewsArticle(data); }
    setSaving(false); setDialogOpen(false); router.refresh();
  };

  const handleDelete = async (id: string) => { if (confirm("Silmek istediğinize emin misiniz?")) { await deleteNewsArticle(id); router.refresh(); } };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-[#101114]">Haberler</h1><p className="text-[#737B86] text-sm">{articles.length} haber</p></div>
        <Button onClick={openCreate} className="bg-[#E30613] hover:bg-[#c00511] text-white"><Plus className="w-4 h-4 mr-2" />Yeni Haber</Button>
      </div>
      <Card><CardContent className="p-0">
        {articles.length === 0 ? <div className="p-8 text-center text-[#737B86]">Henüz haber eklenmemiş.</div> : (
          <table className="w-full"><thead><tr className="border-b bg-gray-50">
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Başlık</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Kategori</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Durum</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Tarih</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">İşlem</th>
          </tr></thead><tbody>
            {articles.map((a: Article) => (
              <tr key={a.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-[#101114]">{a.title}</td>
                <td className="px-4 py-3 text-sm text-[#737B86]">{a.category?.name || "—"}</td>
                <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusColors[a.status] || ""}`}>{statusLabels[a.status] || a.status}</span></td>
                <td className="px-4 py-3 text-sm text-[#737B86]">{a.publishDate ? new Date(a.publishDate).toLocaleDateString("tr-TR") : "—"}</td>
                <td className="px-4 py-3"><div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(a)}><Edit className="w-3 h-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(a.id)}><Trash2 className="w-3 h-3" /></Button>
                </div></td>
              </tr>
            ))}
          </tbody></table>
        )}
      </CardContent></Card>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>{editing ? "Haber Düzenle" : "Yeni Haber"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Başlık *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div><Label>Özet</Label><Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} /></div>
          <div><Label>İçerik</Label><Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Kategori</Label><Select value={categoryId} onValueChange={(v: string | null) => v && setCategoryId(v)}><SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger><SelectContent>{categories.map((c: Category) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Durum</Label><Select value={status} onValueChange={(v: string | null) => v && setStatus(v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="DRAFT">Taslak</SelectItem><SelectItem value="PUBLISHED">Yayınla</SelectItem><SelectItem value="SCHEDULED">Zamanla</SelectItem></SelectContent></Select></div>
          </div>
          <div><Label>Yazar</Label><Input value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
          <Button onClick={handleSave} disabled={saving} className="w-full bg-[#E30613] hover:bg-[#c00511] text-white">{saving ? "Kaydediliyor..." : editing ? "Güncelle" : "Oluştur"}</Button>
        </div>
      </DialogContent></Dialog>
    </div>
  );
}
