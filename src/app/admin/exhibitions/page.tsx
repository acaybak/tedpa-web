import { getExhibitions } from "@/actions/content-actions";
import { ExhibitionsClient } from "@/components/admin/exhibitions-client";
export const instant = false;
export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions();
  return <ExhibitionsClient exhibitions={exhibitions} />;
}
