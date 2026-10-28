"use server";

import { db } from "@/lib/db";
import { requireAuth, createAuditLog } from "@/lib/auth";
import { quoteStatusSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getQuoteRequests(params: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  await requireAuth();

  const { page = 1, limit = 20, status, search } = params;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { requestNumber: { contains: search, mode: "insensitive" } },
      { companyName: { contains: search, mode: "insensitive" } },
      { contactName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [data, total] = await Promise.all([
    db.quoteRequest.findMany({
      where,
      include: {
        items: { select: { id: true, productNameSnapshot: true, productCodeSnapshot: true, quantity: true } },
        assignedUser: { select: { id: true, fullName: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.quoteRequest.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getQuoteRequestDetail(id: string) {
  await requireAuth();

  const quote = await db.quoteRequest.findUnique({
    where: { id },
    include: {
      items: true,
      history: { orderBy: { createdAt: "desc" } },
      assignedUser: { select: { id: true, fullName: true } },
      notifications: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!quote) {
    return { success: false, error: "Teklif talebi bulunamadı" };
  }

  return { success: true, data: quote };
}

export async function updateQuoteStatus(quoteId: string, formData: unknown) {
  const session = await requireAuth();

  const parsed = quoteStatusSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { status, internalNotes, lostReason, assignedTo } = parsed.data;

  const existing = await db.quoteRequest.findUnique({ where: { id: quoteId } });
  if (!existing) {
    return { success: false, error: "Teklif talebi bulunamadı" };
  }

  const oldStatus = existing.status;

  await db.quoteRequest.update({
    where: { id: quoteId },
    data: {
      status,
      ...(internalNotes !== undefined && { internalNotes }),
      ...(lostReason !== undefined && { lostReason }),
      ...(assignedTo !== undefined && { assignedTo }),
    },
  });

  // Record history
  await db.quoteHistory.create({
    data: {
      quoteRequestId: quoteId,
      action: "STATUS_CHANGE",
      oldValue: oldStatus,
      newValue: status,
      performedBy: session.id,
      note: internalNotes || null,
    },
  });

  await createAuditLog({
    userId: session.id,
    action: "UPDATE_QUOTE_STATUS",
    entity: "QuoteRequest",
    entityId: quoteId,
    oldValue: oldStatus,
    newValue: status,
  });

  revalidatePath("/admin/quotes");
  return { success: true };
}

export async function addQuoteInternalNote(quoteId: string, note: string) {
  const session = await requireAuth();

  await db.quoteRequest.update({
    where: { id: quoteId },
    data: { internalNotes: note },
  });

  await db.quoteHistory.create({
    data: {
      quoteRequestId: quoteId,
      action: "NOTE_ADDED",
      newValue: note,
      performedBy: session.id,
    },
  });

  revalidatePath("/admin/quotes");
  return { success: true };
}

export async function exportQuotesCSV(params: {
  status?: string;
  search?: string;
}) {
  await requireAuth();

  const where: Record<string, unknown> = {};

  if (params.status && params.status !== "ALL") {
    where.status = params.status;
  }

  if (params.search) {
    where.OR = [
      { requestNumber: { contains: params.search, mode: "insensitive" } },
      { companyName: { contains: params.search, mode: "insensitive" } },
      { contactName: { contains: params.search, mode: "insensitive" } },
    ];
  }

  const quotes = await db.quoteRequest.findMany({
    where,
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  // Build CSV
  const headers = [
    "Talep No",
    "Firma",
    "İletişim",
    "E-posta",
    "Telefon",
    "Ürünler",
    "Durum",
    "Tarih",
  ];

  const statusLabels: Record<string, string> = {
    NEW: "Yeni",
    IN_REVIEW: "İnceleniyor",
    CUSTOMER_CONTACTED: "Müşteriyle Görüşüldü",
    QUOTE_PREPARED: "Teklif Hazırlandı",
    COMPLETED: "Sonuçlandı",
    LOST: "Kaybedildi",
    CANCELLED: "İptal",
  };

  const rows = quotes.map((q: { requestNumber: string; companyName: string; contactName: string; email: string; phone: string; items: { productNameSnapshot: string; quantity: number }[]; status: string; createdAt: Date }) => [
    q.requestNumber,
    q.companyName,
    q.contactName,
    q.email,
    q.phone,
    q.items.map((i: { productNameSnapshot: string; quantity: number }) => `${i.productNameSnapshot} (${i.quantity})`).join("; "),
    statusLabels[q.status] || q.status,
    q.createdAt.toISOString().split("T")[0],
  ]);

  const csv = [headers.join(","), ...rows.map((r: string[]) => r.map((c: string) => `"${c}"`).join(","))].join("\n");

  return csv;
}

export async function getNewQuoteCount(): Promise<number> {
  try {
    return await db.quoteRequest.count({ where: { status: "NEW" } });
  } catch {
    return 0;
  }
}
