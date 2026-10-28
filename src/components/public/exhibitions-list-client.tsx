"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Globe, Clock } from "lucide-react";

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
  UPCOMING: { label: "Yaklaşan", color: "bg-green-100 text-green-700" },
  ONGOING: { label: "Devam Ediyor", color: "bg-blue-100 text-blue-700" },
  PAST: { label: "Tamamlandı", color: "bg-gray-100 text-gray-600" },
  CANCELLED: { label: "İptal", color: "bg-red-100 text-red-700" },
};

export function ExhibitionsListClient({ exhibitions }: { exhibitions: Exhibition[] }) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("tr-TR", { year: "numeric", month: "short", day: "numeric" });
  };

  const upcoming = exhibitions.filter((e) => e.status === "UPCOMING" || e.status === "ONGOING");
  const past = exhibitions.filter((e) => e.status === "PAST" || e.status === "CANCELLED");

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="w-12 h-1 bg-[#E30613] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#101114] mb-4">Fuarlar & Etkinlikler</h1>
          <p className="text-lg text-[#737B86]">
            Katıldığımız uluslararası fuarlar ve etkinlikler.
          </p>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[#101114] mb-6">Yaklaşan Etkinlikler</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map((ex) => (
                <Card key={ex.id} className="overflow-hidden bg-white hover:shadow-lg transition-shadow">
                  {ex.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img src={ex.coverImage} alt={ex.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={statusLabels[ex.status]?.color || "bg-gray-100 text-gray-600"}>
                        {statusLabels[ex.status]?.label || ex.status}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-[#101114] mb-3">{ex.name}</h3>
                    <div className="space-y-2 text-sm text-[#737B86]">
                      {(ex.city || ex.country) && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span>{[ex.city, ex.country].filter(Boolean).join(", ")}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{formatDate(ex.startDate)} — {formatDate(ex.endDate)}</span>
                      </div>
                      {ex.venue && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span>{ex.venue}</span>
                        </div>
                      )}
                      {ex.boothNumber && (
                        <div className="mt-3 px-3 py-1 bg-[#E30613]/10 text-[#E30613] rounded-full text-xs font-medium inline-block">
                          Stand: {ex.boothNumber}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#101114] mb-6">Geçmiş Etkinlikler</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {past.map((ex) => (
                <Card key={ex.id} className="overflow-hidden bg-white opacity-75 hover:opacity-100 transition-opacity">
                  {ex.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img src={ex.coverImage} alt={ex.name} className="w-full h-full object-cover grayscale" />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <Badge className={statusLabels[ex.status]?.color || "bg-gray-100 text-gray-600"}>
                      {statusLabels[ex.status]?.label || ex.status}
                    </Badge>
                    <h3 className="text-lg font-bold text-[#101114] mt-3 mb-2">{ex.name}</h3>
                    <div className="space-y-1 text-sm text-[#737B86]">
                      {(ex.city || ex.country) && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span>{[ex.city, ex.country].filter(Boolean).join(", ")}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{formatDate(ex.startDate)} — {formatDate(ex.endDate)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {exhibitions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#737B86] text-lg">Henüz fuar bilgisi bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </section>
  );
}
