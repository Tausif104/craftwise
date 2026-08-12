"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const RANGES = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "12m", label: "12 months" },
];

export default function RangePicker({ value }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const select = (range) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", range);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='inline-flex rounded-full border border-[var(--adm-line)] bg-white p-0.5 shadow-[var(--adm-e1)]'>
      {RANGES.map((range) => (
        <button
          key={range.value}
          type='button'
          onClick={() => select(range.value)}
          aria-pressed={value === range.value}
          className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all ${
            value === range.value
              ? "bg-[var(--adm-teal)] text-white shadow-sm"
              : "text-[var(--adm-ink-faint)] hover:text-[var(--adm-teal)]"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
