"use client";

import { useRouter } from "next/navigation";
import {
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

const ACTIONS = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "PUBLISH",
  "UNPUBLISH",
  "RESTORE",
  "LOGIN",
  "EXPORT",
  "SETTINGS_CHANGE",
];

const ENTITIES = [
  "PricingPlan",
  "Testimonial",
  "FaqItem",
  "Post",
  "Announcement",
  "LegalDocument",
  "MediaAsset",
  "Lead",
  "LeadMessage",
  "EmailTemplate",
  "SeoSetting",
  "Integration",
];

const ACTION_TONES = {
  DELETE: "danger",
  PUBLISH: "published",
  UNPUBLISH: "archived",
  RESTORE: "info",
  SETTINGS_CHANGE: "draft",
};

function label(value) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function AuditLogBrowser({ entries, total, actors, filters }) {
  const router = useRouter();

  const applyFilter = (key, value) => {
    const params = new URLSearchParams();

    Object.entries({ ...filters, [key]: value }).forEach(([field, fieldValue]) => {
      if (fieldValue) params.set(field, fieldValue);
    });

    router.push(`/dashboard/audit-log?${params.toString()}`);
  };

  return (
    <div>
      <PageHeader
        eyebrow='Settings'
        title='Audit log'
        description='Who changed what, and when. Covers publishing, pricing, legal and settings changes.'
      />

      <Surface className='mb-5 p-4'>
        <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-5'>
          <SelectInput
            value={filters.action}
            onChange={(event) => applyFilter("action", event.target.value)}
            aria-label='Filter by action'
          >
            <option value=''>All actions</option>
            {ACTIONS.map((action) => (
              <option key={action} value={action}>
                {label(action)}
              </option>
            ))}
          </SelectInput>

          <SelectInput
            value={filters.entity}
            onChange={(event) => applyFilter("entity", event.target.value)}
            aria-label='Filter by content type'
          >
            <option value=''>All content types</option>
            {ENTITIES.map((entity) => (
              <option key={entity} value={entity}>
                {entity}
              </option>
            ))}
          </SelectInput>

          <SelectInput
            value={filters.actor}
            onChange={(event) => applyFilter("actor", event.target.value)}
            aria-label='Filter by user'
          >
            <option value=''>All users</option>
            {actors.map((actor) => (
              <option key={actor.id} value={actor.id}>
                {actor.name || actor.email}
              </option>
            ))}
          </SelectInput>

          <TextInput
            type='date'
            value={filters.from}
            onChange={(event) => applyFilter("from", event.target.value)}
            aria-label='From date'
          />

          <TextInput
            type='date'
            value={filters.to}
            onChange={(event) => applyFilter("to", event.target.value)}
            aria-label='To date'
          />
        </div>
      </Surface>

      <p className='mb-3 text-[13px] text-[var(--adm-ink-muted)]'>
        {total} {total === 1 ? "entry" : "entries"}
      </p>

      <DataTable
        columns={[
          { key: "when", label: "When" },
          { key: "who", label: "Who" },
          { key: "action", label: "Action" },
          { key: "what", label: "What" },
        ]}
        empty={
          entries.length === 0 ? (
            <div>
              <EmptyState
                title='Nothing recorded yet'
                description='Changes made in the CMS will be listed here as they happen.'
              />
            </div>
          ) : null
        }
      >
        {entries.map((entry) => (
          <Row key={entry.id}>
            <Cell className='whitespace-nowrap text-[11.5px] text-[var(--adm-ink-faint)]'>
              {new Date(entry.createdAt).toLocaleString()}
            </Cell>
            <Cell className='text-sm'>
              {entry.actor?.name || entry.actorEmail || "System"}
            </Cell>
            <Cell>
              <StatusPill tone={ACTION_TONES[entry.action] || "info"}>
                {label(entry.action)}
              </StatusPill>
            </Cell>
            <Cell className='text-sm'>
              <span className='font-semibold text-[var(--adm-ink)]'>{entry.entityType}</span>
              {entry.entityLabel ? (
                <span className='ml-2 text-[var(--adm-ink-muted)]'>{entry.entityLabel}</span>
              ) : null}
            </Cell>
          </Row>
        ))}
      </DataTable>
    </div>
  );
}
