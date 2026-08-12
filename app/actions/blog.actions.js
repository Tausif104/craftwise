"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatToSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";

function getString(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function requireSession() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: { success: false, msg: "Unauthorized" } };
  }
  return { session };
}

async function requireAdmin() {
  const result = await requireSession();
  if (result.error) return result;

  if (result.session.user.role !== "ADMIN") {
    return { error: { success: false, msg: "Forbidden" } };
  }

  return result;
}

export async function listDashboardPosts() {
  try {
    const { session, error } = await requireSession();
    if (error) return error;

    const isAdmin = session.user.role === "ADMIN";
    const where = isAdmin ? {} : { authorId: session.user.id };

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, posts };
  } catch (error) {
    console.error("listDashboardPosts error:", error);
    return { success: false, msg: "Failed to fetch posts." };
  }
}

export async function listPublishedPosts(locale) {
  try {
    const posts = await prisma.post.findMany({
      where: { status: "APPROVED" },
      include: {
        author: {
          select: {
            name: true,
            profileImage: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      posts: posts.map((post) => ({
        ...post,
        localeHref: `/${locale}/news/${post.postSlug}`,
      })),
    };
  } catch (error) {
    console.error("listPublishedPosts error:", error);
    return { success: false, posts: [] };
  }
}

export async function getPublishedPostBySlug(postSlug) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        postSlug,
        status: "APPROVED",
      },
      include: {
        author: {
          select: {
            name: true,
            profileImage: true,
          },
        },
      },
    });

    if (!post) {
      return { success: false, msg: "Post not found." };
    }

    return { success: true, post };
  } catch (error) {
    console.error("getPublishedPostBySlug error:", error);
    return { success: false, msg: "Failed to fetch post." };
  }
}

export async function getDashboardPostById(id) {
  try {
    const { session, error } = await requireSession();
    if (error) return error;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true, profileImage: true },
        },
      },
    });

    if (!post) {
      return { success: false, msg: "Post not found." };
    }

    const isAdmin = session.user.role === "ADMIN";
    if (!isAdmin && post.authorId !== session.user.id) {
      return { success: false, msg: "Forbidden" };
    }

    return { success: true, post };
  } catch (error) {
    console.error("getDashboardPostById error:", error);
    return { success: false, msg: "Failed to fetch post." };
  }
}

export async function createPost(_prevState, formData) {
  try {
    const { session, error } = await requireSession();
    if (error) return error;

    const title = getString(formData.get("title"));
    const postSlug = formatToSlug(getString(formData.get("postSlug")) || title);
    const excerpt = getString(formData.get("excerpt"));
    const bannerImage = getString(formData.get("bannerImage")) || "/images/news/news-hero.png";
    const bannerAltText = getString(formData.get("bannerAltText"));
    const metaTitle = getString(formData.get("metaTitle"));
    const metaDescription = getString(formData.get("metaDescription"));
    const canonicalUrl = getString(formData.get("canonicalUrl"));
    const content = getString(formData.get("content"));
    const requestedStatus = getString(formData.get("status")).toUpperCase();
    const isAdmin = session.user.role === "ADMIN";
    const status =
      requestedStatus === "DRAFT"
        ? "DRAFT"
        : isAdmin
          ? "APPROVED"
          : "PENDING";

    if (!title || !postSlug || !content) {
      return { success: false, msg: "Title, slug and content are required." };
    }

    const existing = await prisma.post.findFirst({
      where: {
        OR: [{ title }, { postSlug }],
      },
    });

    if (existing) {
      return { success: false, msg: "Title or slug already exists." };
    }

    const post = await prisma.post.create({
      data: {
        title,
        postSlug,
        excerpt: excerpt || null,
        bannerImage,
        bannerAltText: bannerAltText || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        canonicalUrl: canonicalUrl || null,
        content,
        status,
        authorId: session.user.id,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/blog");
    revalidatePath("/en/news");
    revalidatePath("/de/news");

    return { success: true, post };
  } catch (error) {
    console.error("createPost error:", error);
    return { success: false, msg: "Failed to create post." };
  }
}

export async function updatePost(_prevState, formData) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const id = getString(formData.get("id"));
    if (!id) {
      return { success: false, msg: "Post id is required." };
    }

    const title = getString(formData.get("title"));
    const postSlug = formatToSlug(getString(formData.get("postSlug")) || title);
    const excerpt = getString(formData.get("excerpt"));
    const bannerImage = getString(formData.get("bannerImage"));
    const bannerAltText = getString(formData.get("bannerAltText"));
    const metaTitle = getString(formData.get("metaTitle"));
    const metaDescription = getString(formData.get("metaDescription"));
    const canonicalUrl = getString(formData.get("canonicalUrl"));
    const content = getString(formData.get("content"));
    const requestedStatus = getString(formData.get("status")).toUpperCase();

    if (!title || !postSlug || !content) {
      return { success: false, msg: "Title, slug and content are required." };
    }

    const existing = await prisma.post.findFirst({
      where: {
        id: { not: id },
        OR: [{ title }, { postSlug }],
      },
      select: { id: true },
    });

    if (existing) {
      return { success: false, msg: "Title or slug already exists." };
    }

    const data = {
      title,
      postSlug,
      excerpt: excerpt || null,
      bannerAltText: bannerAltText || null,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      canonicalUrl: canonicalUrl || null,
      content,
      status: requestedStatus === "DRAFT" ? "DRAFT" : "APPROVED",
    };

    if (bannerImage) {
      data.bannerImage = bannerImage;
    }

    const post = await prisma.post.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/blog");
    revalidatePath(`/dashboard/blog/edit-blog/${id}`);
    revalidatePath("/en/news");
    revalidatePath("/de/news");
    revalidatePath(`/en/news/${postSlug}`);
    revalidatePath(`/de/news/${postSlug}`);

    return { success: true, post };
  } catch (error) {
    console.error("updatePost error:", error);
    return { success: false, msg: "Failed to update post." };
  }
}

export async function deletePost(id) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    await prisma.post.delete({ where: { id } });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/blog");
    revalidatePath("/en/news");
    revalidatePath("/de/news");

    return { success: true };
  } catch (error) {
    console.error("deletePost error:", error);
    return { success: false, msg: "Failed to delete post." };
  }
}
