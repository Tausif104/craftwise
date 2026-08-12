"use client";

import { useMemo, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * Multi-select dropdown.
 *
 * Replaces the wall of toggle chips used for page targeting. Thirty always-on
 * chips consumed a screen of space to express a choice that is usually two or
 * three items, and gave no way to search. This keeps the control one row tall,
 * summarises the selection, and only shows the full list on demand.
 */
export default function MultiSelect({
  options = [],
  selected = [],
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyLabel = "Nothing matches",
  className,
  id,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        String(option.value).toLowerCase().includes(q),
    );
  }, [options, query]);

  const selectedOptions = options.filter((option) => selected.includes(option.value));

  const toggle = (value) => {
    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  const summary = () => {
    if (!selectedOptions.length) return null;
    if (selectedOptions.length <= 2) {
      return selectedOptions.map((option) => option.label).join(", ");
    }
    return `${selectedOptions[0].label} +${selectedOptions.length - 1} more`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={id}
        type='button'
        aria-label={placeholder}
        className={cn(
          "flex w-full items-center gap-2 rounded-[var(--adm-r-md)] border border-[var(--adm-line-strong)] bg-[var(--adm-surface-sunken)] px-3.5 py-2.5 text-left text-[13.5px] text-[var(--adm-ink)] outline-none transition-colors hover:border-[var(--adm-accent)] data-[popup-open]:border-[var(--adm-accent)] data-[popup-open]:bg-white",
          className,
        )}
      >
        <span
          className={cn(
            "min-w-0 flex-1 truncate",
            !selectedOptions.length && "text-[var(--adm-ink-faint)]",
          )}
        >
          {summary() || placeholder}
        </span>

        {selectedOptions.length ? (
          <span className='adm-num shrink-0 rounded-full bg-[var(--adm-accent-wash)] px-1.5 py-0.5 text-[11px] font-bold text-[var(--adm-accent-ink)]'>
            {selectedOptions.length}
          </span>
        ) : null}

        <ChevronDown className='h-4 w-4 shrink-0 text-[var(--adm-ink-faint)]' />
      </PopoverTrigger>

      <PopoverContent
        align='start'
        className='w-[var(--anchor-width)] min-w-[260px] p-0'
        initialFocus={searchRef}
      >
        <div className='border-b border-[var(--adm-line)] p-2'>
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className='w-full rounded-[var(--adm-r-sm)] bg-[var(--adm-surface-sunken)] px-2.5 py-1.5 text-[13px] outline-none placeholder:text-[var(--adm-ink-faint)]'
          />
        </div>

        <div className='max-h-64 overflow-y-auto p-1'>
          {filtered.length === 0 ? (
            <p className='px-3 py-6 text-center text-[12.5px] text-[var(--adm-ink-faint)]'>
              {emptyLabel}
            </p>
          ) : (
            filtered.map((option) => {
              const active = selected.includes(option.value);

              return (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => toggle(option.value)}
                  aria-pressed={active}
                  className='flex w-full items-center gap-2.5 rounded-[var(--adm-r-sm)] px-2.5 py-2 text-left text-[13px] transition-colors hover:bg-[var(--adm-surface-sunken)]'
                >
                  <span
                    className={cn(
                      "grid h-[16px] w-[16px] shrink-0 place-items-center rounded-[5px] border transition-colors",
                      active
                        ? "border-[var(--adm-accent)] bg-[var(--adm-accent)] text-white"
                        : "border-[var(--adm-line-strong)] bg-white",
                    )}
                  >
                    {active ? <Check className='h-3 w-3' strokeWidth={3} /> : null}
                  </span>
                  <span className='min-w-0 flex-1 truncate text-[var(--adm-ink)]'>
                    {option.label}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {selected.length ? (
          <div className='flex items-center gap-2 border-t border-[var(--adm-line)] px-3 py-2'>
            <span className='text-[11.5px] text-[var(--adm-ink-faint)]'>
              {selected.length} selected
            </span>
            <button
              type='button'
              onClick={() => onChange([])}
              className='ml-auto text-[11.5px] font-semibold text-[var(--adm-teal)] transition-colors hover:text-[var(--adm-accent)]'
            >
              Clear all
            </button>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

/** Removable summary of what is selected, shown under the control. */
export function SelectedTags({ options, selected, onRemove }) {
  if (!selected?.length) return null;

  const byValue = new Map(options.map((option) => [option.value, option.label]));

  return (
    <div className='mt-2 flex flex-wrap gap-1.5'>
      {selected.map((value) => (
        <span
          key={value}
          className='inline-flex items-center gap-1 rounded-full bg-[var(--adm-surface-sunken)] py-1 pl-2.5 pr-1 text-[11.5px] font-medium text-[var(--adm-ink-muted)] ring-1 ring-inset ring-[var(--adm-line)]'
        >
          {byValue.get(value) || value}
          <button
            type='button'
            onClick={() => onRemove(value)}
            aria-label={`Remove ${byValue.get(value) || value}`}
            className='grid h-4 w-4 place-items-center rounded-full transition-colors hover:bg-[var(--adm-line)] hover:text-[var(--adm-ink)]'
          >
            <X className='h-3 w-3' />
          </button>
        </span>
      ))}
    </div>
  );
}
