import { prisma } from "@/lib/prisma";
import SeoManager from "@/components/dashboard/seo-manager";

export const dynamic = "force-dynamic";

export default async function SeoPage() {
  const [settings, tracking] = await Promise.all([
    prisma.seoSetting.findMany({ orderBy: [{ isSiteDefault: "desc" }, { pathKey: "asc" }] }),
    prisma.trackingSetting.findUnique({ where: { environment: "production" } }),
  ]);

  return (
    <SeoManager
      settings={JSON.parse(JSON.stringify(settings))}
      tracking={JSON.parse(JSON.stringify(tracking))}
    />
  );
}
