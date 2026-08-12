import { NextResponse } from "next/server";
import { requireUploadSession, uploadFromUrl } from "@/lib/cloudinary";
import { registerMediaAsset } from "@/lib/media";

export async function POST(req) {
  const session = await requireUploadSession();

  if (!session) {
    return NextResponse.json(
      { success: 0, message: "Sign in to upload images." },
      { status: 401 },
    );
  }

  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: 0, message: "Missing or invalid url" },
        { status: 400 },
      );
    }

    // Fetch-by-URL is a server-side request on our behalf, so restrict it to
    // public http(s) origins rather than letting it reach internal addresses.
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ success: 0, message: "Invalid url" }, { status: 400 });
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return NextResponse.json(
        { success: 0, message: "Only http and https URLs are supported." },
        { status: 400 },
      );
    }

    if (/^(localhost|127\.|0\.0\.0\.0|10\.|192\.168\.|169\.254\.|\[?::1)/i.test(parsed.hostname)) {
      return NextResponse.json(
        { success: 0, message: "That host is not allowed." },
        { status: 400 },
      );
    }

    const result = await uploadFromUrl(url, { folder: "craftwise/blogs/editor" });

    await registerMediaAsset(result, { session });

    return NextResponse.json({ success: 1, file: { url: result.secure_url } });
  } catch (error) {
    console.error("editor-upload-url route error:", error);
    return NextResponse.json(
      { success: 0, message: error.message || "Upload failed" },
      { status: 500 },
    );
  }
}
