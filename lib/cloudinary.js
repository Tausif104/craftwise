import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/auth";

/**
 * Central Cloudinary config and upload guard.
 *
 * The three upload routes each configured Cloudinary themselves and none of
 * them checked the session, while proxy.js lets every /api/* request through
 * without a token check. That combination meant anyone who knew the URL could
 * upload into the account, and /api/upload additionally accepted an arbitrary
 * `folderName` from the caller.
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** Folders the CMS is allowed to write to. Anything else is rejected. */
const ALLOWED_FOLDERS = new Set([
  "craftwise/blogs",
  "craftwise/blogs/editor",
  "craftwise/media",
  "craftwise/testimonials",
  "craftwise/legal",
]);

export const DEFAULT_FOLDER = "craftwise/media";

export function resolveFolder(requested) {
  if (!requested) return DEFAULT_FOLDER;

  const normalised = String(requested).trim().replace(/^\/+|\/+$/g, "");

  return ALLOWED_FOLDERS.has(normalised) ? normalised : DEFAULT_FOLDER;
}

/**
 * Returns the session for an upload request, or null when unauthenticated.
 * Callers must reject with 401 on null.
 */
export async function requireUploadSession() {
  const session = await auth();
  return session?.user?.id ? session : null;
}

export function uploadBuffer(buffer, { folder, fileName } = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: resolveFolder(folder),
        resource_type: "auto",
        ...(fileName ? { public_id: fileName.replace(/\.[^.]+$/, "") } : {}),
      },
      (error, result) => (error ? reject(error) : resolve(result)),
    );

    stream.end(buffer);
  });
}

export function uploadFromUrl(url, { folder } = {}) {
  return cloudinary.uploader.upload(url, {
    folder: resolveFolder(folder),
    resource_type: "auto",
  });
}

export { cloudinary };
