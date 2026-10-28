import { getFeaturedProducts, getPublicCategories } from "@/actions/product-actions";
import { getActiveBanners, getPublicNews } from "@/actions/content-actions";
import { HeroSection } from "@/components/home/hero-section";
import { BannerSlider } from "@/components/home/banner-slider";
import { StatsSection } from "@/components/home/stats-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ProductCategories } from "@/components/home/product-categories";
import { QuoteCTA } from "@/components/home/quote-cta";
import { LatestNews } from "@/components/home/latest-news";
import type { Metadata } from "next";
export const instant = false;

export const metadata: Metadata = {
  title: "TEDPA Makina — Tecrübeyi Sanata Dönüştürür",
  description: "TEDPA Makina — Endüstriyel makine ve ekipman çözümleri. Ürün kataloğu, teknik dokümanlar ve teklif talepleri.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "TEDPA Makina",
    title: "TEDPA Makina — Tecrübeyi Sanata Dönüştürür",
    description: "Endüstriyel makine ve ekipman çözümleri.",
  },
};

export default async function HomePage() {
  const [featuredProducts, categories, banners, news] = await Promise.all([
    getFeaturedProducts(8),
    getPublicCategories(),
    getActiveBanners(),
    getPublicNews({ limit: 3 }),
  ]);

  return (
    <>
      {banners.length > 0 ? <BannerSlider banners={banners} /> : <HeroSection />}
      <StatsSection />
      <ProductCategories categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <LatestNews news={news.data} />
      <QuoteCTA />
    </>
  );
}
