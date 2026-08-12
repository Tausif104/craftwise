import { NextResponse } from "next/server";
import { requireUploadSession, uploadBuffer } from "@/lib/cloudinary";
import { registerMediaAsset } from "@/lib/media";

export async function POST(req) {
  const session = await requireUploadSession();

  if (!session) {
    // EditorJS expects this response shape.
    return NextResponse.json(
      { success: 0, message: "Sign in to upload images." },
      { status: 401 },
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ success: 0, message: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadBuffer(buffer, {
      folder: "craftwise/blogs/editor",
      fileName: file.name,
    });

    await registerMediaAsset(result, { session, fileName: file.name });

    return NextResponse.json({ success: 1, file: { url: result.secure_url } });
  } catch (error) {
    console.error("editor-upload route error:", error);
    return NextResponse.json(
      { success: 0, message: error.message || "Upload failed" },
      { status: 500 },
    );
  }
}
