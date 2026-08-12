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
import { TEMPLATE_VARIABLES } from "@/lib/email-templates";
import {
  deleteEmailTemplate,
  saveEmailTemplate,
} from "@/app/actions/email-template.actions";

const TEMPLATE_KEYS = [
  { value: "FIRST_REPLY", label: "First reply" },
  { value: "FOLLOW_UP", label: "Follow-up" },
  { value: "DEMO_LINK", label: "Demo link" },
  { value: "CONSULTING_REPLY", label: "Consulting reply" },
  { value: "CUSTOM", label: "Custom" },
];

const BLANK = {
  id: "",
  name: "",
  templateKey: "FIRST_REPLY",
  subjectDe: "",
  subjectEn: "",
  bodyDe: "",
  bodyEn: "",
  status: "DRAFT",
};

export default function EmailTemplateManager({ templates }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(null);
  const [locale, setLocale] = useState("de");
  const [form, setForm] = useState(BLANK);
  const [dirty, setDirty] = useState(false);

  useUnsavedChanges(dirty);

  const open = (template) => {
    setEditing(template?.id || "new");
    setForm(template ? { ...BLANK, ...template } : BLANK);
    setLocale("de");
    setDirty(false);
  };

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setDirty(true);
  };

  const submit = (event, status) => {
    event.preventDefault();

    const formData = new FormData();
    Object.entries({ ...form, status }).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.set(key, value);
    });

    startTransition(async () => {
      const result = await saveEmailTemplate(null, formData);

      if (result.success) {
        toast.success(result.msg || "Saved");
        setDirty(false);
        setEditing(null);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not save the template.");
      }
    });
  };

  const remove = (template) => {
    if (!window.confirm(`Delete the template "${template.name}"?`)) return;

    startTransition(async () => {
      const result = await deleteEmailTemplate(template.id);
      if (result.success) {
        toast.success("Template deleted");
        router.refresh();
      } else {
        toast.error(result.msg || "Could not delete the template.");
      }
    });
  };

  const subjectKey = locale === "de" ? "subjectDe" : "subjectEn";
  const bodyKey = locale === "de" ? "bodyDe" : "bodyEn";

  return (
    <div>
      <PageHeader
        eyebrow='Marketing'
        title='Email templates'
        description='Reusable bilingual replies. Every template can still be edited before it is sent.'
        actions={<AdminButton onClick={() => open(null)}>New template</AdminButton>}
      />

      <EditorSheet
        open={Boolean(editing)}
        onOpenChange={(next) => {
          if (!next) {
            setEditing(null);
            setDirty(false);
          }
        }}
        title={editing === "new" ? "New template" : "Edit template"}
        description='Reusable reply. It can still be edited before sending.'
        dirty={dirty}
        pending={pending}
        onSaveDraft={(event) => submit(event, "DRAFT")}
        onPublish={(event) => submit(event, "PUBLISHED")}
      >
        <div className='flex justify-end pb-4'>
          <LocaleTabs locale={locale} onChange={setLocale} />
        </div>

        <form className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2'>
              <Field label='Template name' required htmlFor='name'>
                <TextInput
                  id='name'
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder='First reply — demo request'
                  required
                />
              </Field>

              <Field label='Purpose' htmlFor='templateKey'>
                <SelectInput
                  id='templateKey'
                  value={form.templateKey}
                  onChange={(event) => update("templateKey", event.target.value)}
                >
                  {TEMPLATE_KEYS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>

            <Field
              label={`Subject (${locale.toUpperCase()})`}
              required
              htmlFor='subject'
              hint='Both languages must be filled in before saving.'
            >
              <TextInput
                id='subject'
                value={form[subjectKey]}
                onChange={(event) => update(subjectKey, event.target.value)}
                required
              />
            </Field>

            <Field label={`Message (${locale.toUpperCase()})`} required htmlFor='body'>
              <TextArea
                id='body'
                rows={10}
                value={form[bodyKey]}
                onChange={(event) => update(bodyKey, event.target.value)}
                required
              />
            </Field>

            <div className='rounded-[18px] border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)] p-4'>
              <p className='text-xs font-semibold uppercase tracking-wide text-[var(--adm-ink-muted)]'>
                Variables
              </p>
              <div className='mt-2 flex flex-wrap gap-2'>
                {TEMPLATE_VARIABLES.map((variable) => (
                  <button
                    key={variable.key}
                    type='button'
                    onClick={() => {
                      update(bodyKey, `${form[bodyKey]}{{${variable.key}}}`);
                    }}
                    className='rounded-full border border-[var(--adm-line-strong)] bg-white px-3 py-1 text-xs font-medium text-[var(--adm-teal)] hover:border-[var(--adm-accent)] hover:text-[var(--adm-accent-ink)]'
                  >
                    {`{{${variable.key}}}`} · {variable.label}
                  </button>
                ))}
              </div>
            </div>

          </form>
      </EditorSheet>

      <DataTable
        columns={[
          { key: "name", label: "Template" },
          { key: "purpose", label: "Purpose" },
          { key: "status", label: "Status" },
          { key: "actions", label: "" },
        ]}
        empty={
          templates.length === 0 ? (
            <div>
              <EmptyState
                title='No templates yet'
                description='Create reusable replies for demo requests, consulting enquiries and follow-ups.'
                action={<AdminButton onClick={() => open(null)}>New template</AdminButton>}
              />
            </div>
          ) : null
        }
      >
        {templates.map((template) => (
          <Row key={template.id}>
            <Cell className='font-semibold'>{template.name}</Cell>
            <Cell className='text-[13px] text-[var(--adm-ink-muted)]'>
              {TEMPLATE_KEYS.find((option) => option.value === template.templateKey)?.label ||
                "Custom"}
            </Cell>
            <Cell>
              <StatusPill tone={publishTone(template.status)}>
                {template.status === "PUBLISHED" ? "Published" : "Draft"}
              </StatusPill>
            </Cell>
            <Cell>
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => open(template)}
                  className='text-sm font-semibold text-[var(--adm-teal)] hover:text-[#CC8640]'
                >
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => remove(template)}
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
