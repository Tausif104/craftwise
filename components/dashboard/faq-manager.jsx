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
  ReorderCell,
  Row,
  SelectInput,
  StatusPill,
  Surface,
  TextArea,
  TextInput,
  publishTone,
  useReorderable,
  useUnsavedChanges,
} from "@/components/dashboard/admin-kit";
import EditorSheet from "@/components/dashboard/editor-sheet";
import MultiSelect, { SelectedTags } from "@/components/dashboard/multi-select";
import { ANNOUNCEMENT_PAGE_OPTIONS } from "@/lib/announcement-pages";

const PAGE_OPTIONS = ANNOUNCEMENT_PAGE_OPTIONS.map((page) => ({
  value: page.key,
  label: page.label,
}));
import {
  deleteFaqCategory,
  deleteFaqItem,
  reorderFaqItems,
  saveFaqCategory,
  saveFaqItem,
} from "@/app/actions/content.actions";

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

const BLANK_CATEGORY = { id: "", key: "", nameDe: "", nameEn: "", sortOrder: 0 };

export default function FaqManager({
  items,
  categories,
  pageFilter = "",
  categoryFilter = "",
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(null);
  const [locale, setLocale] = useState("de");
  const [form, setForm] = useState(BLANK);
  const [pageKeys, setPageKeys] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState(BLANK_CATEGORY);
  const [categoryDirty, setCategoryDirty] = useState(false);
  const { order, move, reordering } = useReorderable(items, reorderFaqItems);

  useUnsavedChanges(dirty || categoryDirty);

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

  const editingPublished = editing && editing !== "new" && form.status === "PUBLISHED";

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

  const applyFilter = (key, value) => {
    const params = new URLSearchParams();
    const next = { page: pageFilter, category: categoryFilter, [key]: value };

    Object.entries(next).forEach(([name, entry]) => {
      if (entry) params.set(name, entry);
    });

    const query = params.toString();
    router.push(query ? `/dashboard/faqs?${query}` : "/dashboard/faqs");
  };

  /* --- categories: the sections the public FAQ page is split into --- */

  const openCategory = (category) => {
    setEditingCategory(category?.id || "new");
    setCategoryForm(category ? { ...BLANK_CATEGORY, ...category } : BLANK_CATEGORY);
    setCategoryDirty(false);
  };

  const updateCategory = (key, value) => {
    setCategoryForm((current) => ({ ...current, [key]: value }));
    setCategoryDirty(true);
  };

  const submitCategory = () => {
    const formData = new FormData();

    Object.entries(categoryForm).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.set(key, value);
    });

    startTransition(async () => {
      const result = await saveFaqCategory(null, formData);

      if (result.success) {
        toast.success(result.msg);
        setCategoryDirty(false);
        setEditingCategory(null);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not save the category.");
      }
    });
  };

  const removeCategory = (category) => {
    if (
      !window.confirm(
        `Delete the "${category.nameEn}" section? Its questions stay on the website but become uncategorised.`,
      )
    )
      return;

    startTransition(async () => {
      const result = await deleteFaqCategory(category.id);
      if (result.success) {
        toast.success(result.msg);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not delete the category.");
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
        actions={
          <div className='flex gap-2'>
            <AdminButton variant='outline' onClick={() => openCategory(null)}>
              New section
            </AdminButton>
            <AdminButton onClick={() => open(null)}>New FAQ</AdminButton>
          </div>
        }
      />

      <Surface className='mb-5 p-4'>
        <div className='flex items-center gap-3'>
          <Eyebrow>FAQ page sections</Eyebrow>
          <span className='text-[12px] text-[var(--adm-ink-muted)]'>
            Each section is a category tab on the FAQ page, in this order.
          </span>
        </div>

        {categories.length === 0 ? (
          <p className='mt-3 text-[13px] text-[var(--adm-ink-muted)]'>
            No sections yet — every question lands in one unnamed group. Add a
            section to split the FAQ page up.
          </p>
        ) : (
          <div className='mt-3 flex flex-wrap gap-2'>
            {categories.map((category) => (
              <span
                key={category.id}
                className='inline-flex items-center gap-2 rounded-full border border-[var(--adm-line)] bg-white py-1 pl-3 pr-1.5 text-[13px]'
              >
                <span className='font-semibold text-[var(--adm-ink)]'>{category.nameDe}</span>
                <span className='text-[var(--adm-ink-faint)]'>{category.nameEn}</span>
                <button
                  type='button'
                  onClick={() => openCategory(category)}
                  className='rounded-full px-2 py-0.5 text-[12px] font-semibold text-[var(--adm-teal)] hover:bg-[var(--adm-surface-sunken)]'
                >
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => removeCategory(category)}
                  className='rounded-full px-2 py-0.5 text-[12px] font-semibold text-[var(--adm-bad)] hover:bg-[var(--adm-bad-wash)]'
                >
                  Delete
                </button>
              </span>
            ))}
          </div>
        )}
      </Surface>

      <EditorSheet
        open={Boolean(editingCategory)}
        onOpenChange={(next) => {
          if (!next) {
            setEditingCategory(null);
            setCategoryDirty(false);
          }
        }}
        title={editingCategory === "new" ? "New FAQ section" : "Edit FAQ section"}
        description='Sections become the category tabs on the public FAQ page.'
        dirty={categoryDirty}
        pending={pending}
        saveLabel='Save section'
        onSaveDraft={submitCategory}
      >
        <div className='space-y-4'>
          <Field label='Section name (DE)' required>
            <TextInput
              value={categoryForm.nameDe}
              onChange={(event) => updateCategory("nameDe", event.target.value)}
              placeholder='Erste Schritte'
            />
          </Field>

          <Field label='Section name (EN)' required>
            <TextInput
              value={categoryForm.nameEn}
              onChange={(event) => updateCategory("nameEn", event.target.value)}
              placeholder='Getting started'
            />
          </Field>

          <div className='grid gap-4 md:grid-cols-2'>
            <Field label='Key' hint='Left empty it is derived from the English name'>
              <TextInput
                value={categoryForm.key}
                onChange={(event) => updateCategory("key", event.target.value)}
                placeholder='getting-started'
              />
            </Field>

            <Field label='Order' hint='Lower shows first on the FAQ page'>
              <TextInput
                type='number'
                value={categoryForm.sortOrder}
                onChange={(event) => updateCategory("sortOrder", event.target.value)}
              />
            </Field>
          </div>
        </div>
      </EditorSheet>

      <Surface className='mb-5 p-4'>
        <div className='grid gap-3 sm:grid-cols-2'>
          <SelectInput
            value={pageFilter}
            onChange={(event) => applyFilter("page", event.target.value)}
            aria-label='Filter by page'
          >
            <option value=''>All pages</option>
            {ANNOUNCEMENT_PAGE_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </SelectInput>

          <SelectInput
            value={categoryFilter}
            onChange={(event) => applyFilter("category", event.target.value)}
            aria-label='Filter by section'
          >
            <option value=''>All sections</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameEn}
              </option>
            ))}
            <option value='none'>Without a section</option>
          </SelectInput>
        </div>
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
        saveLabel={editingPublished ? "Save changes" : "Save draft"}
        publishLabel={editingPublished ? "Save & publish" : "Publish"}
        footerNote={editingPublished && !dirty ? "Live on the website" : undefined}
        onSaveDraft={() => submit(editingPublished ? "KEEP" : "DRAFT")}
        onPublish={() => submit("PUBLISHED")}
        onUnpublish={
          editingPublished
            ? () => {
                if (!window.confirm("Take this question off the website?")) return;
                submit("DRAFT");
              }
            : undefined
        }
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

              <Field label='Order' hint='Lower shows first — or use the arrows in the list'>
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
          { key: "order", label: "Order" },
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
        {order.map((item, index) => (
          <Row key={item.id}>
            <Cell>
              <ReorderCell
                index={index}
                total={order.length}
                onMove={move}
                disabled={reordering}
              />
            </Cell>
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
