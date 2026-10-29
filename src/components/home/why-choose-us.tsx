"use client";

import { motion } from "framer-motion";
import { Shield, Award, Headphones, Truck, Factory, CheckCircle2 } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "25+ Yıl Tecrübe",
    desc: "Çeyrek asrı aşkın sektör deneyimi ile güvenilir çözümler.",
  },
  {
    icon: Factory,
    title: "Kaliteli Üretim",
    desc: "ISO standartlarında, titiz üretim süreçleri.",
  },
  {
    icon: Headphones,
    title: "Teknik Destek",
    desc: "Satış öncesi ve sonrası uzman teknik destek.",
  },
  {
    icon: Truck,
    title: "Hızlı Teslimat",
    desc: "Zamanında teslimat ve lojistik çözümler.",
  },
  {
    icon: Shield,
    title: "Garanti",
    desc: "Tüm ürünlerde kapsamlı garanti ve yedek parça.",
  },
  {
    icon: CheckCircle2,
    title: "Referanslar",
    desc: "1000+ mutlu müşteri, 15+ ülke pazar erişimi.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#F8F9FB] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#E30613]/[0.02] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E30613]/[0.02] rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E30613]/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
            <span className="text-xs font-bold tracking-widest text-[#E30613] uppercase">Güvenilir Çözüm Ortağınız</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#101114] mb-6 tracking-tight">
            Neden <span className="text-gradient-red">TEDPA Makina</span>?
          </h2>
          <p className="text-lg text-[#737B86] max-w-2xl mx-auto leading-relaxed">
            Endüstriyel makine sektöründe güvenilir bir iş ortağı arıyorsanız,
            doğru adrestesiniz.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#E30613]/20 shadow-sm hover:shadow-premium-lg transition-all duration-500 group h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#E30613]/5 group-hover:bg-[#E30613]/10 flex items-center justify-center mb-5 transition-colors duration-500">
                  <reason.icon className="w-7 h-7 text-[#E30613]" />
                </div>
                {/* Content */}
                <h3 className="font-bold text-lg text-[#101114] mb-2 group-hover:text-[#E30613] transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-sm text-[#737B86] leading-relaxed">
                  {reason.desc}
                </p>
                {/* Hover accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E30613] group-hover:w-12 transition-all duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
