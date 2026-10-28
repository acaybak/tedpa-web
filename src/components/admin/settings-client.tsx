"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveSiteSetting } from "@/actions/content-actions";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

export function SettingsClient({ settings }: { settings: Record<string, string> }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(settings);
  const [saving, setSaving] = useState(false);

  const handleSave = async (key: string) => {
    setSaving(true);
    await saveSiteSetting(key, values[key] || "");
    setSaving(false);
    router.refresh();
  };

  const fields = [
    { key: "company_name", label: "Firma Adı", group: "general" },
    { key: "phone", label: "Telefon", group: "contact" },
    { key: "email", label: "E-posta", group: "contact" },
    { key: "address", label: "Adres", group: "contact" },
    { key: "whatsapp", label: "WhatsApp", group: "contact" },
    { key: "google_maps", label: "Google Maps URL", group: "contact" },
    { key: "working_hours", label: "Çalışma Saatleri", group: "contact" },
    { key: "linkedin", label: "LinkedIn", group: "social" },
    { key: "twitter", label: "Twitter / X", group: "social" },
    { key: "instagram", label: "Instagram", group: "social" },
    { key: "youtube", label: "YouTube", group: "social" },
    { key: "seo_title_default", label: "Varsayılan SEO Başlık", group: "seo" },
    { key: "seo_description_default", label: "Varsayılan SEO Açıklama", group: "seo" },
  ];

  const groups = [
    { id: "general", label: "Genel" },
    { id: "contact", label: "İletişim" },
    { id: "social", label: "Sosyal Medya" },
    { id: "seo", label: "SEO" },
  ];

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-[#101114]">Site Ayarları</h1></div>
      <Tabs defaultValue="general">
        <TabsList className="mb-4 flex flex-wrap gap-2">{groups.map((g) => <TabsTrigger key={g.id} value={g.id}>{g.label}</TabsTrigger>)}</TabsList>
        {groups.map((g) => (
          <TabsContent key={g.id} value={g.id}>
            <Card><CardContent className="p-6 space-y-4">
              {fields.filter((f) => f.group === g.id).map((f) => (
                <div key={f.key} className="flex items-end gap-3">
                  <div className="flex-1"><Label>{f.label}</Label><Input value={values[f.key] || ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} /></div>
                  <Button size="sm" onClick={() => handleSave(f.key)} disabled={saving} className="bg-[#E30613] hover:bg-[#c00511] text-white"><Save className="w-3 h-3 mr-1" />Kaydet</Button>
                </div>
              ))}
            </CardContent></Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
