"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createAnnouncement, updateAnnouncement } from "@/app/actions/announcement.actions";
import { ANNOUNCEMENT_PAGE_OPTIONS } from "@/lib/announcement-pages";
import MultiSelect, { SelectedTags } from "@/components/dashboard/multi-select";
import {
  AdminButton,
  Field,
  FormSection,
  LocaleTabs,
  SelectInput,
  Surface,
  TextArea,
  TextInput,
  Toggle,
} from "@/components/dashboard/admin-kit";

const initialState = { success: false, msg: "" };

const MESSAGE_LIMIT = 240;

const PAGE_OPTIONS = ANNOUNCEMENT_PAGE_OPTIONS.map((page) => ({
  value: page.key,
  label: page.label,
}));

function formatDateTimeInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
}

export default function AnnouncementForm({ announcement = null }) {
  const action = announcement ? updateAnnouncement : createAnnouncement;
  const [state, formAction, pending] = useActionState(action, initialState);

  const [locale, setLocale] = useState("de");
  const [targetMode, setTargetMode] = useState(
    announcement?.targetMode || "ALL_PAGES",
  );
  const [pages, setPages] = useState(announcement?.pageTargets || []);

  // Live preview of the message the visitor will actually see.
  const [messages, setMessages] = useState({
    de: announcement?.messageDe || "",
    en: announcement?.messageEn || "",
  });

  const isDe = locale === "de";
  const activeMessage = messages[locale];

  return (
    <form action={formAction}>
      {announcement ? <input type="hidden" name="id" value={announcement.id} /> : null}

      <Surface className='p-6 lg:p-7'>
        <FormSection
          first
          title={announcement ? "Edit banner" : "Create banner"}
          hint='A site-wide or page-targeted strip, shown above the page content.'
        >
          <div className='grid gap-5 md:grid-cols-[minmax(0,1fr)_140px]'>
            <Field label='Internal name' hint='Only visible here, never to visitors' required>
              <TextInput
                name='name'
                defaultValue={announcement?.name || ""}
                placeholder='May promo — home + pricing'
                required
              />
            </Field>

            <Field label='Priority' hint='Higher wins'>
              <TextInput
                name='priority'
                type='number'
                defaultValue={announcement?.priority ?? 0}
              />
            </Field>
          </div>
        </FormSection>

        <FormSection
          title='Message'
          hint={`Both languages are required. ${MESSAGE_LIMIT} characters each.`}
        >
          <div className='mb-4 flex items-center gap-3'>
            <LocaleTabs locale={locale} onChange={setLocale} />
            <span className='adm-num ml-auto text-[11.5px] text-[var(--adm-ink-faint)]'>
              {activeMessage.length}/{MESSAGE_LIMIT}
            </span>
          </div>

          {/* Both locales stay mounted — hiding rather than unmounting keeps the
              inactive language in the submitted FormData. */}
          <div className={isDe ? "space-y-5" : "hidden"}>
            <Field label='German message' required>
              <TextArea
                name='messageDe'
                rows={2}
                maxLength={MESSAGE_LIMIT}
                value={messages.de}
                onChange={(event) =>
                  setMessages((current) => ({ ...current, de: event.target.value }))
                }
                placeholder='Kostenlose Demo im Mai sichern.'
                required
              />
            </Field>

            <Field label='German link' hint='Optional. Relative path or full URL.'>
              <TextInput
                name='linkDe'
                defaultValue={announcement?.linkDe || ""}
                placeholder='/demo-buchen'
              />
            </Field>
          </div>

          <div className={isDe ? "hidden" : "space-y-5"}>
            <Field label='English message' required>
              <TextArea
                name='messageEn'
                rows={2}
                maxLength={MESSAGE_LIMIT}
                value={messages.en}
                onChange={(event) =>
                  setMessages((current) => ({ ...current, en: event.target.value }))
                }
                placeholder='Book your free demo in May.'
                required
              />
            </Field>

            <Field label='English link' hint='Optional. Relative path or full URL.'>
              <TextInput
                name='linkEn'
                defaultValue={announcement?.linkEn || ""}
                placeholder='/en/book-demo'
              />
            </Field>
          </div>

          {/* Preview — the one thing this form was missing: seeing the result. */}
          <div className='mt-5'>
            <p className='mb-2 text-[11.5px] font-medium text-[var(--adm-ink-faint)]'>
              Preview
            </p>
            <div className='flex items-center justify-center rounded-[var(--adm-r-md)] bg-[linear-gradient(180deg,#012E33_0%,#304C61_100%)] px-4 py-3 text-center'>
              <p className='text-[13px] font-medium text-white'>
                {activeMessage || (
                  <span className='text-white/40'>
                    Your message appears here
                  </span>
                )}
              </p>
            </div>
          </div>
        </FormSection>

        <FormSection title='Where it shows'>
          <div className='grid gap-5 md:grid-cols-2'>
            <Field label='Target mode'>
              <SelectInput
                name='targetMode'
                value={targetMode}
                onChange={(event) => setTargetMode(event.target.value)}
              >
                <option value='ALL_PAGES'>All pages</option>
                <option value='SELECTED_PAGES'>Selected pages</option>
              </SelectInput>
            </Field>

            <Field label='Frequency'>
              <SelectInput
                name='frequency'
                defaultValue={announcement?.frequency || "ALWAYS"}
              >
                <option value='ALWAYS'>Every visit</option>
                <option value='ONCE'>Once per browser</option>
                <option value='ONCE_PER_SESSION'>Once per session</option>
              </SelectInput>
            </Field>
          </div>

          {/* Only shown when it can affect anything. Thirty checkboxes on a
              site-wide banner is noise the editor cannot act on. */}
          {targetMode === "SELECTED_PAGES" ? (
            <div className='mt-5'>
              <Field label='Pages' hint='Pick the pages this banner should appear on'>
              <MultiSelect
                options={PAGE_OPTIONS}
                selected={pages}
                onChange={setPages}
                placeholder='Choose pages…'
                searchPlaceholder='Search pages…'
              />
              <SelectedTags
                options={PAGE_OPTIONS}
                selected={pages}
                onRemove={(value) =>
                  setPages(pages.filter((item) => item !== value))
                }
              />
            </Field>

              {pages.map((key) => (
                <input key={key} type='hidden' name='pageTargets' value={key} />
              ))}
            </div>
          ) : null}
        </FormSection>

        <FormSection title='Schedule' hint='Leave both empty to run until you disable it.'>
          <div className='grid gap-5 md:grid-cols-2'>
            <Field label='Start'>
              <TextInput
                name='startAt'
                type='datetime-local'
                defaultValue={formatDateTimeInput(announcement?.startAt)}
              />
            </Field>

            <Field label='End'>
              <TextInput
                name='endAt'
                type='datetime-local'
                defaultValue={formatDateTimeInput(announcement?.endAt)}
              />
            </Field>
          </div>

          <div className='mt-5 flex flex-col gap-4 sm:flex-row sm:gap-10'>
            <Toggle
              name='isEnabled'
              defaultChecked={announcement ? announcement.isEnabled : true}
              label='Enabled'
              hint='Off keeps the banner saved but hidden'
            />
            <Toggle
              name='openInNewTab'
              defaultChecked={announcement?.openInNewTab || false}
              label='Open link in a new tab'
            />
          </div>
        </FormSection>
      </Surface>

      {state?.msg ? (
        <p
          className={`mt-4 text-[13px] font-medium ${
            state.success ? "text-[var(--adm-ok)]" : "text-[var(--adm-bad)]"
          }`}
        >
          {state.msg}
        </p>
      ) : null}

      <div className='sticky bottom-4 z-20 mt-5 flex flex-wrap items-center gap-3 rounded-full border border-[var(--adm-line)] bg-white/90 px-4 py-2.5 shadow-[var(--adm-e3)] backdrop-blur-xl'>
        <span className='text-[12.5px] text-[var(--adm-ink-muted)]'>
          {targetMode === "ALL_PAGES"
            ? "Shows on every page"
            : `Shows on ${pages.length} ${pages.length === 1 ? "page" : "pages"}`}
        </span>

        <div className='ml-auto flex gap-2'>
          <AdminButton as={Link} href='/dashboard/announcements' variant='ghost'>
            Cancel
          </AdminButton>
          <AdminButton type='submit' disabled={pending}>
            {pending ? "Saving…" : announcement ? "Update banner" : "Create banner"}
          </AdminButton>
        </div>
      </div>
    </form>
  );
}
