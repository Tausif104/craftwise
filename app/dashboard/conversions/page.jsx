import { prisma } from "@/lib/prisma";
import { getGa4Status, getLeadMetrics, resolveRange } from "@/lib/analytics";
import {
  Cell,
  DataTable,
  Eyebrow,
  PageHeader,
  Row,
  Surface,
} from "@/components/dashboard/admin-kit";
import {
  BreakdownList,
  MetricRow,
  MetricTile,
  Sparkline,
} from "@/components/dashboard/metric-tiles";
import RangePicker from "@/components/dashboard/range-picker";

export const dynamic = "force-dynamic";

const CONVERSIONS = [
  { key: "CONTACT", label: "Contact form submissions" },
  { key: "CONSULTING", label: "Consulting enquiries" },
  { key: "DEMO", label: "Demo bookings" },
  { key: "WAITLIST", label: "Waitlist signups" },
];

export default async function ConversionsPage({ searchParams }) {
  const params = await searchParams;
  const range = resolveRange(params?.range);

  const [metrics, ga4, campaigns] = await Promise.all([
    getLeadMetrics(range),
    getGa4Status(),
    prisma.lead.groupBy({
      by: ["utmCampaign"],
      where: { createdAt: { gte: range.from, lte: range.to } },
      _count: { _all: true },
    }),
  ]);

  const newsletter = await prisma.earlyAccessSubscriber.count({
    where: {
      createdAt: { gte: range.from, lte: range.to },
      consentMarketing: true,
    },
  });

  const campaignRows = campaigns
    .map((row) => ({ label: row.utmCampaign || "No campaign", count: row._count._all }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <div>
      <PageHeader
        eyebrow='Analytics'
        title='Conversions'
        description='Website activity connected to real CraftWise outcomes.'
        actions={<RangePicker value={range.rangeKey} />}
      />

      <MetricRow>
        {CONVERSIONS.map((conversion) => (
          <MetricTile
            key={conversion.key}
            label={conversion.label}
            value={
              conversion.key === "WAITLIST"
                ? metrics.subscribers
                : (metrics.byType[conversion.key] ?? 0)
            }
          />
        ))}
      </MetricRow>

      <div className='grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
        <Surface>
          <h3 className='mb-4 text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Conversions per day</h3>
          <Sparkline data={metrics.daily} label='Conversions per day' />
        </Surface>

        <Surface>
          <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>By campaign</h3>
          <BreakdownList rows={campaignRows} emptyLabel='No campaign data yet.' />
        </Surface>
      </div>

      <Surface className='mt-5'>
        <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Where each number comes from</h3>
        <p className='mt-1.5 text-[13px] leading-relaxed text-[var(--adm-ink-muted)]'>
          Stored leads are counted in the CraftWise database. Google Analytics events measure
          behaviour and are never used to count enquiries.
        </p>

        <div className='mt-4'>
          <DataTable
            columns={[
              { key: "metric", label: "Metric" },
              { key: "value", label: "Value" },
              { key: "source", label: "Counted by" },
            ]}
          >
            {[
              ...CONVERSIONS.map((conversion) => ({
                label: conversion.label,
                value:
                  conversion.key === "WAITLIST"
                    ? metrics.subscribers
                    : (metrics.byType[conversion.key] ?? 0),
                source: "CraftWise database",
              })),
              {
                label: "Newsletter opt-ins",
                value: newsletter,
                source: "CraftWise database",
              },
              {
                label: "Sessions and pageviews",
                value: ga4.connected ? "See Google Analytics" : "Not connected",
                source: "Google Analytics 4",
              },
            ].map((row) => (
              <Row key={row.label}>
                <Cell>{row.label}</Cell>
                <Cell className='font-semibold'>{row.value}</Cell>
                <Cell className='text-[13px] text-[var(--adm-ink-muted)]'>{row.source}</Cell>
              </Row>
            ))}
          </DataTable>
        </div>
      </Surface>
    </div>
  );
}
