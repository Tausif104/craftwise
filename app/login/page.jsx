import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AuthShell from "@/components/auth/auth-shell";
import LoginForm from "@/components/auth/login-form";

export const metadata = {
  title: "Login",
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      title='Log in'
      subtitle='Access the CraftWise dashboard to manage blog articles and publishing.'
      footer='Use an admin account to create, edit and publish posts.'
    >
      <LoginForm />
    </AuthShell>
  );
}
