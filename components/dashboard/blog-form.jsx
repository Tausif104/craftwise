"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createPost, updatePost } from "@/app/actions/blog.actions";
import { formatToSlug } from "@/lib/utils";

const BlogEditor = dynamic(() => import("@/components/dashboard/blog-editor"), {
  ssr: false,
});

const META_TITLE_MAX = 160;
const META_DESC_MAX = 200;

const emptyEditorContent = {
  time: Date.now(),
  blocks: [],
  version: "2.31.0",
};

const emptyPost = {
  id: "",
  title: "",
  postSlug: "",
  excerpt: "",
  bannerImage: "/images/news/news-hero.png",
  bannerAltText: "",
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  content: emptyEditorContent,
  status: "APPROVED",
};

function parseEditorContent(content) {
  if (!content) return emptyEditorContent;
  if (typeof content === "object" && content.blocks) return content;

  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.blocks)) {
      return parsed;
    }
  } catch {}

  return {
    ...emptyEditorContent,
    blocks: String(content)
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((text) => ({
        type: "paragraph",
        data: { text },
      })),
  };
}

export default function BlogForm({ mode = "create", initialPost, canPublish = true }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const source = initialPost || emptyPost;
  const fileInputRef = useRef(null);
  const [slugEdited, setSlugEdited] = useState(Boolean(source.postSlug));
  const [canonicalEdited, setCanonicalEdited] = useState(
    Boolean(source.canonicalUrl)
  );

  const [form, setForm] = useState({
    id: source.id || "",
    title: source.title || "",
    postSlug: source.postSlug || "",
    excerpt: source.excerpt || "",
    bannerImage: source.bannerImage || "/images/news/news-hero.png",
    bannerAltText: source.bannerAltText || "",
    metaTitle: source.metaTitle || "",
    metaDescription: source.metaDescription || "",
    canonicalUrl: source.canonicalUrl || "",
    content: parseEditorContent(source.content),
  });
  const [message, setMessage] = useState("");
  const [uploadingBanner, setUploadingBanner] = useState(false);

  const previewSlug = useMemo(
    () => formatToSlug(form.postSlug || form.title),
    [form.postSlug, form.title]
  );

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "title"
        ? {
            postSlug: slugEdited ? prev.postSlug : formatToSlug(value),
            canonicalUrl: canonicalEdited
              ? prev.canonicalUrl
              : formatToSlug(value),
          }
        : {}),
    }));
  }, [canonicalEdited, slugEdited]);

  const handleEditorChange = useCallback(
    (content) => updateField("content", content),
    [updateField]
  );

  const handleBannerUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingBanner(true);

    try {
      const body = new FormData();
      body.append("image", file);
      body.append("folderName", "craftwise/blogs");

      const response = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      updateField("bannerImage", data.url || "/images/news/news-hero.png");
    } catch (error) {
      console.error(error);
      setMessage("Banner upload failed.");
    } finally {
      setUploadingBanner(false);
    }
  };

  const submit = (status) => {
    setMessage("");

    if (!form.title.trim()) {
      setMessage("Blog title is required.");
      return;
    }

    if (!previewSlug) {
      setMessage("Post slug is required.");
      return;
    }

    if (!form.content?.blocks?.length) {
      setMessage("Blog content is required.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      if (form.id) formData.append("id", form.id);
      formData.append("title", form.title.trim());
      formData.append("postSlug", previewSlug);
      formData.append("excerpt", form.excerpt);
      formData.append("bannerImage", form.bannerImage);
      formData.append("bannerAltText", form.bannerAltText);
      formData.append("metaTitle", form.metaTitle);
      formData.append("metaDescription", form.metaDescription);
      formData.append(
        "canonicalUrl",
        formatToSlug(form.canonicalUrl || form.postSlug || form.title)
      );
      formData.append("content", JSON.stringify(form.content));
      formData.append("status", status);

      const result =
        mode === "edit"
          ? await updatePost(null, formData)
          : await createPost(null, formData);

      if (!result?.success) {
        setMessage(result?.msg || "Failed to save post.");
        return;
      }

      router.push("/dashboard/blog");
      router.refresh();
    });
  };

  return (
    <div className='grid gap-8 xl:grid-cols-[1.1fr_0.9fr]'>
      <div className='space-y-6'>
        <div className='rounded-[28px] border border-[var(--adm-line)] bg-white p-6 shadow-[0_18px_50px_rgba(10,27,40,0.05)]'>
          <div className='mb-6 space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#CC8640]'>
              Content
            </p>
            <h2 className='text-[34px] font-bold text-[var(--adm-ink)]'>
              {mode === "edit" ? "Edit blog" : "Add blog"}
            </h2>
          </div>

          <div className='space-y-5'>
            <Field label='Blog title'>
              <input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                className='field-input'
                placeholder='Write the article title'
              />
            </Field>

            <Field label='Slug'>
              <input
                value={form.postSlug}
                onChange={(event) => {
                  setSlugEdited(true);
                  updateField("postSlug", formatToSlug(event.target.value));
                }}
                className='field-input'
                placeholder='article-slug'
              />
            </Field>

            <Field label='Excerpt'>
              <textarea
                value={form.excerpt}
                onChange={(event) => updateField("excerpt", event.target.value)}
                className='field-input min-h-[120px] resize-y'
                placeholder='Short summary for the news list'
              />
            </Field>

            <Field label='Article content'>
              <BlogEditor value={form.content} onChange={handleEditorChange} />
            </Field>
          </div>
        </div>
      </div>

      <div className='space-y-6'>
        <div className='rounded-[28px] border border-[var(--adm-line)] bg-white p-6 shadow-[0_18px_50px_rgba(10,27,40,0.05)]'>
          <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#CC8640]'>
            Media & SEO
          </p>
          <div className='mt-6 space-y-5'>
            <Field label='Banner image'>
              <div className='space-y-3'>
                <button
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                  className='rounded-full border border-[var(--adm-line-strong)] px-4 py-3 text-sm font-semibold text-[var(--adm-teal)] transition hover:bg-[var(--adm-surface-sunken)]'
                >
                  {uploadingBanner ? "Uploading..." : "Upload to Cloudinary"}
                </button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleBannerUpload}
                />
                <input
                  value={form.bannerImage}
                  onChange={(event) => updateField("bannerImage", event.target.value)}
                  className='field-input'
                  placeholder='https://...'
                />
              </div>
            </Field>

            <div className='overflow-hidden rounded-[22px] border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)]'>
              <img
                src={form.bannerImage || "/images/news/news-hero.png"}
                alt={form.bannerAltText || form.title || "Preview"}
                className='h-[240px] w-full object-cover'
              />
            </div>

            <Field label='Banner alt text'>
              <input
                value={form.bannerAltText}
                onChange={(event) => updateField("bannerAltText", event.target.value)}
                className='field-input'
                placeholder='Describe the banner image'
              />
            </Field>

            <Field label='Meta title'>
              <input
                value={form.metaTitle}
                onChange={(event) =>
                  updateField("metaTitle", event.target.value.slice(0, META_TITLE_MAX))
                }
                className='field-input'
                placeholder='SEO title'
              />
              <div className='text-right text-xs text-[#8BA0B3]'>
                {form.metaTitle.length}/{META_TITLE_MAX}
              </div>
            </Field>

            <Field label='Meta description'>
              <textarea
                value={form.metaDescription}
                onChange={(event) =>
                  updateField(
                    "metaDescription",
                    event.target.value.slice(0, META_DESC_MAX)
                  )
                }
                className='field-input min-h-[120px] resize-y'
                placeholder='SEO description'
              />
              <div className='text-right text-xs text-[#8BA0B3]'>
                {form.metaDescription.length}/{META_DESC_MAX}
              </div>
            </Field>

            <Field label='Canonical URL'>
              <input
                value={form.canonicalUrl}
                onChange={(event) => {
                  setCanonicalEdited(true);
                  updateField("canonicalUrl", formatToSlug(event.target.value));
                }}
                className='field-input'
                placeholder='canonical-path'
              />
            </Field>
          </div>
        </div>

        <div className='rounded-[28px] border border-[var(--adm-line)] bg-white p-6 shadow-[0_18px_50px_rgba(10,27,40,0.05)]'>
          <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#CC8640]'>
            Publish
          </p>
          <div className='mt-5 rounded-[22px] bg-[var(--adm-surface-sunken)] p-5'>
            <p className='text-[13px] text-[var(--adm-ink-muted)]'>Public URL slug</p>
            <p className='mt-2 text-lg font-semibold text-[var(--adm-ink)]'>
              /news/{previewSlug}
            </p>
            {!canPublish && mode === "create" ? (
              <p className='mt-3 text-[13px] text-[var(--adm-ink-muted)]'>
                Author submissions are saved for admin review before publishing.
              </p>
            ) : null}
          </div>

          {message ? <p className='mt-5 text-sm text-red-600'>{message}</p> : null}

          <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
            <button
              type='button'
              onClick={() => submit("DRAFT")}
              disabled={isPending || uploadingBanner}
              className='flex-1 rounded-full border border-[var(--adm-line-strong)] px-5 py-3 text-sm font-semibold text-[var(--adm-teal)] transition hover:bg-[var(--adm-surface-sunken)] disabled:opacity-70'
            >
              {isPending ? (
                <span className='inline-flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Saving...
                </span>
              ) : (
                "Save Draft"
              )}
            </button>
            <button
              type='button'
              onClick={() => submit("APPROVED")}
              disabled={isPending || uploadingBanner}
              className='flex-1 rounded-full bg-[#CC8640] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b77431] disabled:opacity-70'
            >
              {isPending ? (
                <span className='inline-flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Publishing...
                </span>
              ) : mode === "edit" ? (
                "Update Blog"
              ) : !canPublish ? (
                "Submit for Review"
              ) : (
                "Publish Blog"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className='block space-y-2'>
      <span className='text-sm font-semibold text-[var(--adm-teal)]'>{label}</span>
      {children}
    </div>
  );
}
