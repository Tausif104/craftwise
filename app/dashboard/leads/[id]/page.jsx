import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLead } from "@/app/actions/lead.actions";
import LeadDetail from "@/components/dashboard/lead-detail";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({ params }) {
  const { id } = await params;

  const [lead, templates] = await Promise.all([
    getLead(id),
    prisma.emailTemplate.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  if (!lead) notFound();

  return <LeadDetail lead={lead} templates={templates} />;
}
