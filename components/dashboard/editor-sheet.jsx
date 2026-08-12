"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AdminButton } from "@/components/dashboard/admin-kit";

/**
 * Editor panel for creating and editing a collection item.
 *
 * Previously each manager pushed an inline form above its table, which shifted
 * the list down and left no reference to what you were editing. A side panel
 * keeps the list in place and gives long bilingual forms room to scroll.
 *
 * The footer is pinned so Save and Publish stay reachable without scrolling to
 * the bottom of a long form.
 */
export default function EditorSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSaveDraft,
  onPublish,
  saveLabel = "Save draft",
  publishLabel = "Publish",
  pending,
  dirty,
  footerNote,
}) {
  const requestClose = (next) => {
    if (!next && dirty && !window.confirm("Discard unsaved changes?")) return;
    onOpenChange(next);
  };

  return (
    <Sheet open={open} onOpenChange={requestClose}>
      <SheetContent
        side='right'
        className='adm flex w-full flex-col gap-0 bg-white p-0 sm:max-w-xl'
      >
        <SheetHeader className='border-b border-[var(--adm-line)] px-6 py-5'>
          <SheetTitle className='text-[18px] font-bold tracking-[-0.02em] text-[var(--adm-ink)]'>
            {title}
          </SheetTitle>
          {description ? (
            <SheetDescription className='mt-1 text-[13px] text-[var(--adm-ink-faint)]'>
              {description}
            </SheetDescription>
          ) : null}
        </SheetHeader>

        <div className='min-h-0 flex-1 overflow-y-auto px-6 py-5'>{children}</div>

        <div className='flex flex-wrap items-center gap-3 border-t border-[var(--adm-line)] bg-[var(--adm-surface-sunken)] px-6 py-4'>
          <span className='flex items-center gap-1.5 text-[12px] text-[var(--adm-ink-muted)]'>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                dirty ? "bg-[var(--adm-warn)]" : "bg-[var(--adm-ok)]"
              }`}
            />
            {footerNote || (dirty ? "Unsaved changes" : "No changes")}
          </span>

          <div className='ml-auto flex gap-2'>
            <AdminButton variant='ghost' type='button' onClick={() => requestClose(false)}>
              Cancel
            </AdminButton>
            {onSaveDraft ? (
              <AdminButton
                variant='outline'
                type='button'
                onClick={onSaveDraft}
                disabled={pending}
              >
                {pending ? "Saving…" : saveLabel}
              </AdminButton>
            ) : null}
            {onPublish ? (
              <AdminButton type='button' onClick={onPublish} disabled={pending}>
                {publishLabel}
              </AdminButton>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
