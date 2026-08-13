"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared admin primitives.
 *
 * The dashboard already had a consistent visual recipe (28px radius, hairline
 * #E6EEF7 border, soft shadow, amber eyebrow labels) but it was retyped by hand
 * in every screen, and two forms had drifted to different input styles. These
 * components pin that recipe down so the CMS stays consistent as it grows.
 */

export function Surface({ className, children, ...props }) {
  return (
    <div
      className={cn("adm-surface adm-surface-interactive p-5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ className, children }) {
  return (
    <p className={cn("adm-eyebrow", className)}>{children}</p>
  );
}

/**
 * Page header.
 *
 * The title has to win outright. Previously it sat at 24px against a 13.5px
 * description in near-black — close enough in weight that the block read as
 * three competing lines. The gap is now wide: a large tight title against
 * small, faint, narrow supporting text.
 *
 * `eyebrow` is optional and should carry a section name, not a greeting. The
 * breadcrumb already states where you are, so most pages need no eyebrow.
 */
export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className='adm-rise mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
      <div className='min-w-0'>
        {eyebrow ? <Eyebrow className='mb-2'>{eyebrow}</Eyebrow> : null}
        <h2 className='text-[30px] font-bold leading-[1.1] tracking-[-0.035em] text-[var(--adm-ink)]'>
          {title}
        </h2>
        {description ? (
          <p className='mt-2 max-w-md text-[13px] leading-[1.5] text-[var(--adm-ink-faint)]'>
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className='flex shrink-0 flex-wrap gap-2'>{actions}</div> : null}
    </div>
  );
}

const PILL_TONES = {
  published: "bg-[var(--adm-ok-wash)] text-[var(--adm-ok)]",
  draft: "bg-[var(--adm-warn-wash)] text-[var(--adm-warn)]",
  archived: "bg-[#EEF2F6] text-[var(--adm-ink-muted)]",
  danger: "bg-[var(--adm-bad-wash)] text-[var(--adm-bad)]",
  info: "bg-[#EAF1FB] text-[var(--adm-teal)]",
};

export function StatusPill({ tone = "info", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold",
        PILL_TONES[tone] ?? PILL_TONES.info,
      )}
    >
      {children}
    </span>
  );
}

export function publishTone(status) {
  if (status === "PUBLISHED") return "published";
  if (status === "ARCHIVED") return "archived";
  return "draft";
}

export function AdminButton({
  variant = "primary",
  className,
  as: As = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 disabled:active:scale-100";

  const variants = {
    primary:
      "bg-[var(--adm-accent)] text-white shadow-[0_6px_16px_-8px_rgba(204,134,64,0.9)] hover:bg-[#b8752f] hover:shadow-[0_8px_20px_-8px_rgba(204,134,64,0.95)]",
    secondary: "bg-[var(--adm-teal)] text-white hover:bg-[#263d4e]",
    outline:
      "border border-[var(--adm-line-strong)] bg-white text-[var(--adm-teal)] hover:border-[var(--adm-accent)] hover:text-[var(--adm-accent-ink)]",
    ghost: "text-[var(--adm-ink-muted)] hover:bg-[var(--adm-surface-sunken)] hover:text-[var(--adm-teal)]",
    danger:
      "border border-[#F3C4C0] bg-white text-[var(--adm-bad)] hover:bg-[var(--adm-bad-wash)]",
  };

  return <As className={cn(base, variants[variant], className)} {...props} />;
}

export function Field({ label, hint, error, required, htmlFor, children }) {
  return (
    <label className='block' htmlFor={htmlFor}>
      <span className='mb-1.5 block text-[12.5px] font-semibold text-[var(--adm-ink)]'>
        {label}
        {required ? <span className='ml-1 text-[#B42318]'>*</span> : null}
      </span>
      {children}
      {error ? (
        <span className='mt-1.5 block text-[11.5px] font-medium text-[var(--adm-bad)]'>{error}</span>
      ) : hint ? (
        <span className='mt-1.5 block text-[11.5px] text-[var(--adm-ink-faint)]'>{hint}</span>
      ) : null}
    </label>
  );
}

/** Matches the global `.field-input` utility so every CMS form looks the same. */
export function TextInput({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-[var(--adm-r-md)] border border-[var(--adm-line-strong)] bg-[var(--adm-surface-sunken)] px-3.5 py-2.5 text-[13.5px] text-[var(--adm-ink)] outline-none transition-colors placeholder:text-[var(--adm-ink-faint)] focus:border-[var(--adm-accent)] focus:bg-white",
        className,
      )}
      {...props}
    />
  );
}

