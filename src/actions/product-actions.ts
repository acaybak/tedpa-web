"use server";

import { db } from "@/lib/db";
import { requireAuth, createAuditLog } from "@/lib/auth";
import { productSchema, categorySchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ============ CATEGORIES ============

export async function getCategories() {
  return db.category.findMany({
    include: { parent: { select: { id: true, name: true } } },
    orderBy: { order: "asc" },
  });
}

export async function createCategory(formData: unknown) {
  await requireAuth();

  const parsed = categorySchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, slug: rawSlug, description, parentId, order, isActive, seoTitle, seoDescription } = parsed.data;
  const slug = rawSlug || slugify(name);

  const existing = await db.category.findUnique({ where: { slug } });
  if (existing) {
    return { success: false, error: "Bu slug zaten kullanılıyor" };
  }

  await db.category.create({
    data: { name, slug, description, parentId, order, isActive, seoTitle, seoDescription },
  });

  revalidatePath("/admin/products");
  revalidatePath("/urunler");
  return { success: true };
}

export async function updateCategory(id: string, formData: unknown) {
  await requireAuth();

  const parsed = categorySchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, slug: rawSlug, description, parentId, order, isActive, seoTitle, seoDescription } = parsed.data;
  const slug = rawSlug || slugify(name);

  await db.category.update({
    where: { id },
    data: { name, slug, description, parentId, order, isActive, seoTitle, seoDescription },
  });

  revalidatePath("/admin/products");
  revalidatePath("/urunler");
  return { success: true };
}

export async function deleteCategory(id: string) {
  await requireAuth();
  await db.category.delete({ where: { id } });
  revalidatePath("/admin/products");
  return { success: true };
}

// ============ PRODUCTS ============

export async function getProducts(params: {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  isActive?: boolean;
}) {
  const { page = 1, limit = 20, categoryId, search, isActive } = params;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (categoryId) where.categoryId = categoryId;
  if (isActive !== undefined) where.isActive = isActive;

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
      { sku: { contains: search, mode: "insensitive" } },
    ];
  }

  const [data, total] = await Promise.all([
    db.product.findMany({
      where,
      include: {
        category: { select: { id: true, name: true } },
        media: { where: { type: "thumbnail" }, take: 1 },
      },
      orderBy: { order: "asc" },
      skip,
      take: limit,
    }),
    db.product.count({ where }),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getProductBySlug(slug: string) {
  return db.product.findUnique({
    where: { slug, isActive: true },
    include: {
      category: true,
      subCategory: true,
      media: { orderBy: { order: "asc" } },
      attributes: { orderBy: { order: "asc" } },
      documents: true,
      relatedProducts: {
        include: {
          related: {
            include: { media: { where: { type: "thumbnail" }, take: 1 } },
          },
        },
      },
    },
  });
}

export async function getProductById(id: string) {
  return db.product.findUnique({
    where: { id },
    include: {
      media: { orderBy: { order: "asc" } },
      attributes: { orderBy: { order: "asc" } },
      documents: true,
      relatedProducts: { include: { related: true } },
    },
  });
}

export async function createProduct(formData: unknown) {
  const session = await requireAuth();

  const parsed = productSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, slug: rawSlug, code, sku, shortDescription, description, categoryId, subCategoryId, isActive, isFeatured, order, seoTitle, seoDescription, videoUrl } = parsed.data;
  const slug = rawSlug || slugify(name);

  const existing = await db.product.findUnique({ where: { slug } });
  if (existing) {
    return { success: false, error: "Bu slug zaten kullanılıyor" };
  }

  const product = await db.product.create({
    data: {
      name, slug, code, sku, shortDescription, description,
      categoryId: categoryId || null,
      subCategoryId: subCategoryId || null,
      isActive, isFeatured, order, seoTitle, seoDescription, videoUrl,
    },
  });

  await createAuditLog({
    userId: session.id,
    action: "CREATE",
    entity: "Product",
    entityId: product.id,
    newValue: JSON.stringify({ name, slug }),
  });

  revalidatePath("/admin/products");
  revalidatePath("/urunler");
  return { success: true, data: product };
}

export async function updateProduct(id: string, formData: unknown) {
  const session = await requireAuth();

  const parsed = productSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, slug: rawSlug, code, sku, shortDescription, description, categoryId, subCategoryId, isActive, isFeatured, order, seoTitle, seoDescription, videoUrl } = parsed.data;
  const slug = rawSlug || slugify(name);

  await db.product.update({
    where: { id },
    data: {
      name, slug, code, sku, shortDescription, description,
      categoryId: categoryId || null,
      subCategoryId: subCategoryId || null,
      isActive, isFeatured, order, seoTitle, seoDescription, videoUrl,
    },
  });

  await createAuditLog({
    userId: session.id,
    action: "UPDATE",
    entity: "Product",
    entityId: id,
  });

  revalidatePath("/admin/products");
  revalidatePath("/urunler");
  return { success: true };
}

export async function deleteProduct(id: string) {
  const session = await requireAuth();
  await db.product.delete({ where: { id } });

  await createAuditLog({
    userId: session.id,
    action: "DELETE",
    entity: "Product",
    entityId: id,
  });

  revalidatePath("/admin/products");
  revalidatePath("/urunler");
  return { success: true };
}

// ============ PUBLIC CATALOG ============

export async function getPublicProducts(params: {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
}) {
  return getProducts({ ...params, isActive: true });
}

export async function getFeaturedProducts(limit: number = 8) {
  return db.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      media: { where: { type: "thumbnail" }, take: 1 },
    },
    orderBy: { order: "asc" },
    take: limit,
  });
}

export async function getPublicCategories() {
  return db.category.findMany({
    where: { isActive: true },
    include: { _count: { select: { products: true } } },
    orderBy: { order: "asc" },
  });
}
