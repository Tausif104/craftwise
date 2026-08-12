"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
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
  useUnsavedChanges,
} from "@/components/dashboard/admin-kit";
import { ANNOUNCEMENT_PAGE_OPTIONS } from "@/lib/announcement-pages";
import {
  deleteSeoSetting,
  saveSeoSetting,
  saveTrackingSetting,
} from "@/app/actions/seo.actions";

const BLANK = {
  id: "",
  pathKey: "",
  metaTitleDe: "",
  metaTitleEn: "",
  metaDescriptionDe: "",
  metaDescriptionEn: "",
  ogTitleDe: "",
  ogTitleEn: "",
  ogDescriptionDe: "",
  ogDescriptionEn: "",
  ogImageUrl: "",
  canonicalUrl: "",
  noIndex: false,
  noFollow: false,
};

export default function SeoManager({ settings, tracking }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(null);
  const [locale, setLocale] = useState("de");
  const [form, setForm] = useState(BLANK);
  const [dirty, setDirty] = useState(false);

  useUnsavedChanges(dirty);

  const defaults = settings.find((setting) => setting.isSiteDefault);
  const overrides = settings.filter((setting) => !setting.isSiteDefault);

  const open = (setting, asDefault = false) => {
    setEditing(setting?.id || (asDefault ? "default" : "new"));
    setForm(setting ? { ...BLANK, ...setting } : { ...BLANK, pathKey: asDefault ? "*" : "" });
    setLocale("de");
    setDirty(false);
  };

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setDirty(true);
  };

  const submit = () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === "boolean") formData.set(key, value ? "on" : "");
      else if (value !== null && value !== undefined) formData.set(key, value);
    });

    startTransition(async () => {
      const result = await saveSeoSetting(null, formData);

      if (result.success) {
        toast.success(result.msg);
        setDirty(false);
        setEditing(null);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not save.");
      }
    });
  };

  const remove = (setting) => {
    if (!window.confirm(`Remove the SEO override for ${setting.pathKey}?`)) return;

    startTransition(async () => {
      const result = await deleteSeoSetting(setting.id);
      if (result.success) {
        toast.success(result.msg);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not remove it.");
      }
    });
  };

  const saveTracking = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await saveTrackingSetting(null, formData);
      if (result.success) {
        toast.success(result.msg);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not save tracking settings.");
      }
    });
  };

  const suffix = locale === "de" ? "De" : "En";

  return (
    <div>
      <PageHeader
        eyebrow='Marketing'
        title='SEO & tracking'
        description='Site-wide defaults, per-page overrides, and the analytics configuration.'
        actions={<AdminButton onClick={() => open(null)}>Add page override</AdminButton>}
      />

      <Surface className='mb-5'>
        <div className='flex flex-wrap items-center gap-3'>
          <div>
            <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Site-wide SEO</h3>
            <p className='mt-1.5 text-[13px] leading-relaxed text-[var(--adm-ink-muted)]'>
              Used for any page without its own override.
            </p>
          </div>
          <AdminButton
            variant='outline'
            className='ml-auto'
            onClick={() => open(defaults, true)}
          >
            {defaults ? "Edit defaults" : "Set defaults"}
          </AdminButton>
        </div>
      </Surface>

      {editing ? (
        <Surface className='mb-5'>
          <div className='flex flex-wrap items-center gap-3'>
            <Eyebrow>
              {form.pathKey === "*" ? "Site defaults" : editing === "new" ? "New override" : "Editing"}
            </Eyebrow>
            <div className='ml-auto'>
              <LocaleTabs locale={locale} onChange={setLocale} />
            </div>
          </div>

          <div className='mt-4 space-y-4'>
            {form.pathKey !== "*" ? (
              <Field label='Page' required hint='Which page this override applies to'>
                <SelectInput
                  value={form.pathKey}
                  onChange={(event) => update("pathKey", event.target.value)}
                >
                  <option value=''>Choose a page…</option>
                  {ANNOUNCEMENT_PAGE_OPTIONS.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label} — {option.key}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            ) : null}

            <div className='grid gap-4 md:grid-cols-2'>
              <Field label={`Meta title (${locale.toUpperCase()})`} hint='Up to 160 characters'>
                <TextInput
                  maxLength={160}
                  value={form[`metaTitle${suffix}`] || ""}
                  onChange={(event) => update(`metaTitle${suffix}`, event.target.value)}
                />
              </Field>

              <Field label={`Open Graph title (${locale.toUpperCase()})`}>
                <TextInput
                  value={form[`ogTitle${suffix}`] || ""}
                  onChange={(event) => update(`ogTitle${suffix}`, event.target.value)}
                />
              </Field>
            </div>

            <Field
              label={`Meta description (${locale.toUpperCase()})`}
              hint='Up to 320 characters'
            >
              <TextArea
                rows={3}
                maxLength={320}
                value={form[`metaDescription${suffix}`] || ""}
                onChange={(event) => update(`metaDescription${suffix}`, event.target.value)}
              />
            </Field>

            <Field label={`Open Graph description (${locale.toUpperCase()})`}>
              <TextArea
                rows={2}
                value={form[`ogDescription${suffix}`] || ""}
                onChange={(event) => update(`ogDescription${suffix}`, event.target.value)}
              />
            </Field>

            <div className='grid gap-4 md:grid-cols-2'>
              <Field label='Open Graph image URL'>
                <TextInput
                  value={form.ogImageUrl || ""}
                  onChange={(event) => update("ogImageUrl", event.target.value)}
                />
              </Field>

              <Field label='Canonical URL' hint='Leave blank to use the page URL'>
                <TextInput
                  value={form.canonicalUrl || ""}
                  onChange={(event) => update("canonicalUrl", event.target.value)}
                />
              </Field>
            </div>

            <div className='flex flex-wrap gap-5'>
              <label className='flex items-center gap-2 text-sm font-medium text-[var(--adm-ink)]'>
                <input
                  type='checkbox'
                  checked={form.noIndex}
                  onChange={(event) => update("noIndex", event.target.checked)}
                  className='h-4 w-4 accent-[var(--adm-accent)]'
                />
                Hide from search engines (noindex)
              </label>

              <label className='flex items-center gap-2 text-sm font-medium text-[var(--adm-ink)]'>
                <input
                  type='checkbox'
                  checked={form.noFollow}
                  onChange={(event) => update("noFollow", event.target.checked)}
                  className='h-4 w-4 accent-[var(--adm-accent)]'
                />
                Do not follow links (nofollow)
              </label>
            </div>
          </div>

          <div className='mt-6 flex justify-end gap-2'>
            <AdminButton
              variant='ghost'
              onClick={() => {
                if (dirty && !window.confirm("Discard unsaved changes?")) return;
                setEditing(null);
                setDirty(false);
              }}
            >
              Cancel
            </AdminButton>
            <AdminButton onClick={submit} disabled={pending}>
              {pending ? "Saving…" : "Save"}
            </AdminButton>
          </div>
        </Surface>
      ) : null}

      <DataTable
        columns={[
          { key: "page", label: "Page" },
          { key: "title", label: "Meta title (DE)" },
          { key: "indexing", label: "Indexing" },
          { key: "actions", label: "" },
        ]}
        empty={
          overrides.length === 0 ? (
            <div>
              <EmptyState
                title='No page overrides'
                description='Every page currently uses the site-wide defaults.'
                action={<AdminButton onClick={() => open(null)}>Add page override</AdminButton>}
              />
            </div>
          ) : null
        }
      >
        {overrides.map((setting) => (
          <Row key={setting.id}>
            <Cell className='font-semibold'>{setting.pathKey}</Cell>
            <Cell className='max-w-sm text-[13px] text-[var(--adm-ink-muted)]'>
              {setting.metaTitleDe || "—"}
            </Cell>
            <Cell>
              <StatusPill tone={setting.noIndex ? "danger" : "published"}>
                {setting.noIndex ? "noindex" : "Indexed"}
              </StatusPill>
            </Cell>
            <Cell>
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => open(setting)}
                  className='text-[13px] font-semibold text-[var(--adm-teal)] transition-colors hover:text-[var(--adm-accent)]'
                >
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => remove(setting)}
                  className='text-[13px] font-semibold text-[var(--adm-bad)] transition-colors hover:opacity-75'
                >
                  Remove
                </button>
              </div>
            </Cell>
          </Row>
        ))}
      </DataTable>

      <Surface className='mt-5'>
        <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>Analytics configuration</h3>
        <p className='mt-1.5 text-[13px] leading-relaxed text-[var(--adm-ink-muted)]'>
          Stored centrally so tracking IDs are not hard-coded in the site.
        </p>

        <form className='mt-4 space-y-4' onSubmit={saveTracking}>
          <input type='hidden' name='environment' value='production' />

          <div className='grid gap-4 md:grid-cols-3'>
            <Field label='GA4 measurement ID' hint='G-XXXXXXXXXX'>
              <TextInput
                name='ga4MeasurementId'
                defaultValue={tracking?.ga4MeasurementId || ""}
                placeholder='G-XXXXXXXXXX'
              />
            </Field>

            <Field label='GA4 property ID' hint='Numeric, used for reporting'>
              <TextInput
                name='ga4PropertyId'
                defaultValue={tracking?.ga4PropertyId || ""}
                placeholder='123456789'
              />
            </Field>

            <Field label='GTM container ID'>
              <TextInput
                name='gtmContainerId'
                defaultValue={tracking?.gtmContainerId || ""}
                placeholder='GTM-XXXXXXX'
              />
            </Field>
          </div>

          <label className='flex items-center gap-2 text-sm font-medium text-[var(--adm-ink)]'>
            <input
              type='checkbox'
              name='consentRequired'
              defaultChecked={tracking?.consentRequired ?? true}
              className='h-4 w-4 accent-[var(--adm-accent)]'
            />
            Only load tracking scripts after cookie consent
          </label>

          <div className='flex justify-end'>
            <AdminButton type='submit' disabled={pending}>
              {pending ? "Saving…" : "Save tracking settings"}
            </AdminButton>
          </div>
        </form>
      </Surface>
    </div>
  );
}
