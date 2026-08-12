"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { guarded } from "@/lib/auth-guards";
import { processDeliveryQueue } from "@/lib/lead-intake";
import { sendLeadNotification } from "@/lib/lead-notifications";

/**
 * Manual drain of the delivery queue (C2).
 * Failed rows are reset to RETRYING first so an exhausted delivery can be
 * attempted again after the underlying problem is fixed.
 */
export async function retryDeliveries() {
  return guarded(async () => {
    await prisma.integrationDelivery.updateMany({
      where: { status: "FAILED" },
      data: { status: "RETRYING", nextAttemptAt: new Date(), attempts: 0 },
    });

    const results = await processDeliveryQueue({
      limit: 100,
      handlers: { notify_sales: sendLeadNotification },
    });

    revalidatePath("/dashboard/forms");
    revalidatePath("/dashboard/leads");

    return {
      results,
      msg: `${results.delivered} delivered, ${results.retrying} retrying, ${results.failed} still failing`,
    };
  }, { admin: true });
}
