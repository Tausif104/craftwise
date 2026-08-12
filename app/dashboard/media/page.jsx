import { listMediaAssets } from "@/lib/media";
import MediaLibrary from "@/components/dashboard/media-library";

export const dynamic = "force-dynamic";

export default async function MediaPage({ searchParams }) {
  const params = await searchParams;

  const { assets, folders } = await listMediaAssets({
    search: params?.q ?? "",
    folder: params?.folder ?? "",
  });

  return (
    <MediaLibrary
      assets={JSON.parse(JSON.stringify(assets))}
      folders={folders}
      filters={{ search: params?.q ?? "", folder: params?.folder ?? "" }}
    />
  );
}
