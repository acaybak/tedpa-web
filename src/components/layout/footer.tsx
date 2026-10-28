import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#0a0b0d] text-white overflow-hidden">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#E30613]/30 to-transparent" />

      {/* Main footer */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo-full.png"
                alt="TEDPA Makina"
                width={200}
                height={64}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Tecrübeyi Sanata Dönüştürür. Endüstriyel makine ve ekipman çözümleri ile
              sektöre hizmet veriyoruz.
            </p>
            <div className="space-y-3">
              <a href="tel:+903120000000" className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#E30613]/10 flex items-center justify-center transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#E30613]" />
                </div>
                +90 (312) 000 00 00
              </a>
              <a href="mailto:info@tedpamakina.com" className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#E30613]/10 flex items-center justify-center transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#E30613]" />
                </div>
                info@tedpamakina.com
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
                </div>
                OSB, Ankara, Türkiye
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">
              Hızlı Erişim
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Ürünler", href: "/urunler" },
                { label: "Haberler", href: "/haberler" },
                { label: "Fuarlar", href: "/fuarlar" },
                { label: "Kataloglar", href: "/kataloglar" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center text-sm text-gray-500 hover:text-white transition-colors">
                    <span className="w-0 h-px bg-[#E30613] group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">
              Kurumsal
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Hakkımızda", href: "/kurumsal/hakkimizda" },
                { label: "İletişim", href: "/iletisim" },
                { label: "Teklif Talep", href: "/teklif" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center text-sm text-gray-500 hover:text-white transition-colors">
                    <span className="w-0 h-px bg-[#E30613] group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div className="lg:col-span-4">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">
              Teklif Alın
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Endüstriyel çözümlerimiz hakkında detaylı bilgi ve teklif için
              bizimle iletişime geçin.
            </p>
            <Link href="/teklif">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-gradient rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-red-glow group">
                Teklif Talep Et
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-600">
              <Clock className="w-3.5 h-3.5" />
              Pzt - Cum: 08:30 - 18:00
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              © 2026 TEDPA Makina. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-700">
                Gizlilik Politikası
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
