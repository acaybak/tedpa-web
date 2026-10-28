import { getNewsArticles, getNewsCategories } from "@/actions/content-actions";
import { NewsClient } from "@/components/admin/news-client";
export const instant = false;
export default async function NewsPage() {
  const [articles, categories] = await Promise.all([getNewsArticles({ limit: 100 }), getNewsCategories()]);
  return <NewsClient articles={articles.data} categories={categories} />;
}
