import Link from "next/link";
import { ArrowRight } from "lucide-react";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function News({ posts = [], locale }) {
  return (
    <section className='sec-padding-top sec-padding-bottom'>
      <div className='container'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div>
            <h2 className='mb-0'>Newest Articles</h2>
            <p className='mt-3 max-w-2xl text-base'>
              Product updates, workflow ideas and practical news from CraftWise.
            </p>
          </div>
          <div className='rounded-full border border-[#E4EFFD] bg-[#F8FBFF] px-5 py-3 text-sm font-semibold text-[#304C61]'>
            {posts.length} article{posts.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className='inner-gap grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8'>
          {posts.map((post) => (
            <article
              key={post.id}
              className='group flex flex-col overflow-hidden rounded-[16px] border border-[#1A1A1A1A] bg-white shadow-[0px_0px_18px_0px_#00000014] transition-all duration-300 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.08)]'
            >
              <div className='p-4'>
                <div className='relative aspect-[3/2] overflow-hidden rounded-[12px] border border-[#E4EFFD] bg-[#F8FBFF]'>
                  <img
                    src={post.bannerImage || "/images/news/news-hero.png"}
                    alt={post.bannerAltText || post.title}
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
              </div>

              <div className='flex flex-grow flex-col p-6 pt-2'>
                <span className='mb-3 text-[14px] text-[#5C5E5E]'>
                  {formatDate(post.createdAt)}
                </span>
                <h4 className='mb-3 text-[20px] font-bold leading-tight text-text-secondary'>
                  {post.title}
                </h4>
                <p className='mb-4 line-clamp-3 flex-grow text-[16px] leading-relaxed md:mb-6'>
                  {post.excerpt || post.metaDescription || "Read the full update from CraftWise."}
                </p>
                <Link
                  href={`/${locale}/news/${post.postSlug}`}
                  className='inline-flex items-center gap-2 text-[16px] font-semibold text-primary transition-all hover:gap-3'
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {!posts.length ? (
          <div className='inner-gap rounded-[20px] border border-dashed border-[#D8E4F0] bg-white p-8 text-center'>
            <p>No published articles yet.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
