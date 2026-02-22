import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth-utils";

export const metadata = { title: "Sign in — Nodebase" };

export default async function LoginPage() {
  await requireUnAuth();
  return <LoginForm />;
}
