import { getCategories } from "@/actions/product-actions";
import { CategoriesClient } from "@/components/admin/categories-client";
export const instant = false;
export default async function CategoriesPage() {
  const categories = await getCategories();
  return <CategoriesClient categories={categories} />;
}
