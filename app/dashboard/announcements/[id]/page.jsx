import { getAnnouncementForDashboard } from "@/app/actions/announcement.actions";
import AnnouncementForm from "@/components/dashboard/announcement-form";

export default async function EditAnnouncementPage({ params }) {
  const { id } = await params;
  const response = await getAnnouncementForDashboard(id);

  if (!response.success) {
    return (
      <div className="rounded-[28px] border border-[var(--adm-line)] bg-white p-7 text-[#B44E43] shadow-[0_18px_50px_rgba(10,27,40,0.05)]">
        {response.msg || "Announcement not found."}
      </div>
    );
  }

  return <AnnouncementForm announcement={response.announcement} />;
}
