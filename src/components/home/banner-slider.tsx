"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Banner {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  buttonText: string | null;
  buttonLink: string | null;
}

export function BannerSlider({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banners[current].imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101114]/90 via-[#101114]/70 to-transparent" />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <div className="w-16 h-1 bg-[#E30613] mb-6" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  {banners[current].title}
                </h1>
                {banners[current].description && (
                  <p className="text-lg text-gray-300 mb-8 max-w-lg">
                    {banners[current].description}
                  </p>
                )}
                <div className="flex gap-4">
                  {banners[current].buttonText && banners[current].buttonLink && (
                    <a href={banners[current].buttonLink || "#"}>
                      <Button size="lg" className="bg-[#E30613] hover:bg-[#c00511] text-white text-base px-8">
                        {banners[current].buttonText}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </a>
                  )}
                  <Link href="/urunler">
                    <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-white/10 text-base px-8">
                      Ürünleri Keşfet
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
            aria-label="Önceki banner"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
            aria-label="Sonraki banner"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Banner ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-[#E30613]" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
