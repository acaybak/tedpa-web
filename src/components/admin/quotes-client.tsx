"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { exportQuotesCSV } from "@/actions/admin-quote-actions";

const statusOptions = [
  { value: "ALL", label: "Tümü" },
  { value: "NEW", label: "Yeni" },
  { value: "IN_REVIEW", label: "İnceleniyor" },
  { value: "CUSTOMER_CONTACTED", label: "Müşteriyle Görüşüldü" },
  { value: "QUOTE_PREPARED", label: "Teklif Hazırlandı" },
  { value: "COMPLETED", label: "Sonuçlandı" },
  { value: "LOST", label: "Kaybedildi" },
  { value: "CANCELLED", label: "İptal" },
];

const statusColors: Record<string, string> = {
  NEW: "bg-green-100 text-green-700",
  IN_REVIEW: "bg-blue-100 text-blue-700",
  CUSTOMER_CONTACTED: "bg-purple-100 text-purple-700",
  QUOTE_PREPARED: "bg-orange-100 text-orange-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  LOST: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<string, string> = {
  NEW: "Yeni",
  IN_REVIEW: "İnceleniyor",
  CUSTOMER_CONTACTED: "Müşteriyle Görüşüldü",
  QUOTE_PREPARED: "Teklif Hazırlandı",
  COMPLETED: "Sonuçlandı",
  LOST: "Kaybedildi",
  CANCELLED: "İptal",
};

interface QuoteData {
  id: string;
  requestNumber: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Date;
  items: { id: string; productNameSnapshot: string; productCodeSnapshot: string | null; quantity: number }[];
  assignedUser: { id: string; fullName: string } | null;
}

export function QuotesClient({
  result,
  currentStatus,
  currentSearch,
  currentPage,
}: {
  result: { data: QuoteData[]; total: number; totalPages: number };
  currentStatus: string;
  currentSearch: string;
  currentPage: number;
}) {
  const router = useRouter();

  const handleExport = async () => {
    const csv = await exportQuotesCSV({ status: currentStatus, search: currentSearch });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `teklif-talepleri-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#101114]">Teklif Talepleri</h1>
          <p className="text-[#737B86] text-sm">{result.total} kayıt</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          CSV Dışa Aktar
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <form action="/admin/quotes" method="GET" className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Input
                  name="search"
                  placeholder="Talep no, firma, isim ile ara..."
                  defaultValue={currentSearch}
                  className="pl-9"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {currentStatus !== "ALL" && (
                <input type="hidden" name="status" value={currentStatus} />
              )}
              <Button type="submit" variant="outline" size="sm">Ara</Button>
            </form>
            <Select
              value={currentStatus}
              onValueChange={(value: string | null) => {
                if (!value) return;
                const params = new URLSearchParams();
                if (value !== "ALL") params.set("status", value);
                if (currentSearch) params.set("search", currentSearch);
                router.push(`/admin/quotes?${params.toString()}`);
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {result.data.length === 0 ? (
            <div className="p-8 text-center text-[#737B86]">
              Teklif talebi bulunmamaktadır.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Talep No</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Firma / İletişim</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Ürünler</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Durum</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Tarih</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.map((quote: QuoteData) => (
                    <tr key={quote.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-[#E30613]">{quote.requestNumber}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-[#101114]">{quote.companyName}</p>
                        <p className="text-xs text-[#737B86]">{quote.contactName} · {quote.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {quote.items.slice(0, 3).map((item: { productNameSnapshot: string; quantity: number }) => (
                            <Badge key={item.productNameSnapshot} variant="secondary" className="text-xs">
                              {item.productNameSnapshot} ×{item.quantity}
                            </Badge>
                          ))}
                          {quote.items.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{quote.items.length - 3}</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[quote.status] || "bg-gray-100 text-gray-700"}`}>
                          {statusLabels[quote.status] || quote.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#737B86]">
                        {new Date(quote.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/quotes/${quote.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Detay
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {result.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: result.totalPages }, (_, i) => {
            const params = new URLSearchParams();
            params.set("page", String(i + 1));
            if (currentStatus !== "ALL") params.set("status", currentStatus);
            if (currentSearch) params.set("search", currentSearch);
            return (
              <Link key={i} href={`/admin/quotes?${params.toString()}`}>
                <Button
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  className={currentPage === i + 1 ? "bg-[#E30613] hover:bg-[#c00511]" : ""}
                >
                  {i + 1}
                </Button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
