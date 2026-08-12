import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDashboardPostById } from "@/app/actions/blog.actions";
import BlogForm from "@/components/dashboard/blog-form";

export default async function EditBlogPage({ params }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/dashboard/blog");
  }

  const { id } = await params;
  const response = await getDashboardPostById(id);

  if (!response.success) {
    redirect("/dashboard/blog");
  }

  return <BlogForm mode='edit' initialPost={response.post} />;
}
