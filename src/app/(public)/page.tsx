import { getFeaturedProducts, getPublicCategories } from "@/actions/product-actions";
import { getActiveBanners, getPublicNews } from "@/actions/content-actions";
import { HeroSection } from "@/components/home/hero-section";
import { BannerSlider } from "@/components/home/banner-slider";
import { StatsSection } from "@/components/home/stats-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ProductCategories } from "@/components/home/product-categories";
import { QuoteCTA } from "@/components/home/quote-cta";
import { LatestNews } from "@/components/home/latest-news";
import type { Metadata } from "next";
export const instant = false;

export const metadata: Metadata = {
  title: "TEDPA Makina — Tecrübeyi Sanata Dönüştürür",
  description: "TEDPA Makina — 25+ yıl tecrübe ile endüstriyel makine ve ekipman çözümleri. Ürün kataloğu, teknik dokümanlar ve teklif talepleri için hemen ziyaret edin.",
  keywords: ["endüstriyel makina", "makine ekipman", "tedpa makina", "ürün kataloğu", "teklif", "Ankara OSB", "sanayi makineleri"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "TEDPA Makina",
    title: "TEDPA Makina — Tecrübeyi Sanata Dönüştürür",
    description: "25+ yıl tecrübe ile endüstriyel makine ve ekipman çözümleri. Ürün kataloğu ve teklif talepleri.",
    images: [{ url: "/logo-full.png", width: 1200, height: 630, alt: "TEDPA Makina" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDPA Makina — Tecrübeyi Sanata Dönüştürür",
    description: "25+ yıl tecrübe ile endüstriyel makine ve ekipman çözümleri.",
    images: ["logo-full.png"],
  },
};

export default async function HomePage() {
  const [featuredProducts, categories, banners, news] = await Promise.all([
    getFeaturedProducts(8),
    getPublicCategories(),
    getActiveBanners(),
    getPublicNews({ limit: 3 }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TEDPA Makina",
    "description": "Endüstriyel makine ve ekipman çözümleri",
    "url": "https://tedpa-web-two.vercel.app",
    "logo": "https://tedpa-web-two.vercel.app/logo-full.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-545-101-35-70",
      "contactType": "customer service",
      "email": "info@tedpamakina.com",
      "areaServed": "TR",
      "availableLanguage": ["Turkish", "English"],
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Menemen, İzmir",
      "addressCountry": "TR",
      "streetAddress": "29 Ekim Mah. 10002 Sk. B No: 16/2",
    },
    "legalName": "Tedpa Makina Yedek Parça Sanayi ve Ticaret Ltd.Şti.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {banners.length > 0 ? <BannerSlider banners={banners} /> : <HeroSection />}
      <StatsSection />
      <WhyChooseUs />
      <ProductCategories categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <LatestNews news={news.data} />
      <QuoteCTA />
    </>
  );
}
