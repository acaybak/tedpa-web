"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LogEntry { id: string; action: string; entity: string; entityId: string | null; user: { fullName: string } | null; ipAddress: string | null; createdAt: Date; }

export function AuditLogsClient({ logs }: { logs: LogEntry[] }) {
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-[#101114]">İşlem Kayıtları</h1><p className="text-[#737B86] text-sm">{logs.length} kayıt</p></div>
      <Card><CardContent className="p-0">
        {logs.length === 0 ? <div className="p-8 text-center text-[#737B86]">Henüz kayıt yok.</div> : (
          <table className="w-full"><thead><tr className="border-b bg-gray-50">
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Tarih</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Kullanıcı</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">İşlem</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Entity</th>
            <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">IP</th>
          </tr></thead><tbody>
            {logs.map((l: LogEntry) => (
              <tr key={l.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-[#737B86]">{new Date(l.createdAt).toLocaleString("tr-TR")}</td>
                <td className="px-4 py-3 text-sm">{l.user?.fullName || "Sistem"}</td>
                <td className="px-4 py-3"><Badge variant="outline">{l.action}</Badge></td>
                <td className="px-4 py-3 text-sm text-[#737B86]">{l.entity}{l.entityId ? ` #${l.entityId.slice(0, 8)}` : ""}</td>
                <td className="px-4 py-3 text-sm text-[#737B86] font-mono">{l.ipAddress || "—"}</td>
              </tr>
            ))}
          </tbody></table>
        )}
      </CardContent></Card>
    </div>
  );
}
