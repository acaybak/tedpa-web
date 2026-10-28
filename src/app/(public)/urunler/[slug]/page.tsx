import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions/product-actions";
import { ProductDetailClient } from "@/components/products/product-detail-client";
import type { Metadata } from "next";

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Ürün Bulunamadı" };

  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.shortDescription || `${product.name} - TEDPA Makina`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
