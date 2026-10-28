"use client";

import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export function AdminHeader({ user }: { user: { fullName: string; role: string } }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/admin/login");
  };

  return (
    <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <div>
        <h2 className="text-sm text-[#737B86]">Hoş geldin,</h2>
        <p className="font-semibold text-[#101114]">{user.fullName}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-[10px] bg-[#E30613]">
            !
          </Badge>
        </Button>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Çıkış
        </Button>
      </div>
    </header>
  );
}
