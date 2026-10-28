import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "TEDPA Makina — Tecrübeyi Sanata Dönüştürür",
    template: "%s | TEDPA Makina",
  },
  description: "TEDPA Makina — Endüstriyel makine ve ekipman çözümleri. Ürün kataloğu, teknik dokümanlar ve teklif talepleri.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "TEDPA Makina",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
