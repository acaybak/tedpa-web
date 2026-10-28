import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Package, FileText, FolderTree, Newspaper, Trophy, MessageSquare, Image, BookOpen } from "lucide-react";
import Link from "next/link";

export const instant = false;

export default async function AdminDashboard() {
  const [
    productCount,
    activeProductCount,
    categoryCount,
    quoteCount,
    newQuoteCount,
    messageCount,
    newsCount,
    exhibitionCount,
    bannerCount,
    catalogCount,
  ] = await Promise.all([
    db.product.count(),
    db.product.count({ where: { isActive: true } }),
    db.category.count(),
    db.quoteRequest.count(),
    db.quoteRequest.count({ where: { status: "NEW" } }),
    db.contactMessage.count({ where: { isRead: false } }),
    db.newsArticle.count({ where: { status: "PUBLISHED" } }),
    db.exhibition.count({ where: { status: "UPCOMING" } }),
    db.banner.count(),
    db.catalog.count({ where: { isActive: true } }),
  ]);

  const recentQuotes = await db.quoteRequest.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      requestNumber: true,
      companyName: true,
      status: true,
      createdAt: true,
    },
  });

  const statusLabels: Record<string, string> = {
    NEW: "Yeni",
    IN_REVIEW: "İnceleniyor",
    CUSTOMER_CONTACTED: "Müşteriyle Görüşüldü",
    QUOTE_PREPARED: "Teklif Hazırlandı",
    COMPLETED: "Sonuçlandı",
    LOST: "Kaybedildi",
    CANCELLED: "İptal",
  };

  const stats = [
    { label: "Toplam Ürün", value: productCount, icon: Package, color: "text-blue-500" },
    { label: "Aktif Ürün", value: activeProductCount, icon: Package, color: "text-green-500" },
    { label: "Kategoriler", value: categoryCount, icon: FolderTree, color: "text-purple-500" },
    { label: "Teklif Talepleri", value: quoteCount, icon: FileText, color: "text-orange-500" },
    { label: "Yeni Teklifler", value: newQuoteCount, icon: FileText, color: "text-red-500" },
    { label: "Okunmamış Mesajlar", value: messageCount, icon: MessageSquare, color: "text-yellow-500" },
    { label: "Yayındaki Haberler", value: newsCount, icon: Newspaper, color: "text-indigo-500" },
    { label: "Yaklaşan Fuarlar", value: exhibitionCount, icon: Trophy, color: "text-teal-500" },
    { label: "Bannerlar", value: bannerCount, icon: Image, color: "text-pink-500" },
    { label: "Aktif Kataloglar", value: catalogCount, icon: BookOpen, color: "text-cyan-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#101114]">Dashboard</h1>
        <p className="text-[#737B86]">Genel bakış ve istatistikler</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#101114]">{stat.value}</p>
                <p className="text-xs text-[#737B86]">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Quotes */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-[#101114]">Son Teklif Talepleri</h2>
            <Link href="/admin/quotes" className="text-sm text-[#E30613] hover:underline">
              Tümünü Gör
            </Link>
          </div>
          {recentQuotes.length === 0 ? (
            <div className="p-8 text-center text-[#737B86]">
              Henüz teklif talebi bulunmamaktadır.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Talep No</th>
                  <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Firma</th>
                  <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Durum</th>
                  <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((quote: { id: string; requestNumber: string; companyName: string; status: string; createdAt: Date }) => (
                  <tr key={quote.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-[#E30613]">
                      <Link href={`/admin/quotes/${quote.id}`} className="hover:underline">
                        {quote.requestNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#101114]">{quote.companyName}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        quote.status === "NEW" ? "bg-green-100 text-green-700" :
                        quote.status === "IN_REVIEW" ? "bg-blue-100 text-blue-700" :
                        quote.status === "COMPLETED" ? "bg-gray-100 text-gray-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {statusLabels[quote.status] || quote.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#737B86]">
                      {quote.createdAt.toLocaleDateString("tr-TR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
