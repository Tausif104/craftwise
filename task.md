# CraftWise — Task List

Derived from **22 unresolved Figma comments created on/after 2026-08-01** → see [`comments.md`](./comments.md).
Source file: [infinitools · craftwise](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise) · all comments by Felix, `2026-08-07`.

**Scope note:** 11 unresolved threads created before 2026-08-01 were excluded from this list (German-site fixes, News-detail CTA copy, cookie-consent config). They still exist in Figma.

**Legend**
`🟡 partial` — some implementation exists in repo (`app/dashboard`, `prisma/schema.prisma`)
`⚪ not started` — no code found

Repo baseline: `app/dashboard/{announcements,blog,legal-pages}`, models `User, Announcement, Post, LegalDocument, LegalDocumentVersion, EarlyAccessSubscriber`.

---

## Decisions taken (2026-08-13)

Standing rule: **keep the current setup**. Don't replace what already works.

| # | Decision | Effect |
|---|---|---|
| 1 | shadcn — existing config stays | Port preset tokens across; do **not** overwrite `components.json`, brand colours, or `app/craftwise.css`. See 0.1. |
| 2 | Users & Roles (E2) — not this phase | Felix marked it optional. Single admin user. "Role-based permissions" in A2 is a no-op for now. |
| 3 | Email — keep the scaffolded Gmail SMTP | `GMAIL_USER` / `GMAIL_APP_PASSWORD` / `MAIL_FROM` already in `.env`. No new vendor. See C3. |
| 4 | Pre-August comments — stay out | The 11 excluded threads remain in Figma only. No local backlog file. |

---

## Summary

| Group | Tasks |
|---|---|
| 0. Setup | 1 |
| A. CMS foundation | 4 |
| B. CMS — Content | 7 |
| C. CMS — Marketing | 5 |
| D. CMS — Analytics & SEO | 3 |
| E. CMS — Settings | 3 |
| **Total** | **23** |

Groups A–E (22 tasks) are Admin Panel / CMS scope, derived from Figma comments. Group 0 is a setup decision from the team, not from Figma.

---

## 0. Setup

### 0.1 ⚪ Adopt the shadcn/ui preset — without disturbing current config

Requested command (npm, not pnpm):

```bash
npx shadcn@latest init --preset b1VoQlRA --template next
```

**Decision 1 applies: current setup stays.** This repo is already shadcn-initialised, so run the command into a scratch directory and port the preset across — do not run it in place.

- [ ] Scaffold the preset to a temp dir, not the repo root
- [ ] Diff `components.json` — keep the current values (`style: new-york`, `tsx: false`, `baseColor: neutral`, css `app/globals.css`); adopt only what the preset genuinely adds
- [ ] Diff `app/globals.css` — port the preset's `@theme inline` tokens (Tailwind v4; no `tailwind.config.js` in this project)
- [ ] Leave `app/craftwise.css` untouched
- [ ] Keep brand colours: `primary` `#CC8640`, `secondary` `#304C61`; dark backgrounds `#0A1B28`, `#012E33`
- [ ] Keep Plus Jakarta Sans (`--font-jakarta` / `font-sans`) as the type family
- [ ] Keep the project on JS — the preset must not flip `tsx` to true
- [ ] `npm run build` green before moving on

Note: `--template next` scaffolds a fresh Next.js app, which is why it only makes sense in the scratch directory.

---

## A. CMS foundation — cross-cutting rules

Applies to every module below. Build before/with the individual modules.

### A1 ⚪ Admin Panel navigation structure
- [ ] Implement the agreed sidebar hierarchy:
  - **Overview**
  - **Content** — Pricing & Plans · Testimonials · FAQs · Articles · Media Library · Banners
  - **Marketing** — Leads · Messages · Email Templates · Forms · Newsletter & Waitlist
  - **Analytics** — Website Analytics · Conversions
  - **SEO & Tracking**
  - **Legal**
  - **Settings** — Integrations · Users & Roles · Audit Log
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

### A2 ⚪ Global CMS acceptance criteria
- [ ] All editable website content reachable through the CMS
- [ ] Clear Save / Preview / Publish workflow
- [ ] Draft changes must never go live automatically
- [ ] German and English content supported everywhere
- [ ] Clear validation and error messages
- [ ] Warn before leaving with unsaved changes
- [ ] Responsive preview: Desktop / Tablet / Mobile
- [ ] Role-based permissions respected throughout
- [ ] All changes recorded in the audit log
- [ ] No non-functional or placeholder controls shipped
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

### A3 🟡 Draft → Preview → Publish + version history
- [ ] Draft and Published state clearly visible
- [ ] Preview before publishing
- [ ] Date/time and editor shown per change
- [ ] Version history available
- [ ] Previous version restorable
- [ ] Optional scheduled publishing for articles and banners
- Partial: `LegalDocumentVersion` exists — generalise the pattern to all content types.
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

