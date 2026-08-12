import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AuthShell from "@/components/auth/auth-shell";
import RegisterForm from "@/components/auth/register-form";

export const metadata = {
  title: "Register",
};

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      title='Create account'
      subtitle='Set up an account for dashboard access. New accounts default to author access.'
    >
      <RegisterForm />
    </AuthShell>
  );
}
