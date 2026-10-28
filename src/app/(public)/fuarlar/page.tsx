import { getExhibitions } from "@/actions/content-actions";
import { ExhibitionsListClient } from "@/components/public/exhibitions-list-client";
export const instant = false;

export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions();
  return <ExhibitionsListClient exhibitions={exhibitions} />;
}
