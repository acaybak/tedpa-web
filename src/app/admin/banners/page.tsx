import { getBanners } from "@/actions/content-actions";
import { BannersClient } from "@/components/admin/banners-client";
export const instant = false;
export default async function BannersPage() {
  const banners = await getBanners();
  return <BannersClient banners={banners} />;
}
