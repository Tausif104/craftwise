"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteAnnouncement } from "@/app/actions/announcement.actions";
import { getAnnouncementPageLabel } from "@/lib/announcement-pages";

export default function AnnouncementTable({ announcements }) {
  const [pending, startTransition] = useTransition();

  const handleDelete = (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    startTransition(async () => {
      await deleteAnnouncement(id);
    });
  };

  return (
    <div className="rounded-[28px] border border-[var(--adm-line)] bg-white p-7 shadow-[0_18px_50px_rgba(10,27,40,0.05)]">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#CC8640]">
        Existing banners
      </p>
      <h2 className="mt-3 text-[30px] font-bold text-[var(--adm-ink)]">Announcements</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-[var(--adm-line)] text-xs uppercase tracking-[0.18em] text-[var(--adm-ink-muted)]">
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Target</th>
              <th className="px-3 py-3">Schedule</th>
              <th className="px-3 py-3">Frequency</th>
              <th className="px-3 py-3">Analytics</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id} className="border-b border-[#F2F6FA] align-top">
                <td className="px-3 py-4">
                  <p className="font-semibold text-[var(--adm-ink)]">{announcement.name}</p>
                  <p className="mt-1 text-[13px] text-[var(--adm-ink-muted)]">
                    {announcement.isEnabled ? "Enabled" : "Disabled"} · Priority {announcement.priority}
                  </p>
                </td>
                <td className="px-3 py-4 text-sm text-[var(--adm-teal)]">
                  {announcement.targetMode === "ALL_PAGES"
                    ? "All pages"
                    : announcement.pageTargets.map(getAnnouncementPageLabel).join(", ")}
                </td>
                <td className="px-3 py-4 text-sm text-[var(--adm-teal)]">
                  <p>{announcement.startAt ? new Date(announcement.startAt).toLocaleString() : "Starts immediately"}</p>
                  <p className="mt-1">{announcement.endAt ? new Date(announcement.endAt).toLocaleString() : "No end date"}</p>
                </td>
                <td className="px-3 py-4 text-sm text-[var(--adm-teal)]">
                  {announcement.frequency === "ONCE_PER_SESSION"
                    ? "Once / session"
                    : announcement.frequency === "ONCE"
                      ? "Once / browser"
                      : "Always"}
                </td>
                <td className="px-3 py-4 text-sm text-[var(--adm-teal)]">
                  <p>Impressions: {announcement.impressionCount}</p>
                  <p className="mt-1">Clicks: {announcement.clickCount}</p>
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/dashboard/announcements/${announcement.id}`}
                      className="rounded-full border border-[var(--adm-line-strong)] px-4 py-2 text-sm font-semibold text-[var(--adm-teal)] transition hover:bg-[var(--adm-surface-sunken)]"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => handleDelete(announcement.id)}
                      className="rounded-full border border-[#F3D4D1] px-4 py-2 text-sm font-semibold text-[#B44E43] transition hover:bg-[#FFF4F2] disabled:opacity-70"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {announcements.length === 0 ? (
        <p className="mt-6 text-[13px] text-[var(--adm-ink-muted)]">No announcements yet.</p>
      ) : null}
    </div>
  );
}
