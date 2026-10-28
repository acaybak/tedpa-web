import { ContactClient } from "@/components/public/contact-client";
export const instant = false;

export const metadata = {
  title: "İletişim - TEDPA Makina",
  description: "TEDPA Makina ile iletişime geçin. Sorularınız ve teklif talepleriniz için bize ulaşın.",
};

export default function ContactPage() {
  return <ContactClient />;
}
