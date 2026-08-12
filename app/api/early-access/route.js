import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const locale = body?.locale === "en" ? "en" : "de";
    const consentTerms = Boolean(body?.consentTerms);
    const consentPrivacy = Boolean(body?.consentPrivacy);
    const consentMarketing = Boolean(body?.consentMarketing);

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, error: "invalid_email" },
        { status: 400 }
      );
    }
    if (!consentTerms || !consentPrivacy || !consentMarketing) {
      return NextResponse.json(
        { success: false, error: "consents_required" },
        { status: 400 }
      );
    }

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;
    const userAgent = request.headers.get("user-agent") || null;

    const existing = await prisma.earlyAccessSubscriber.findUnique({
      where: { email },
    });

    if (existing?.confirmedAt) {
      return NextResponse.json({ success: true, status: "already_confirmed" });
    }

    const token = randomBytes(32).toString("hex");

    await prisma.earlyAccessSubscriber.upsert({
      where: { email },
      create: {
        email,
        locale,
        consentTerms,
        consentPrivacy,
        consentMarketing,
        confirmationToken: token,
        ipAddress,
        userAgent,
        source: "home_hero",
      },
      update: {
        locale,
        consentTerms,
        consentPrivacy,
        consentMarketing,
        confirmationToken: token,
        ipAddress,
        userAgent,
      },
    });

    await sendConfirmationEmail({ to: email, locale, token });

    return NextResponse.json({ success: true, status: "pending_confirmation" });
  } catch (error) {
    console.error("early-access subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
