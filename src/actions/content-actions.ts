"use server";

import { db } from "@/lib/db";
import { requireAuth, createAuditLog } from "@/lib/auth";
import { bannerSchema, newsArticleSchema, exhibitionSchema, catalogSchema, contactFormSchema, categorySchema } from "@/lib/validations";
import { revalidatePath, unstable_noStore } from "next/cache";
import { cookies } from "next/headers";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ============ BANNERS ============

export async function getBanners() {
  return db.banner.findMany({ orderBy: { order: "asc" } });
}

export async function getActiveBanners() {
  unstable_noStore();
  return db.banner.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export async function createBanner(formData: unknown) {
  await requireAuth();
  const parsed = bannerSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const { title, description, imageUrl, mobileImageUrl, buttonText, buttonLink, order, isActive, publishStart, publishEnd } = parsed.data;
  await db.banner.create({
    data: {
      title, description, imageUrl, mobileImageUrl, buttonText, buttonLink, order, isActive,
      publishStart: publishStart ? new Date(publishStart) : null,
      publishEnd: publishEnd ? new Date(publishEnd) : null,
    },
  });
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return { success: true };
}

export async function updateBanner(id: string, formData: unknown) {
  await requireAuth();
  const parsed = bannerSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const { title, description, imageUrl, mobileImageUrl, buttonText, buttonLink, order, isActive, publishStart, publishEnd } = parsed.data;
  await db.banner.update({
    where: { id },
    data: {
      title, description, imageUrl, mobileImageUrl, buttonText, buttonLink, order, isActive,
      publishStart: publishStart ? new Date(publishStart) : null,
      publishEnd: publishEnd ? new Date(publishEnd) : null,
    },
  });
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return { success: true };
}

export async function deleteBanner(id: string) {
  await requireAuth();
  await db.banner.delete({ where: { id } });
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return { success: true };
}

// ============ NEWS ============

export async function getNewsArticles(params: { page?: number; limit?: number; status?: string; categorySlug?: string }) {
  const { page = 1, limit = 12, status, categorySlug } = params;
  const skip = (page - 1) * limit;
  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (categorySlug) where.category = { slug: categorySlug };

  const [data, total] = await Promise.all([
    db.newsArticle.findMany({
      where,
      include: { category: { select: { id: true, name: true, slug: true } } },
      orderBy: { publishDate: "desc" },
      skip, take: limit,
    }),
    db.newsArticle.count({ where }),
  ]);
  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getPublicNews(params: { page?: number; limit?: number; categorySlug?: string }) {
  return getNewsArticles({ ...params, status: "PUBLISHED" });
}

export async function getNewsBySlug(slug: string) {
  return db.newsArticle.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { category: true },
  });
}

export async function getNewsCategories() {
  return db.newsCategory.findMany({ orderBy: { order: "asc" } });
}

export async function createNewsArticle(formData: unknown) {
  const session = await requireAuth();
  const parsed = newsArticleSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const { title, slug: rawSlug, excerpt, content, coverImage, categoryId, tags, author, status, publishDate, seoTitle, seoDescription } = parsed.data;
  const slug = rawSlug || slugify(title);

  await db.newsArticle.create({
    data: {
      title, slug, excerpt, content, coverImage,
      categoryId: categoryId || null,
      tags: Array.isArray(tags) ? tags.join(",") : tags || null,
      author, status, seoTitle, seoDescription,
      publishDate: publishDate ? new Date(publishDate) : null,
      readTime: content ? Math.ceil(content.split(" ").length / 200) : null,
    },
  });
  await createAuditLog({ userId: session.id, action: "CREATE", entity: "NewsArticle", newValue: JSON.stringify({ title, slug }) });
  revalidatePath("/admin/news");
  revalidatePath("/haberler");
  return { success: true };
}

export async function updateNewsArticle(id: string, formData: unknown) {
  await requireAuth();
  const parsed = newsArticleSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const { title, slug: rawSlug, excerpt, content, coverImage, categoryId, tags, author, status, publishDate, seoTitle, seoDescription } = parsed.data;
  const slug = rawSlug || slugify(title);

  await db.newsArticle.update({
    where: { id },
    data: {
      title, slug, excerpt, content, coverImage,
      categoryId: categoryId || null,
      tags: Array.isArray(tags) ? tags.join(",") : tags || null,
      author, status, seoTitle, seoDescription,
      publishDate: publishDate ? new Date(publishDate) : null,
    },
  });
  revalidatePath("/admin/news");
  revalidatePath("/haberler");
  return { success: true };
}

