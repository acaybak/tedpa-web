import { getQuoteRequests } from "@/actions/admin-quote-actions";
import { QuotesClient } from "@/components/admin/quotes-client";

export const instant = false;

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const status = (params.status as string) || "ALL";
  const search = (params.search as string) || "";

  const result = await getQuoteRequests({ page, limit: 20, status, search });

  return <QuotesClient result={result} currentStatus={status} currentSearch={search} currentPage={page} />;
}
