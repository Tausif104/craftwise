import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BlogForm from "@/components/dashboard/blog-form";

export default async function AddBlogPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/dashboard/blog");
  }

  return <BlogForm mode='create' canPublish={session.user.role === "ADMIN"} />;
}
