"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { products: number };
}

export function ProductFilters({
  categories,
  currentCategory,
  currentSearch,
}: {
  categories: Category[];
  currentCategory: string;
  currentSearch: string;
}) {
  return (
    <div className="space-y-6 sticky top-24">
      {/* Search */}
      <form action="/urunler" method="GET">
        <div className="relative">
          <Input
            name="search"
            placeholder="Ürün ara..."
            defaultValue={currentSearch}
            className="pl-9"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {currentCategory && <input type="hidden" name="kategori" value={currentCategory} />}
        <Button type="submit" className="w-full mt-2" variant="outline" size="sm">
          Ara
        </Button>
      </form>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wider text-[#101114] mb-3">
          Kategoriler
        </h3>
        <ul className="space-y-1">
          <li>
            <Link
              href="/urunler"
              className={`block px-3 py-2 rounded text-sm transition-colors ${
                !currentCategory
                  ? "bg-[#E30613] text-white"
                  : "text-[#23262B] hover:bg-gray-100"
              }`}
            >
              Tümü
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/urunler?kategori=${cat.slug}`}
                className={`block px-3 py-2 rounded text-sm transition-colors ${
                  currentCategory === cat.slug
                    ? "bg-[#E30613] text-white"
                    : "text-[#23262B] hover:bg-gray-100"
                }`}
              >
                {cat.name}
                <span className="text-xs opacity-60 ml-1">({cat._count.products})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
