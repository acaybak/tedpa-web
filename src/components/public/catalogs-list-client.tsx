"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, BookOpen, Eye, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

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
                <BookOpen className="w-3 h-3 mr-1" />
                Dijital Arşiv
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ürün <span className="text-[#E30613]">Katalogları</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Tüm ürün kataloglarımıza buradan ulaşabilir, detaylı teknik bilgilere ve ürün özelliklerine göz atabilirsiniz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalogs Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {catalogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-[#101114] mb-2">Henüz Katalog Yok</h3>
              <p className="text-[#737B86] text-lg">Kataloglar eklendiğinde burada görüntülenecektir.</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catalogs.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-white h-full hover: shadow-2xl transition-all duration-300 group border-0">
                    {cat.coverImage ? (
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={cat.coverImage}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition_transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                            <Eye className="w-4 h-4 mr-2" />
                            Önizleme
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-br from-[#101114] to-[#23262B] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                        <FileText className="w-20 h-20 text-white/20 relative z-10" />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {cat.category && (
                          <Badge variant="secondary" className="bg-gray-100 text-[#737B86] border-0 text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {cat.category}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {langLabels[cat.language] || cat.language}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-[#101114] mb-2 group-hover:text-[#E30613] transition-colors">
                        {cat.title}
                      </h3>
                      {cat?.publishDate && (
                        <div className="flex items-center gap-1 text-sm text-[#737B86] mb-4">
                          <Calendar className="w-3 h-3" />
                          {formatDate(cat?.publishDate)}
                        </div>
                      )}
                      <a href={cat.pdfUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <Button className="w-full bg-[#E30613] hover:bg-[#c00511] text-white group-hover: shadow-lg transition-all">
                          <Download className="w-4 h-4 mr-2" />
                          PDF İndir
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
