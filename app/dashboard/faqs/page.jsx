import { prisma } from "@/lib/prisma";
import FaqManager from "@/components/dashboard/faq-manager";

export const dynamic = "force-dynamic";

export default async function FaqAdminPage({ searchParams }) {
  const params = await searchParams;
  const pageKey = params?.page ?? "";
  const categoryId = params?.category ?? "";

  const where = {
    ...(pageKey ? { placements: { some: { pageKey } } } : {}),
    // "none" lists the questions that belong to no section yet — otherwise they
    // are invisible among 50+ rows.
    ...(categoryId ? { categoryId: categoryId === "none" ? null : categoryId } : {}),
  };

  const [items, categories] = await Promise.all([
    prisma.faqItem.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: { placements: true, category: true },
    }),
    prisma.faqCategory.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <FaqManager
      items={JSON.parse(JSON.stringify(items))}
      categories={JSON.parse(JSON.stringify(categories))}
      pageFilter={pageKey}
      categoryFilter={categoryId}
    />
  );
}
