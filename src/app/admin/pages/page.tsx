import { getCorporatePages } from "@/actions/content-actions";
import { PagesClient } from "@/components/admin/pages-client";
export const instant = false;
export default async function PagesPage() {
  const pages = await getCorporatePages();
  return <PagesClient pages={pages} />;
}
