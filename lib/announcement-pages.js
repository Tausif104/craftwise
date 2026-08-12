export const ANNOUNCEMENT_PAGE_OPTIONS = [
  { key: "/", label: "Home" },
  { key: "/pricing", label: "Pricing" },
  { key: "/features", label: "Features" },
  { key: "/features/collaboration", label: "Features: Collaboration" },
  { key: "/features/planning-scheduling", label: "Features: Planning & Scheduling" },
  { key: "/features/project-file", label: "Features: Project File" },
  { key: "/features/quoting-invoicing", label: "Features: Quoting & Invoicing" },
  { key: "/features/time-tracking", label: "Features: Time Tracking" },
  { key: "/features/workflows-automation", label: "Features: Workflows & Automation" },
  { key: "/industry", label: "Industry" },
  { key: "/industry/carpenters", label: "Industry: Carpenters" },
  { key: "/industry/electricians", label: "Industry: Electricians" },
  { key: "/industry/gardeners", label: "Industry: Gardeners" },
  { key: "/industry/painters", label: "Industry: Painters" },
  { key: "/industry/plumbers", label: "Industry: Plumbers" },
  { key: "/industry/roofers", label: "Industry: Roofers" },
  { key: "/consulting", label: "Consulting" },
  { key: "/about-us", label: "About Us" },
  { key: "/contact", label: "Contact" },
  { key: "/book-demo", label: "Book Demo" },
  { key: "/news", label: "News" },
  { key: "/news/[id]", label: "News Article" },
  { key: "/faq", label: "FAQ" },
  { key: "/landing-page", label: "Landing Page" },
  { key: "/legal-notice", label: "Legal Notice" },
  { key: "/privacy-policy", label: "Privacy Policy" },
  { key: "/terms-conditions", label: "Terms & Conditions" },
  { key: "/data-processing", label: "Data Processing" },
  { key: "/underconstruction", label: "Under Construction" },
  { key: "/comming-soon", label: "Coming Soon" },
];

export function getAnnouncementPageLabel(pageKey) {
  return (
    ANNOUNCEMENT_PAGE_OPTIONS.find((item) => item.key === pageKey)?.label ||
    pageKey
  );
}
