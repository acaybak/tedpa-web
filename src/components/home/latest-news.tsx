"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishDate: Date | null;
  category: { name: string } | null;
}

export function LatestNews({ news }: { news: NewsItem[] }) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    try {
      return new Date(date).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return "";
    }
  };

  if (news.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E30613]/5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
              <span className="text-xs font-bold tracking-widest text-[#E30613] uppercase">Haberler</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#101114]">Son Haberler</h2>
            <p className="text-[#737B86] mt-2">Şirketimiz ve sektörümüzden güncel gelişmeler</p>
          </div>
          <Link href="/haberler" className="hidden md:block">
            <Button variant="outline" className="border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white">
              Tüm Haberler
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(0, 3).map((article) => (
            <Link key={article.id} href={`/haberler/${article.slug}`}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group bg-white">
                {article.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  {article.category && (
                    <Badge variant="secondary" className="mb-3 bg-[#E30613]/10 text-[#E30613] border-0">
                      {article.category.name}
                    </Badge>
                  )}
                  <h3 className="text-lg font-bold text-[#101114] mb-2 group-hover:text-[#E30613] transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-[#737B86] text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  )}
                  <span className="flex items-center gap-1 text-xs text-[#737B86]">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.publishDate)}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/haberler">
            <Button variant="outline" className="border-[#E30613] text-[#E30613]">
              Tüm Haberler
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
