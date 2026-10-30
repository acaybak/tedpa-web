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
              <a href="tel:+905451013570" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3 h-3" />
                +90 545 101 35 70
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
              <div className="hidden sm:flex items-center gap-3">
                <a href="#" aria-label="LinkedIn" className="w-6 h-6 rounded-full bg-white/5 hover:bg-[#E30613]/20 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-gray-400 hover:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-6 h-6 rounded-full bg-white/5 hover:bg-[#E30613]/20 flex items-center justify-center transition-colors">
                  <svg className="w-3 h-3 text-gray-400 hover:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
              <div className="w-px h-3 bg-white/10 hidden sm:block" />
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
                <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-md text-sm font-medium w-10 h-10 text-[#101114] hover:bg-gray-100 transition-colors">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                      <a href="tel:+905451013570" className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#E30613]" />
                        +90 545 101 35 70
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
