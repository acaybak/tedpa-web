"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Globe, Clock, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface Exhibition {
  id: string;
  name: string;
  slug: string;
  type: string | null;
  country: string | null;
  city: string | null;
  venue: string | null;
  startDate: Date;
  endDate: Date;
  boothNumber: string | null;
  coverImage: string | null;
  status: string;
  description: string | null;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  UPCOMING: { label: "Yaklaşan", color: "bg-green-100 text-green-700 border-green-200" },
  ONGOING: { label: "Devam Ediyor", color: "bg-blue-100 text-blue-700 border-blue-200" },
  PAST: { label: "Tamamlandı", color: "bg-gray-100 text-gray-600 border-gray-200" },
  CANCELLED: { label: "İptal", color: "bg-red-100 text-red-700 border-red-200" },
};

export function ExhibitionsListClient({ exhibitions }: { exhibitions: Exhibition[] }) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("tr-TR", { year: "numeric", month: "short", day: "numeric" });
  };

  const upcoming = exhibitions.filter((e) => e.status === "UPCOMING" || e.status === "ONGOING");
  const past = exhibitions.filter((e) => e.status === "PAST" || e.status === "CANCELLED");

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#101114] via-[#1a1d23] to-[#23262B] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E30613]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E30613]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-1 bg-[#E30613]" />
              <Badge variant="outline" className="border-[#E30613]/30 text-[#E30613]">
                <Globe className="w-3 h-3 mr-1" />
                Uluslararası Etkinlikler
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Fuarlar & <span className="text-[#E30613]">Etkinlikler</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Katıldığımız uluslararası fuarlar ve etkinlikleri takip edin. Standımızı ziyaret ederek ürünlerimiz hakkında detaylı bilgi alabilirsiniz.
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-5 h-5 text-[#E30613]" />
                <span className="text-sm">500+ Ziyaretçi</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <TrendingUp className="w-5 h-5 text-[#E30613]" />
                <span className="text-sm">15+ Fuar</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-1 bg-[#E30613]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#101114]">Yaklaşan Etkinlikler</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map((ex, index) => (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-white h-full hover: shadow-2xl transition-all duration-300 group border-0">
                    {ex.coverImage && (
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={ex.coverImage}
                          alt={ex.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition_transform duration-500"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className={statusLabels[ex.status]?.color || "bg-gray-100 text-gray-600"}>
                          {statusLabels[ex.status]?.label || ex.status}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-[#101114] mb-4 group-hover:text-[#E30613] transition-colors">
                        {ex.name}
                      </h3>
                      <div className="space-y-3 text-sm text-[#737B86]">
                        {(ex.city || ex.country) && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 shrink-0 text-[#E30613]" />
                            <span>{[ex.city, ex.country].filter(Boolean).join(", ")}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 shrink-0 text-[#E30613]" />
                          <span>{formatDate(ex.startDate)} — {formatDate(ex.endDate)}</span>
                        </div>
                        {ex.venue && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 shrink-0 text-[#E30613]" />
                            <span>{ex.venue}</span>
                          </div>
                        )}
                        {ex.boothNumber && (
                          <div className="mt-4 px-3 py-2 bg-[#E30613]/10 text-[#E30613] rounded-lg text-xs font-semibold inline-flex items-center gap-2">
                            <Users className="w-3 h-3" />
                            Stand: {ex.boothNumber}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {past.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-1 bg-gray-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#101114]">Geçmiş Etkinlikler</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {past.map((ex, index) => (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-white h-full hover:opacity-100 transition-all duration-300 group border-0 opacity-80">
                    {ex.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={ex.coverImage}
                          alt={ex.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <Badge className={statusLabels[ex.status]?.color || "bg-gray-100 text-gray-600"}>
                        {statusLabels[ex.status]?.label || ex.status}
                      </Badge>
                      <h3 className="text-lg font-bold text-[#101114] mt-4 mb-3">{ex.name}</h3>
                      <div className="space-y-2 text-sm text-[#737B86]">
                        {(ex.city || ex.country) && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 shrink-0 text-gray-400" />
                            <span>{[ex.city, ex.country].filter(Boolean).join(", ")}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 shrink-0 text-gray-400" />
                          <span>{formatDate(ex.startDate)} — {formatDate(ex.endDate)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {exhibitions.length === 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Globe className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-[#101114] mb-2">Henüz Fuar Bilgisi Yok</h3>
              <p className="text-[#737B86] text-lg">Fuar bilgileri eklendiğinde burada görüntülenecektir.</p>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