export async function deleteNewsArticle(id: string) {
  await requireAuth();
  await db.newsArticle.delete({ where: { id } });
  revalidatePath("/admin/news");
  return { success: true };
}

// ============ EXHIBITIONS ============

export async function getExhibitions(params: { status?: string } = {}) {
  const where: Record<string, unknown> = {};
  if (params.status && params.status !== "ALL") where.status = params.status;
  return db.exhibition.findMany({ where, orderBy: { startDate: "desc" } });
}

export async function getExhibitionBySlug(slug: string) {
  return db.exhibition.findUnique({
    where: { slug },
    include: { media: { orderBy: { order: "asc" } } },
  });
}

export async function createExhibition(formData: unknown) {
  const session = await requireAuth();
  const parsed = exhibitionSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const { name, slug: rawSlug, type, country, city, venue, startDate, endDate, boothNumber, coverImage, description, websiteUrl, status, seoTitle, seoDescription } = parsed.data;
  const slug = rawSlug || slugify(name);

  await db.exhibition.create({
    data: {
      name, slug, type, country, city, venue, boothNumber, coverImage, description, websiteUrl, status, seoTitle, seoDescription,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });
  await createAuditLog({ userId: session.id, action: "CREATE", entity: "Exhibition", newValue: JSON.stringify({ name, slug }) });
  revalidatePath("/admin/exhibitions");
  revalidatePath("/fuarlar");
  return { success: true };
}

export async function updateExhibition(id: string, formData: unknown) {
  await requireAuth();
  const parsed = exhibitionSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const { name, slug: rawSlug, type, country, city, venue, startDate, endDate, boothNumber, coverImage, description, websiteUrl, status, seoTitle, seoDescription } = parsed.data;
  const slug = rawSlug || slugify(name);

  await db.exhibition.update({
    where: { id },
    data: {
      name, slug, type, country, city, venue, boothNumber, coverImage, description, websiteUrl, status, seoTitle, seoDescription,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });
  revalidatePath("/admin/exhibitions");
  revalidatePath("/fuarlar");
  return { success: true };
}

export async function deleteExhibition(id: string) {
  await requireAuth();
  await db.exhibition.delete({ where: { id } });
  revalidatePath("/admin/exhibitions");
  return { success: true };
}

// ============ CATALOGS ============

export async function getCatalogs() {
  return db.catalog.findMany({ where: { isActive: true }, orderBy: { publishDate: "desc" } });
}

export async function getAllCatalogs() {
  return db.catalog.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createCatalog(formData: unknown) {
  const session = await requireAuth();
  const parsed = catalogSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const { title, slug: rawSlug, coverImage, pdfUrl, category, language, version, publishDate, isActive } = parsed.data;
  const slug = rawSlug || slugify(title);

  await db.catalog.create({
    data: { title, slug, coverImage, pdfUrl, category, language, version, isActive, publishDate: publishDate ? new Date(publishDate) : null },
  });
  await createAuditLog({ userId: session.id, action: "CREATE", entity: "Catalog", newValue: JSON.stringify({ title, slug }) });
  revalidatePath("/admin/catalogs");
  revalidatePath("/kataloglar");
  return { success: true };
}

export async function updateCatalog(id: string, formData: unknown) {
  await requireAuth();
  const parsed = catalogSchema.safeParse(formData);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const { title, slug: rawSlug, coverImage, pdfUrl, category, language, version, publishDate, isActive } = parsed.data;
  const slug = rawSlug || slugify(title);

  await db.catalog.update({
    where: { id },
    data: { title, slug, coverImage, pdfUrl, category, language, version, isActive, publishDate: publishDate ? new Date(publishDate) : null },
  });
  revalidatePath("/admin/catalogs");
  revalidatePath("/kataloglar");
  return { success: true };
}

export async function deleteCatalog(id: string) {
  await requireAuth();
  await db.catalog.delete({ where: { id } });
  revalidatePath("/admin/catalogs");
  return { success: true };
}

// ============ CONTACT ============

export async function submitContactForm(formData: unknown) {
  try {
    const parsed = contactFormSchema.safeParse(formData);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const { name, email, phone, subject, message } = parsed.data;
    await db.contactMessage.create({
      data: { name: name.trim(), email: email.toLowerCase().trim(), phone: phone?.trim() || null, subject: subject?.trim() || null, message: message.trim() },
    });
    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Mesaj gönderilirken bir hata oluştu" };
  }
}

export async function getContactMessages(params: { page?: number; limit?: number; unreadOnly?: boolean } = {}) {
  await requireAuth();
  const { page = 1, limit = 20, unreadOnly = false } = params;
  const skip = (page - 1) * limit;
  const where = unreadOnly ? { isRead: false } : {};

  const [data, total] = await Promise.all([
    db.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: limit }),
    db.contactMessage.count({ where }),
  ]);
  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function markMessageRead(id: string) {
  await requireAuth();
  await db.contactMessage.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function deleteMessage(id: string) {
  await requireAuth();
  await db.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  return { success: true };
}

// ============ CORPORATE PAGES ============

export async function getCorporatePage(slug: string) {
  return db.corporatePage.findUnique({ where: { slug, isActive: true } });
}

export async function getCorporatePages() {
  return db.corporatePage.findMany({ orderBy: { title: "asc" } });
}

export async function saveCorporatePage(slug: string, title: string, content: string) {
  await requireAuth();
  const existing = await db.corporatePage.findUnique({ where: { slug } });
  if (existing) {
    await db.corporatePage.update({ where: { slug }, data: { title, content } });
  } else {
    await db.corporatePage.create({ data: { slug, title, content, isActive: true } });
  }
  revalidatePath("/admin/pages");
  revalidatePath(`/kurumsal/${slug}`);
  return { success: true };
}

// ============ SITE SETTINGS ============

export async function getSiteSettings() {
  const settings = await db.siteSetting.findMany();
  const map: Record<string, string> = {};
  settings.forEach((s: { key: string; value: string }) => { map[s.key] = s.value; });
  return map;
}

export async function saveSiteSetting(key: string, value: string, group: string = "general", label?: string) {
  await requireAuth();
  const existing = await db.siteSetting.findUnique({ where: { key } });
  if (existing) {
    await db.siteSetting.update({ where: { key }, data: { value } });
  } else {
    await db.siteSetting.create({ data: { key, value, group, label: label || key } });
  }
  revalidatePath("/admin/settings");
  return { success: true };
}

// ============ USERS ============

export async function getUsers() {
  await requireAuth();
  return db.user.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, email: true, fullName: true, role: true, isActive: true, lastLoginAt: true, createdAt: true } });
}

