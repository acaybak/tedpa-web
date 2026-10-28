"use client";

import { motion } from "framer-motion";
import { Award, Settings, Shield, Users, TrendingUp, Globe } from "lucide-react";

const stats = [
  { value: "25+", label: "Yıllık Tecrübe", icon: Award, desc: "Sektörde güvenilir deneyim" },
  { value: "500+", label: "Ürün Çeşidi", icon: Settings, desc: "Geniş ürün yelpazesi" },
  { value: "1000+", label: "Mutlu Müşteri", icon: Users, desc: "Güvenilir iş ortaklıkları" },
  { value: "15+", label: "Ülke", icon: Globe, desc: "Uluslararası pazar erişimi" },
];

export function StatsSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E30613]/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
            <span className="text-xs font-bold tracking-widest text-[#E30613] uppercase">Neden TEDPA?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#101114] mb-6 tracking-tight">
            Endüstriyel Çözümlerde
            <br />
            <span className="text-gradient-red">Güvenilir Adres</span>
          </h2>
          <p className="text-lg text-[#737B86] max-w-2xl mx-auto leading-relaxed">
            TEDPA Makina, yılların tecrübesini modern mühendislik çözümleriyle buluşturarak
            endüstriyel sektöre hizmet vermektedir.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative group text-center p-8 rounded-2xl border border-gray-100 hover:border-[#E30613]/20 bg-white hover:shadow-premium-lg transition-all duration-500">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#E30613]/5 group-hover:bg-[#E30613]/10 flex items-center justify-center mx-auto mb-5 transition-colors duration-500">
                  <stat.icon className="w-8 h-8 text-[#E30613]" />
                </div>
                {/* Value */}
                <div className="text-4xl md:text-5xl font-black text-[#101114] mb-2 tracking-tight">
                  {stat.value}
                </div>
                {/* Label */}
                <div className="text-sm font-bold text-[#101114] uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                {/* Description */}
                <div className="text-xs text-[#737B86]">{stat.desc}</div>
                {/* Hover accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E30613] group-hover:w-16 transition-all duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
