import { listLegalDocumentsForDashboard } from "@/app/actions/legal-documents.actions";
import LegalDocumentTable from "@/components/dashboard/legal-document-table";

export default async function LegalPagesDashboard() {
  const response = await listLegalDocumentsForDashboard();
  const documents = response.success ? response.documents : [];

  return (
    <div className="space-y-6">
      {!response.success ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {response.msg || "Failed to load legal pages."}
        </div>
      ) : null}
      <LegalDocumentTable documents={documents} />
    </div>
  );
}
