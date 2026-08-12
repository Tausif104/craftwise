import { NextResponse } from "next/server";
import { captureLead, processDeliveryQueue } from "@/lib/lead-intake";
import { sendLeadNotification } from "@/lib/lead-notifications";

/**
 * Public lead intake (C1, C2).
 *
 * Used by the contact, consulting and book-a-demo forms, which previously had
 * no backend at all — every submission through them was discarded.
 */
export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, msg: "Send the form as JSON." },
      { status: 400 },
    );
  }

  const headers = request.headers;

  const result = await captureLead({
    ...body,
    ipAddress:
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("x-real-ip") ||
      null,
    userAgent: headers.get("user-agent"),
    referrer: body.referrer || headers.get("referer"),
  });

  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  // Drain the queue opportunistically. Failures here are already recorded
  // against the delivery row, so the response never depends on it.
  processDeliveryQueue({
    limit: 5,
    handlers: { notify_sales: sendLeadNotification },
  }).catch((error) => console.error("[leads] queue drain failed", error));

  return NextResponse.json({ success: true, leadId: result.leadId }, { status: 201 });
}
