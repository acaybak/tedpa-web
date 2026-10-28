import { getCorporatePages, getCorporatePage } from "@/actions/content-actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getCorporatePage(slug);
  if (!page) return { title: "Sayfa Bulunamadı" };
  return { title: `${page.title} - TEDPA Makina` };
}

export default async function CorporatePageView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getCorporatePage(slug);
  if (!page) notFound();

  const allPages = await getCorporatePages();
  const activePages = allPages.filter((p: { isActive: boolean }) => p.isActive);

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-24 space-y-1">
              <h3 className="text-sm font-semibold text-[#737B86] uppercase tracking-wider mb-4">Kurumsal</h3>
              {activePages.map((p: { slug: string; title: string }) => (
                <Link
                  key={p.slug}
                  href={`/kurumsal/${p.slug}`}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    p.slug === slug
                      ? "bg-[#E30613] text-white"
                      : "text-[#23262B] hover:bg-gray-100"
                  }`}
                >
                  {p.title}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="max-w-3xl">
              <div className="w-12 h-1 bg-[#E30613] mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#101114] mb-8">{page.title}</h1>
              <div
                className="prose prose-lg max-w-none text-[#23262B] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: page.content || "" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
