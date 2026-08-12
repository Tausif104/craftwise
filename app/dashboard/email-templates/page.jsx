import { listEmailTemplates } from "@/app/actions/email-template.actions";
import EmailTemplateManager from "@/components/dashboard/email-template-manager";

export const dynamic = "force-dynamic";

export default async function EmailTemplatesPage() {
  const templates = await listEmailTemplates();

  return <EmailTemplateManager templates={templates} />;
}
