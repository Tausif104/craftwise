import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { id, type } = await request.json();

    if (!id || !["impression", "click"].includes(type)) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    await prisma.announcement.update({
      where: { id },
      data:
        type === "click"
          ? {
              clickCount: { increment: 1 },
              lastClickAt: new Date(),
            }
          : {
              impressionCount: { increment: 1 },
              lastImpressionAt: new Date(),
            },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("announcement track error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