export async function createUser(formData: { email: string; fullName: string; password: string; role: string }) {
  await requireAuth();
  const { hashPassword } = await import("@/lib/auth");
  const passwordHash = await hashPassword(formData.password);
  await db.user.create({
    data: { email: formData.email.toLowerCase().trim(), fullName: formData.fullName, role: formData.role, passwordHash },
  });
  revalidatePath("/admin/users");
  return { success: true };
}

export async function toggleUserActive(id: string) {
  await requireAuth();
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return { success: false, error: "Kullanıcı bulunamadı" };
  await db.user.update({ where: { id }, data: { isActive: !user.isActive } });
  revalidatePath("/admin/users");
  return { success: true };
}

// ============ AUDIT LOGS ============

export async function getAuditLogs(params: { page?: number; limit?: number } = {}) {
  await requireAuth();
  const { page = 1, limit = 50 } = params;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    db.auditLog.findMany({
      include: { user: { select: { fullName: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip, take: limit,
    }),
    db.auditLog.count(),
  ]);
  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}

// ============ DASHBOARD STATS ============

export async function getDashboardStats() {
  const [productCount, activeProductCount, categoryCount, quoteCount, newQuoteCount, messageCount, unreadMessages, newsCount, exhibitionCount, bannerCount, catalogCount] = await Promise.all([
    db.product.count(),
    db.product.count({ where: { isActive: true } }),
    db.category.count(),
    db.quoteRequest.count(),
    db.quoteRequest.count({ where: { status: "NEW" } }),
    db.contactMessage.count(),
    db.contactMessage.count({ where: { isRead: false } }),
    db.newsArticle.count({ where: { status: "PUBLISHED" } }),
    db.exhibition.count({ where: { status: "UPCOMING" } }),
    db.banner.count(),
    db.catalog.count({ where: { isActive: true } }),
  ]);
  return { productCount, activeProductCount, categoryCount, quoteCount, newQuoteCount, messageCount, unreadMessages, newsCount, exhibitionCount, bannerCount, catalogCount };
}
