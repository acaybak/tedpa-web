"use server";

import { db } from "@/lib/db";
import { hashPassword, setSessionCookie, createToken, createAuditLog } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function loginAction(formData: unknown) {
  try {
    const parsed = loginSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };    }

    const { email, password } = parsed.data;

    const user = await db.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user) {
      return { success: false, error: "E-posta veya şifre hatalı" };
    }

    if (!user.isActive) {
      return { success: false, error: "Hesabınız pasif durumda" };
    }

    const valid = await (await import("@/lib/auth")).verifyPassword(password, user.passwordHash);
    if (!valid) {
      return { success: false, error: "E-posta veya şifre hatalı" };
    }

    const token = createToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });

    await setSessionCookie(token);

    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await createAuditLog({
      userId: user.id,
      action: "LOGIN",
      entity: "User",
      entityId: user.id,
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Giriş sırasında bir hata oluştu" };
  }
}

export async function setupInitialAdmin(formData: unknown) {
  try {
    const existingAdmin = await db.user.findFirst({ where: { role: "SUPER_ADMIN" } });
    if (existingAdmin) {
      return { success: false, error: "Süper admin zaten oluşturulmuş" };
    }

    const schema = loginSchema.extend({
      fullName: (await import("zod")).string().min(2, "Ad soyad gerekli"),
    });

    const parsed = schema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { email, password, fullName } = parsed.data;
    const passwordHash = await hashPassword(password);

    await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        fullName,
        role: "SUPER_ADMIN",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Setup admin error:", error);
    return { success: false, error: "Admin oluşturulurken bir hata oluştu" };
  }
}

export async function logoutAction() {
  const { clearSession, getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (session) {
    await createAuditLog({
      userId: session.id,
      action: "LOGOUT",
      entity: "User",
      entityId: session.id,
    });
  }
  await clearSession();
  revalidatePath("/admin");
  return { success: true };
}
