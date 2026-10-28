"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX } from "lucide-react";
import { toggleUserActive } from "@/actions/content-actions";
import { useRouter } from "next/navigation";

interface User { id: string; email: string; fullName: string; role: string; isActive: boolean; lastLoginAt: Date | null; createdAt: Date; }

const roleLabels: Record<string, string> = { SUPER_ADMIN: "Süper Admin", ADMIN: "Admin", EDITOR: "Editör", PRODUCT_MANAGER: "Ürün Yöneticisi" };

export function UsersClient({ users }: { users: User[] }) {
  const router = useRouter();
  const handleToggle = async (id: string) => { await toggleUserActive(id); router.refresh(); };

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-[#101114]">Kullanıcılar</h1><p className="text-[#737B86] text-sm">{users.length} kullanıcı</p></div>
      <Card><CardContent className="p-0">
        <table className="w-full"><thead><tr className="border-b bg-gray-50">
          <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Ad Soyad</th>
          <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">E-posta</th>
          <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Rol</th>
          <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Durum</th>
          <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Son Giriş</th>
          <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">İşlem</th>
        </tr></thead><tbody>
          {users.map((u: User) => (
            <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-[#101114]">{u.fullName}</td>
              <td className="px-4 py-3 text-sm text-[#737B86]">{u.email}</td>
              <td className="px-4 py-3"><Badge variant="secondary">{roleLabels[u.role] || u.role}</Badge></td>
              <td className="px-4 py-3"><Badge className={u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>{u.isActive ? "Aktif" : "Pasif"}</Badge></td>
              <td className="px-4 py-3 text-sm text-[#737B86]">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString("tr-TR") : "—"}</td>
              <td className="px-4 py-3"><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToggle(u.id)}>{u.isActive ? <UserX className="w-3 h-3 text-red-500" /> : <UserCheck className="w-3 h-3 text-green-500" />}</Button></td>
            </tr>
          ))}
        </tbody></table>
      </CardContent></Card>
    </div>
  );
}
