import { auth } from "@/auth";
import { listDashboardPosts } from "@/app/actions/blog.actions";
import BlogTable from "@/components/dashboard/blog-table";

export default async function DashboardBlogPage() {
  const session = await auth();
  const response = await listDashboardPosts();
  const posts = response.success ? response.posts : [];

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 rounded-[28px] border border-[var(--adm-line)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,40,0.05)] md:flex-row md:items-end md:justify-between'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#CC8640]'>
            Blog management
          </p>
          <h2 className='mt-3 text-[34px] font-bold text-[var(--adm-ink)]'>All blog posts</h2>
          <p className='mt-2 text-base text-[var(--adm-ink-muted)]'>
            Review current posts, update publishing status, and edit existing content.
          </p>
        </div>
      </div>
      <BlogTable posts={posts} isAdmin={session?.user?.role === "ADMIN"} />
    </div>
  );
}
