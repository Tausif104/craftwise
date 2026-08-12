"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { AdminButton } from "@/components/dashboard/admin-kit";
import { retryDeliveries } from "@/app/actions/delivery.actions";

export default function RetryDeliveriesButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(async () => {
      const result = await retryDeliveries();

      if (result.success) {
        toast.success(result.msg);
        router.refresh();
      } else {
        toast.error(result.msg || "Could not run the retry.");
      }
    });
  };

  return (
    <AdminButton variant='outline' onClick={handleRetry} disabled={pending}>
      {pending ? "Retrying…" : "Retry now"}
    </AdminButton>
  );
}
