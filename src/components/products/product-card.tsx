"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClipboardList, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  code: string | null;
  shortDescription: string | null;
  category: { id: string; name: string } | null;
  media: { url: string }[];
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 hover:border-[#E30613]/20 shadow-sm hover:shadow-premium-lg transition-all duration-500 overflow-hidden h-full flex flex-col">
      {/* Image */}
      <Link href={`/urunler/${product.slug}`} className="block">
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
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101114]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
              <span className="text-xs font-semibold text-[#101114]">Detayları Gör</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <Link href={`/urunler/${product.slug}`} className="block flex-1">
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
            <p className="text-xs text-[#737B86] line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          )}
        </Link>
        <div className="mt-4 pt-3 border-t border-gray-50">
          <Link href={`/urunler/${product.slug}`}>
            <Button variant="outline" size="sm" className="w-full rounded-lg border-gray-200 text-[#101114] hover:bg-[#E30613] hover:text-white hover:border-[#E30613] transition-all duration-300 text-xs font-semibold">
              <ClipboardList className="w-3.5 h-3.5 mr-2" />
              Teklif Listesine Ekle
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-0.5 w-0 group-hover:w-full bg-red-gradient transition-all duration-700" />
    </div>
  );
}
