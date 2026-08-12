"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import {
  AdminButton,
  Cell,
  DataTable,
  EmptyState,
  Eyebrow,
  Field,
  LocaleTabs,
  PageHeader,
  Row,
  SelectInput,
  StatusPill,
  Surface,
  TextArea,
  TextInput,
  publishTone,
  useUnsavedChanges,
} from "@/components/dashboard/admin-kit";
import EditorSheet from "@/components/dashboard/editor-sheet";
import MultiSelect, { SelectedTags } from "@/components/dashboard/multi-select";
import { ANNOUNCEMENT_PAGE_OPTIONS } from "@/lib/announcement-pages";

const PAGE_OPTIONS = ANNOUNCEMENT_PAGE_OPTIONS.map((page) => ({
  value: page.key,
  label: page.label,
}));
import { deleteTestimonial, saveTestimonial } from "@/app/actions/content.actions";

const BLANK = {
  id: "",
  authorName: "",
  roleDe: "",
  roleEn: "",
  quoteDe: "",
  quoteEn: "",
  rating: 5,
  avatarUrl: "",
  reviewedOn: "",
  sortOrder: 0,
  status: "DRAFT",
};

export default function TestimonialManager({ testimonials, pageFilter }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(null);
  const [locale, setLocale] = useState("de");
  const [form, setForm] = useState(BLANK);
  const [pageKeys, setPageKeys] = useState([]);
  const [dirty, setDirty] = useState(false);

  useUnsavedChanges(dirty);

  const open = (testimonial) => {
    setEditing(testimonial?.id || "new");
    setForm(
      testimonial
        ? {
            ...BLANK,
            ...testimonial,
            reviewedOn: testimonial.reviewedOn
              ? new Date(testimonial.reviewedOn).toISOString().slice(0, 10)
              : "",
          }
        : BLANK,
    );
    setPageKeys(testimonial?.placements?.map((placement) => placement.pageKey) || []);
    setLocale("de");
    setDirty(false);
  };

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setDirty(true);
  };

  const submit = (status) => {
    const formData = new FormData();

    Object.entries({ ...form, status }).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.set(key, value);
    });

    formData.set("pageKeys", JSON.stringify(pageKeys));

    startTransition(async () => {
      const result = await saveTestimonial(null, formData);

      if (result.success) {
        toast.success(result.msg);
        setDirty(false);
        setEditing(null);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not save the testimonial.");
      }
    });
  };

  const remove = (testimonial) => {
    if (!window.confirm(`Delete the testimonial from ${testimonial.authorName}?`)) return;

    startTransition(async () => {
      const result = await deleteTestimonial(testimonial.id);
      if (result.success) {
        toast.success("Testimonial deleted");
        router.refresh();
      } else {
        toast.error(result.msg || "Could not delete it.");
      }
    });
  };

  const suffix = locale === "de" ? "De" : "En";

  return (
    <div>
      <PageHeader
        eyebrow='Content'
        title='Testimonials'
        description='Customer quotes and which pages each one appears on.'
        actions={<AdminButton onClick={() => open(null)}>New testimonial</AdminButton>}
      />

      <Surface className='mb-5 p-4'>
        <SelectInput
          className='max-w-sm'
          value={pageFilter}
          onChange={(event) =>
            router.push(
              event.target.value
                ? `/dashboard/testimonials?page=${encodeURIComponent(event.target.value)}`
                : "/dashboard/testimonials",
            )
          }
          aria-label='Filter by page'
        >
          <option value=''>All pages</option>
          {ANNOUNCEMENT_PAGE_OPTIONS.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Surface>

      <EditorSheet
        open={Boolean(editing)}
        onOpenChange={(next) => {
          if (!next) {
            setEditing(null);
            setDirty(false);
          }
        }}
        title={editing === "new" ? "New testimonial" : "Edit testimonial"}
        description='Shown in the reviews section of the pages you choose.'
        dirty={dirty}
        pending={pending}
        onSaveDraft={() => submit("DRAFT")}
        onPublish={() => submit("PUBLISHED")}
      >
        <div className='space-y-4'>
          <div className='flex justify-end'>
            <LocaleTabs locale={locale} onChange={setLocale} />
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <Field label='Author name' required>
              <TextInput
                value={form.authorName}
                onChange={(event) => update("authorName", event.target.value)}
                placeholder='Stefan M.'
              />
            </Field>

            <Field label={`Job title (${locale.toUpperCase()})`}>
              <TextInput
                value={form[`role${suffix}`] || ""}
                onChange={(event) => update(`role${suffix}`, event.target.value)}
                placeholder={locale === "de" ? "Dachdeckermeister" : "Roofer"}
              />
            </Field>

            <Field label='Rating' hint='1 to 5'>
              <TextInput
                type='number'
                min='1'
                max='5'
                value={form.rating}
                onChange={(event) => update("rating", event.target.value)}
              />
            </Field>

            <Field label='Review date'>
              <TextInput
                type='date'
                value={form.reviewedOn || ""}
                onChange={(event) => update("reviewedOn", event.target.value)}
              />
            </Field>

            <Field label='Avatar image URL' hint='Upload via the media library, then paste the URL'>
              <TextInput
                value={form.avatarUrl || ""}
                onChange={(event) => update("avatarUrl", event.target.value)}
                placeholder='/images/testimonials/user-1.png'
              />
            </Field>

            <Field label='Order'>
              <TextInput
                type='number'
                value={form.sortOrder}
                onChange={(event) => update("sortOrder", event.target.value)}
              />
            </Field>
          </div>

          <Field label={`Review text (${locale.toUpperCase()})`} required>
            <TextArea
              rows={5}
              value={form[`quote${suffix}`]}
              onChange={(event) => update(`quote${suffix}`, event.target.value)}
            />
          </Field>

          <Field label='Shown on' hint='Leave empty to keep it out of every page'>
            <MultiSelect
              options={PAGE_OPTIONS}
              selected={pageKeys}
              onChange={(next) => {
                setPageKeys(next);
                setDirty(true);
              }}
              placeholder='Choose pages…'
              searchPlaceholder='Search pages…'
            />
            <SelectedTags
              options={PAGE_OPTIONS}
              selected={pageKeys}
              onRemove={(value) => {
                setPageKeys(pageKeys.filter((item) => item !== value));
                setDirty(true);
              }}
            />
          </Field>
        </div>
      </EditorSheet>

      <DataTable
        columns={[
          { key: "author", label: "Author" },
          { key: "quote", label: "Quote" },
          { key: "rating", label: "Rating" },
          { key: "pages", label: "Pages" },
          { key: "status", label: "Status" },
          { key: "actions", label: "" },
        ]}
        empty={
          testimonials.length === 0 ? (
            <div>
              <EmptyState
                title='No testimonials here'
                description='Nothing matches this filter yet.'
              />
            </div>
          ) : null
        }
      >
        {testimonials.map((testimonial) => (
          <Row key={testimonial.id}>
            <Cell>
              <span className='font-semibold'>{testimonial.authorName}</span>
              <span className='mt-0.5 block text-[11.5px] text-[var(--adm-ink-faint)]'>
                {testimonial.roleDe || testimonial.roleEn}
              </span>
            </Cell>
            <Cell className='max-w-sm text-[13px] text-[var(--adm-ink-muted)]'>
              {(testimonial.quoteDe || testimonial.quoteEn || "").slice(0, 90)}…
            </Cell>
            <Cell>
              <span className='inline-flex items-center gap-1 text-sm'>
                <Star className='h-3.5 w-3.5 fill-[var(--adm-accent)] text-[var(--adm-accent)]' />
                {testimonial.rating}
              </span>
            </Cell>
            <Cell className='text-[11.5px] text-[var(--adm-ink-faint)]'>
              {testimonial.placements?.length || 0}
            </Cell>
            <Cell>
              <StatusPill tone={publishTone(testimonial.status)}>
                {testimonial.status === "PUBLISHED" ? "Published" : "Draft"}
              </StatusPill>
            </Cell>
            <Cell>
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => open(testimonial)}
                  className='text-sm font-semibold text-[var(--adm-teal)] hover:text-[#CC8640]'
                >
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => remove(testimonial)}
                  className='text-sm font-semibold text-[var(--adm-bad)] hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            </Cell>
          </Row>
        ))}
      </DataTable>
    </div>
  );
}
