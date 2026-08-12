import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDeliveryHealth } from "@/lib/lead-intake";
import {
  Cell,
  DataTable,
  EmptyState,
  Eyebrow,
  PageHeader,
  Row,
  StatusPill,
  Surface,
} from "@/components/dashboard/admin-kit";
import RetryDeliveriesButton from "@/components/dashboard/retry-deliveries-button";

export const dynamic = "force-dynamic";

const FORM_SOURCES = [
  { type: "CONTACT", label: "Contact form", page: "/contact" },
  { type: "CONSULTING", label: "Consulting enquiry", page: "/consulting" },
  { type: "DEMO", label: "Book a demo", page: "/book-demo" },
  { type: "WAITLIST", label: "Waitlist / early access", page: "/registration" },
];

const DELIVERY_TONES = {
  DELIVERED: "published",
  PENDING: "draft",
  RETRYING: "draft",
  FAILED: "danger",
};

export default async function FormsPage() {
  const [health, counts, stuck] = await Promise.all([
    getDeliveryHealth(),
    prisma.lead.groupBy({ by: ["type"], _count: { _all: true } }),
    prisma.integrationDelivery.findMany({
      where: { status: { in: ["RETRYING", "FAILED"] } },
      orderBy: { updatedAt: "desc" },
      take: 25,
      include: { lead: { select: { id: true, email: true } } },
    }),
  ]);

  const countFor = (type) =>
    counts.find((row) => row.type === type)?._count?._all ?? 0;

  return (
    <div>
      <PageHeader
        eyebrow='Marketing'
        title='Forms'
        description='Which website forms are capturing enquiries, and whether every captured lead reached its destination.'
      />

      <div className='mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {FORM_SOURCES.map((source) => (
          <Surface key={source.type} className='p-5'>
            <Eyebrow>{source.page}</Eyebrow>
            <p className='mt-1 text-sm font-semibold text-[var(--adm-ink)]'>{source.label}</p>
            <p className='mt-3 text-3xl font-bold text-[var(--adm-ink)]'>{countFor(source.type)}</p>
            <p className='mt-1 text-[11.5px] text-[var(--adm-ink-faint)]'>captured all time</p>
          </Surface>
        ))}
      </div>

      <Surface className='mb-5'>
        <div className='flex flex-wrap items-center gap-3'>
          <div>
            <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Notification health</h3>
            <p className='mt-1.5 text-[13px] leading-relaxed text-[var(--adm-ink-muted)]'>
              A lead is stored before any notification is attempted, so a failure here never
              loses the enquiry — it only delays the alert.
            </p>
          </div>
          <div className='ml-auto'>
            <RetryDeliveriesButton />
          </div>
        </div>

        <div className='mt-4 flex flex-wrap gap-3'>
          {Object.entries(health).map(([status, count]) => (
            <div
              key={status}
              className='rounded-[18px] border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)] px-4 py-3'
            >
              <p className='text-xs uppercase tracking-wide text-[var(--adm-ink-muted)]'>
                {status.toLowerCase()}
              </p>
              <p className='text-xl font-bold text-[var(--adm-ink)]'>{count}</p>
            </div>
          ))}
        </div>
      </Surface>

      <DataTable
        columns={[
          { key: "lead", label: "Lead" },
          { key: "target", label: "Target" },
          { key: "status", label: "Status" },
          { key: "attempts", label: "Attempts" },
          { key: "error", label: "Last error" },
        ]}
        empty={
          stuck.length === 0 ? (
            <div>
              <EmptyState
                title='Everything delivered'
                description='No notification is waiting or failed. Nothing to do here.'
              />
            </div>
          ) : null
        }
      >
        {stuck.map((delivery) => (
          <Row key={delivery.id}>
            <Cell>
              {delivery.lead ? (
                <Link
                  href={`/dashboard/leads/${delivery.lead.id}`}
                  className='text-[13px] font-semibold text-[var(--adm-teal)] transition-colors hover:text-[var(--adm-accent)]'
                >
                  {delivery.lead.email}
                </Link>
              ) : (
                "—"
              )}
            </Cell>
            <Cell className='text-sm'>{delivery.target}</Cell>
            <Cell>
              <StatusPill tone={DELIVERY_TONES[delivery.status] || "info"}>
                {delivery.status.charAt(0) + delivery.status.slice(1).toLowerCase()}
              </StatusPill>
            </Cell>
            <Cell className='text-[13px] text-[var(--adm-ink-muted)]'>
              {delivery.attempts} / {delivery.maxAttempts}
            </Cell>
            <Cell className='max-w-sm text-xs text-[#B42318]'>{delivery.lastError}</Cell>
          </Row>
        ))}
      </DataTable>
    </div>
  );
}
