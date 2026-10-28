"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveCorporatePage, getCorporatePages } from "@/actions/content-actions";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

interface Page { slug: string; title: string; content: string | null; }

const defaultPages = [
  { slug: "hakkimizda", title: "Hakkımızda" },
  { slug: "vizyon-misyon", title: "Vizyon ve Misyon" },
  { slug: "kalite-politikasi", title: "Kalite Politikası" },
  { slug: "uretim-teknoloji", title: "Üretim ve Teknoloji" },
  { slug: "insan-kaynaklari", title: "İnsan Kaynakları" },
];

export function PagesClient({ pages }: { pages: Page[] }) {
  const router = useRouter();
  const pageMap = new Map(pages.map((p) => [p.slug, p]));
  const [activeTab, setActiveTab] = useState(defaultPages[0].slug);
  const [contents, setContents] = useState<Record<string, { title: string; content: string }>>(() => {
    const init: Record<string, { title: string; content: string }> = {};
    defaultPages.forEach((dp) => {
      const existing = pageMap.get(dp.slug);
      init[dp.slug] = { title: existing?.title || dp.title, content: existing?.content || "" };
    });
    return init;
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async (slug: string) => {
    setSaving(true);
    const data = contents[slug];
    await saveCorporatePage(slug, data.title, data.content);
    setSaving(false);
    router.refresh();
  };

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-[#101114]">Kurumsal Sayfalar</h1></div>
      <Tabs value={activeTab} onValueChange={(v) => v && setActiveTab(v)}>
        <TabsList className="mb-4 flex flex-wrap gap-2">
          {defaultPages.map((dp) => <TabsTrigger key={dp.slug} value={dp.slug}>{dp.title}</TabsTrigger>)}
        </TabsList>
        {defaultPages.map((dp) => (
          <TabsContent key={dp.slug} value={dp.slug}>
            <Card><CardContent className="p-6 space-y-4">
              <div><Label>Başlık</Label><Input value={contents[dp.slug].title} onChange={(e) => setContents({ ...contents, [dp.slug]: { ...contents[dp.slug], title: e.target.value } })} /></div>
              <div><Label>İçerik</Label><Textarea value={contents[dp.slug].content} onChange={(e) => setContents({ ...contents, [dp.slug]: { ...contents[dp.slug], content: e.target.value } })} rows={12} /></div>
              <Button onClick={() => handleSave(dp.slug)} disabled={saving} className="bg-[#E30613] hover:bg-[#c00511] text-white"><Save className="w-4 h-4 mr-2" />{saving ? "Kaydediliyor..." : "Kaydet"}</Button>
            </CardContent></Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
