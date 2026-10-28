import { getCatalogs } from "@/actions/content-actions";
import { CatalogsListClient } from "@/components/public/catalogs-list-client";
export const instant = false;

export default async function CatalogsPage() {
  const catalogs = await getCatalogs();
  return <CatalogsListClient catalogs={catalogs} />;
}
