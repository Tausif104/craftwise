import {
  getGa4Status,
  getLandingPagePerformance,
  getLeadMetrics,
  resolveRange,
} from "@/lib/analytics";
import { Eyebrow, PageHeader, Surface } from "@/components/dashboard/admin-kit";
import {
  BreakdownList,
  MetricRow,
  MetricTile,
  NotConnected,
  Sparkline,
} from "@/components/dashboard/metric-tiles";
import RangePicker from "@/components/dashboard/range-picker";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage({ searchParams }) {
  const params = await searchParams;
  const range = resolveRange(params?.range);

  const [metrics, landingPages, ga4] = await Promise.all([
    getLeadMetrics(range),
    getLandingPagePerformance(range),
    getGa4Status(),
  ]);

  return (
    <div>
      <PageHeader
        eyebrow='Analytics'
        title='Website analytics'
        description='Traffic comes from Google Analytics. Everything about actual enquiries comes from CraftWise.'
        actions={<RangePicker value={range.rangeKey} />}
      />

      {!ga4.connected ? (
        <div className='mb-5'>
          <NotConnected
            title='Google Analytics traffic data'
            reason={`${ga4.reason} Lead and conversion figures below are unaffected — they come from the CraftWise database.`}
          />
        </div>
      ) : null}

      <MetricRow>
        <MetricTile
          label='Enquiries'
          value={metrics.total}
          change={metrics.change}
          hint='vs previous period'
        />
        <MetricTile label='Demo requests' value={metrics.byType.DEMO ?? 0} />
        <MetricTile label='Consulting' value={metrics.byType.CONSULTING ?? 0} />
        <MetricTile label='Waitlist signups' value={metrics.subscribers} />
      </MetricRow>

      <div className='grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
        <Surface>
          <h3 className='mb-4 text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Enquiries over time</h3>
          <Sparkline data={metrics.daily} label='Enquiries per day' />
        </Surface>

        <Surface>
          <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Traffic sources</h3>
          <BreakdownList
            rows={metrics.bySource}
            emptyLabel='No enquiries with a source yet.'
          />
        </Surface>
      </div>

      <Surface className='mt-5'>
        <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Pages that produced enquiries</h3>
        <BreakdownList rows={landingPages} emptyLabel='No landing page data yet.' />
      </Surface>

      <p className='mt-5 text-[11.5px] text-[var(--adm-ink-faint)]'>
        A Google Analytics outage cannot affect the website or these figures — nothing here
        depends on it at request time.
      </p>
    </div>
  );
}
