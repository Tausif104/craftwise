import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <DashboardShell session={session}>
      {children}
      <Toaster position='bottom-right' richColors closeButton />
    </DashboardShell>
  );
}
