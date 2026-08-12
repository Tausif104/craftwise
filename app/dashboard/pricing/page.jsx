import { prisma } from "@/lib/prisma";
import PricingManager from "@/components/dashboard/pricing-manager";

export const dynamic = "force-dynamic";

export default async function PricingAdminPage() {
  const plans = await prisma.pricingPlan.findMany({
    orderBy: { sortOrder: "asc" },
    include: { features: { orderBy: { sortOrder: "asc" } } },
  });

  return <PricingManager plans={JSON.parse(JSON.stringify(plans))} />;
}
