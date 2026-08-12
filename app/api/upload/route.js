import { NextResponse } from "next/server";
import { requireUploadSession, uploadBuffer } from "@/lib/cloudinary";
import { registerMediaAsset } from "@/lib/media";

export async function POST(req) {
  // proxy.js lets every /api/* request past the middleware token check, so the
  // session has to be verified here.
  const session = await requireUploadSession();

  if (!session) {
    return NextResponse.json(
      { msg: "Sign in to upload files.", statusCode: 401 },
      { status: 401 },
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ msg: "File not found", statusCode: 404 }, { status: 404 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // The folder is validated against an allow-list rather than trusted.
    const result = await uploadBuffer(buffer, {
      folder: formData.get("folderName"),
      fileName: file.name,
    });

    await registerMediaAsset(result, { session, fileName: file.name });

    return NextResponse.json({
      msg: "File uploaded to Cloudinary",
      url: result.secure_url,
      statusCode: 200,
    });
  } catch (error) {
    console.error("upload route error:", error);
    return NextResponse.json(
      { msg: "Error in file upload route", error: error.message, statusCode: 500 },
      { status: 500 },
    );
  }
}
