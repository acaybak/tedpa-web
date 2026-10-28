import { getAllCatalogs } from "@/actions/content-actions";
import { CatalogsClient } from "@/components/admin/catalogs-client";
export const instant = false;
export default async function CatalogsPage() {
  const catalogs = await getAllCatalogs();
  return <CatalogsClient catalogs={catalogs} />;
}
