"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Shield, Award, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "25+", label: "Yıllık Tecrübe", icon: Award },
  { value: "500+", label: "Ürün Çeşidi", icon: Settings },
  { value: "1000+", label: "Müşteri", icon: Shield },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#101114]">
      {/* Multi-layer Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#101114] via-[#161920] to-[#101114]" />
        {/* Geometric grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Radial glow */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E30613]/[0.06] blur-[120px]" />
        <div className="absolute -left-32 bottom-0 w-[400px] h-[400px] rounded-full bg-[#E30613]/[0.03] blur-[100px]" />
        {/* Diagonal accent lines */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden opacity-[0.04]">
          <div className="absolute top-0 right-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(227,6,19,0.5) 40px, rgba(227,6,19,0.5) 41px)`,
            }}
          />
        </div>
      </div>

      {/* Left red accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#E30613] via-[#E30613]/60 to-transparent" />

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#E30613] animate-pulse" />
                <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Endüstriyel Çözümler
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-8 tracking-tight">
                Tecrübenin
                <br />
                Gücü,{" "}
                <span className="text-gradient-red">Endüstrinin</span>
                <br />
                Geleceği
              </h1>

              <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-lg leading-relaxed">
                TEDPA Makina — Tecrübeyi Sanata Dönüştürür.
              </p>

              <p className="text-base text-gray-500 mb-12 max-w-md leading-relaxed">
                Endüstriyel makine ve ekipman çözümleri için ürün kataloğumuzu
                inceleyin, teklif talep edin.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/urunler">
                  <Button size="lg" className="bg-red-gradient hover:opacity-90 text-white text-base px-8 h-14 rounded-xl shadow-red-glow font-semibold tracking-wide transition-all group">
                    Ürünleri Keşfet
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/teklif">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/15 text-white hover:bg-white/5 hover:border-white/25 text-base px-8 h-14 rounded-xl font-semibold tracking-wide transition-all"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Teklif Al
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block"
          >
            <div className="space-y-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                >
                  <div className="rounded-2xl p-6 flex items-center gap-6 border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-xl bg-[#E30613]/10 flex items-center justify-center shrink-0 group-hover:bg-[#E30613]/20 transition-colors">
                      <stat.icon className="w-7 h-7 text-[#E30613]" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white mb-0.5">{stat.value}</div>
                      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#101114] to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-[#E30613] rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
