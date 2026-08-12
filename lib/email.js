import nodemailer from "nodemailer";

const APP_NAME = "CraftWise";

function baseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000"
  );
}

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn(
      "[email] GMAIL_USER / GMAIL_APP_PASSWORD missing. Emails will not be sent."
    );
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  return cachedTransporter;
}

function fromAddress() {
  const display = process.env.MAIL_FROM_NAME || APP_NAME;
  const addr = process.env.MAIL_FROM || process.env.GMAIL_USER;
  if (!addr) return undefined;
  return `${display} <${addr}>`;
}

async function send({ to, subject, html, text }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log("[email:stub]", { to, subject });
    return { stub: true };
  }
  const from = fromAddress();
  const info = await transporter.sendMail({ from, to, subject, html, text });
  console.log("[email:sent]", { to, subject, messageId: info?.messageId });
  return info;
}

/**
 * Sends a sales message composed in the admin panel (C3).
 *
 * Unlike the marketing emails below, the body is authored by a person, so this
 * throws on failure instead of degrading to a stub — the caller records the
 * failure against the message so it stays visible in the lead history.
 */
export async function sendLeadMessage({ to, subject, html, text }) {
  const transporter = getTransporter();

  if (!transporter) {
    throw new Error(
      "Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD to send messages.",
    );
  }

  const from = fromAddress();
  const info = await transporter.sendMail({ from, to, subject, html, text });
  console.log("[email:lead-message]", { to, subject, messageId: info?.messageId });

  return { ...info, from };
}

export async function sendConfirmationEmail({ to, locale, token }) {
  const link = `${baseUrl()}/${locale}/registration/confirm?token=${encodeURIComponent(
    token
  )}`;

  const subject =
    locale === "de"
      ? `${APP_NAME} – Bitte E-Mail bestätigen`
      : `${APP_NAME} – Please confirm your email`;

  const html =
    locale === "de"
      ? `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1c2a35;max-width:560px;margin:0 auto">
           <h2 style="color:#012E33;margin:0 0 16px">${APP_NAME} Early Access</h2>
           <p>Danke für Ihr Interesse an ${APP_NAME}.</p>
           <p>Bitte bestätigen Sie Ihre E-Mail-Adresse, um sich auf die Early-Access-Liste setzen zu lassen:</p>
           <p style="margin:24px 0">
             <a href="${link}" style="background:#CC8640;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:600;display:inline-block">E-Mail bestätigen</a>
           </p>
           <p style="color:#5C5E5E;font-size:13px">Oder kopieren Sie diesen Link in Ihren Browser:<br><a href="${link}">${link}</a></p>
           <p style="color:#5C5E5E;font-size:13px;margin-top:24px">Wenn Sie sich nicht angemeldet haben, ignorieren Sie diese E-Mail.</p>
         </div>`
      : `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1c2a35;max-width:560px;margin:0 auto">
           <h2 style="color:#012E33;margin:0 0 16px">${APP_NAME} Early Access</h2>
           <p>Thanks for your interest in ${APP_NAME}.</p>
           <p>Please confirm your email address to join the Early Access list:</p>
           <p style="margin:24px 0">
             <a href="${link}" style="background:#CC8640;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:600;display:inline-block">Confirm email</a>
           </p>
           <p style="color:#5C5E5E;font-size:13px">Or paste this link into your browser:<br><a href="${link}">${link}</a></p>
           <p style="color:#5C5E5E;font-size:13px;margin-top:24px">If you didn't sign up, ignore this email.</p>
         </div>`;

  const text =
    locale === "de"
      ? `${APP_NAME} Early Access\n\nBitte bestätigen Sie Ihre E-Mail-Adresse:\n${link}\n\nWenn Sie sich nicht angemeldet haben, ignorieren Sie diese E-Mail.`
      : `${APP_NAME} Early Access\n\nPlease confirm your email address:\n${link}\n\nIf you didn't sign up, ignore this email.`;

  return send({ to, subject, html, text });
}

export async function sendWelcomeEmail({ to, locale }) {
  const subject =
    locale === "de"
      ? `Willkommen bei ${APP_NAME} Early Access`
      : `Welcome to ${APP_NAME} Early Access`;

  const html =
    locale === "de"
      ? `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1c2a35;max-width:560px;margin:0 auto">
           <h2 style="color:#012E33;margin:0 0 16px">Willkommen bei ${APP_NAME}</h2>
           <p>Ihre E-Mail-Adresse wurde bestätigt.</p>
           <p>Sie stehen jetzt auf der Early-Access-Liste. Wir melden uns, sobald ${APP_NAME} startet und Ihre 14-tägige kostenlose Testphase startklar ist.</p>
           <p style="color:#5C5E5E;font-size:13px;margin-top:24px">Sie können sich jederzeit per Antwort an diese E-Mail wieder austragen.</p>
         </div>`
      : `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1c2a35;max-width:560px;margin:0 auto">
           <h2 style="color:#012E33;margin:0 0 16px">Welcome to ${APP_NAME}</h2>
           <p>Your email is confirmed.</p>
           <p>You're on the Early Access list. We'll be in touch the moment ${APP_NAME} launches and your free 14-day trial is ready.</p>
           <p style="color:#5C5E5E;font-size:13px;margin-top:24px">You can unsubscribe at any time by replying to this email.</p>
         </div>`;

  const text =
    locale === "de"
      ? `Willkommen bei ${APP_NAME}\n\nIhre E-Mail wurde bestätigt. Wir melden uns, sobald ${APP_NAME} startet.`
      : `Welcome to ${APP_NAME}\n\nYour email is confirmed. We'll be in touch when ${APP_NAME} launches.`;

  return send({ to, subject, html, text });
}
