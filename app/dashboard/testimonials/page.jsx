import { prisma } from "@/lib/prisma";
import TestimonialManager from "@/components/dashboard/testimonial-manager";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage({ searchParams }) {
  const params = await searchParams;
  const pageKey = params?.page ?? "";

  const where = pageKey ? { placements: { some: { pageKey } } } : {};

  const testimonials = await prisma.testimonial.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { placements: true },
  });

  return (
    <TestimonialManager
      testimonials={JSON.parse(JSON.stringify(testimonials))}
      pageFilter={pageKey}
    />
  );
}
