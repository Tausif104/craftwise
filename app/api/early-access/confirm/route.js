import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

export async function GET(request) {
  return handle(request);
}

export async function POST(request) {
  return handle(request);
}

async function handle(request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "missing_token" },
        { status: 400 }
      );
    }

    const subscriber = await prisma.earlyAccessSubscriber.findUnique({
      where: { confirmationToken: token },
    });

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: "invalid_token" },
        { status: 404 }
      );
    }

    if (subscriber.confirmedAt) {
      return NextResponse.json({ success: true, status: "already_confirmed" });
    }

    await prisma.earlyAccessSubscriber.update({
      where: { id: subscriber.id },
      data: {
        confirmedAt: new Date(),
        confirmationToken: null,
      },
    });

    await sendWelcomeEmail({
      to: subscriber.email,
      locale: subscriber.locale,
    });

    return NextResponse.json({ success: true, status: "confirmed" });
  } catch (error) {
    console.error("early-access confirm error:", error);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
