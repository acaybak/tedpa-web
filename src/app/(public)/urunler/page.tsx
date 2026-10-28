import { getPublicProducts, getPublicCategories } from "@/actions/product-actions";
import { ProductCard } from "@/components/products/product-card";
import { ProductFilters } from "@/components/products/product-filters";
import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: "Ürünler | TEDPA Makina",
  description: "TEDPA Makina endüstriyel ürün kataloğu. Tüm ürünleri inceleyin ve teklif talep edin.",
  openGraph: {
    title: "Ürünler | TEDPA Makina",
    description: "TEDPA Makina endüstriyel ürün kataloğu.",
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = (params.search as string) || "";
  const categorySlug = (params.kategori as string) || "";

  const categories = await getPublicCategories();

  let categoryId: string | undefined;
  if (categorySlug) {
    categoryId = categories.find((c: { slug: string }) => c.slug === categorySlug)?.id;
  }

  const productsResult = await getPublicProducts({
    page,
    limit: 12,
    search,
    categoryId,
  });

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-[#101114] py-16">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E30613]/10 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
            <span className="text-xs font-bold tracking-widest text-[#E30613] uppercase">Katalog</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Ürünler</h1>
          <p className="text-gray-400 mt-2">Endüstriyel ürün kataloğumuzu inceleyin</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 shrink-0">
              <ProductFilters categories={categories} currentCategory={categorySlug} currentSearch={search} />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {productsResult.data.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-[#737B86] text-lg">Henüz ürün bulunmamaktadır.</p>
                  <p className="text-[#737B86] text-sm mt-2">Endüstriyel ürün katalogumuz yakında burada olacak.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {productsResult.data.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {productsResult.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-10">
                      {Array.from({ length: productsResult.totalPages }, (_, i) => (
                        <a
                          key={i + 1}
                          href={`/urunler?page=${i + 1}${search ? `&search=${search}` : ""}${categorySlug ? `&kategori=${categorySlug}` : ""}`}
                          className={`px-3 py-2 rounded text-sm ${
                            page === i + 1
                              ? "bg-[#E30613] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {i + 1}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
