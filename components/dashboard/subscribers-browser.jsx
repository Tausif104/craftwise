"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AdminButton,
  Cell,
  DataTable,
  EmptyState,
  Eyebrow,
  PageHeader,
  Row,
  StatusPill,
  Surface,
  TextInput,
} from "@/components/dashboard/admin-kit";
import { exportSubscribersCsv } from "@/app/actions/subscriber.actions";

export default function SubscribersBrowser({ subscribers, stats, search: initialSearch }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);

  const handleExport = () => {
    startTransition(async () => {
      const result = await exportSubscribersCsv();

      if (!result.success) {
        toast.error(result.msg || "Export failed.");
        return;
      }

      const blob = new Blob([result.csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `craftwise-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      toast.success(`Exported ${result.count} subscribers`);
    });
  };

  return (
    <div>
      <PageHeader
        eyebrow='Marketing'
        title='Newsletter & waitlist'
        description='Product-interest signups, kept separate from direct sales enquiries.'
        actions={
          <AdminButton variant='outline' onClick={handleExport} disabled={pending}>
            {pending ? "Exporting…" : "Export CSV"}
          </AdminButton>
        }
      />

      <div className='mb-5 grid gap-4 sm:grid-cols-3'>
        {[
          { label: "Total signups", value: stats.total },
          { label: "Confirmed", value: stats.confirmed },
          { label: "Unsubscribed", value: stats.unsubscribed },
        ].map((stat) => (
          <Surface key={stat.label} className='p-5'>
            <Eyebrow>{stat.label}</Eyebrow>
            <p className='mt-2 text-3xl font-bold text-[var(--adm-ink)]'>{stat.value}</p>
          </Surface>
        ))}
      </div>

      <Surface className='mb-5 p-4'>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push(
              search ? `/dashboard/subscribers?q=${encodeURIComponent(search)}` : "/dashboard/subscribers",
            );
          }}
        >
          <TextInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Search by email'
            aria-label='Search subscribers'
          />
        </form>
      </Surface>

      <DataTable
        columns={[
          { key: "email", label: "Email" },
          { key: "state", label: "State" },
          { key: "consent", label: "Marketing consent" },
          { key: "locale", label: "Language" },
          { key: "source", label: "Source" },
          { key: "date", label: "Signed up" },
        ]}
        empty={
          subscribers.length === 0 ? (
            <div>
              <EmptyState
                title='No signups yet'
                description='Waitlist and newsletter registrations from the website will appear here.'
              />
            </div>
          ) : null
        }
      >
        {subscribers.map((subscriber) => {
          const state = subscriber.unsubscribedAt
            ? { tone: "archived", label: "Unsubscribed" }
            : subscriber.confirmedAt
              ? { tone: "published", label: "Confirmed" }
              : { tone: "draft", label: "Pending" };

          return (
            <Row key={subscriber.id}>
              <Cell className='font-semibold'>{subscriber.email}</Cell>
              <Cell>
                <StatusPill tone={state.tone}>{state.label}</StatusPill>
              </Cell>
              <Cell className='text-[13px] text-[var(--adm-ink-muted)]'>
                {subscriber.consentMarketing ? "Given" : "Not given"}
              </Cell>
              <Cell className='text-sm uppercase text-[var(--adm-ink-muted)]'>{subscriber.locale}</Cell>
              <Cell className='text-[11.5px] text-[var(--adm-ink-faint)]'>
                {subscriber.utmSource || subscriber.source || "Direct"}
              </Cell>
              <Cell className='whitespace-nowrap text-[11.5px] text-[var(--adm-ink-faint)]'>
                {new Date(subscriber.createdAt).toLocaleDateString()}
              </Cell>
            </Row>
          );
        })}
      </DataTable>
    </div>
  );
}
