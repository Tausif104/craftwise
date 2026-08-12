import { listLeads } from "@/app/actions/lead.actions";
import { getDeliveryHealth } from "@/lib/lead-intake";
import LeadsBrowser from "@/components/dashboard/leads-browser";

export const dynamic = "force-dynamic";

export default async function LeadsPage({ searchParams }) {
  const params = await searchParams;

  const search = params?.q ?? "";
  const status = params?.status ?? "";
  const type = params?.type ?? "";

  const [{ leads, total }, health] = await Promise.all([
    listLeads({ search, status, type }),
    getDeliveryHealth(),
  ]);

  return (
    <LeadsBrowser
      leads={leads}
      total={total}
      health={health}
      filters={{ search, status, type }}
    />
  );
}