### A4 ⚪ Overview / Website performance dashboard
- [ ] Visitors / sessions with graph + trend
- [ ] Leads generated · conversion rate
- [ ] Consultation / demo requests · waitlist signups
- [ ] Traffic sources · top landing pages
- [ ] Conversion trend over time · simple conversion funnel
- [ ] Date range picker + previous-period comparison
- [ ] GA4 = traffic/behaviour; CraftWise DB = source of truth for leads
- [ ] **No** admin/CMS activity statistics on Overview
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

---

## B. CMS — Content

### B1 ⚪ Pricing & Plans
- [ ] Edit plan names · monthly and annual pricing · labels and descriptions
- [ ] Edit included features · highlighted/recommended plan
- [ ] Control CTA text and link
- [ ] DE / EN support · preview before publish
- [ ] Pricing stored centrally, reused consistently across the site (no code release to change price)
- Repo note: currently static in `data/pricing-data.js` + `lib/pricing-utils.js` — needs to move to DB.
- Source: [Pricing Page](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2042-44)

### B2 ⚪ Testimonials / Review section
- [ ] Add, edit, remove testimonials
- [ ] Control which pages each testimonial appears on
- [ ] Fields: date · name · job position · image · review text · review stars
- Repo note: currently static in `data/testimonials.js`.
- Source: [Home Page V2](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10505)

### B3 ⚪ FAQs — central reusable library
- [ ] Add / edit / archive FAQ · question + answer
- [ ] DE / EN versions · categories
- [ ] Assign FAQs to pages · manual ordering
- [ ] Search/filter in CMS · published/unpublished state
- Repo note: currently static in `data/faqItems.js`.
- Source: [Home Page V2](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10505)

### B4 🟡 Articles / News
- [ ] Create/edit article · Draft / Preview / Publish · scheduled publication
- [ ] Title, teaser, article content · cover image
- [ ] Content images with position control
- [ ] Categories/tags · author/date
- [ ] DE / EN support
- [ ] SEO title/description/slug · social sharing preview
- [ ] Archive/unpublish article
- Partial: `Post` model + `app/dashboard/blog` exist — gap-check against this list.
- Source: [News](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2178-5474)

### B5 ⚪ Media Library
- [ ] Upload supported media files · search/filter · thumbnail preview
- [ ] File name and dimensions visible
- [ ] Alt text, incl. DE / EN alt text where needed
- [ ] Show usage/references where possible
- [ ] Prevent or warn before deleting assets in use
- [ ] Replace media without breaking pages
- Partial: upload endpoints exist (`app/api/upload`, `editor-upload`) but no library UI.
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

### B6 🟡 Banners / announcements
- [ ] Create/edit banner · DE / EN message
- [ ] Optional CTA + link · activate/deactivate
- [ ] Start and end date/time
- [ ] Select affected pages or global website
- [ ] Preview before activation
- Partial: `Announcement` model + `app/dashboard/announcements` + `app/api/announcements` exist — gap-check.
- Source: [Home Page V2](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10505)

### B7 🟡 Legal pages
- [ ] Impressum · Privacy Policy · Legal Notice · Terms and Conditions · Data Processing Agreement — all editable
- [ ] DE / EN versions · Draft / Preview / Publish
- [ ] Version history · last-updated date
- [ ] **PDFs must update as well**
- [ ] Restricted editing permission recommended
- Partial: `LegalDocument` + `LegalDocumentVersion` + `app/dashboard/legal-pages` exist. Reference doc in repo: `CraftWise_Legal_Texts_Website_Update_2026-06-17.docx`.
- Source: [Privacy Policy Page](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2071-1064)

---

## C. CMS — Marketing

### C1 ⚪ Leads database
- [ ] Central lead list from Book Demo, Consulting and other forms
- [ ] Lead source/type: Demo / Consulting / other
- [ ] Name, email, company, message
- [ ] UTM / source / campaign data
- [ ] Created date and last activity
- [ ] Internal notes · tags · sales status/stage
- [ ] Search and filters
- [ ] Full message history per lead
- Source: [Book a Free Demo](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2165-45)

### C2 ⚪ Forms & lead capture reliability
- [ ] Capture contact, consulting, demo, waitlist/interest submissions
- [ ] Store: form type · name/contact/company · message/details · timestamp · language · consent status · UTM/source
- [ ] Lead status: New / Contacted / Closed
- [ ] Search, filter, export
- [ ] **Reliable retry for downstream integrations — a temporary integration failure must never lose a lead**
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

