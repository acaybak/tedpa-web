import { getNewsBySlug } from "@/actions/content-actions";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "Haber Bulunamadı" };
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/haberler" className="inline-flex items-center gap-2 text-[#737B86] hover:text-[#E30613] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Haberlere Dön
          </Link>

          {/* Category badge */}
          {article.category && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#E30613]/10 text-[#E30613] rounded-full text-sm font-medium">
                {article.category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#101114] mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#737B86] mb-8 pb-8 border-b">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishDate)}
            </span>
            {article.author && (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {article.author}
              </span>
            )}
            {article.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime} dk okuma
              </span>
            )}
          </div>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="rounded-xl overflow-hidden mb-10">
              <img src={article.coverImage} alt={article.title} className="w-full h-auto" />
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-[#23262B] font-medium leading-relaxed mb-8">
              {article.excerpt}
            </p>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-[#23262B] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content || "" }}
          />

          {/* Tags */}
          {article.tags && (
            <div className="mt-10 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {article.tags.split(",").map((tag: string) => (
                  <span key={tag.trim()} className="px-3 py-1 bg-gray-100 text-[#737B86] rounded-full text-sm">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
