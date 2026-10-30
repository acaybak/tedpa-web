"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClipboardList, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function QuoteCTA() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #101114 0%, #1a1d23 50%, #101114 100%)' }}>
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full bg-[#E30613]/[0.08] blur-[120px]" />
        <div className="absolute -left-32 -bottom-32 w-[400px] h-[400px] rounded-full bg-[#E30613]/[0.04] blur-[100px]" />
        {/* Diagonal lines */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden opacity-[0.03]">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(227,6,19,0.6) 60px, rgba(227,6,19,0.6) 61px)`,
            }}
          />
        </div>
      </div>

      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#E30613] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
            <Phone className="w-3.5 h-3.5 text-[#E30613]" />
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Teklif Talep</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Projeniz İçin
            <br />
            <span className="text-gradient-red">En Uygun Çözümü</span> Bulalım
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            İlgilendiğiniz ürünleri seçin, miktar belirleyin ve tek bir form ile
            teklif talebinde bulunun. Size en kısa sürede dönüş yapalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/teklif">
              <Button size="lg" className="bg-red-gradient hover:opacity-90 text-white text-base px-10 h-14 rounded-xl shadow-red-glow font-semibold tracking-wide transition-all group">
                <ClipboardList className="w-5 h-5 mr-2" />
                Teklif Listesi Oluştur
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/urunler">
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 text-white hover:bg-white/5 hover:border-white/25 text-base px-10 h-14 rounded-xl font-semibold tracking-wide transition-all"
              >
                Ürünleri İncele
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
