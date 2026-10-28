import { z } from "zod";

// ============ AUTH ============

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

// ============ QUOTE REQUEST ============

export const quoteItemSchema = z.object({
  productId: z.string().optional(),
  productNameSnapshot: z.string().min(1, "Ürün adı gerekli"),
  productCodeSnapshot: z.string().optional(),
  quantity: z.number().int().min(1, "Miktar en az 1 olmalıdır"),
  notes: z.string().optional(),
});

export const quoteRequestSchema = z.object({
  companyName: z.string().min(2, "Firma adı gerekli"),
  contactName: z.string().min(2, "İletişim adı gerekli"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(7, "Geçerli bir telefon numarası giriniz"),
  message: z.string().optional(),
  items: z.array(quoteItemSchema).min(1, "En az bir ürün eklemelisiniz"),
});

// ============ CONTACT ============

export const contactFormSchema = z.object({
  name: z.string().min(2, "Ad soyad gerekli"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
});

// ============ PRODUCT ============

export const productSchema = z.object({
  name: z.string().min(2, "Ürün adı gerekli"),
  slug: z.string().optional(),
  code: z.string().optional(),
  sku: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().optional().nullable(),
  subCategoryId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  order: z.number().int().default(0),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  videoUrl: z.string().optional(),
});

// ============ CATEGORY ============

export const categorySchema = z.object({
  name: z.string().min(2, "Kategori adı gerekli"),
  slug: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

// ============ BANNER ============

export const bannerSchema = z.object({
  title: z.string().min(2, "Banner başlığı gerekli"),
  description: z.string().optional(),
  imageUrl: z.string().min(1, "Banner görseli gerekli"),
  mobileImageUrl: z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  publishStart: z.string().optional().nullable(),
  publishEnd: z.string().optional().nullable(),
});

// ============ NEWS ============

export const newsArticleSchema = z.object({
  title: z.string().min(2, "Haber başlığı gerekli"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  publishDate: z.string().optional().nullable(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

// ============ EXHIBITION ============

export const exhibitionSchema = z.object({
  name: z.string().min(2, "Fuar adı gerekli"),
  slug: z.string().optional(),
  type: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  venue: z.string().optional(),
  startDate: z.string().min(1, "Başlangıç tarihi gerekli"),
  endDate: z.string().min(1, "Bitiş tarihi gerekli"),
  boothNumber: z.string().optional(),
  coverImage: z.string().optional(),
  description: z.string().optional(),
  websiteUrl: z.string().optional(),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]).default("UPCOMING"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

// ============ CATALOG ============

export const catalogSchema = z.object({
  title: z.string().min(2, "Katalog başlığı gerekli"),
  slug: z.string().optional(),
  coverImage: z.string().optional(),
  pdfUrl: z.string().min(1, "PDF dosyası gerekli"),
  category: z.string().optional(),
  language: z.string().default("tr"),
  version: z.string().optional(),
  publishDate: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

// ============ QUOTE STATUS UPDATE ============

export const quoteStatusSchema = z.object({
  status: z.enum(["NEW", "IN_REVIEW", "CUSTOMER_CONTACTED", "QUOTE_PREPARED", "COMPLETED", "LOST", "CANCELLED"]),
  internalNotes: z.string().optional(),
  lostReason: z.string().optional(),
  assignedTo: z.string().optional().nullable(),
});
