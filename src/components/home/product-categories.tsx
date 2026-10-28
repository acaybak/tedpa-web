"use client";

import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { products: number };
}

export function ProductCategories({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return (
      <section className="py-24 bg-[#F8F9FB]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#101114] mb-4">Ürün Kategorileri</h2>
          <p className="text-[#737B86]">Endüstriyel ürün kategorilerimiz yakında burada olacak.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#F8F9FB] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E30613]/[0.02] rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E30613]/5 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
              <span className="text-xs font-bold tracking-widest text-[#E30613] uppercase">Ürün Grupları</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#101114] tracking-tight">
              Ürün Kategorileri
            </h2>
            <p className="text-[#737B86] mt-3 text-lg max-w-md">
              Endüstriyel ürün gruplarımızı keşfedin.
            </p>
          </div>
          <Link href="/urunler" className="hidden md:flex">
            <Button variant="outline" className="border-[#101114]/15 text-[#101114] hover:bg-[#101114] hover:text-white h-12 px-6 rounded-xl font-semibold transition-all">
              Tüm Ürünler
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={`/urunler?kategori=${cat.slug}`} className="block group">
                <div className="relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#E30613]/20 shadow-sm hover:shadow-premium-lg transition-all duration-500 h-full overflow-hidden">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E30613]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex-1">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-[#F4F5F7] group-hover:bg-[#E30613]/10 flex items-center justify-center mb-4 transition-colors duration-500">
                        <Package className="w-6 h-6 text-[#737B86] group-hover:text-[#E30613] transition-colors duration-500" />
                      </div>
                      {/* Name */}
                      <h3 className="font-bold text-lg text-[#101114] group-hover:text-[#E30613] transition-colors duration-300 mb-2">
                        {cat.name}
                      </h3>
                      {/* Count */}
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F4F5F7] text-xs font-semibold text-[#737B86] group-hover:bg-[#E30613]/10 group-hover:text-[#E30613] transition-colors duration-500">
                        {cat._count.products} ürün
                      </span>
                    </div>
                    {/* Arrow */}
                    <div className="w-8 h-8 rounded-full bg-[#F4F5F7] group-hover:bg-[#E30613] flex items-center justify-center transition-all duration-500 shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-[#737B86] group-hover:text-white transition-colors duration-500 group-hover:translate-x-0.5 transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
