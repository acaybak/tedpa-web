"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateQuoteStatus, addQuoteInternalNote } from "@/actions/admin-quote-actions";
import { ArrowLeft, Printer, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const statusOptions = [
  { value: "NEW", label: "Yeni" },
  { value: "IN_REVIEW", label: "İnceleniyor" },
  { value: "CUSTOMER_CONTACTED", label: "Müşteriyle Görüşüldü" },
  { value: "QUOTE_PREPARED", label: "Teklif Hazırlandı" },
  { value: "COMPLETED", label: "Sonuçlandı" },
  { value: "LOST", label: "Kaybedildi" },
  { value: "CANCELLED", label: "İptal" },
];

const statusColors: Record<string, string> = {
  NEW: "bg-green-100 text-green-700",
  IN_REVIEW: "bg-blue-100 text-blue-700",
  CUSTOMER_CONTACTED: "bg-purple-100 text-purple-700",
  QUOTE_PREPARED: "bg-orange-100 text-orange-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  LOST: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<string, string> = {
  NEW: "Yeni", IN_REVIEW: "İnceleniyor", CUSTOMER_CONTACTED: "Müşteriyle Görüşüldü",
  QUOTE_PREPARED: "Teklif Hazırlandı", COMPLETED: "Sonuçlandı", LOST: "Kaybedildi", CANCELLED: "İptal",
};

interface QuoteItem {
  id: string;
  productNameSnapshot: string;
  productCodeSnapshot: string | null;
  quantity: number;
  notes: string | null;
}

interface HistoryEntry {
  id: string;
  action: string;
  oldValue: string | null;
  newValue: string | null;
  note: string | null;
  performedBy: string | null;
  createdAt: Date;
}

interface QuoteData {
  id: string;
  requestNumber: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string | null;
  status: string;
  internalNotes: string | null;
  lostReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: QuoteItem[];
  history: HistoryEntry[];
  assignedUser: { id: string; fullName: string } | null;
  notifications: { id: string; type: string; status: string; errorMessage: string | null; createdAt: Date }[];
}

export function QuoteDetailClient({ quote }: { quote: QuoteData }) {
  const router = useRouter();
  const [status, setStatus] = useState(quote.status);
  const [internalNotes, setInternalNotes] = useState(quote.internalNotes || "");
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);
  const [lostReason, setLostReason] = useState(quote.lostReason || "");

  const handleStatusUpdate = async () => {
    setSaving(true);
    await updateQuoteStatus(quote.id, {
      status,
      internalNotes,
      lostReason: status === "LOST" ? lostReason : undefined,
    });
    setSaving(false);
    router.refresh();
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setSaving(true);
    await addQuoteInternalNote(quote.id, noteText.trim());
    setNoteText("");
    setSaving(false);
    router.refresh();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div className="flex items-center gap-3">
          <Link href="/admin/quotes">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#101114]">Teklif #{quote.requestNumber}</h1>
            <p className="text-sm text-[#737B86]">
              {new Date(quote.createdAt).toLocaleString("tr-TR")}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-2" />
          Yazdır
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Info */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-[#101114] mb-4">Firma Bilgileri</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-xs text-[#737B86]">Firma</Label><p className="font-medium">{quote.companyName}</p></div>
                <div><Label className="text-xs text-[#737B86]">İletişim</Label><p className="font-medium">{quote.contactName}</p></div>
                <div><Label className="text-xs text-[#737B86]">E-posta</Label><p className="font-medium">{quote.email}</p></div>
                <div><Label className="text-xs text-[#737B86]">Telefon</Label><p className="font-medium">{quote.phone}</p></div>
              </div>
              {quote.message && (
                <div className="mt-4">
                  <Label className="text-xs text-[#737B86]">Mesaj</Label>
                  <p className="text-sm mt-1">{quote.message}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Products */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b"><h2 className="font-semibold text-[#101114]">Talep Edilen Ürünler</h2></div>
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-2">Ürün</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-2">Kod</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-2">Miktar</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-2">Not</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.items.map((item: QuoteItem) => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="px-4 py-3 text-sm font-medium">{item.productNameSnapshot}</td>
                      <td className="px-4 py-3 text-sm text-[#737B86] font-mono">{item.productCodeSnapshot || "-"}</td>
                      <td className="px-4 py-3 text-sm">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-[#737B86]">{item.notes || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* History */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-[#101114] mb-4">İşlem Geçmişi</h2>
              {quote.history.length === 0 ? (
                <p className="text-sm text-[#737B86]">Henüz işlem geçmişi yok.</p>
              ) : (
                <div className="space-y-3">
                  {quote.history.map((entry: HistoryEntry) => (
                    <div key={entry.id} className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-[#E30613] mt-1.5 shrink-0" />
                      <div>
                        <p className="text-[#101114]">
                          {entry.action === "STATUS_CHANGE"
                            ? `Durum: ${statusLabels[entry.oldValue || ""] || entry.oldValue} → ${statusLabels[entry.newValue || ""] || entry.newValue}`
                            : entry.action === "NOTE_ADDED" ? "Not eklendi" : entry.action}
                        </p>
                        {entry.note && <p className="text-[#737B86] text-xs">{entry.note}</p>}
                        <p className="text-[#737B86] text-xs">{new Date(entry.createdAt).toLocaleString("tr-TR")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 print:hidden">
          {/* Status Management */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <Label>Durum</Label>
                <Select value={status} onValueChange={(v: string | null) => v && setStatus(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {status === "LOST" && (
                <div>
                  <Label>Kayıp Nedeni</Label>
                  <Input value={lostReason} onChange={(e) => setLostReason(e.target.value)} placeholder="Neden kaybedildi?" />
                </div>
              )}

              <div>
                <Label>İç Notlar</Label>
                <Textarea value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} rows={3} />
              </div>

              <Button onClick={handleStatusUpdate} disabled={saving} className="w-full bg-[#E30613] hover:bg-[#c00511] text-white">
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </CardContent>
          </Card>

          {/* Add Note */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-sm">Hızlı Not Ekle</h3>
              <Textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Not yazın..." rows={2} />
              <Button onClick={handleAddNote} disabled={saving || !noteText.trim()} variant="outline" size="sm" className="w-full">
                Not Ekle
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-3">Bildirimler</h3>
              {quote.notifications.length === 0 ? (
                <p className="text-xs text-[#737B86]">Bildirim yok.</p>
              ) : (
                <div className="space-y-2">
                  {quote.notifications.map((n: { id: string; type: string; status: string; errorMessage: string | null; createdAt: Date }) => (
                    <div key={n.id} className="flex items-center gap-2 text-xs">
                      <Badge variant={n.status === "sent" ? "default" : "destructive"} className="text-[10px]">
                        {n.status === "sent" ? "OK" : "FAIL"}
                      </Badge>
                      <span className="text-[#737B86]">{n.type} · {new Date(n.createdAt).toLocaleString("tr-TR")}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
