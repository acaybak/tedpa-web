import { getPublicNews, getNewsCategories } from "@/actions/content-actions";
import { NewsListClient } from "@/components/public/news-list-client";
export const instant = false;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const [news, categories] = await Promise.all([
    getPublicNews({ page, categorySlug: params.category }),
    getNewsCategories(),
  ]);

  return <NewsListClient news={news} categories={categories} currentPage={page} currentCategory={params.category} />;
}
