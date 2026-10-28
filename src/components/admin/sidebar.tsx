"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Home,
  Trophy,
  Newspaper,
  BookOpen,
  FileText,
  MessageSquare,
  Library,
  Settings,
  Users,
  Shield,
  ScrollText,
  Menu as MenuIcon,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Ürünler", href: "/admin/products", icon: Package },
  { label: "Kategoriler", href: "/admin/categories", icon: FolderTree },
  { label: "Banner Yönetimi", href: "/admin/banners", icon: ImageIcon },
  { label: "Fuarlar", href: "/admin/exhibitions", icon: Trophy },
  { label: "Haberler", href: "/admin/news", icon: Newspaper },
  { label: "Kataloglar", href: "/admin/catalogs", icon: BookOpen },
  { label: "Teklif Talepleri", href: "/admin/quotes", icon: FileText },
  { label: "İletişim Mesajları", href: "/admin/messages", icon: MessageSquare },
  { label: "Medya Kütüphanesi", href: "/admin/media", icon: Library },
  { label: "Sayfalar", href: "/admin/pages", icon: ScrollText },
  { label: "Kullanıcılar", href: "/admin/users", icon: Users },
  { label: "Roller ve Yetkiler", href: "/admin/roles", icon: Shield },
  { label: "Site Ayarları", href: "/admin/settings", icon: Settings },
  { label: "İşlem Kayıtları", href: "/admin/audit-logs", icon: ScrollText },
];

export function AdminSidebar({ user }: { user: { fullName: string; role: string } }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-[#101114] text-white flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <NextImage
              src="/logo-header.png"
              alt="TEDPA Makina"
              width={110}
              height={24}
              className="h-6 w-auto object-contain brightness-0 invert"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white"
          >
            <MenuIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-[#E30613] text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-800">
          <p className="text-sm text-gray-400 truncate">{user.fullName}</p>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
      )}
    </aside>
  );
}