export function TextArea({ className, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "w-full rounded-[var(--adm-r-md)] border border-[var(--adm-line-strong)] bg-[var(--adm-surface-sunken)] px-3.5 py-2.5 text-[13.5px] text-[var(--adm-ink)] outline-none transition-colors placeholder:text-[var(--adm-ink-faint)] focus:border-[var(--adm-accent)] focus:bg-white",
        className,
      )}
      {...props}
    />
  );
}

export function SelectInput({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "w-full rounded-[var(--adm-r-md)] border border-[var(--adm-line-strong)] bg-[var(--adm-surface-sunken)] px-3.5 py-2.5 text-[13.5px] text-[var(--adm-ink)] outline-none transition-colors placeholder:text-[var(--adm-ink-faint)] focus:border-[var(--adm-accent)] focus:bg-white",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

/**
 * DE/EN switcher. Both locales stay mounted so a half-finished translation is
 * never silently discarded when the editor switches tabs.
 */
export function LocaleTabs({ locale, onChange, locales = ["de", "en"] }) {
  return (
    <div className='inline-flex rounded-full border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)] p-0.5'>
      {locales.map((code) => (
        <button
          key={code}
          type='button'
          onClick={() => onChange(code)}
          aria-pressed={locale === code}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all",
            locale === code
              ? "bg-[var(--adm-teal)] text-white shadow-sm"
              : "text-[var(--adm-ink-faint)] hover:text-[var(--adm-teal)]",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

/**
 * Toggle. A checkbox styled as a switch — the native box wrapped in a bordered
 * container read as a text input, which is what it looked like on the banner
 * form. `name` is kept so it still posts with the surrounding form.
 */
export function Toggle({ name, checked, defaultChecked, onChange, label, hint }) {
  return (
    <label className='flex cursor-pointer items-start gap-3'>
      <span className='relative mt-0.5 inline-flex shrink-0'>
        <input
          type='checkbox'
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          className='peer sr-only'
        />
        <span className='h-[22px] w-[38px] rounded-full bg-[var(--adm-line-strong)] transition-colors peer-checked:bg-[var(--adm-accent)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--adm-accent)]' />
        <span className='pointer-events-none absolute left-[3px] top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4' />
      </span>
      <span className='min-w-0'>
        <span className='block text-[13px] font-medium text-[var(--adm-ink)]'>{label}</span>
        {hint ? (
          <span className='mt-0.5 block text-[11.5px] text-[var(--adm-ink-faint)]'>{hint}</span>
        ) : null}
      </span>
    </label>
  );
}

/** Section divider inside a long form. */
export function FormSection({ title, hint, children, first }) {
  return (
    <section
      className={
        first ? "" : "mt-7 border-t border-[var(--adm-line)] pt-7"
      }
    >
      <div className='mb-4'>
        <h3 className='text-[14px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>
          {title}
        </h3>
        {hint ? (
          <p className='mt-1 text-[12.5px] text-[var(--adm-ink-faint)]'>{hint}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className='px-6 py-14 text-center'>
      <p className='text-[14px] font-semibold text-[var(--adm-ink)]'>{title}</p>
      {description ? (
        <p className='mx-auto mt-1.5 max-w-sm text-[13px] leading-relaxed text-[var(--adm-ink-faint)]'>
          {description}
        </p>
      ) : null}
      {action ? <div className='mt-5 flex justify-center'>{action}</div> : null}
    </div>
  );
}

export function DataTable({ columns, children, empty }) {
  return (
    <div className='adm-rise overflow-hidden rounded-[var(--adm-r-xl)] border border-[var(--adm-line)] bg-white shadow-[var(--adm-e1)]'>
      <div className='overflow-x-auto'>
        <table className='adm-table'>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key ?? column.label} scope='col'>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {empty}
    </div>
  );
}

export function Row({ children }) {
  return <tr>{children}</tr>;
}

export function Cell({ className, children, ...props }) {
  return (
    <td className={cn("text-[var(--adm-ink)]", className)} {...props}>
      {children}
    </td>
  );
}

/**
 * List ordering for content that renders in a fixed sequence on the website
 * (B2, B3). Moving a row applies immediately and persists the whole list, so
 * what the admin shows top-to-bottom is the order visitors get.
 *
 * `saveAction` receives the ordered ids and returns the standard action shape.
 */
export function useReorderable(items, saveAction) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [order, setOrder] = useState(items);

  useEffect(() => setOrder(items), [items]);

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;

    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);

    startTransition(async () => {
      const result = await saveAction(next.map((item) => item.id));

      if (result?.success) {
        router.refresh();
      } else {
        setOrder(items);
        toast.error(result?.msg || "Could not save the new order.");
      }
    });
  };

  return { order, move, reordering: pending };
}

export function ReorderCell({ index, total, onMove, disabled }) {
  const button =
    "rounded-[10px] border border-[var(--adm-line)] p-1 text-[var(--adm-ink-muted)] transition hover:border-[var(--adm-accent)] hover:text-[var(--adm-accent-ink)] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className='flex items-center gap-1'>
      <button
        type='button'
        className={button}
        onClick={() => onMove(index, -1)}
        disabled={disabled || index === 0}
        aria-label='Move up'
      >
        <ChevronUp className='h-3.5 w-3.5' />
      </button>
      <button
        type='button'
        className={button}
        onClick={() => onMove(index, 1)}
        disabled={disabled || index === total - 1}
        aria-label='Move down'
      >
        <ChevronDown className='h-3.5 w-3.5' />
      </button>
    </div>
  );
}

/**
 * Warns before leaving with unsaved changes (A2).
 * Covers tab close and reload; in-app navigation is handled by each form
 * confirming before it calls router.push.
 */
export function useUnsavedChanges(isDirty) {
  useEffect(() => {
    if (!isDirty) return undefined;

    const handler = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);
}

/**
 * Sticky action bar for editor screens. Shows the current publish state so
 * "draft vs published" is always visible (A3).
 */
export function SaveBar({ status, dirty, pending, onSave, onPublish, onPreview, extra }) {
  return (
    <div className='sticky bottom-4 z-20 mt-6 flex flex-wrap items-center gap-3 rounded-full border border-[var(--adm-line)] bg-white/90 px-4 py-2.5 shadow-[var(--adm-e3)] backdrop-blur-xl'>
      <StatusPill tone={publishTone(status)}>
        {status === "PUBLISHED" ? "Published" : status === "ARCHIVED" ? "Archived" : "Draft"}
      </StatusPill>

      <span className='flex items-center gap-1.5 text-[12.5px] text-[var(--adm-ink-muted)]'>
        <span
          className={`h-1.5 w-1.5 rounded-full ${dirty ? "bg-[var(--adm-warn)]" : "bg-[var(--adm-ok)]"}`}
        />
        {dirty ? "Unsaved changes" : "All changes saved"}
      </span>

      <div className='ml-auto flex flex-wrap gap-2'>
        {extra}
        {onPreview ? (
          <AdminButton variant='outline' type='button' onClick={onPreview}>
            Preview
          </AdminButton>
        ) : null}
        <AdminButton
          variant='outline'
          type='button'
          onClick={onSave}
          disabled={pending || !dirty}
        >
          {pending ? "Saving…" : "Save draft"}
        </AdminButton>
        {onPublish ? (
          <AdminButton type='button' onClick={onPublish} disabled={pending}>
            {status === "PUBLISHED" ? "Update published" : "Publish"}
          </AdminButton>
        ) : null}
      </div>
    </div>
  );
}

/** Small helper for list screens that need a debounced search box. */
export function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
