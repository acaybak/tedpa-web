import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <html lang="tr">
      <body className="min-h-screen bg-[#101114] flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-3xl font-bold text-white">TEDPA</span>
              <span className="text-3xl font-light text-gray-400 ml-1">Makina</span>
            </div>
            <p className="text-gray-400">Yönetim Paneli</p>
          </div>
          <LoginForm />
        </div>
      </body>
    </html>
  );
}
