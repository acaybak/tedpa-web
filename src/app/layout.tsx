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
  description: "TEDPA Makina — 25+ yıl tecrübe ile endüstriyel makine ve ekipman çözümleri. Ürün kataloğu, teknik dokümanlar ve teklif talepleri.",
  metadataBase: new URL("https://tedpa-web-two.vercel.app"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "TEDPA Makina",
    images: [{ url: "/logo-full.png", width: 1200, height: 630, alt: "TEDPA Makina" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
