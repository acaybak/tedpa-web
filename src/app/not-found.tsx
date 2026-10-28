import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F5F7] px-4">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="text-[12rem] font-black text-[#101114]/5 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[#E30613]/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-[#E30613]" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#101114] mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          Ana sayfaya dönerek devam edebilirsiniz.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="bg-[#E30613] hover:bg-[#E30613]/90 text-white px-8 h-12 rounded-xl font-semibold">
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfa
            </Button>
          </Link>
          <Link href="/urunler">
            <Button size="lg" variant="outline" className="px-8 h-12 rounded-xl font-semibold border-gray-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ürünlere Göz At
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
