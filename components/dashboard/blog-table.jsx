"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deletePost } from "@/app/actions/blog.actions";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogTable({ posts, isAdmin }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id) => {
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) return;

    startTransition(async () => {
      const result = await deletePost(id);
      if (result?.success) {
        router.refresh();
      }
    });
  };

  return (
    <div className='overflow-hidden rounded-[28px] border border-[var(--adm-line)] bg-white shadow-[0_18px_50px_rgba(10,27,40,0.05)]'>
      <div className='overflow-x-auto'>
        <table className='min-w-full border-separate border-spacing-0'>
          <thead>
            <tr className='bg-[var(--adm-surface-sunken)] text-left text-sm font-semibold text-[var(--adm-teal)]'>
              <th className='px-6 py-4'>Title</th>
              <th className='px-6 py-4'>Author</th>
              <th className='px-6 py-4'>Status</th>
              <th className='px-6 py-4'>Published</th>
              <th className='px-6 py-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className='border-t border-[var(--adm-line)] align-top'>
                <td className='px-6 py-5'>
                  <p className='font-semibold text-[var(--adm-ink)]'>{post.title}</p>
                  <p className='mt-1 text-[13px] text-[var(--adm-ink-muted)]'>/{post.postSlug}</p>
                </td>
                <td className='px-6 py-5 text-[13px] text-[var(--adm-ink-muted)]'>
                  {post.author?.name || post.author?.email || "Unknown"}
                </td>
                <td className='px-6 py-5'>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      post.status === "APPROVED"
                        ? "bg-[#E9F9EF] text-[#217A39]"
                        : "bg-[#FFF1E2] text-[#B06823]"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className='px-6 py-5 text-[13px] text-[var(--adm-ink-muted)]'>
                  {formatDate(post.createdAt)}
                </td>
                <td className='px-6 py-5'>
                  <div className='flex flex-wrap gap-3 text-sm font-semibold'>
                    {isAdmin ? (
                      <Link href={`/dashboard/blog/edit-blog/${post.id}`} className='text-[var(--adm-teal)]'>
                        Edit
                      </Link>
                    ) : null}
                    {post.status === "APPROVED" ? (
                      <Link href={`/en/news/${post.postSlug}`} className='text-[#CC8640]'>
                        View
                      </Link>
                    ) : null}
                    {isAdmin ? (
                      <button
                        type='button'
                        onClick={() => handleDelete(post.id)}
                        disabled={isPending}
                        className='text-red-600'
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!posts.length ? (
        <div className='px-6 py-10 text-center text-[var(--adm-ink-muted)]'>
          No blog posts yet.
        </div>
      ) : null}
    </div>
  );
}
