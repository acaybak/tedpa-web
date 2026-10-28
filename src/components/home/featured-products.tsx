"use client";

import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  slug: string;
  code: string | null;
  shortDescription: string | null;
  category: { id: string; name: string; slug: string } | null;
  media: { url: string }[];
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#101114] mb-4">Öne Çıkan Ürünler</h2>
          <p className="text-[#737B86] mb-8">Endüstriyel ürün katalogumuz yakında burada olacak. Şimdilik tüm ürünlerimize göz atabilirsiniz.</p>
          <Link href="/urunler">
            <Button variant="outline">Tüm Ürünleri Gör</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E30613]/5 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
              <span className="text-xs font-bold tracking-widest text-[#E30613] uppercase">Ürün Kataloğu</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#101114] tracking-tight">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-[#737B86] mt-3 text-lg">
              En çok tercih edilen endüstriyel çözümlerimiz.
            </p>
          </div>
          <Link href="/urunler" className="hidden md:flex">
            <Button variant="outline" className="border-[#101114]/15 text-[#101114] hover:bg-[#101114] hover:text-white h-12 px-6 rounded-xl font-semibold transition-all">
              Tüm Ürünler
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={`/urunler/${product.slug}`} className="block group h-full">
                <div className="relative bg-white rounded-2xl border border-gray-100 hover:border-[#E30613]/20 shadow-sm hover:shadow-premium-lg transition-all duration-500 overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-[#F8F9FB] to-[#F0F1F3] overflow-hidden">
                    {product.media.length > 0 ? (
                      <img
                        src={product.media[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <ClipboardList className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                          <span className="text-xs text-gray-300">Görsel yok</span>
                        </div>
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101114]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Quick action */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                        <span className="text-xs font-semibold text-[#101114]">Detayları Gör</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {product.category && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#E30613] mb-2">
                        {product.category.name}
                      </span>
                    )}
                    {product.code && (
                      <p className="text-xs text-[#737B86] font-mono mb-1">{product.code}</p>
                    )}
                    <h3 className="font-bold text-[#101114] group-hover:text-[#E30613] transition-colors duration-300 line-clamp-2 mb-2 leading-snug">
                      {product.name}
                    </h3>
                    {product.shortDescription && (
                      <p className="text-xs text-[#737B86] line-clamp-2 mt-auto leading-relaxed">
                        {product.shortDescription}
                      </p>
                    )}
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-0.5 w-0 group-hover:w-full bg-red-gradient transition-all duration-700" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link href="/urunler">
            <Button variant="outline" className="border-[#101114]/15 text-[#101114] h-12 px-6 rounded-xl font-semibold">
              Tüm Ürünler <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
