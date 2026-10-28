"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, BookOpen } from "lucide-react";

interface Catalog {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  pdfUrl: string;
  category: string | null;
  language: string;
  publishDate: Date | null;
}

const langLabels: Record<string, string> = { tr: "Türkçe", en: "İngilizce", de: "Almanca", fr: "Fransızca", ru: "Rusça" };

export function CatalogsListClient({ catalogs }: { catalogs: Catalog[] }) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("tr-TR", { year: "numeric", month: "long" });
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="w-12 h-1 bg-[#E30613] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#101114] mb-4">Dijital Kataloglar</h1>
          <p className="text-lg text-[#737B86]">
            Ürün kataloglarımızı indirerek detaylı teknik bilgilere ulaşabilirsiniz.
          </p>
        </div>

        {catalogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-[#737B86] text-lg">Henüz katalog bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogs.map((cat) => (
              <Card key={cat.id} className="overflow-hidden bg-white hover:shadow-lg transition-shadow">
                {cat.coverImage ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={cat.coverImage} alt={cat.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#101114] to-[#23262B] flex items-center justify-center">
                    <FileText className="w-20 h-20 text-white/20" />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {cat.category && (
                      <Badge variant="secondary" className="bg-gray-100 text-[#737B86] border-0 text-xs">
                        {cat.category}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {langLabels[cat.language] || cat.language}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-[#101114] mb-2">{cat.title}</h3>
                  {cat.publishDate && (
                    <p className="text-sm text-[#737B86] mb-4">{formatDate(cat.publishDate)}</p>
                  )}
                  <a href={cat.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#E30613] hover:bg-[#c00511] text-white">
                      <Download className="w-4 h-4 mr-2" />
                      PDF İndir
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
