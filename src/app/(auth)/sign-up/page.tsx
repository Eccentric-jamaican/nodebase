import { RegisterForm } from "@/features/auth/components/register-form";
import { requireUnAuth } from "@/lib/auth-utils";

export const metadata = { title: "Create account — Nodebase" };

export default async function SignUpPage() {
  await requireUnAuth();
  return <RegisterForm />;
}
