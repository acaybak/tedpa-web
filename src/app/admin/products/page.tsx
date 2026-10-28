import { getProducts, getCategories } from "@/actions/product-actions";
import { ProductsClient } from "@/components/admin/products-client";

export const instant = false;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = (params.search as string) || "";
  const categoryId = (params.category as string) || "";

  const [products, categories] = await Promise.all([
    getProducts({ page, limit: 20, search, categoryId: categoryId || undefined }),
    getCategories(),
  ]);

  return <ProductsClient products={products} categories={categories} currentSearch={search} currentPage={page} />;
}
