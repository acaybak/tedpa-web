"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MailOpen, Trash2, Eye } from "lucide-react";
import { markMessageRead, deleteMessage } from "@/actions/content-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Message { id: string; name: string; email: string; phone: string | null; subject: string | null; message: string; isRead: boolean; createdAt: Date; }

export function MessagesClient({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Message | null>(null);

  const handleRead = async (id: string) => { await markMessageRead(id); router.refresh(); };
  const handleDelete = async (id: string) => { if (confirm("Silmek istediğinize emin misiniz?")) { await deleteMessage(id); router.refresh(); } };

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-[#101114]">İletişim Mesajları</h1><p className="text-[#737B86] text-sm">{messages.length} mesaj</p></div>
      <Card><CardContent className="p-0">
        {messages.length === 0 ? <div className="p-8 text-center text-[#737B86]">Henüz mesaj yok.</div> : (
          <table className="w-full"><thead><tr className="border-b bg-gray-50">
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Durum</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Gönderen</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Konu</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Tarih</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">İşlem</th>
          </tr></thead><tbody>
            {messages.map((m: Message) => (
              <tr key={m.id} className={`border-b last:border-0 hover:bg-gray-50 ${!m.isRead ? "bg-blue-50/50" : ""}`}>
                <td className="px-4 py-3">{m.isRead ? <MailOpen className="w-4 h-4 text-gray-400" /> : <Mail className="w-4 h-4 text-blue-500" />}</td>
                <td className="px-4 py-3"><p className="text-sm font-medium text-[#101114]">{m.name}</p><p className="text-xs text-[#737B86]">{m.email}</p></td>
                <td className="px-4 py-3 text-sm">{m.subject || "Konu yok"}</td>
                <td className="px-4 py-3 text-sm text-[#737B86]">{new Date(m.createdAt).toLocaleDateString("tr-TR")}</td>
                <td className="px-4 py-3"><div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelected(m)}><Eye className="w-4 h-4" /></Button>
                  {!m.isRead && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleRead(m.id)}><MailOpen className="w-3 h-3" /></Button>}
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(m.id)}><Trash2 className="w-3 h-3" /></Button>
                </div></td>
              </tr>
            ))}
          </tbody></table>
        )}
      </CardContent></Card>
      {selected && <Dialog open={!!selected} onOpenChange={() => setSelected(null)}><DialogContent><DialogHeader><DialogTitle>{selected.subject || "Mesaj Detayı"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm"><div><span className="text-[#737B86]">Gönderen:</span> <span className="font-medium">{selected.name}</span></div><div><span className="text-[#737B86]">E-posta:</span> <span className="font-medium">{selected.email}</span></div>{selected.phone && <div><span className="text-[#737B86]">Telefon:</span> <span className="font-medium">{selected.phone}</span></div>}<div><span className="text-[#737B86]">Tarih:</span> <span className="font-medium">{new Date(selected.createdAt).toLocaleString("tr-TR")}</span></div></div>
          <div className="bg-gray-50 p-4 rounded text-sm whitespace-pre-line">{selected.message}</div>
        </div>
      </DialogContent></Dialog>}
    </div>
  );
}
