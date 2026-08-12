/**
 * Email template rendering (C4).
 *
 * Variables use {{name}} syntax. Anything unknown is replaced with an empty
 * string rather than left as raw braces, so a missing company name never ships
 * "Hi {{company}}" to a customer.
 */

export const TEMPLATE_VARIABLES = [
  { key: "name", label: "Lead name" },
  { key: "firstName", label: "First name" },
  { key: "company", label: "Company" },
  { key: "email", label: "Email" },
  { key: "bookingLink", label: "Booking link" },
  { key: "utmSource", label: "UTM source" },
];

export function buildVariables(lead, extra = {}) {
  const name = lead?.name?.trim() || "";

  return {
    name,
    firstName: name.split(" ")[0] || "",
    company: lead?.company || "",
    email: lead?.email || "",
    bookingLink:
      extra.bookingLink ||
      process.env.NEXT_PUBLIC_BOOKING_URL ||
      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/book-demo`,
    utmSource: lead?.utmSource || "",
    ...extra,
  };
}

export function fillTemplate(text, variables) {
  if (!text) return "";

  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_match, key) => variables[key] ?? "");
}

export function renderTemplate(template, lead, locale = "de") {
  const variables = buildVariables(lead);
  const useEn = locale === "en";

  return {
    subject: fillTemplate(useEn ? template.subjectEn : template.subjectDe, variables),
    body: fillTemplate(useEn ? template.bodyEn : template.bodyDe, variables),
  };
}
