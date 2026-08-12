import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/global/page-layout";
import GoogleTranslate from "@/components/global/GoogleTranslate";
import { getPublishedPostBySlug, listPublishedPosts } from "@/app/actions/blog.actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

function parseContent(content) {
  if (!content) return [];

  try {
    const parsed = JSON.parse(content);
    if (parsed && Array.isArray(parsed.blocks)) {
      return parsed.blocks;
    }
  } catch {}

  return String(content)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((text) => ({ type: "paragraph", data: { text } }));
}

function renderBlock(block, index) {
  if (!block) return null;

  switch (block.type) {
    case "header": {
      const level = Math.min(Math.max(block.data?.level || 2, 2), 4);
      const Tag = `h${level}`;
      return (
        <Tag
          key={index}
          className='text-[#0A1B28] font-bold leading-tight text-[28px] md:text-[40px]'
          dangerouslySetInnerHTML={{ __html: block.data?.text || "" }}
        />
      );
    }
    case "paragraph":
      return (
        <p
          key={index}
          className='text-base leading-8 text-[#393E41] md:text-[18px]'
          dangerouslySetInnerHTML={{ __html: block.data?.text || "" }}
        />
      );
    case "list": {
      const ListTag = block.data?.style === "ordered" ? "ol" : "ul";
      return (
        <ListTag
          key={index}
          className='space-y-3 pl-6 text-base leading-8 text-[#393E41] md:text-[18px]'
        >
          {(block.data?.items || []).map((item, itemIndex) => (
            <li
              key={itemIndex}
              dangerouslySetInnerHTML={{ __html: item?.content || item || "" }}
            />
          ))}
        </ListTag>
      );
    }
    case "quote":
      return (
        <blockquote
          key={index}
          className='rounded-[24px] border-l-4 border-[#CC8640] bg-[#F8FBFF] px-6 py-5'
        >
          <p
            className='text-lg font-medium italic leading-8 text-[#0A1B28]'
            dangerouslySetInnerHTML={{ __html: block.data?.text || "" }}
          />
          {block.data?.caption ? (
            <footer
              className='mt-3 text-sm font-semibold text-[#5C5E5E]'
              dangerouslySetInnerHTML={{ __html: block.data.caption }}
            />
          ) : null}
        </blockquote>
      );
    case "image":
      return (
        <figure key={index} className='space-y-3'>
          <div className='overflow-hidden rounded-[24px]'>
            <img
              src={block.data?.file?.url}
              alt={block.data?.caption || "Article image"}
              className='w-full object-cover'
            />
          </div>
          {block.data?.caption ? (
            <figcaption
              className='text-sm text-[#5C5E5E]'
              dangerouslySetInnerHTML={{ __html: block.data.caption }}
            />
          ) : null}
        </figure>
      );
    case "table":
      return (
        <div key={index} className='overflow-x-auto rounded-[20px] border border-[#E6EEF7]'>
          <table className='min-w-full border-collapse bg-white'>
            <tbody>
              {(block.data?.content || []).map((row, rowIndex) => (
                <tr key={rowIndex} className='border-b border-[#E6EEF7]'>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className='px-4 py-3 text-sm text-[#393E41]'
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "code":
      return (
        <pre
          key={index}
          className='overflow-x-auto rounded-[20px] bg-[#0A1B28] p-5 text-sm text-white'
        >
          <code>{block.data?.code || ""}</code>
        </pre>
      );
    default:
      return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const response = await getPublishedPostBySlug(id);

  if (!response.success) {
    return {};
  }

  const post = response.post;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || "CraftWise article",
    alternates: {
      canonical: post.canonicalUrl ? `/en/news/${post.canonicalUrl}` : undefined,
    },
  };
}

export default async function NewsDetailsPage({ params }) {
  const { locale, id } = await params;
  const nav = await getTranslations({ locale, namespace: "Nav" });
  const response = await getPublishedPostBySlug(id);

  if (!response.success) {
    notFound();
  }

  const relatedResponse = await listPublishedPosts(locale);
  const related = (relatedResponse.posts || [])
    .filter((post) => post.postSlug !== id)
    .slice(0, 3);

  const post = response.post;
  const blocks = parseContent(post.content);
  const ctaData = {
    title: [{ text: "Ready to see CraftWise in action?", primary: false }],
    description: "Explore how CraftWise helps trades teams stay organized from planning to invoicing.",
    primaryBtn: { text: "Start Free Trial", link: "/registration" },
    outlineBtn: { text: "Book Demo", link: "/book-demo" },
    maxWidth: "max-w-[850px]",
  };

  return (
    <PageLayout ctaData={ctaData} pageKey="/news/[id]" locale={locale}>
      <GoogleTranslate />
      <section className='sec-padding-top'>
        <div className='container'>
          <Link
            href={`/${locale}/news`}
            className='inline-flex items-center gap-2 rounded-full border border-[#E6EEF7] bg-white px-5 py-3 text-sm font-semibold text-[#304C61] transition hover:bg-[#F8FBFF]'
          >
            <ArrowLeft size={16} />
            {nav("news")}
          </Link>

          <div className='mx-auto mt-8 max-w-[1094px]'>
            <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#CC8640]'>
              CraftWise News
            </p>
            <h1 className='mt-4 text-[32px] font-bold leading-tight text-[#0A1B28] md:text-[56px]'>
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className='mt-6 max-w-[920px] text-base leading-8 text-[#393E41] md:text-[18px]'>
                {post.excerpt}
              </p>
            ) : null}

            <div className='mt-6 flex flex-wrap items-center gap-4 text-sm text-[#5C5E5E]'>
              <span>{new Date(post.createdAt).toLocaleDateString("en-GB")}</span>
              <span className='h-1 w-1 rounded-full bg-[#B6C7D6]' />
              <span>{post.author?.name || "CraftWise Team"}</span>
            </div>

            <div className='relative mt-10 aspect-[16/9] overflow-hidden rounded-[28px]'>
              <img
                src={post.bannerImage || "/images/news/news-hero.png"}
                alt={post.bannerAltText || post.title}
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='sec-padding-bottom pt-12'>
        <div className='container'>
          <div className='mx-auto max-w-[1094px]'>
            <div className='grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]'>
              <article className='space-y-6'>{blocks.map(renderBlock)}</article>

              <aside className='space-y-5'>
                <div className='rounded-[24px] border border-[#E6EEF7] bg-white p-6 shadow-[0_18px_50px_rgba(10,27,40,0.05)]'>
                  <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#CC8640]'>
                    Article Info
                  </p>
                  <div className='mt-5 space-y-4'>
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#8BA0B3]'>
                        Slug
                      </p>
                      <p className='mt-2 text-sm font-semibold text-[#0A1B28]'>
                        /news/{post.postSlug}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#8BA0B3]'>
                        Author
                      </p>
                      <p className='mt-2 text-sm font-semibold text-[#0A1B28]'>
                        {post.author?.name || "CraftWise Team"}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#8BA0B3]'>
                        Status
                      </p>
                      <p className='mt-2 text-sm font-semibold text-[#0A1B28]'>
                        {post.status}
                      </p>
                    </div>
                  </div>
                </div>

                {related.length ? (
                  <div className='rounded-[24px] border border-[#E6EEF7] bg-white p-6 shadow-[0_18px_50px_rgba(10,27,40,0.05)]'>
                    <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#CC8640]'>
                      Related News
                    </p>
                    <div className='mt-5 space-y-4'>
                      {related.map((item) => (
                        <Link
                          key={item.id}
                          href={`/${locale}/news/${item.postSlug}`}
                          className='block rounded-[18px] border border-[#EEF4FA] p-4 transition hover:border-[#CC8640]'
                        >
                          <p className='text-sm font-semibold text-[#0A1B28]'>{item.title}</p>
                          <p className='mt-2 text-sm text-[#5C5E5E]'>
                            {item.excerpt || item.metaDescription || "Read article"}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
