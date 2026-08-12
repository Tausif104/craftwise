import { auth } from "@/auth";
import { getLegalDocumentWorkspaceForDashboard } from "@/app/actions/legal-documents.actions";
import LegalDocumentWorkspace from "@/components/dashboard/legal-document-workspace";
import Link from "next/link";

export default async function LegalDocumentWorkspacePage({ params }) {
  const { documentKey, locale } = await params;
  const session = await auth();
  const response = await getLegalDocumentWorkspaceForDashboard(documentKey, locale);

  if (!response.success) {
    return (
      <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 text-rose-700">
        <p className="text-lg font-semibold">Unable to load legal page</p>
        <p className="mt-2 text-sm">{response.msg || "Workspace not found."}</p>
        <Link
          href="/dashboard/legal-pages"
          className="mt-4 inline-flex rounded-full bg-[#304C61] px-4 py-2 text-sm font-semibold text-white"
        >
          Back to legal pages
        </Link>
      </div>
    );
  }

  return (
    <LegalDocumentWorkspace
      workspace={{ ...response.workspace, locale }}
      canPublish={session?.user?.role === "ADMIN"}
    />
  );
}
