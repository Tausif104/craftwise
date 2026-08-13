"use client";

import { useActionState, useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  createLegalDocumentDraft,
  deleteLegalDocumentDraft,
  publishLegalDocumentVersion,
  saveLegalDocumentDraft,
  submitLegalDocumentDraft,
} from "@/app/actions/legal-documents.actions";
import LegalDocumentDiff from "@/components/dashboard/legal-document-diff";

const initialState = {
  success: false,
  msg: "",
};

function formatDate(value) {
  if (!value) return "Not published";
  return new Date(value).toLocaleString();
}

function statusTone(status) {
  if (status === "PUBLISHED") return "bg-emerald-100 text-emerald-700";
  if (status === "PENDING") return "bg-amber-100 text-amber-700";
  if (status === "SUPERSEDED") return "bg-slate-200 text-slate-700";
  return "bg-slate-100 text-slate-700";
}

export default function LegalDocumentWorkspace({ workspace, canPublish = false }) {
  const router = useRouter();
  const [saveState, formAction] = useActionState(saveLegalDocumentDraft, initialState);
  const [workflowMessage, setWorkflowMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const [selectedHistoryId, setSelectedHistoryId] = useState("");

  const activeDraft = workspace.activeDraft;
  const currentPublishedVersion = workspace.currentPublishedVersion;
  const history = workspace.versions;

  useEffect(() => {
    if (saveState.msg) {
      setWorkflowMessage(saveState.msg);
    }
    if (saveState.success) {
      router.refresh();
    }
  }, [router, saveState]);

  const selectedHistoryVersion = useMemo(() => {
    if (!selectedHistoryId) return null;
    return history.find((version) => version.id === selectedHistoryId) || null;
  }, [history, selectedHistoryId]);

  const createDraft = (sourceVersionId = null) => {
    startTransition(async () => {
      const response = await createLegalDocumentDraft({
        documentKey: workspace.config.key,
        locale: workspace.document?.locale || workspace.locale || "de",
        sourceVersionId,
      });
      setWorkflowMessage(response.msg || "");
      if (response.success) {
        router.refresh();
      }
    });
  };

  const submitDraft = () => {
    if (!activeDraft) return;

    startTransition(async () => {
      const response = await submitLegalDocumentDraft(activeDraft.id);
      setWorkflowMessage(response.msg || "");
      if (response.success) {
        router.refresh();
      }
    });
  };

  const publishDraft = () => {
    if (!activeDraft) return;

    startTransition(async () => {
      const response = await publishLegalDocumentVersion(activeDraft.id);
      setWorkflowMessage(response.msg || "");
      if (response.success) {
        router.refresh();
      }
    });
  };

  const deleteDraft = () => {
    if (!activeDraft) return;

    if (
      !window.confirm(
        `Delete draft v${activeDraft.versionNumber}? The published page stays online, but this draft cannot be recovered.`,
      )
    )
      return;

    startTransition(async () => {
      const response = await deleteLegalDocumentDraft(activeDraft.id);
      setWorkflowMessage(response.msg || "");
      if (response.success) {
        router.refresh();
      }
    });
  };

  const rollbackToVersion = (versionId) => {
    startTransition(async () => {
      const response = await createLegalDocumentDraft({
        documentKey: workspace.config.key,
        locale: workspace.document?.locale || workspace.locale || "de",
        sourceVersionId: versionId,
      });
      setWorkflowMessage(response.msg || "");
      if (response.success) {
        router.refresh();
      }
    });
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-[var(--adm-line)] bg-white p-6 shadow-[0px_14px_40px_rgba(10,27,40,0.05)] lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#CC8640]">
              {workspace.config.label}
            </p>
            <h2 className="mt-2 text-[32px] font-bold text-[var(--adm-ink)]">
              {workspace.config.label} · {(workspace.document?.locale || workspace.locale || "de").toUpperCase()}
            </h2>
            <p className="mt-2 max-w-3xl text-[13px] text-[var(--adm-ink-muted)]">
              Legal content is managed as versioned HTML. Drafts can be saved, submitted for review, published with approval,
              and rolled back by cloning a previous version.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)] px-4 py-3 text-sm text-[#475467]">
              <p>Published: {currentPublishedVersion ? `v${currentPublishedVersion.versionNumber}` : "none"}</p>
              <p className="mt-1">Last updated: {formatDate(currentPublishedVersion?.publishedAt || currentPublishedVersion?.updatedAt)}</p>
            </div>
            {workspace.config?.pageKey && (
              <Link
                href={`/${workspace.document?.locale || workspace.locale || "de"}${workspace.config.pageKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#304C61] px-4 py-2 text-sm font-semibold text-[var(--adm-teal)] transition hover:bg-[var(--adm-surface-sunken)]"
              >
                View live page ↗
              </Link>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-[#CC8640]/45 bg-[#FFF9F4] p-4 text-sm text-[#704214]">
          Use semantic HTML and these supported classes in `bodyHtml`: `legal-section`, `legal-grid`, `legal-card`, `legal-table`.
          Public pages sanitize and render that HTML inside the existing CraftWise layout.
        </div>

        {workflowMessage ? (
          <div className="mt-4 rounded-2xl border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)] px-4 py-3 text-sm text-[var(--adm-teal)]">
            {workflowMessage}
          </div>
        ) : null}

        {!activeDraft ? (
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => createDraft()}
              disabled={pending}
              className="rounded-full bg-[#304C61] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#012E33] disabled:opacity-70"
            >
              {pending ? "Working..." : "Create new draft"}
            </button>
            {currentPublishedVersion ? (
              <button
                type="button"
                onClick={() => createDraft(currentPublishedVersion.id)}
                disabled={pending}
                className="rounded-full border border-[#304C61] px-5 py-3 text-sm font-semibold text-[var(--adm-teal)] transition hover:bg-[var(--adm-surface-sunken)] disabled:opacity-70"
              >
                Clone published version
              </button>
            ) : null}
          </div>
        ) : (
          <form action={formAction} className="mt-8 space-y-6">
            <input type="hidden" name="versionId" value={activeDraft.id} />
            <input type="hidden" name="documentKey" value={workspace.config.key} />
            <input
              type="hidden"
              name="locale"
              value={workspace.document?.locale || workspace.locale || "de"}
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <Field label="Title">
                <input
                  name="title"
                  defaultValue={activeDraft.title}
                  className="w-full rounded-2xl border border-[#D0D5DD] px-4 py-3 outline-none transition focus:border-[#304C61]"
                />
              </Field>
              <Field label="Hero image">
                <input
                  name="heroImage"
                  defaultValue={activeDraft.heroImage || workspace.config.image}
                  className="w-full rounded-2xl border border-[#D0D5DD] px-4 py-3 outline-none transition focus:border-[#304C61]"
                />
              </Field>
              <Field label="Meta title">
                <input
                  name="metaTitle"
                  defaultValue={activeDraft.metaTitle || ""}
                  className="w-full rounded-2xl border border-[#D0D5DD] px-4 py-3 outline-none transition focus:border-[#304C61]"
                />
              </Field>
              <Field label="Meta description">
                <input
                  name="metaDescription"
                  defaultValue={activeDraft.metaDescription || ""}
                  className="w-full rounded-2xl border border-[#D0D5DD] px-4 py-3 outline-none transition focus:border-[#304C61]"
                />
              </Field>
              <Field label="Hero title">
                <input
                  name="heroTitle"
                  defaultValue={activeDraft.heroTitle}
                  className="w-full rounded-2xl border border-[#D0D5DD] px-4 py-3 outline-none transition focus:border-[#304C61]"
                />
              </Field>
              <Field label="Hero subtitle">
                <input
                  name="heroSemiTitle"
                  defaultValue={activeDraft.heroSemiTitle || ""}
                  className="w-full rounded-2xl border border-[#D0D5DD] px-4 py-3 outline-none transition focus:border-[#304C61]"
                />
              </Field>
            </div>

            <Field label="Hero description (HTML allowed)">
              <textarea
                name="heroDescription"
                defaultValue={activeDraft.heroDescription || ""}
                rows={6}
                className="w-full rounded-[24px] border border-[#D0D5DD] px-4 py-3 outline-none transition focus:border-[#304C61]"
              />
            </Field>

            <Field label="Body HTML">
              <textarea
                name="bodyHtml"
                defaultValue={activeDraft.bodyHtml}
                rows={24}
                className="w-full rounded-[24px] border border-[#D0D5DD] px-4 py-3 font-mono text-sm outline-none transition focus:border-[#304C61]"
              />
            </Field>

            <Field label="Change note">
              <textarea
                name="changeNote"
                defaultValue={activeDraft.changeNote || ""}
                rows={3}
                className="w-full rounded-[24px] border border-[#D0D5DD] px-4 py-3 outline-none transition focus:border-[#304C61]"
              />
            </Field>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-full bg-[#304C61] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#012E33]"
              >
                Save draft
              </button>
              <button
                type="button"
                onClick={submitDraft}
                disabled={pending}
                className="rounded-full border border-[#CC8640] px-5 py-3 text-sm font-semibold text-[#CC8640] transition hover:bg-[#FFF9F4] disabled:opacity-70"
              >
                {pending ? "Working..." : activeDraft.status === "PENDING" ? "Resubmit for approval" : "Submit for approval"}
              </button>
              {canPublish ? (
                <button
                  type="button"
                  onClick={publishDraft}
                  disabled={pending}
                  className="rounded-full bg-[#CC8640] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b97331] disabled:opacity-70"
                >
                  {pending ? "Publishing..." : "Publish version"}
                </button>
              ) : null}
              <button
                type="button"
                onClick={deleteDraft}
                disabled={pending}
                className="rounded-full border border-[#F3C4C0] px-5 py-3 text-sm font-semibold text-[var(--adm-bad)] transition hover:bg-[var(--adm-bad-wash)] disabled:opacity-70"
              >
                {pending ? "Working..." : "Delete draft"}
              </button>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusTone(activeDraft.status)}`}>
                {activeDraft.status} · v{activeDraft.versionNumber}
              </span>
            </div>
          </form>
        )}
      </section>

      {activeDraft && currentPublishedVersion ? (
        <LegalDocumentDiff
          publishedHtml={currentPublishedVersion.bodyHtml}
          draftHtml={activeDraft.bodyHtml}
        />
      ) : null}

      <section className="rounded-[28px] border border-[var(--adm-line)] bg-white p-6 shadow-[0px_14px_40px_rgba(10,27,40,0.05)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#CC8640]">Version History</p>
            <h3 className="mt-2 text-2xl font-bold text-[var(--adm-ink)]">Previous revisions</h3>
          </div>
          {selectedHistoryVersion ? (
            <button
              type="button"
              onClick={() => rollbackToVersion(selectedHistoryVersion.id)}
              disabled={pending || Boolean(activeDraft)}
              className="rounded-full border border-[#304C61] px-4 py-2 text-sm font-semibold text-[var(--adm-teal)] transition hover:bg-[var(--adm-surface-sunken)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Working..." : activeDraft ? "Resolve active draft first" : `Create rollback draft from v${selectedHistoryVersion.versionNumber}`}
            </button>
          ) : null}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[360px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-[var(--adm-line)]">
            <div className="max-h-[480px] overflow-auto">
              {history.length === 0 ? (
                <p className="p-4 text-[13px] text-[var(--adm-ink-muted)]">No versions yet.</p>
              ) : (
                history.map((version) => (
                  <button
                    key={version.id}
                    type="button"
                    onClick={() => setSelectedHistoryId(version.id)}
                    className={`flex w-full flex-col gap-1 border-b border-[#F2F6FA] px-4 py-4 text-left transition hover:bg-[var(--adm-surface-sunken)] ${
                      selectedHistoryId === version.id ? "bg-[var(--adm-surface-sunken)]" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone(version.status)}`}>
                        {version.status}
                      </span>
                      <span className="text-sm font-semibold text-[var(--adm-ink)]">v{version.versionNumber}</span>
                    </div>
                    <p className="text-sm text-[var(--adm-ink)]">{version.title}</p>
                    <p className="text-[11.5px] text-[var(--adm-ink-faint)]">{formatDate(version.publishedAt || version.updatedAt)}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)] p-5">
            {selectedHistoryVersion ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone(selectedHistoryVersion.status)}`}>
                    {selectedHistoryVersion.status}
                  </span>
                  <p className="text-sm font-semibold text-[var(--adm-ink)]">
                    Version {selectedHistoryVersion.versionNumber}
                  </p>
                </div>
                <InfoRow label="Title" value={selectedHistoryVersion.title} />
                <InfoRow label="Created by" value={selectedHistoryVersion.createdBy?.name || selectedHistoryVersion.createdBy?.email || "Unknown"} />
                <InfoRow label="Approved by" value={selectedHistoryVersion.approvedBy?.name || selectedHistoryVersion.approvedBy?.email || "Not approved"} />
                <InfoRow label="Published" value={formatDate(selectedHistoryVersion.publishedAt)} />
                <InfoRow label="Change note" value={selectedHistoryVersion.changeNote || "No change note"} />
                <InfoRow label="Hero title" value={selectedHistoryVersion.heroTitle} />
              </div>
            ) : (
              <p className="text-[13px] text-[var(--adm-ink-muted)]">Select a version to inspect or roll back from it.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-[#344054]">{label}</span>
      {children}
    </label>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#98A2B3]">{label}</p>
      <p className="mt-1 text-sm text-[var(--adm-ink)]">{value}</p>
    </div>
  );
}
