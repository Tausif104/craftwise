"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
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
  StatusPill,
  Surface,
  TextArea,
  TextInput,
  publishTone,
  useUnsavedChanges,
} from "@/components/dashboard/admin-kit";
import EditorSheet from "@/components/dashboard/editor-sheet";
import { deletePricingPlan, savePricingPlan } from "@/app/actions/content.actions";

const BLANK = {
  id: "",
  planKey: "",
  nameDe: "",
  nameEn: "",
  descriptionDe: "",
  descriptionEn: "",
  monthlyPrice: 0,
  annualPrice: 0,
  ctaLabelDe: "",
  ctaLabelEn: "",
  ctaHref: "",
  isPopular: false,
  sortOrder: 0,
  status: "DRAFT",
  features: [],
};

export default function PricingManager({ plans }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(null);
  const [locale, setLocale] = useState("de");
  const [form, setForm] = useState(BLANK);
  const [dirty, setDirty] = useState(false);

  useUnsavedChanges(dirty);

  const open = (plan) => {
    setEditing(plan?.id || "new");
    setForm(
      plan
        ? {
            ...BLANK,
            ...plan,
            monthlyPrice: Number(plan.monthlyPrice),
            annualPrice: Number(plan.annualPrice),
            features: plan.features || [],
          }
        : { ...BLANK, sortOrder: plans.length },
    );
    setLocale("de");
    setDirty(false);
  };

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setDirty(true);
  };

  const updateFeature = (index, key, value) => {
    setForm((current) => {
      const features = [...current.features];
      features[index] = { ...features[index], [key]: value };
      return { ...current, features };
    });
    setDirty(true);
  };

  const addFeature = () => {
    setForm((current) => ({
      ...current,
      features: [...current.features, { labelDe: "", labelEn: "" }],
    }));
    setDirty(true);
  };

  const removeFeature = (index) => {
    setForm((current) => ({
      ...current,
      features: current.features.filter((_, i) => i !== index),
    }));
    setDirty(true);
  };

  // Editing something that is already live: Save must keep it live (KEEP), and
  // taking it off the website has to be a deliberate, separate action.
  const editingPublished = editing && editing !== "new" && form.status === "PUBLISHED";

  const submit = (status) => {
    const formData = new FormData();

    Object.entries({ ...form, status }).forEach(([key, value]) => {
      if (key === "features") return;
      if (typeof value === "boolean") formData.set(key, value ? "on" : "");
      else if (value !== null && value !== undefined) formData.set(key, value);
    });

    formData.set("features", JSON.stringify(form.features));

    startTransition(async () => {
      const result = await savePricingPlan(null, formData);

      if (result.success) {
        toast.success(result.msg);
        setDirty(false);
        setEditing(null);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not save the plan.");
      }
    });
  };

  const remove = (plan) => {
    if (!window.confirm(`Delete the "${plan.nameEn}" plan? This cannot be undone.`)) return;

    startTransition(async () => {
      const result = await deletePricingPlan(plan.id);
      if (result.success) {
        toast.success("Plan deleted");
        router.refresh();
      } else {
        toast.error(result.msg || "Could not delete the plan.");
      }
    });
  };

  const suffix = locale === "de" ? "De" : "En";

  return (
    <div>
      <PageHeader
        eyebrow='Content'
        title='Pricing & plans'
        description='Prices update everywhere they appear on the website — no code release needed.'
        actions={<AdminButton onClick={() => open(null)}>New plan</AdminButton>}
      />

      {plans.length && !plans.some((plan) => plan.status === "PUBLISHED") ? (
        <div className='adm-rise mb-5 rounded-[var(--adm-r-lg)] border border-[#F3C4C0] bg-[var(--adm-bad-wash)] px-4 py-3 text-[13px] leading-relaxed text-[var(--adm-bad)]'>
          No plan is published, so the pricing page is showing the built-in
          fallback prices instead of the ones below. Publish at least one plan to
          take control of the page.
        </div>
      ) : null}

      <EditorSheet
        open={Boolean(editing)}
        onOpenChange={(next) => {
          if (!next) {
            setEditing(null);
            setDirty(false);
          }
        }}
        title={editing === "new" ? "New plan" : "Edit plan"}
        description='Changes apply everywhere this plan appears on the website.'
        dirty={dirty}
        pending={pending}
        saveLabel={editingPublished ? "Save changes" : "Save draft"}
        publishLabel={editingPublished ? "Save & publish" : "Publish"}
        footerNote={
          editingPublished && !dirty ? "Live on the website" : undefined
        }
        onSaveDraft={() => submit(editingPublished ? "KEEP" : "DRAFT")}
        onPublish={() => submit("PUBLISHED")}
        onUnpublish={
          editingPublished
            ? () => {
                if (
                  !window.confirm(
                    "Take this plan off the website? Visitors will stop seeing it until you publish it again.",
                  )
                )
                  return;
                submit("DRAFT");
              }
            : undefined
        }
      >
        <div className='flex justify-end pb-4'>
          <LocaleTabs locale={locale} onChange={setLocale} />
        </div>

        <div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Field label='Plan key' hint='Stable identifier, e.g. office' required>
              <TextInput
                value={form.planKey}
                onChange={(event) => update("planKey", event.target.value)}
                placeholder='office'
              />
            </Field>

            <Field label={`Plan name (${locale.toUpperCase()})`} required>
              <TextInput
                value={form[`name${suffix}`]}
                onChange={(event) => update(`name${suffix}`, event.target.value)}
              />
            </Field>

            <Field label={`Description (${locale.toUpperCase()})`}>
              <TextInput
                value={form[`description${suffix}`] || ""}
                onChange={(event) => update(`description${suffix}`, event.target.value)}
              />
            </Field>

            <Field label={`Button label (${locale.toUpperCase()})`}>
              <TextInput
                value={form[`ctaLabel${suffix}`] || ""}
                onChange={(event) => update(`ctaLabel${suffix}`, event.target.value)}
              />
            </Field>

            <Field label='Monthly price (€)' required>
              <TextInput
                type='number'
                step='0.01'
                min='0'
                value={form.monthlyPrice}
                onChange={(event) => update("monthlyPrice", event.target.value)}
              />
            </Field>

            <Field label='Annual price (€ per month)' required>
              <TextInput
                type='number'
                step='0.01'
                min='0'
                value={form.annualPrice}
                onChange={(event) => update("annualPrice", event.target.value)}
              />
            </Field>

            <Field label='Button link'>
              <TextInput
                value={form.ctaHref || ""}
                onChange={(event) => update("ctaHref", event.target.value)}
                placeholder='/registration'
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

          <label className='mt-3 flex items-center gap-2 text-sm font-medium text-[var(--adm-ink)]'>
            <input
              type='checkbox'
              checked={form.isPopular}
              onChange={(event) => update("isPopular", event.target.checked)}
              className='h-4 w-4 accent-[var(--adm-accent)]'
            />
            Highlight as the recommended plan
          </label>

          <div className='mt-5'>
            <div className='flex items-center gap-3'>
              <Eyebrow>Included features</Eyebrow>
              <AdminButton variant='ghost' className='ml-auto px-3 py-1' onClick={addFeature}>
                Add feature
              </AdminButton>
            </div>

            <div className='mt-3 space-y-2'>
              {form.features.length === 0 ? (
                <p className='text-[13px] text-[var(--adm-ink-muted)]'>No features listed yet.</p>
              ) : (
                form.features.map((feature, index) => (
                  <div key={index} className='flex gap-2'>
                    <TextInput
                      value={feature[`label${suffix}`] || ""}
                      onChange={(event) =>
                        updateFeature(index, `label${suffix}`, event.target.value)
                      }
                      placeholder={`Feature in ${locale.toUpperCase()}`}
                    />
                    <button
                      type='button'
                      onClick={() => removeFeature(index)}
                      aria-label='Remove feature'
                      className='shrink-0 rounded-[16px] border border-[#F3C4C0] px-3 text-[#B42318] hover:bg-[#FDECEC]'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </EditorSheet>

      <DataTable
        columns={[
          { key: "name", label: "Plan" },
          { key: "monthly", label: "Monthly" },
          { key: "annual", label: "Annual" },
          { key: "features", label: "Features" },
          { key: "status", label: "Status" },
          { key: "actions", label: "" },
        ]}
        empty={
          plans.length === 0 ? (
            <div>
              <EmptyState
                title='No plans yet'
                description='Run the content seed or create your first plan.'
                action={<AdminButton onClick={() => open(null)}>New plan</AdminButton>}
              />
            </div>
          ) : null
        }
      >
        {plans.map((plan) => (
          <Row key={plan.id}>
            <Cell>
              <span className='font-semibold'>{plan.nameEn}</span>
              <span className='ml-2 text-[13px] text-[var(--adm-ink-muted)]'>{plan.nameDe}</span>
              {plan.isPopular ? (
                <span className='ml-2 rounded-full bg-[var(--adm-warn-wash)] px-2 py-0.5 text-[10.5px] font-bold text-[var(--adm-warn)]'>
                  Popular
                </span>
              ) : null}
            </Cell>
            <Cell>€{Number(plan.monthlyPrice).toFixed(2)}</Cell>
            <Cell>€{Number(plan.annualPrice).toFixed(2)}</Cell>
            <Cell className='text-[13px] text-[var(--adm-ink-muted)]'>{plan.features?.length ?? 0}</Cell>
            <Cell>
              <StatusPill tone={publishTone(plan.status)}>
                {plan.status === "PUBLISHED" ? "Published" : "Draft"}
              </StatusPill>
            </Cell>
            <Cell>
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => open(plan)}
                  className='text-sm font-semibold text-[var(--adm-teal)] hover:text-[#CC8640]'
                >
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => remove(plan)}
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
