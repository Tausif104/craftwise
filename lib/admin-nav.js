/**
 * Admin panel navigation (A1).
 *
 * Mirrors the hierarchy Felix specified in Figma exactly, including order.
 *
 * `status` keeps the sidebar honest — Felix asked for "no non-functional or
 * placeholder controls" (A2), so anything without a real screen behind it
 * renders disabled instead of linking to a 404:
 *   "pending"  — being built, not reachable yet
 *   "deferred" — out of scope this phase (Decision 2)
 * Remove the flag as each module lands.
 */

export const ADMIN_NAV = [
  {
    label: null,
    items: [{ href: "/dashboard", label: "Overview", icon: "dashboard", exact: true }],
  },
  {
    label: "Content",
    items: [
      { href: "/dashboard/pricing", label: "Pricing & Plans", icon: "tag" },
      { href: "/dashboard/testimonials", label: "Testimonials", icon: "quote" },
      { href: "/dashboard/faqs", label: "FAQs", icon: "help" },
      { href: "/dashboard/blog", label: "Articles", icon: "file" },
      { href: "/dashboard/media", label: "Media Library", icon: "image" },
      { href: "/dashboard/announcements", label: "Banners", icon: "megaphone" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { href: "/dashboard/leads", label: "Leads", icon: "users" },
      { href: "/dashboard/messages", label: "Messages", icon: "mail" },
      {
        href: "/dashboard/email-templates",
        label: "Email Templates",
        icon: "template",
      },
      { href: "/dashboard/forms", label: "Forms", icon: "form" },
      {
        href: "/dashboard/subscribers",
        label: "Newsletter & Waitlist",
        icon: "inbox",
      },
    ],
  },
  {
    label: "Analytics",
    items: [
      { href: "/dashboard/analytics", label: "Website Analytics", icon: "chart" },
      { href: "/dashboard/conversions", label: "Conversions", icon: "target" },
    ],
  },
  {
    label: null,
    items: [
      { href: "/dashboard/seo", label: "SEO & Tracking", icon: "search" },
      { href: "/dashboard/legal-pages", label: "Legal", icon: "scroll" },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/dashboard/integrations", label: "Integrations", icon: "plug" },
      {
        href: "/dashboard/users",
        label: "Users & Roles",
        icon: "shield",
        status: "deferred",
      },
      { href: "/dashboard/audit-log", label: "Audit Log", icon: "history" },
    ],
  },
];

/** Flat list, useful for breadcrumbs and page titles. */
export const ADMIN_NAV_FLAT = ADMIN_NAV.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.label })),
);

export function findNavItem(pathname) {
  const matches = ADMIN_NAV_FLAT.filter((item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href),
  );

  // Longest href wins so /dashboard/blog/add-blog resolves to Articles, not Overview.
  return matches.sort((a, b) => b.href.length - a.href.length)[0] ?? null;
}
