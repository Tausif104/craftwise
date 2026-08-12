import { sendLeadMessage } from "@/lib/email";

const TYPE_LABELS = {
  CONTACT: "Contact request",
  CONSULTING: "Consulting enquiry",
  DEMO: "Demo booking",
  WAITLIST: "Waitlist signup",
  OTHER: "Website enquiry",
};

function row(label, value) {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#5C5E5E">${label}</td><td style="padding:4px 0;color:#0A1B28"><strong>${value}</strong></td></tr>`;
}

/**
 * Delivery handler for the "notify_sales" target.
 *
 * Throwing here is intentional and safe: the delivery queue catches it, records
 * the error and retries with backoff. The lead itself is already stored.
 */
export async function sendLeadNotification(delivery) {
  const lead = delivery.lead;

  if (!lead) {
    throw new Error("Delivery has no lead attached.");
  }

  const to = process.env.SALES_INBOX || process.env.MAIL_FROM || process.env.GMAIL_USER;

  if (!to) {
    throw new Error("No sales inbox configured (set SALES_INBOX).");
  }

  const label = TYPE_LABELS[lead.type] || TYPE_LABELS.OTHER;
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/dashboard/leads/${lead.id}`;

  await sendLeadMessage({
    to,
    subject: `${label}: ${lead.name || lead.email}`,
    text: `${label}\n\n${lead.name || ""} <${lead.email}>\n${lead.company || ""}\n\n${
      lead.message || ""
    }\n\nOpen in admin: ${adminUrl}`,
    html: `
      <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#0A1B28;max-width:560px">
        <h2 style="color:#012E33;margin:0 0 4px">${label}</h2>
        <p style="margin:0 0 16px;color:#5C5E5E">A new enquiry came in from the website.</p>
        <table style="border-collapse:collapse;margin-bottom:16px">
          ${row("Name", lead.name)}
          ${row("Email", lead.email)}
          ${row("Phone", lead.phone)}
          ${row("Company", lead.company)}
          ${row("Language", lead.locale?.toUpperCase())}
          ${row("Source", lead.utmSource)}
          ${row("Campaign", lead.utmCampaign)}
          ${row("Landing page", lead.landingPage)}
        </table>
        ${
          lead.message
            ? `<div style="border-left:3px solid #CC8640;padding:8px 0 8px 14px;margin-bottom:20px;white-space:pre-wrap">${lead.message}</div>`
            : ""
        }
        <a href="${adminUrl}" style="background:#CC8640;color:#fff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:600;display:inline-block">Open in admin</a>
      </div>
    `,
  });
}