### C3 ⚪ Messages — email a lead from the Admin Panel
- [ ] Compose and send email from a lead record
- [ ] Sender: `sales@craft-wise.de`
- [ ] Sent messages stored in CMS, linked to the lead
- [ ] Replies/history in chronological order
- [ ] DE and EN support
- [ ] Message status / error visible on send failure
- [ ] No separate full email client required
- **Decision 3:** use the existing Gmail SMTP scaffolding (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `MAIL_FROM`) — no new provider.
- Watch: SMTP gives no delivery webhooks, so "message status / error visible on send failure" covers send-time errors only. Revisit if bounce tracking is needed.
- Source: [Consulting Page](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2030-3736)

### C4 ⚪ Email templates
- [ ] Templates for: first reply · follow-up · demo link · consulting reply
- [ ] German and English versions
- [ ] Select template directly from a lead
- [ ] Variables: name, company, booking link, UTM source
- [ ] Safe preview before sending · editable before sending
- [ ] Template version history
- Source: [Consulting Page](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2030-3736)

### C5 🟡 Newsletter & Waitlist
- [ ] View newsletter subscriptions
- [ ] View waitlist / product-interest registrations
- [ ] Source/UTM captured · signup date
- [ ] Consent status and timestamp · language
- [ ] Search / filter / export
- [ ] Integration status visible · unsubscribe status respected
- [ ] Keep clearly separated from direct sales enquiries
- Partial: `EarlyAccessSubscriber` model + `app/api/early-access` exist.
- Source: [Craftwise is coming soon](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=4090-571)

---

## D. CMS — Analytics, SEO & Tracking

### D1 ⚪ Website Analytics (GA4 surfaced in CMS)
- [ ] GA4 integration · selected date range
- [ ] Users / sessions · traffic sources · top landing pages
- [ ] Device split · country/region where useful
- [ ] Key website events / conversions
- [ ] Link out to full Google Analytics for deeper analysis
- [ ] **Analytics failure must not affect website operation**
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

### D2 ⚪ Conversions view
- [ ] Contact form submissions · consulting enquiries · demo bookings
- [ ] Waitlist signups · newsletter signups
- [ ] Conversion counts over time
- [ ] Source / Medium / Campaign · landing page attribution
- [ ] UTM values retained with the lead
- [ ] Clear distinction between GA events and actual stored leads
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

### D3 ⚪ SEO & Tracking settings
- [ ] Default SEO settings + page-specific overrides
- [ ] Meta title · meta description · slug
- [ ] Open Graph title / description / image
- [ ] Canonical URL where required
- [ ] Index / no-index control where appropriate
- [ ] Google Analytics configuration · Google Tag Manager support if used
- [ ] UTM tracking preserved
- [ ] Tracking respects cookie consent
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

---

## E. CMS — Settings

### E1 ⚪ Integrations overview
- [ ] Status for: Google Analytics · Calendly · newsletter/email provider · lead/API integration · other active marketing integrations
- [ ] States: Connected / Error / Not configured
- [ ] Last successful sync where relevant
- [ ] Test-connection action where technically useful
- [ ] **No API secrets displayed in plain text**
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

### E2 🟡 Users & Roles — **deferred, not this phase** (Decision 2)
*Felix: "Possible? If not for now it's ok".* Kept here for the record; do not build yet.
- [ ] Roles: Admin · Editor · Viewer
- [ ] Clear permissions per role
- [ ] Invite / remove users
- [ ] Publishing rights configurable
- [ ] Legal/settings access restrictable
- [ ] User activity identifiable in audit log
- Partial: `User` model + `auth.js` + `app/login`, `app/register` exist; no role system found.
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

### E3 ⚪ Audit log
- [ ] Record: user · action · date/time · affected content · previous/new state where relevant
- [ ] Filter by user / type / date
- [ ] Include publish/unpublish actions
- [ ] Include pricing and legal changes
- [ ] Include integration/settings changes
- Source: [page-level](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504)

---

## Suggested order

0. **0.1** — shadcn preset init first; it touches global CSS and every UI component built after it.
1. **A1–A3** — CMS nav + draft/publish + DE/EN foundation; everything else depends on it.
2. **B4, B6, B7, C5** — finish the modules that already have models and routes.
3. **B1, B2, B3, B5** — move static `data/*.js` content into the CMS.
4. **C1–C4** — lead pipeline: DB → forms → messaging → templates.
5. **D1–D3**, then **A4** — analytics and SEO first, Overview dashboard built on top.
6. **E1, E3** — integrations + audit log. **E2** deferred (Decision 2).

## Still needed from Felix

Credentials and access only — all open design decisions are settled above.

- **D1 / D3** — GA4 property ID and GTM container to wire against.
- **E1** — Calendly account access, for connection status.
- **C3** — confirm the `sales@craft-wise.de` mailbox exists as a Google account with an app password (required by Decision 3).
