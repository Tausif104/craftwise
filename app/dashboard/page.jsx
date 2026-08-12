import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  getGa4Status,
  getLandingPagePerformance,
  getLeadMetrics,
  resolveRange,
} from "@/lib/analytics";
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
import {
  BreakdownList,
  MetricRow,
  MetricTile,
  NotConnected,
  Sparkline,
} from "@/components/dashboard/metric-tiles";
import RangePicker from "@/components/dashboard/range-picker";

export const dynamic = "force-dynamic";

/**
 * Overview (A4).
 *
 * Deliberately scoped to Sales Website performance and conversions. Felix asked
 * for no admin/CMS activity statistics here, so post counts and editor activity
 * are not shown — that belongs in the audit log.
 */
export default async function DashboardOverview({ searchParams }) {
  const params = await searchParams;
  const range = resolveRange(params?.range);

  const [metrics, landingPages, ga4, health, recentLeads] = await Promise.all([
    getLeadMetrics(range),
    getLandingPagePerformance(range),
    getGa4Status(),
    getDeliveryHealth(),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        status: true,
        createdAt: true,
        utmSource: true,
      },
    }),
  ]);

  const conversionRate =
    metrics.total > 0 ? Math.round((metrics.won / metrics.total) * 100) : 0;

  const stuck = (health.RETRYING || 0) + (health.FAILED || 0);

  return (
    <div>
      {/* No greeting eyebrow: the sidebar already says who is signed in and the
          breadcrumb already says which page this is. */}
      <PageHeader
        title='Website performance'
        description='What the sales website is producing, and where it comes from.'
        actions={<RangePicker value={range.rangeKey} />}
      />

      {stuck > 0 ? (
        <div className='adm-rise mb-5 flex items-start gap-2.5 rounded-[var(--adm-r-lg)] border border-[#F3C4C0] bg-[var(--adm-bad-wash)] px-4 py-3 text-[13px] leading-relaxed text-[var(--adm-bad)]'>
          <strong>{stuck}</strong> lead notification{stuck === 1 ? "" : "s"} could not be
          delivered. The enquiries are safely stored.{" "}
          <Link href='/dashboard/forms' className='font-semibold underline'>
            Review delivery health
          </Link>
        </div>
      ) : null}

      <MetricRow>
        <MetricTile
          label='Enquiries'
          value={metrics.total}
          change={metrics.change}
          hint='vs previous period'
        />
        <MetricTile
          label='Demo & consulting'
          value={(metrics.byType.DEMO ?? 0) + (metrics.byType.CONSULTING ?? 0)}
          hint='booked conversations'
        />
        <MetricTile label='Waitlist signups' value={metrics.subscribers} />
        <MetricTile label='Won' value={metrics.won} hint={`${conversionRate}% of enquiries`} />
      </MetricRow>

      <div className='grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
        <Surface>
          <h3 className='mb-4 text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Enquiries over time</h3>
          <Sparkline data={metrics.daily} label='Enquiries per day' />
        </Surface>

        <Surface>
          <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Pipeline</h3>
          <BreakdownList
            rows={["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"].map((status) => ({
              label: status.charAt(0) + status.slice(1).toLowerCase(),
              count: metrics.byStatus[status] ?? 0,
            }))}
          />
        </Surface>
      </div>

      <div className='mt-5 grid gap-5 lg:grid-cols-2'>
        <Surface>
          <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Traffic sources</h3>
          <BreakdownList rows={metrics.bySource} emptyLabel='No source data yet.' />
        </Surface>

        <Surface>
          <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Top converting pages</h3>
          <BreakdownList rows={landingPages} emptyLabel='No landing page data yet.' />
        </Surface>
      </div>

      <div className='mt-5'>
        <div className='mb-3 flex items-center gap-3'>
          <Eyebrow>Latest</Eyebrow>
          <Link
            href='/dashboard/leads'
            className='ml-auto text-[13px] font-semibold text-[var(--adm-teal)] transition-colors hover:text-[var(--adm-accent)]'
          >
            All leads →
          </Link>
        </div>

        <DataTable
          columns={[
            { key: "lead", label: "Lead" },
            { key: "type", label: "Type" },
            { key: "status", label: "Status" },
            { key: "source", label: "Source" },
            { key: "when", label: "Received" },
          ]}
          empty={
            recentLeads.length === 0 ? (
              <div>
                <EmptyState
                  title='No enquiries yet'
                  description='Submissions from the contact, consulting and demo forms will appear here.'
                />
              </div>
            ) : null
          }
        >
          {recentLeads.map((lead) => (
            <Row key={lead.id}>
              <Cell>
                <Link
                  href={`/dashboard/leads/${lead.id}`}
                  className='font-semibold text-[var(--adm-ink)] transition-colors hover:text-[var(--adm-accent)]'
                >
                  {lead.name || lead.email}
                </Link>
              </Cell>
              <Cell className='text-sm'>{lead.type}</Cell>
              <Cell>
                <StatusPill tone={lead.status === "WON" ? "published" : "info"}>
                  {lead.status.charAt(0) + lead.status.slice(1).toLowerCase()}
                </StatusPill>
              </Cell>
              <Cell className='text-[11.5px] text-[var(--adm-ink-faint)]'>{lead.utmSource || "Direct"}</Cell>
              <Cell className='whitespace-nowrap text-[11.5px] text-[var(--adm-ink-faint)]'>
                {new Date(lead.createdAt).toLocaleDateString()}
              </Cell>
            </Row>
          ))}
        </DataTable>
      </div>

      {!ga4.connected ? (
        <div className='mt-5'>
          <NotConnected title='Google Analytics traffic data' reason={ga4.reason} />
        </div>
      ) : null}
    </div>
  );
}
