import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

async function setup() {
  console.log("🔧 TEDPA Makina - İlk Kurulum\n");

  // Check if admin already exists
  const existingAdmin = await db.user.findFirst({ where: { role: "SUPER_ADMIN" } });
  if (existingAdmin) {
    console.log("⚠️  Süper admin zaten mevcut:", existingAdmin.email);
    console.log("Yeni admin oluşturmak için önce mevcut admini veritabanından kaldırın.");
    process.exit(0);
  }

  const email = process.env.ADMIN_EMAIL || "admin@tedpa.com";
  const password = process.env.ADMIN_PASSWORD || "Tedpa2024!";
  const fullName = process.env.ADMIN_NAME || "TEDPA Admin";

  const passwordHash = await hashPassword(password);

  const admin = await db.user.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      fullName,
      role: "SUPER_ADMIN",
    },
  });

  console.log("✅ Süper admin oluşturuldu:");
  console.log(`   E-posta: ${admin.email}`);
  console.log(`   Ad: ${admin.fullName}`);
  console.log(`   Rol: ${admin.role}`);
  console.log("\n⚠️  Güvenlik: İlk girişten sonra şifrenizi değiştirin!");
  console.log("\n🎉 Kurulum tamamlandı!");
}

setup()
  .catch(console.error)
  .finally(() => db.$disconnect());
