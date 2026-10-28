"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Minus, FileText, CheckCircle } from "lucide-react";
import { submitQuoteRequest } from "@/actions/quote-actions";

interface QuoteItem {
  productId: string;
  productName: string;
  productCode: string | null;
  quantity: number;
  notes: string;
}

export default function QuotePage() {
  const router = useRouter();
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [step, setStep] = useState<"list" | "form" | "success">("list");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ requestNumber: string } | null>(null);

  // Form fields
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("tedpa_quote_list");
    if (stored) {
      setItems(JSON.parse(stored));
    }
    const handler = () => {
      const stored = localStorage.getItem("tedpa_quote_list");
      if (stored) setItems(JSON.parse(stored));
    };
    window.addEventListener("quote-list-updated", handler);
    return () => window.removeEventListener("quote-list-updated", handler);
  }, []);

  const saveItems = (newItems: QuoteItem[]) => {
    setItems(newItems);
    localStorage.setItem("tedpa_quote_list", JSON.stringify(newItems));
  };

  const updateQuantity = (index: number, delta: number) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
    saveItems(newItems);
  };

  const setQuantity = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(1, parseInt(value) || 1);
    saveItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    saveItems(newItems);
  };

  const handleSubmit = async () => {
    setError("");
    if (!companyName.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    if (items.length === 0) {
      setError("Teklif listesine en az bir ürün eklemelisiniz.");
      return;
    }

    setSubmitting(true);
    const res = await submitQuoteRequest({
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim() || undefined,
      items: items.map((item) => ({
        productId: item.productId,
        productNameSnapshot: item.productName,
        productCodeSnapshot: item.productCode,
        quantity: item.quantity,
        notes: item.notes || undefined,
      })),
    });

    setSubmitting(false);

    if (res.success && res.data) {
      setResult({ requestNumber: res.data.requestNumber });
      localStorage.removeItem("tedpa_quote_list");
      setItems([]);
      setStep("success");
    } else {
      setError(res.error || "Bir hata oluştu.");
    }
  };

  if (step === "success" && result) {
    return (
      <div className="pt-20 min-h-screen bg-[#F4F5F7]">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-[#101114] mb-4">
              Teklif Talebiniz Alındı
            </h1>
            <p className="text-[#737B86] mb-2">
              Talep numaranız:
            </p>
            <p className="text-2xl font-bold text-[#E30613] mb-6">
              {result.requestNumber}
            </p>
            <p className="text-sm text-[#737B86] mb-8">
              En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <Button onClick={() => router.push("/")} className="bg-[#E30613] hover:bg-[#c00511] text-white">
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-[#F4F5F7]">
      <div className="container mx-auto px-4 py-10">
        <div className="w-12 h-1 bg-[#E30613] mb-4" />
        <h1 className="text-3xl font-bold text-[#101114] mb-2">Teklif Listem</h1>
        <p className="text-[#737B86] mb-8">
          Ürünlerinizi inceleyin, miktar belirleyin ve teklif talebinde bulunun.
        </p>

        {items.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <FileText className="w-12 h-12 text-[#737B86] mx-auto mb-4" />
              <p className="text-[#737B86] text-lg mb-2">Teklif listeniz boş</p>
              <p className="text-sm text-[#737B86] mb-6">
                Ürünleri &quot;Teklif Listeme Ekle&quot; butonuyla ekleyebilirsiniz.
              </p>
              <Button onClick={() => router.push("/urunler")} variant="outline">
                Ürünleri İncele
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {step === "list" && (
                <>
                  {items.map((item, index) => (
                    <Card key={`${item.productId}-${index}`}>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#101114]">{item.productName}</h3>
                          {item.productCode && (
                            <p className="text-xs text-[#737B86] font-mono">{item.productCode}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => setQuantity(index, e.target.value)}
                            className="w-16 h-8 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    onClick={() => setStep("form")}
                    className="w-full bg-[#E30613] hover:bg-[#c00511] text-white"
                    size="lg"
                  >
                    Teklif Talebi Oluştur
                  </Button>
                </>
              )}

              {step === "form" && (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-[#101114] mb-4">İletişim Bilgileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Firma Adı *</Label>
                        <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Firma adı" />
                      </div>
                      <div>
                        <Label>İletişim Adı *</Label>
                        <Input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Ad soyad" />
                      </div>
                      <div>
                        <Label>E-posta *</Label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@firma.com" />
                      </div>
                      <div>
                        <Label>Telefon *</Label>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 xxx xxx xx xx" />
                      </div>
                    </div>
                    <div>
                      <Label>Mesaj (Opsiyonel)</Label>
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Teklif ile ilgili ek bilgi..."
                        rows={3}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded text-xs text-[#737B86]">
                      <p>
                        Kişisel verileriniz 6698 sayılı KVKK kapsamında işlenmektedir.
                        Verileriniz yalnızca teklif talebinizin değerlendirilmesi amacıyla kullanılacaktır.
                      </p>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep("list")}>
                        Geri
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="bg-[#E30613] hover:bg-[#c00511] text-white flex-1"
                      >
                        {submitting ? "Gönderiliyor..." : "Teklif Talebini Gönder"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Summary Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-[#101114] mb-3">Teklif Özeti</h3>
                  <div className="space-y-2 mb-4">
                    {items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-[#737B86] truncate mr-2">{item.productName}</span>
                        <span className="text-[#101114] font-medium shrink-0">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm font-medium text-[#101114]">
                      Toplam {items.length} ürün
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
