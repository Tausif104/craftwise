import { getIntegrationStatuses } from "@/lib/integrations";
import {
  Eyebrow,
  PageHeader,
  StatusPill,
  Surface,
} from "@/components/dashboard/admin-kit";

export const dynamic = "force-dynamic";

const TONES = { CONNECTED: "published", ERROR: "danger", NOT_CONFIGURED: "archived" };
const LABELS = {
  CONNECTED: "Connected",
  ERROR: "Error",
  NOT_CONFIGURED: "Not configured",
};

export default async function IntegrationsPage() {
  const integrations = await getIntegrationStatuses();
  const broken = integrations.filter((item) => item.status === "ERROR");

  return (
    <div>
      <PageHeader
        eyebrow='Settings'
        title='Integrations'
        description='Which services the website is connected to, and whether they are working.'
      />

      {broken.length ? (
        <div className='adm-rise mb-5 flex items-start gap-2.5 rounded-[var(--adm-r-lg)] border border-[#F3C4C0] bg-[var(--adm-bad-wash)] px-4 py-3 text-[13px] leading-relaxed text-[var(--adm-bad)]'>
          {broken.length} integration{broken.length === 1 ? " needs" : "s need"} attention.
        </div>
      ) : null}

      <div className='grid gap-4 md:grid-cols-2'>
        {integrations.map((integration) => (
          <Surface key={integration.key} className='p-5'>
            <div className='flex items-start gap-3'>
              <div className='min-w-0'>
                <h3 className='text-[16px] font-bold tracking-[-0.01em] text-[var(--adm-ink)]'>{integration.name}</h3>
              </div>
              <div className='ml-auto shrink-0'>
                <StatusPill tone={TONES[integration.status] || "info"}>
                  {LABELS[integration.status] || integration.status}
                </StatusPill>
              </div>
            </div>

            <dl className='mt-4 space-y-1.5 text-sm'>
              <div className='flex gap-3'>
                <dt className='w-28 shrink-0 text-[var(--adm-ink-muted)]'>Credential</dt>
                <dd className='font-mono text-[var(--adm-ink)]'>
                  {integration.credentialHint || "—"}
                </dd>
              </div>
              <div className='flex gap-3'>
                <dt className='w-28 shrink-0 text-[var(--adm-ink-muted)]'>Last activity</dt>
                <dd className='text-[var(--adm-ink)]'>
                  {integration.lastSyncAt
                    ? new Date(integration.lastSyncAt).toLocaleString()
                    : "—"}
                </dd>
              </div>
            </dl>

            {integration.lastError ? (
              <p className='mt-3 rounded-[14px] bg-[#FDECEC] px-3 py-2 text-xs font-medium text-[#B42318]'>
                {integration.lastError}
              </p>
            ) : null}

            <a
              href={integration.configUrl}
              target='_blank'
              rel='noreferrer'
              className='mt-4 inline-flex text-[13px] font-semibold text-[var(--adm-teal)] transition-colors hover:text-[var(--adm-accent)]'
            >
              Open service ↗
            </a>
          </Surface>
        ))}
      </div>

      <p className='mt-5 text-[11.5px] text-[var(--adm-ink-faint)]'>
        Credentials are read from environment variables and only ever shown masked. No secret is
        stored in the database.
      </p>
    </div>
  );
}
