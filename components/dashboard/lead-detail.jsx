"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AdminButton,
  Eyebrow,
  Field,
  LocaleTabs,
  PageHeader,
  SelectInput,
  StatusPill,
  Surface,
  TextArea,
  TextInput,
} from "@/components/dashboard/admin-kit";
import {
  previewTemplateForLead,
  sendMessageToLead,
  updateLeadNotes,
  updateLeadStatus,
} from "@/app/actions/lead.actions";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST", "CLOSED"];

const STATUS_TONES = {
  NEW: "draft",
  CONTACTED: "info",
  QUALIFIED: "info",
  WON: "published",
  LOST: "danger",
  CLOSED: "archived",
};

function titleCase(value) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function DetailRow({ label, children }) {
  if (!children) return null;

  return (
    <div className='flex gap-3 py-2 text-sm'>
      <span className='w-32 shrink-0 text-[var(--adm-ink-muted)]'>{label}</span>
      <span className='min-w-0 break-words font-medium text-[var(--adm-ink)]'>{children}</span>
    </div>
  );
}

export default function LeadDetail({ lead, templates }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.internalNotes || "");
  const [tags, setTags] = useState((lead.tags || []).join(", "));

  const [locale, setLocale] = useState(lead.locale === "en" ? "en" : "de");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [templateId, setTemplateId] = useState("");

  const handleStatus = (next) => {
    setStatus(next);
    startTransition(async () => {
      const result = await updateLeadStatus(lead.id, next);
      if (result.success) {
        toast.success(`Status set to ${titleCase(next)}`);
        router.refresh();
      } else {
        setStatus(lead.status);
        toast.error(result.msg || "Could not update the status.");
      }
    });
  };

  const handleNotes = () => {
    startTransition(async () => {
      const result = await updateLeadNotes(lead.id, { internalNotes: notes, tags });
      if (result.success) {
        toast.success("Notes saved");
        router.refresh();
      } else {
        toast.error(result.msg || "Could not save the notes.");
      }
    });
  };

  const handleTemplate = (id) => {
    setTemplateId(id);
    if (!id) return;

    startTransition(async () => {
      const result = await previewTemplateForLead(lead.id, id, locale);
      if (result.success) {
        setSubject(result.subject);
        setBody(result.body);
        toast.message("Template loaded — edit before sending");
      } else {
        toast.error(result.msg || "Could not load that template.");
      }
    });
  };

  const handleSend = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("subject", subject);
    formData.set("body", body);
    formData.set("locale", locale);
    if (templateId) formData.set("templateId", templateId);

    startTransition(async () => {
      const result = await sendMessageToLead(lead.id, formData);

      if (result.success) {
        toast.success("Message sent");
        setSubject("");
        setBody("");
        setTemplateId("");
        router.refresh();
      } else {
        toast.error(result.msg || "The message could not be sent.");
      }
    });
  };

  return (
    <div>
      <Link
        href='/dashboard/leads'
        className='mb-4 inline-flex text-[13px] font-semibold text-[var(--adm-teal)] transition-colors hover:text-[var(--adm-accent)]'
      >
        ← Back to leads
      </Link>

      <PageHeader
        eyebrow={lead.type}
        title={lead.name || lead.email}
        description={lead.company || undefined}
        actions={
          <div className='flex items-center gap-2'>
            <StatusPill tone={STATUS_TONES[status] || "info"}>{titleCase(status)}</StatusPill>
            <SelectInput
              className='w-44'
              value={status}
              onChange={(event) => handleStatus(event.target.value)}
              disabled={pending}
              aria-label='Lead status'
            >
              {STATUSES.map((value) => (
                <option key={value} value={value}>
                  {titleCase(value)}
                </option>
              ))}
            </SelectInput>
          </div>
        }
      />

      <div className='grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]'>
        <div className='space-y-5'>
          <Surface>
            <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Reply to this lead</h3>
            <p className='mt-1.5 text-[13px] leading-relaxed text-[var(--adm-ink-muted)]'>
              Sent from {process.env.NEXT_PUBLIC_SALES_FROM || "the configured sales address"}{" "}
              and saved to the history below.
            </p>

            <form className='mt-4 space-y-4' onSubmit={handleSend}>
              <div className='flex flex-wrap items-center gap-3'>
                <LocaleTabs locale={locale} onChange={setLocale} />

                <SelectInput
                  className='max-w-xs flex-1'
                  value={templateId}
                  onChange={(event) => handleTemplate(event.target.value)}
                  aria-label='Use a template'
                >
                  <option value=''>Start from scratch</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </SelectInput>
              </div>

              <Field label='Subject' required htmlFor='subject'>
                <TextInput
                  id='subject'
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder='Re: your enquiry'
                  required
                />
              </Field>

              <Field label='Message' required htmlFor='body'>
                <TextArea
                  id='body'
                  rows={9}
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder='Write your reply…'
                  required
                />
              </Field>

              <div className='flex justify-end'>
                <AdminButton type='submit' disabled={pending || !subject || !body}>
                  {pending ? "Sending…" : "Send message"}
                </AdminButton>
              </div>
            </form>
          </Surface>

          <Surface>
            <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Conversation</h3>

            {lead.messages.length === 0 ? (
              <p className='mt-4 text-[13px] text-[var(--adm-ink-muted)]'>
                No messages yet. The original enquiry is shown in the details panel.
              </p>
            ) : (
              <ul className='mt-4 space-y-3'>
                {lead.messages.map((message) => (
                  <li
                    key={message.id}
                    className='rounded-[18px] border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)] p-4'
                  >
                    <div className='flex flex-wrap items-center gap-2'>
                      <span className='text-sm font-semibold text-[var(--adm-ink)]'>
                        {message.subject}
                      </span>
                      <StatusPill
                        tone={
                          message.status === "SENT"
                            ? "published"
                            : message.status === "FAILED"
                              ? "danger"
                              : "draft"
                        }
                      >
                        {titleCase(message.status)}
                      </StatusPill>
                      <span className='ml-auto text-[11.5px] text-[var(--adm-ink-faint)]'>
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className='mt-2 whitespace-pre-wrap text-[13px] text-[var(--adm-ink-muted)]'>
                      {message.bodyText}
                    </p>

                    {message.errorText ? (
                      <p className='mt-2 text-xs font-medium text-[#B42318]'>
                        {message.errorText}
                      </p>
                    ) : null}

                    <p className='mt-2 text-[11.5px] text-[var(--adm-ink-faint)]'>
                      {message.sender?.name || message.sender?.email || "System"} ·{" "}
                      {message.locale?.toUpperCase()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Surface>
        </div>

        <div className='space-y-5'>
          <Surface>
            <Eyebrow>Details</Eyebrow>
            <div className='mt-2 divide-y divide-[#EEF4FA]'>
              <DetailRow label='Email'>{lead.email}</DetailRow>
              <DetailRow label='Phone'>{lead.phone}</DetailRow>
              <DetailRow label='Company'>{lead.company}</DetailRow>
              <DetailRow label='Language'>{lead.locale?.toUpperCase()}</DetailRow>
              <DetailRow label='Consent'>
                {lead.consentGiven
                  ? `Given ${lead.consentAt ? new Date(lead.consentAt).toLocaleDateString() : ""}`
                  : "Not given"}
              </DetailRow>
              <DetailRow label='Received'>
                {new Date(lead.createdAt).toLocaleString()}
              </DetailRow>
              <DetailRow label='Last activity'>
                {lead.lastActivityAt
                  ? new Date(lead.lastActivityAt).toLocaleString()
                  : null}
              </DetailRow>
            </div>
          </Surface>

          {lead.message ? (
            <Surface>
              <Eyebrow>Original enquiry</Eyebrow>
              <p className='mt-2 whitespace-pre-wrap text-[13px] text-[var(--adm-ink-muted)]'>{lead.message}</p>
            </Surface>
          ) : null}

          <Surface>
            <Eyebrow>Attribution</Eyebrow>
            <div className='mt-2 divide-y divide-[#EEF4FA]'>
              <DetailRow label='Source'>{lead.utmSource || "Direct"}</DetailRow>
              <DetailRow label='Medium'>{lead.utmMedium}</DetailRow>
              <DetailRow label='Campaign'>{lead.utmCampaign}</DetailRow>
              <DetailRow label='Term'>{lead.utmTerm}</DetailRow>
              <DetailRow label='Content'>{lead.utmContent}</DetailRow>
              <DetailRow label='Landing page'>{lead.landingPage}</DetailRow>
              <DetailRow label='Referrer'>{lead.referrer}</DetailRow>
            </div>
          </Surface>

          <Surface>
            <Eyebrow>Internal</Eyebrow>
            <div className='mt-3 space-y-3'>
              <Field label='Notes' htmlFor='notes'>
                <TextArea
                  id='notes'
                  rows={4}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder='Only visible to your team'
                />
              </Field>

              <Field label='Tags' hint='Comma separated' htmlFor='tags'>
                <TextInput
                  id='tags'
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                  placeholder='priority, berlin'
                />
              </Field>

              <AdminButton
                variant='outline'
                className='w-full'
                onClick={handleNotes}
                disabled={pending}
              >
                {pending ? "Saving…" : "Save notes"}
              </AdminButton>
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}
