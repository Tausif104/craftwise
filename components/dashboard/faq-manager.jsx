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
import { deleteFaqItem, saveFaqItem } from "@/app/actions/content.actions";

const BLANK = {
  id: "",
  questionDe: "",
  questionEn: "",
  answerDe: "",
  answerEn: "",
  categoryId: "",
  sortOrder: 0,
  status: "DRAFT",
};

export default function FaqManager({ items, categories, pageFilter }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(null);
  const [locale, setLocale] = useState("de");
  const [form, setForm] = useState(BLANK);
  const [pageKeys, setPageKeys] = useState([]);
  const [dirty, setDirty] = useState(false);

  useUnsavedChanges(dirty);

  const open = (item) => {
    setEditing(item?.id || "new");
    setForm(item ? { ...BLANK, ...item, categoryId: item.categoryId || "" } : BLANK);
    setPageKeys(item?.placements?.map((placement) => placement.pageKey) || []);
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
      const result = await saveFaqItem(null, formData);

      if (result.success) {
        toast.success(result.msg);
        setDirty(false);
        setEditing(null);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not save the FAQ.");
      }
    });
  };

  const remove = (item) => {
    if (!window.confirm("Delete this FAQ?")) return;

    startTransition(async () => {
      const result = await deleteFaqItem(item.id);
      if (result.success) {
        toast.success("FAQ deleted");
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
        title='FAQs'
        description='One reusable library. Assign each question to the pages where it should appear.'
        actions={<AdminButton onClick={() => open(null)}>New FAQ</AdminButton>}
      />

      <Surface className='mb-5 p-4'>
        <SelectInput
          className='max-w-sm'
          value={pageFilter}
          onChange={(event) =>
            router.push(
              event.target.value
                ? `/dashboard/faqs?page=${encodeURIComponent(event.target.value)}`
                : "/dashboard/faqs",
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
        title={editing === "new" ? "New FAQ" : "Edit FAQ"}
        description='One question, reusable across any number of pages.'
        dirty={dirty}
        pending={pending}
        onSaveDraft={() => submit("DRAFT")}
        onPublish={() => submit("PUBLISHED")}
      >
        <div className='space-y-4'>
          <div className='flex justify-end'>
            <LocaleTabs locale={locale} onChange={setLocale} />
          </div>
            <Field label={`Question (${locale.toUpperCase()})`} required>
              <TextInput
                value={form[`question${suffix}`]}
                onChange={(event) => update(`question${suffix}`, event.target.value)}
              />
            </Field>

            <Field label={`Answer (${locale.toUpperCase()})`} required>
              <TextArea
                rows={6}
                value={form[`answer${suffix}`]}
                onChange={(event) => update(`answer${suffix}`, event.target.value)}
              />
            </Field>

            <div className='grid gap-4 md:grid-cols-2'>
              <Field label='Category'>
                <SelectInput
                  value={form.categoryId}
                  onChange={(event) => update("categoryId", event.target.value)}
                >
                  <option value=''>No category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nameEn}
                    </option>
                  ))}
                </SelectInput>
              </Field>

              <Field label='Order'>
                <TextInput
                  type='number'
                  value={form.sortOrder}
                  onChange={(event) => update("sortOrder", event.target.value)}
                />
              </Field>
            </div>

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
          { key: "question", label: "Question" },
          { key: "category", label: "Category" },
          { key: "pages", label: "Pages" },
          { key: "status", label: "Status" },
          { key: "actions", label: "" },
        ]}
        empty={
          items.length === 0 ? (
            <div>
              <EmptyState title='No FAQs here' description='Nothing matches this filter yet.' />
            </div>
          ) : null
        }
      >
        {items.map((item) => (
          <Row key={item.id}>
            <Cell className='max-w-md'>
              <span className='font-semibold'>{item.questionDe || item.questionEn}</span>
              <span className='mt-0.5 block text-[11.5px] text-[var(--adm-ink-faint)]'>{item.questionEn}</span>
            </Cell>
            <Cell className='text-[13px] text-[var(--adm-ink-muted)]'>{item.category?.nameEn || "—"}</Cell>
            <Cell className='text-[11.5px] text-[var(--adm-ink-faint)]'>{item.placements?.length || 0}</Cell>
            <Cell>
              <StatusPill tone={publishTone(item.status)}>
                {item.status === "PUBLISHED" ? "Published" : "Draft"}
              </StatusPill>
            </Cell>
            <Cell>
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => open(item)}
                  className='text-sm font-semibold text-[var(--adm-teal)] hover:text-[#CC8640]'
                >
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => remove(item)}
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
