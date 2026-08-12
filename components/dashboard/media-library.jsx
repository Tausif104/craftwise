"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AdminButton,
  EmptyState,
  Eyebrow,
  Field,
  PageHeader,
  SelectInput,
  Surface,
  TextInput,
} from "@/components/dashboard/admin-kit";
import {
  checkMediaUsage,
  deleteMediaAsset,
  updateMediaAsset,
} from "@/app/actions/media.actions";

function formatBytes(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function MediaLibrary({ assets, folders, filters }) {
  const router = useRouter();
  const fileInput = useRef(null);
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState(filters.search);

  const applyFilter = (key, value) => {
    const params = new URLSearchParams();
    if (key === "q" ? value : filters.search) params.set("q", key === "q" ? value : filters.search);
    if (key === "folder" ? value : filters.folder)
      params.set("folder", key === "folder" ? value : filters.folder);
    router.push(`/dashboard/media?${params.toString()}`);
  };

  const handleUpload = async (event) => {
    const files = [...(event.target.files || [])];
    if (!files.length) return;

    setUploading(true);

    for (const file of files) {
      const body = new FormData();
      body.set("image", file);
      body.set("folderName", "craftwise/media");

      try {
        const response = await fetch("/api/upload", { method: "POST", body });
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.msg || `Could not upload ${file.name}`);
        } else {
          toast.success(`Uploaded ${file.name}`);
        }
      } catch {
        toast.error(`Could not upload ${file.name}`);
      }
    }

    setUploading(false);
    if (fileInput.current) fileInput.current.value = "";
    router.refresh();
  };

  const saveDetails = (asset, formData) => {
    startTransition(async () => {
      const result = await updateMediaAsset(asset.id, formData);
      if (result.success) {
        toast.success(result.msg);
        setSelected(null);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not save.");
      }
    });
  };

  const remove = (asset) => {
    startTransition(async () => {
      const usageCheck = await checkMediaUsage(asset.id);

      if (usageCheck.success && usageCheck.usage.length) {
        const list = usageCheck.usage
          .slice(0, 5)
          .map((item) => `• ${item.type}: ${item.label}`)
          .join("\n");

        const proceed = window.confirm(
          `This image is still used in ${usageCheck.usage.length} place(s):\n\n${list}\n\nDeleting it will break those. Delete anyway?`,
        );

        if (!proceed) return;
      } else if (!window.confirm(`Delete ${asset.fileName}?`)) {
        return;
      }

      const result = await deleteMediaAsset(asset.id, { force: true });

      if (result.success) {
        toast.success(result.msg);
        setSelected(null);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not delete.");
      }
    });
  };

  return (
    <div>
      <PageHeader
        eyebrow='Content'
        title='Media library'
        description='Images used across the website, with alt text and usage tracking.'
        actions={
          <>
            <input
              ref={fileInput}
              type='file'
              accept='image/*'
              multiple
              onChange={handleUpload}
              className='hidden'
              id='media-upload'
            />
            <AdminButton
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
            >
              {uploading ? "Uploading…" : "Upload images"}
            </AdminButton>
          </>
        }
      />

      <Surface className='mb-5 p-4'>
        <div className='flex flex-col gap-3 md:flex-row'>
          <form
            className='flex-1'
            onSubmit={(event) => {
              event.preventDefault();
              applyFilter("q", search);
            }}
          >
            <TextInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder='Search file name or alt text'
              aria-label='Search media'
            />
          </form>

          <SelectInput
            className='md:w-64'
            value={filters.folder}
            onChange={(event) => applyFilter("folder", event.target.value)}
            aria-label='Filter by folder'
          >
            <option value=''>All folders</option>
            {folders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </SelectInput>
        </div>
      </Surface>

      {assets.length === 0 ? (
        <EmptyState
          title='No media yet'
          description='Upload images here, or they will be catalogued automatically the next time you add one to an article.'
          action={
            <AdminButton onClick={() => fileInput.current?.click()}>Upload images</AdminButton>
          }
        />
      ) : (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4'>
          {assets.map((asset) => (
            <button
              key={asset.id}
              type='button'
              onClick={() => setSelected(asset)}
              className='group overflow-hidden rounded-[20px] border border-[var(--adm-line)] bg-white text-left transition hover:border-[var(--adm-accent)]'
            >
              <div className='aspect-[4/3] overflow-hidden bg-[var(--adm-surface-sunken)]'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.url}
                  alt={asset.altTextEn || asset.altTextDe || asset.fileName}
                  className='h-full w-full object-cover transition group-hover:scale-[1.03]'
                  loading='lazy'
                />
              </div>
              <div className='p-3'>
                <p className='truncate text-sm font-semibold text-[var(--adm-ink)]'>
                  {asset.fileName}
                </p>
                <p className='mt-0.5 text-[11.5px] text-[var(--adm-ink-faint)]'>
                  {asset.width && asset.height ? `${asset.width}×${asset.height} · ` : ""}
                  {formatBytes(asset.bytes)}
                </p>
                {!asset.altTextDe && !asset.altTextEn ? (
                  <p className='mt-1 text-xs font-medium text-[#B06823]'>No alt text</p>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      )}

      {selected ? (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <button
            type='button'
            aria-label='Close'
            onClick={() => setSelected(null)}
            className='absolute inset-0 bg-[#0A1B28]/60 backdrop-blur-sm'
          />

          <Surface className='relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto'>
            <Eyebrow>Media details</Eyebrow>

            <div className='mt-3 overflow-hidden rounded-[18px] border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)]'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.url}
                alt={selected.altTextEn || selected.fileName}
                className='max-h-64 w-full object-contain'
              />
            </div>

            <form
              className='mt-4 space-y-4'
              onSubmit={(event) => {
                event.preventDefault();
                saveDetails(selected, new FormData(event.currentTarget));
              }}
            >
              <Field label='File name'>
                <TextInput name='fileName' defaultValue={selected.fileName} />
              </Field>

              <div className='grid gap-4 md:grid-cols-2'>
                <Field label='Alt text (DE)' hint='Describes the image for screen readers'>
                  <TextInput name='altTextDe' defaultValue={selected.altTextDe || ""} />
                </Field>
                <Field label='Alt text (EN)'>
                  <TextInput name='altTextEn' defaultValue={selected.altTextEn || ""} />
                </Field>
              </div>

              <Field label='URL' hint='Paste this where you need the image'>
                <TextInput readOnly value={selected.url} onFocus={(e) => e.target.select()} />
              </Field>

              <div className='flex flex-wrap justify-end gap-2'>
                <AdminButton variant='danger' type='button' onClick={() => remove(selected)}>
                  Delete
                </AdminButton>
                <AdminButton variant='ghost' type='button' onClick={() => setSelected(null)}>
                  Close
                </AdminButton>
                <AdminButton type='submit' disabled={pending}>
                  {pending ? "Saving…" : "Save details"}
                </AdminButton>
              </div>
            </form>
          </Surface>
        </div>
      ) : null}
    </div>
  );
}
