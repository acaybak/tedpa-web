"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Haberler", href: "/haberler" },
  { label: "Fuarlar", href: "/fuarlar" },
  { label: "Kataloglar", href: "/kataloglar" },
  { label: "İletişim", href: "/iletisim" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 text-xs",
        scrolled ? "h-0 overflow-hidden opacity-0" : "h-9 opacity-100"
      )}>
        <div className="bg-[#101114] text-gray-400 h-full">
          <div className="container mx-auto px-4 flex items-center justify-between h-full">
            <div className="hidden md:flex items-center gap-6">
              <a href="tel:+903120000000" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3 h-3" />
                +90 (312) 000 00 00
              </a>
              <a href="mailto:info@tedpamakina.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3 h-3" />
                info@tedpamakina.com
              </a>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Pzt - Cum: 08:30 - 18:00
              </span>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <Link href="/teklif" className="flex items-center gap-1 text-[#E30613] hover:text-white transition-colors font-medium">
                Teklif Talep Et
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "top-0 bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "top-9 bg-white/80 backdrop-blur-md"
        )}
      >
        <div className="container mx-auto px-4">
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16" : "h-20"
          )}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo-header.png"
                alt="TEDPA Makina"
                width={160}
                height={35}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors uppercase group",
                      isActive ? "text-[#E30613]" : "text-[#23262B] hover:text-[#E30613]"
                    )}
                  >
                    {item.label}
                    <span className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#E30613] transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile */}
            <div className="flex items-center gap-3">
              <Link href="/teklif" className="hidden md:flex">
                <Button size="sm" className="bg-red-gradient hover:opacity-90 text-white shadow-red-glow font-semibold tracking-wide px-6 h-10 rounded-lg transition-all">
                  <Phone className="w-4 h-4 mr-2" />
                  Teklif Al
                </Button>
              </Link>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger className="lg:hidden">
                  <Button variant="ghost" size="icon" className="text-[#101114]">
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-[#101114] border-0 text-white z-[70]">
                  <div className="px-4 mb-6">
                    <Image
                      src="/logo-header.png"
                      alt="TEDPA Makina"
                      width={130}
                      height={28}
                      className="h-7 w-auto object-contain brightness-0 invert"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-lg transition-colors",
                            isActive ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                          )}
                        >
                          {item.label}
                          <ChevronRight className="w-4 h-4 opacity-30" />
                        </Link>
                      );
                    })}
                    <div className="mt-6 px-4">
                      <Link href="/teklif" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full bg-red-gradient text-white h-12 rounded-lg font-semibold">
                          <Phone className="w-4 h-4 mr-2" />
                          Teklif Al
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-8 px-4 space-y-3 text-sm text-gray-500">
                      <a href="tel:+903120000000" className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#E30613]" />
                        +90 (312) 000 00 00
                      </a>
                      <a href="mailto:info@tedpamakina.com" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#E30613]" />
                        info@tedpamakina.com
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
