"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AdminButton,
  Cell,
  DataTable,
  EmptyState,
  PageHeader,
  Row,
  SelectInput,
  StatusPill,
  Surface,
  TextInput,
} from "@/components/dashboard/admin-kit";
import { exportLeadsCsv } from "@/app/actions/lead.actions";

const STATUS_TONES = {
  NEW: "draft",
  CONTACTED: "info",
  QUALIFIED: "info",
  WON: "published",
  LOST: "danger",
  CLOSED: "archived",
};

const TYPE_LABELS = {
  CONTACT: "Contact",
  CONSULTING: "Consulting",
  DEMO: "Demo",
  WAITLIST: "Waitlist",
  OTHER: "Other",
};

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function LeadsBrowser({ leads, total, health, filters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState(filters.search);

  const applyFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/dashboard/leads?${params.toString()}`);
  };

  const handleExport = () => {
    startTransition(async () => {
      const result = await exportLeadsCsv(filters);

      if (!result.success) {
        toast.error(result.msg || "Export failed.");
        return;
      }

      const blob = new Blob([result.csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `craftwise-leads-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      toast.success(`Exported ${result.count} leads`);
    });
  };

  const stuck = (health?.RETRYING || 0) + (health?.FAILED || 0);

  return (
    <div>
      <PageHeader
        eyebrow='Marketing'
        title='Leads'
        description='Every enquiry from the website, with its full history and current sales status.'
        actions={
          <AdminButton variant='outline' onClick={handleExport} disabled={pending}>
            {pending ? "Exporting…" : "Export CSV"}
          </AdminButton>
        }
      />

      {stuck > 0 ? (
        <div className='adm-rise mb-5 flex items-start gap-2.5 rounded-[var(--adm-r-lg)] border border-[#F3C4C0] bg-[var(--adm-bad-wash)] px-4 py-3 text-[13px] leading-relaxed text-[var(--adm-bad)]'>
          <strong>{stuck}</strong> lead {stuck === 1 ? "notification is" : "notifications are"}{" "}
          waiting to be delivered. The leads themselves are safely stored — only the
          outbound notification is retrying.{" "}
          <Link href='/dashboard/forms' className='font-semibold underline'>
            Check delivery health
          </Link>
        </div>
      ) : null}

      <Surface className='mb-5 p-4'>
        <div className='flex flex-col gap-3 md:flex-row'>
          <form
            className='flex-1'
            onSubmit={(event) => {
              event.preventDefault();
              applyFilter("q", search);
            }}
          >
            <TextInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder='Search name, email or company'
              aria-label='Search leads'
            />
          </form>

          <SelectInput
            className='md:w-48'
            value={filters.status}
            onChange={(event) => applyFilter("status", event.target.value)}
            aria-label='Filter by status'
          >
            <option value=''>All statuses</option>
            {Object.keys(STATUS_TONES).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </option>
            ))}
          </SelectInput>

          <SelectInput
            className='md:w-48'
            value={filters.type}
            onChange={(event) => applyFilter("type", event.target.value)}
            aria-label='Filter by type'
          >
            <option value=''>All types</option>
            {Object.entries(TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </div>
      </Surface>

      <p className='mb-3 text-[13px] text-[var(--adm-ink-muted)]'>
        {total} {total === 1 ? "lead" : "leads"}
      </p>

      <DataTable
        columns={[
          { key: "name", label: "Lead" },
          { key: "type", label: "Type" },
          { key: "status", label: "Status" },
          { key: "source", label: "Source" },
          { key: "created", label: "Received" },
          { key: "actions", label: "" },
        ]}
        empty={
          leads.length === 0 ? (
            <div>
              <EmptyState
                title='No leads yet'
                description='Enquiries from the contact, consulting and demo forms will appear here as soon as they come in.'
              />
            </div>
          ) : null
        }
      >
        {leads.map((lead) => (
          <Row key={lead.id}>
            <Cell>
              <Link
                href={`/dashboard/leads/${lead.id}`}
                className='font-semibold text-[var(--adm-ink)] transition-colors hover:text-[var(--adm-accent)]'
              >
                {lead.name || "Unnamed"}
              </Link>
              <span className='mt-0.5 block text-[11.5px] text-[var(--adm-ink-faint)]'>{lead.email}</span>
              {lead.company ? (
                <span className='block text-[11.5px] text-[var(--adm-ink-faint)]'>{lead.company}</span>
              ) : null}
            </Cell>
            <Cell>{TYPE_LABELS[lead.type] || lead.type}</Cell>
            <Cell>
              <StatusPill tone={STATUS_TONES[lead.status] || "info"}>
                {lead.status.charAt(0) + lead.status.slice(1).toLowerCase()}
              </StatusPill>
            </Cell>
            <Cell className='text-[11.5px] text-[var(--adm-ink-faint)]'>
              {lead.utmSource || "Direct"}
              {lead.utmCampaign ? ` · ${lead.utmCampaign}` : ""}
            </Cell>
            <Cell className='whitespace-nowrap text-[11.5px] text-[var(--adm-ink-faint)]'>
              {formatDate(lead.createdAt)}
            </Cell>
            <Cell>
              <Link
                href={`/dashboard/leads/${lead.id}`}
                className='text-sm font-semibold text-[var(--adm-teal)] hover:text-[#CC8640]'
              >
                Open
              </Link>
            </Cell>
          </Row>
        ))}
      </DataTable>
    </div>
  );
}
