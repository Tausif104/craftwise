import { listAnnouncementsForDashboard } from "@/app/actions/announcement.actions";
import AnnouncementForm from "@/components/dashboard/announcement-form";
import AnnouncementTable from "@/components/dashboard/announcement-table";

export default async function AnnouncementsPage() {
  const response = await listAnnouncementsForDashboard();
  const announcements = response.success ? response.announcements : [];

  return (
    <div className="space-y-8">
      <AnnouncementForm />
      <AnnouncementTable announcements={announcements} />
    </div>
  );
}
