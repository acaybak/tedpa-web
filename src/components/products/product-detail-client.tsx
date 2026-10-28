"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ClipboardList, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductMedia {
  id: string;
  url: string;
  type: string;
  altText: string | null;
}

interface ProductAttribute {
  id: string;
  key: string;
  value: string;
  group: string | null;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  code: string | null;
  sku: string | null;
  shortDescription: string | null;
  description: string | null;
  videoUrl: string | null;
  category: { id: string; name: string; slug: string } | null;
  subCategory: { id: string; name: string; slug: string } | null;
  media: ProductMedia[];
  attributes: ProductAttribute[];
  documents: { id: string; title: string; url: string; type: string }[];
  relatedProducts: {
    related: {
      id: string;
      name: string;
      slug: string;
      code: string | null;
      media: ProductMedia[];
    };
  }[];
}

export function ProductDetailClient({ product }: { product: Product }) {
  const addToQuoteList = () => {
    const list = JSON.parse(localStorage.getItem("tedpa_quote_list") || "[]");
    const exists = list.find((item: { productId: string }) => item.productId === product.id);
    if (!exists) {
      list.push({
        productId: product.id,
        productName: product.name,
        productCode: product.code,
        quantity: 1,
      });
      localStorage.setItem("tedpa_quote_list", JSON.stringify(list));
    }
    window.dispatchEvent(new Event("quote-list-updated"));
    alert(`"${product.name}" teklif listesine eklendi!`);
  };

  const images = product.media.filter((m) => m.type === "image");
  const mainImage = images[0];

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-[#F4F5F7] py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-[#737B86]">
            <Link href="/" className="hover:text-[#E30613]">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/urunler" className="hover:text-[#E30613]">Ürünler</Link>
            {product.category && (
              <>
                <span>/</span>
                <Link href={`/urunler?kategori=${product.category.slug}`} className="hover:text-[#E30613]">
                  {product.category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-[#101114]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Link href="/urunler" className="inline-flex items-center text-sm text-[#737B86] hover:text-[#E30613] mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Ürünlere Dön
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-[#F4F5F7] rounded-lg overflow-hidden flex items-center justify-center mb-4">
              {mainImage ? (
                <img src={mainImage.url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#737B86]">Görsel yok</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(1, 5).map((img) => (
                  <div key={img.id} className="aspect-square bg-[#F4F5F7] rounded overflow-hidden">
                    <img src={img.url} alt={img.altText || product.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.code && <Badge variant="outline" className="mb-2 font-mono">{product.code}</Badge>}
            <h1 className="text-3xl font-bold text-[#101114] mb-4">{product.name}</h1>

            {product.shortDescription && (
              <p className="text-[#737B86] text-lg mb-6">{product.shortDescription}</p>
            )}

            <div className="flex gap-3 mb-8">
              <Button onClick={addToQuoteList} className="bg-[#E30613] hover:bg-[#c00511] text-white">
                <ClipboardList className="w-4 h-4 mr-2" />
                Teklif Listeme Ekle
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Technical Specs */}
            {product.attributes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-[#101114] mb-3">Teknik Özellikler</h3>
                <Card>
                  <CardContent className="p-0">
                    <table className="w-full">
                      <tbody>
                        {product.attributes.map((attr) => (
                          <tr key={attr.id} className="border-b last:border-0">
                            <td className="px-4 py-3 text-sm font-medium text-[#737B86] w-1/3">{attr.key}</td>
                            <td className="px-4 py-3 text-sm text-[#101114]">{attr.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-[#101114] mb-3">Açıklama</h3>
                <div className="text-[#23262B] leading-relaxed whitespace-pre-line">{product.description}</div>
              </div>
            )}

            {/* Documents */}
            {product.documents.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-[#101114] mb-3">Dokümanlar</h3>
                <div className="space-y-2">
                  {product.documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-[#E30613]" />
                      <span className="text-sm">{doc.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#101114] mb-6">İlgili Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map(({ related }) => (
                <Link key={related.id} href={`/urunler/${related.slug}`}>
                  <Card className="group hover:shadow-md transition-all h-full border-gray-200">
                    <div className="aspect-square bg-[#F4F5F7] rounded-t-lg overflow-hidden flex items-center justify-center">
                      {related.media.length > 0 ? (
                        <img src={related.media[0].url} alt={related.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[#737B86] text-sm">Görsel yok</span>
                      )}
                    </div>
                    <CardContent className="p-4">
                      {related.code && <p className="text-xs text-[#737B86] mb-1">{related.code}</p>}
                      <h3 className="font-semibold text-sm text-[#101114] group-hover:text-[#E30613] transition-colors line-clamp-2">
                        {related.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
