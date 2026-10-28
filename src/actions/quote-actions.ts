"use server";

import { db } from "@/lib/db";
import { quoteRequestSchema } from "@/lib/validations";
import { v4 as uuidv4 } from "uuid";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(identifier: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

async function generateRequestNumber(): Promise<string> {
  const date = new Date();
  const prefix = "TKT";
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;

  const count = await db.quoteRequest.count({
    where: {
      createdAt: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
      },
    },
  });

  return `${prefix}-${dateStr}-${String(count + 1).padStart(3, "0")}`;
}

export async function submitQuoteRequest(formData: unknown, clientIp: string = "unknown") {
  try {
    // Rate limiting
    if (!checkRateLimit(clientIp, 5, 60000)) {
      return { success: false, error: "Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin." };
    }

    // Basic spam check
    const data = formData as Record<string, unknown>;
    const message = (data.message as string) || "";
    if (message.includes("http://") || message.includes("https://") || message.includes("<script")) {
      return { success: false, error: "Geçersiz içerik tespit edildi." };
    }

    // Validate
    const parsed = quoteRequestSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { companyName, contactName, email, phone, message: msg, items } = parsed.data;

    const requestNumber = await generateRequestNumber();

    const quoteRequest = await db.quoteRequest.create({
      data: {
        requestNumber,
        companyName: companyName.trim(),
        contactName: contactName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        message: msg?.trim() || null,
        status: "NEW",
        items: {
          create: items.map((item) => ({
            productId: item.productId || null,
            productNameSnapshot: item.productNameSnapshot,
            productCodeSnapshot: item.productCodeSnapshot || null,
            quantity: item.quantity,
            notes: item.notes || null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Try to send email notification (non-blocking)
    try {
      await sendQuoteNotification(quoteRequest.id);
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Log the failure but don't fail the request
      await db.quoteNotification.create({
        data: {
          quoteRequestId: quoteRequest.id,
          type: "email",
          status: "failed",
          errorMessage: emailError instanceof Error ? emailError.message : "Unknown error",
        },
      });
    }

    // Create in-app notification
    await db.quoteNotification.create({
      data: {
        quoteRequestId: quoteRequest.id,
        type: "in_app",
        status: "sent",
      },
    });

    return {
      success: true,
      data: {
        requestNumber: quoteRequest.requestNumber,
        id: quoteRequest.id,
      },
    };
  } catch (error) {
    console.error("Quote request error:", error);
    return { success: false, error: "Teklif talebi gönderilirken bir hata oluştu" };
  }
}

async function sendQuoteNotification(quoteRequestId: string) {
  const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD;

  if (!smtpConfigured) {
    // Email service not configured - this is expected and OK
    return;
  }

  // Email sending would be implemented here when SMTP is configured
  // For now, we just check if it's configured
  const quoteRequest = await db.quoteRequest.findUnique({
    where: { id: quoteRequestId },
    include: { items: true },
  });

  if (!quoteRequest) return;

  // Placeholder for actual email sending with nodemailer
  // When SMTP is configured, implement with nodemailer
  console.log(`[EMAIL] New quote request: ${quoteRequest.requestNumber} from ${quoteRequest.companyName}`);
}

export async function addToQuoteList(productId: string) {
  try {
    const product = await db.product.findUnique({
      where: { id: productId, isActive: true },
      select: { id: true, name: true, code: true },
    });

    if (!product) {
      return { success: false, error: "Ürün bulunamadı" };
    }

    return {
      success: true,
      data: {
        productId: product.id,
        productName: product.name,
        productCode: product.code,
      },
    };
  } catch (error) {
    console.error("Add to quote error:", error);
    return { success: false, error: "Ürün eklenirken bir hata oluştu" };
  }
}
