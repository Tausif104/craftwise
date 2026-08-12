import { Eyebrow, Surface } from "@/components/dashboard/admin-kit";

/** Row container. Figures are divided by hairlines instead of boxed each. */
export function MetricRow({ children }) {
  return <div className='adm-metrics adm-rise mb-6'>{children}</div>;
}

/**
 * Data display.
 *
 * Every figure uses tabular, slashed-zero numerals (.adm-metric / .adm-num) so
 * columns line up like a measuring scale — the one idea this panel commits to.
 */

export function MetricTile({ label, value, hint, change }) {
  const hasChange = typeof change === "number" && Number.isFinite(change);
  const positive = hasChange && change >= 0;
  const flat = hasChange && change === 0;

  return (
    <div className='px-5 py-5'>
      <Eyebrow>{label}</Eyebrow>

      <p className='adm-metric mt-2.5'>{value}</p>

      <div className='mt-2 flex flex-wrap items-center gap-x-2 gap-y-1'>
        {hasChange ? (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
              flat
                ? "bg-[#EEF2F6] text-[var(--adm-ink-muted)]"
                : positive
                  ? "bg-[var(--adm-ok-wash)] text-[var(--adm-ok)]"
                  : "bg-[var(--adm-bad-wash)] text-[var(--adm-bad)]"
            }`}
          >
            <span aria-hidden>{flat ? "±" : positive ? "▲" : "▼"}</span>
            <span className='adm-num'>{Math.abs(change)}%</span>
          </span>
        ) : null}
        {hint ? (
          <span className='text-[11.5px] text-[var(--adm-ink-faint)]'>{hint}</span>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Bar chart. Plain SVG-free markup on purpose — one daily series does not
 * justify a charting dependency. Gridlines and end ticks give it a measured
 * baseline rather than a floating blob of bars.
 */
export function Sparkline({ data, label }) {
  if (!data?.length) {
    return (
      <div className='grid h-32 place-items-center'>
        <p className='text-[13px] text-[var(--adm-ink-faint)]'>
          Nothing recorded in this period.
        </p>
      </div>
    );
  }

  const max = Math.max(...data.map((point) => point.count), 1);
  const total = data.reduce((sum, point) => sum + point.count, 0);
  const peak = data.reduce((best, point) => (point.count > best.count ? point : best), data[0]);

  return (
    <div>
      <div className='mb-3 flex items-baseline gap-4 text-[11.5px] text-[var(--adm-ink-faint)]'>
        <span>
          Total <span className='adm-num font-semibold text-[var(--adm-ink)]'>{total}</span>
        </span>
        <span>
          Peak <span className='adm-num font-semibold text-[var(--adm-ink)]'>{peak.count}</span>
        </span>
      </div>

      <div
        className='adm-chart-grid flex h-32 items-end gap-[3px] border-b border-[var(--adm-line-strong)] pb-px'
        role='img'
        aria-label={`${label}. Total ${total}, peak ${peak.count} on ${peak.day}.`}
      >
        {data.map((point) => (
          <div
            key={point.day}
            title={`${point.day}: ${point.count}`}
            style={{ height: `${Math.max(3, (point.count / max) * 100)}%` }}
            className='adm-bar min-w-[3px] flex-1'
          />
        ))}
      </div>

      <div className='mt-1.5 flex justify-between text-[10.5px] text-[var(--adm-ink-faint)]'>
        <span className='adm-num'>{data[0].day}</span>
        <span className='adm-num'>{data[data.length - 1].day}</span>
      </div>
    </div>
  );
}

export function BreakdownList({ rows, emptyLabel = "Nothing yet" }) {
  if (!rows?.length) {
    return (
      <p className='py-6 text-[13px] text-[var(--adm-ink-faint)]'>{emptyLabel}</p>
    );
  }

  const max = Math.max(...rows.map((row) => row.count ?? row.leads ?? 0), 1);

  return (
    <ul className='mt-3 space-y-2.5'>
      {rows.map((row) => {
        const value = row.count ?? row.leads ?? 0;
        const name = row.source ?? row.page ?? row.label;

        return (
          <li key={name} className='group'>
            <div className='flex items-baseline justify-between gap-3'>
              <span className='min-w-0 truncate text-[13px] text-[var(--adm-ink)]'>
                {name}
              </span>
              <span className='adm-num shrink-0 text-[13px] font-semibold text-[var(--adm-ink)]'>
                {value}
              </span>
            </div>
            <div className='mt-1.5 h-[3px] overflow-hidden rounded-full bg-[#eef3f8]'>
              <div
                className='h-full rounded-full bg-[var(--adm-teal)] transition-all duration-500 group-hover:bg-[var(--adm-accent)]'
                style={{ width: `${(value / max) * 100}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function NotConnected({ title, reason, href = "/dashboard/seo" }) {
  return (
    <Surface className='p-5'>
      <h3 className='text-[16px] font-bold text-[var(--adm-ink)]'>{title}</h3>
      <p className='mt-1.5 max-w-xl text-[13px] leading-relaxed text-[var(--adm-ink-muted)]'>
        {reason}
      </p>
      <a
        href={href}
        className='mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--adm-teal)] transition-colors hover:text-[var(--adm-accent)]'
      >
        Open SEO &amp; Tracking <span aria-hidden>→</span>
      </a>
    </Surface>
  );
}
