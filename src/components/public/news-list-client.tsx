"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishDate: Date | null;
  readTime: number | null;
  category: { name: string; slug: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface NewsListClientProps {
  news: { data: NewsItem[]; total: number; page: number; limit: number; totalPages: number };
  categories: Category[];
  currentPage: number;
  currentCategory?: string;
}

export function NewsListClient({ news, categories, currentPage, currentCategory }: NewsListClientProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="w-12 h-1 bg-[#E30613] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#101114] mb-4">Haberler</h1>
          <p className="text-lg text-[#737B86]">
            Şirketimiz ve sektörümüzden en güncel haberler ve gelişmeler.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/haberler"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !currentCategory ? "bg-[#E30613] text-white" : "bg-white text-[#737B86] hover:bg-gray-100 border"
              }`}
            >
              Tümü
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/haberler?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentCategory === cat.slug ? "bg-[#E30613] text-white" : "bg-white text-[#737B86] hover:bg-gray-100 border"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* News Grid */}
        {news.data.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#737B86] text-lg">Henüz haber bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {news.data.map((article) => (
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
                    <h2 className="text-xl font-bold text-[#101114] mb-2 group-hover:text-[#E30613] transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-[#737B86] text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-[#737B86]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.publishDate)}
                      </span>
                      {article.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime} dk okuma
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {news.totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: news.totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/haberler?page=${p}${currentCategory ? `&category=${currentCategory}` : ""}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === currentPage ? "bg-[#E30613] text-white" : "bg-white text-[#737B86] hover:bg-gray-100 border"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
