import Link from "next/link";

function formatDate(value) {
  if (!value) return "Not published";
  return new Date(value).toLocaleString();
}

function statusTone(status) {
  if (status === "PUBLISHED") return "bg-emerald-100 text-emerald-700";
  if (status === "PENDING") return "bg-amber-100 text-amber-700";
  return "bg-slate-100 text-slate-700";
}

export default function LegalDocumentTable({ documents }) {
  return (
    <section className="rounded-[28px] border border-[var(--adm-line)] bg-white p-6 shadow-[0px_14px_40px_rgba(10,27,40,0.05)] lg:p-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#CC8640]">
            Legal Pages
          </p>
          <h2 className="mt-2 text-[32px] font-bold text-[var(--adm-ink)]">Versioned legal content</h2>
          <p className="mt-2 max-w-3xl text-[13px] text-[var(--adm-ink-muted)]">
            Each language is managed separately with draft, approval, publish, and rollback support.
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--adm-line)] text-[var(--adm-ink-muted)]">
              <th className="px-4 py-3 font-semibold">Document</th>
              <th className="px-4 py-3 font-semibold">Locale</th>
              <th className="px-4 py-3 font-semibold">Published</th>
              <th className="px-4 py-3 font-semibold">Active draft</th>
              <th className="px-4 py-3 font-semibold">Versions</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={`${document.documentKey}-${document.locale}`} className="border-b border-[#F2F6FA] align-top">
                <td className="px-4 py-4">
                  <p className="font-semibold text-[var(--adm-ink)]">{document.label}</p>
                  <p className="mt-1 text-[11.5px] text-[var(--adm-ink-faint)]">{document.documentKey}</p>
                </td>
                <td className="px-4 py-4 uppercase text-[var(--adm-teal)]">{document.locale}</td>
                <td className="px-4 py-4">
                  {document.currentPublishedVersion ? (
                    <>
                      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        v{document.currentPublishedVersion.versionNumber}
                      </span>
                      <p className="mt-2 text-[var(--adm-ink)]">{document.currentPublishedVersion.title}</p>
                      <p className="mt-1 text-[11.5px] text-[var(--adm-ink-faint)]">
                        {formatDate(document.currentPublishedVersion.publishedAt || document.currentPublishedVersion.updatedAt)}
                      </p>
                    </>
                  ) : (
                    <p className="text-[var(--adm-ink-muted)]">No published version</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  {document.activeDraft ? (
                    <>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone(document.activeDraft.status)}`}>
                        {document.activeDraft.status}
                      </span>
                      <p className="mt-2 text-[11.5px] text-[var(--adm-ink-faint)]">
                        v{document.activeDraft.versionNumber} updated {formatDate(document.activeDraft.updatedAt)}
                      </p>
                    </>
                  ) : (
                    <p className="text-[var(--adm-ink-muted)]">No active draft</p>
                  )}
                </td>
                <td className="px-4 py-4 text-[var(--adm-ink)]">{document.versionCount}</td>
                <td className="px-4 py-4">
                  <Link
                    href={`/dashboard/legal-pages/${document.documentKey}/${document.locale}`}
                    className="inline-flex rounded-full bg-[#304C61] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#012E33]"
                  >
                    Open workspace
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
