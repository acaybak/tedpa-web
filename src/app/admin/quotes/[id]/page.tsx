import { getQuoteRequestDetail } from "@/actions/admin-quote-actions";
import { notFound } from "next/navigation";
import { QuoteDetailClient } from "@/components/admin/quote-detail-client";

export const instant = false;

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getQuoteRequestDetail(id);

  if (!result.success || !result.data) notFound();

  return <QuoteDetailClient quote={result.data} />;
}
