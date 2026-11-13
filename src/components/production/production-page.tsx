"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Factory, ImageOff, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  productionPhotosAvailable,
  productionSections,
  productionStats,
  type ProductionMachine,
  type ProductionSection,
} from "@/lib/production-content";

const placeholderCorners = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

function MachineMedia({ machine, code }: { machine: ProductionMachine; code: string }) {
  const [failed, setFailed] = useState(!productionPhotosAvailable);

  if (failed) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-industrial-gradient">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        {placeholderCorners.map((corner) => (
          <span key={corner} className={cn("absolute w-4 h-4 border-white/20", corner)} />
        ))}
        <span className="absolute top-4 left-9 font-mono text-[10px] tracking-[0.2em] text-white/25">
          {code}
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-10 text-center">
          <Factory className="w-8 h-8 text-white/25" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40 leading-relaxed">
            {machine.name}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-white/20">
            <ImageOff className="w-3 h-3" />
            Fotoğraf eklenecek
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-industrial-gradient">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={machine.image}
        alt={machine.imageAlt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101114]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

function MachineCard({ machine, index, code }: { machine: ProductionMachine; index: number; code: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-[#E30613]/20 shadow-sm hover:shadow-premium-lg transition-all duration-500 overflow-hidden"
    >
      <MachineMedia machine={machine} code={code} />
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-[#101114] mb-2 leading-snug group-hover:text-[#E30613] transition-colors duration-300">
          {machine.name}
        </h3>
        <p className="text-sm text-[#737B86] leading-relaxed flex-1">{machine.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {machine.specs.map((spec) => (
            <li
              key={spec}
              className="text-[11px] font-medium text-[#23262B] bg-[#F4F5F7] rounded-full px-2.5 py-1"
            >
              {spec}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-0.5 w-0 group-hover:w-full bg-red-gradient transition-all duration-700" />
    </motion.article>
  );
}

function SectionBlock({ section, alternate }: { section: ProductionSection; alternate: boolean }) {
  return (
    <section
      id={section.slug}
      className={cn("scroll-mt-[132px] py-16 md:py-20", alternate ? "bg-[#F8F9FB]" : "bg-white")}
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#E30613]/[0.07] flex items-center justify-center">
                <section.icon className="w-5 h-5 text-[#E30613]" />
              </div>
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-2xl font-black text-gray-200 leading-none">{section.index}</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E30613] mb-2">
              {section.tagline}
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-[#101114] leading-tight">
              {section.title}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[15px] text-[#5A616B] leading-relaxed">{section.description}</p>
            <ul className="grid sm:grid-cols-2 gap-2 mt-5">
              {section.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm text-[#23262B]">
                  <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Machines */}
        <div className="grid md:grid-cols-2 gap-6">
          {section.machines.map((machine, index) => (
            <MachineCard
              key={machine.name}
              machine={machine}
              index={index}
              code={`${section.index}.${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroIndex() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-2">
      <p className="px-4 pt-3 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
        Üretim Başlıkları
      </p>
      <ul>
        {productionSections.map((section) => (
          <li key={section.slug}>
            <a
              href={`#${section.slug}`}
              className="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <span className="font-mono text-[10px] text-[#E30613]/80 w-5 shrink-0">{section.index}</span>
              <span className="flex-1 leading-snug">{section.title}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pb-20 bg-industrial-gradient overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-[#E30613]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E30613]/[0.06] rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E30613]/10 border border-[#E30613]/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#E30613] uppercase">
                Üretim
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Kalıptan montaja,{" "}
              <span className="text-gradient-red">uçtan uca üretim</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mb-10">
              Kalıp tasarımından talaşlı imalata, plastik enjeksiyonundan lazer teknolojilerine kadar
              dokuz ana başlıkta kendi makinelerimizle üretiyoruz. Aynı çatı altında birleşen süreçler,
              kısa tedarik zinciri ve ölçülebilir kalite demektir.
            </p>
            <dl className="grid grid-cols-3 gap-4 max-w-xl">
              {productionStats.map((stat) => (
                <div key={stat.label} className="border-l border-white/10 pl-4">
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-1.5">
                    {stat.label}
                  </dt>
                  <dd className="text-lg md:text-xl font-bold text-white leading-tight">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <HeroIndex />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionNav({ active }: { active: string }) {
  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="container mx-auto px-4">
        <nav
          aria-label="Üretim başlıkları"
          className="flex items-center gap-1.5 py-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {productionSections.map((section) => {
            const isActive = section.slug === active;
            return (
              <a
                key={section.slug}
                href={`#${section.slug}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-semibold transition-colors",
                  isActive
                    ? "bg-[#101114] text-white"
                    : "text-[#5A616B] hover:bg-gray-100 hover:text-[#101114]"
                )}
              >
                <span className={cn("mr-1.5 font-mono text-[10px]", isActive ? "text-[#E30613]" : "text-gray-300")}>
                  {section.index}
                </span>
                {section.title}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function FinalCta() {
  return (
    <section className="relative bg-[#101114] py-16 md:py-20 overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#E30613]/10 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              Üretim kapasitemizi yakından görmek ister misiniz?
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Parça, kalıp veya özel makine ihtiyaçlarınız için üretim ekibimizle görüşün. Teknik
              resminizi paylaşın, üretilebilirlik ve süre bilgisiyle birlikte teklifimizi iletelim.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/teklif">
              <Button className="w-full sm:w-auto bg-red-gradient hover:opacity-90 text-white font-semibold px-7 h-12 rounded-lg shadow-red-glow">
                Teklif Talep Et
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-12 px-7 rounded-lg border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Bize Ulaşın
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductionPage() {
  const [active, setActive] = useState(productionSections[0].slug);

  // Handle incoming hash (e.g. /uretim#bolum-slug) from header dropdown navigation
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el) {
        // slight delay so the browser has painted the section
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    const elements = productionSections
      .map((section) => document.getElementById(section.slug))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      <Hero />
      <SectionNav active={active} />
      {productionSections.map((section, index) => (
        <SectionBlock key={section.slug} section={section} alternate={index % 2 === 1} />
      ))}
      <FinalCta />
    </div>
  );
}
