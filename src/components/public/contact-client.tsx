"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Navigation } from "lucide-react";
import { submitContactForm } from "@/actions/content-actions";

export function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await submitContactForm(form);
    if (result.success) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Bir hata oluştu");
    }
  };

  if (status === "success") {
    return (
      <section className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center py-20">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[#101114] mb-4">Mesajınız Gönderildi</h2>
            <p className="text-[#737B86] text-lg mb-8">
              En kısa sürede size dönüş yapacağız. Teşekkür ederiz.
            </p>
            <Button onClick={() => setStatus("idle")} variant="outline" className="border-[#E30613] text-[#E30613]">
              Yeni Mesaj Gönder
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="w-12 h-1 bg-[#E30613] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#101114] mb-4">İletişim</h1>
          <p className="text-lg text-[#737B86]">
            Sorularınız ve teklif talepleriniz için bizimle iletişime geçin.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-[#101114] mb-6">İletişim Bilgileri</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E30613]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#E30613]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#101114]">Adres</p>
                      <p className="text-sm text-[#737B86]">Organize Sanayi Bölgesi, Ankara, Türkiye</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E30613]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#E30613]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#101114]">Telefon</p>
                      <a href="tel:+903120000000" className="text-sm text-[#737B86] hover:text-[#E30613] transition-colors">+90 (312) 000 00 00</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E30613]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#E30613]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#101114]">E-posta</p>
                      <a href="mailto:info@tedpamakina.com" className="text-sm text-[#737B86] hover:text-[#E30613] transition-colors">info@tedpamakina.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E30613]/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#E30613]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#101114]">Çalışma Saatleri</p>
                      <p className="text-sm text-[#737B86]">Pzt - Cum: 08:30 - 18:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="bg-white overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195876.29874729874!2d32.6505!3d39.9208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d6a3e3e7b1%3A0x8e5a7b0c0c0c0c0c!2sAnkara%20OSB!5e0!3m2!1str!2str!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TEDPA Makina Konum"
                    className="absolute inset-0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Directions button */}
            <a
              href="https://maps.google.com/?q=Ankara+OSB"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="bg-white hover:bg-gray-50 transition-colors group cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E30613]/10 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-[#E30613]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#101114] text-sm">Yol Tarifi Al</p>
                      <p className="text-xs text-[#737B86]">Google Maps ile yön tarifi</p>
                    </div>
                  </div>
                  <span className="text-[#E30613] group-hover:translate-x-1 transition-transform">→</span>
                </CardContent>
              </Card>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-[#101114] mb-6">Mesaj Gönderin</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name">Ad Soyad *</Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-posta *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="email@sirket.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+90 (5XX) XXX XX XX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Konu</Label>
                      <Input
                        id="subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Mesajınızın konusu"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Mesaj *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>
                  {errorMsg && (
                    <p className="text-red-600 text-sm">{errorMsg}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-[#E30613] hover:bg-[#c00511] text-white px-8"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {status === "loading" ? "Gönderiliyor..." : "Mesaj Gönder"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
