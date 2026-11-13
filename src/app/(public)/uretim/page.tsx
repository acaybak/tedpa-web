import type { Metadata } from "next";
import { ProductionPage } from "@/components/production/production-page";

export const metadata: Metadata = {
  title: "Üretim",
  description:
    "Kalıp tasarım ve üretim, talaşlı imalat, plastik enjeksiyon, eksantirik pres, lazer teknolojileri, yüzey işlem, kaynak, montaj ve dikiş makinası hatları ile otomasyon makina imalatlarımız.",
  keywords: [
    "TEDPA Makina üretim",
    "kalıp tasarım ve üretim",
    "talaşlı imalat",
    "plastik enjeksiyon hattı",
    "eksantirik pres hattı",
    "fiber lazer kesim",
    "toz boya hattı",
    "kaynak ve fikstürlü imalat",
    "dikiş makinası montaj hattı",
    "otomasyon makina imalatı",
  ],
  openGraph: {
    title: "Üretim | TEDPA Makina",
    description:
      "Dokuz ana başlıkta, kendi makine parkurumuzla uçtan uca üretim: kalıptan montaja.",
  },
};

export default function ProductionPageRoute() {
  return <ProductionPage />;
}
