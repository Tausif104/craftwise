import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Cell,
  DataTable,
  EmptyState,
  PageHeader,
  Row,
  StatusPill,
} from "@/components/dashboard/admin-kit";

export const dynamic = "force-dynamic";

const STATUS_TONES = { SENT: "published", FAILED: "danger", QUEUED: "draft" };

export default async function MessagesPage() {
  const messages = await prisma.leadMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      lead: { select: { id: true, name: true, email: true } },
      sender: { select: { name: true, email: true } },
    },
  });

  const failed = messages.filter((message) => message.status === "FAILED").length;

  return (
    <div>
      <PageHeader
        eyebrow='Marketing'
        title='Messages'
        description='Every reply sent to a lead from the admin panel, newest first.'
      />

      {failed > 0 ? (
        <div className='adm-rise mb-5 flex items-start gap-2.5 rounded-[var(--adm-r-lg)] border border-[#F3C4C0] bg-[var(--adm-bad-wash)] px-4 py-3 text-[13px] leading-relaxed text-[var(--adm-bad)]'>
          <strong>{failed}</strong> {failed === 1 ? "message" : "messages"} failed to send.
          Open the lead to see the error and try again.
        </div>
      ) : null}

      <DataTable
        columns={[
          { key: "subject", label: "Subject" },
          { key: "lead", label: "Lead" },
          { key: "status", label: "Status" },
          { key: "sender", label: "Sent by" },
          { key: "date", label: "Date" },
        ]}
        empty={
          messages.length === 0 ? (
            <div>
              <EmptyState
                title='No messages sent yet'
                description='Replies you send from a lead will be listed here with their delivery status.'
              />
            </div>
          ) : null
        }
      >
        {messages.map((message) => (
          <Row key={message.id}>
            <Cell className='font-semibold'>{message.subject}</Cell>
            <Cell>
              <Link
                href={`/dashboard/leads/${message.leadId}`}
                className='text-sm font-semibold text-[var(--adm-teal)] hover:text-[#CC8640]'
              >
                {message.lead?.name || message.lead?.email || "Lead"}
              </Link>
            </Cell>
            <Cell>
              <StatusPill tone={STATUS_TONES[message.status] || "info"}>
                {message.status.charAt(0) + message.status.slice(1).toLowerCase()}
              </StatusPill>
            </Cell>
            <Cell className='text-[13px] text-[var(--adm-ink-muted)]'>
              {message.sender?.name || message.sender?.email || "—"}
            </Cell>
            <Cell className='whitespace-nowrap text-[11.5px] text-[var(--adm-ink-faint)]'>
              {new Date(message.createdAt).toLocaleString()}
            </Cell>
          </Row>
        ))}
      </DataTable>
    </div>
  );
}
