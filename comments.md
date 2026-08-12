# Figma — Unresolved Comments

**File:** [infinitools · craftwise](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise)  
**Source:** Figma REST API `GET /v1/files/9QeaG2Nj5GpcmlKRWGg3E2/comments`  
**Scope:** unresolved threads created on/after 2026-08-01 (resolved + pre-2026-08-01 threads excluded)

| | |
|---|---|
| Unresolved threads | **22** |
| Messages incl. replies | 22 |
| Excluded — resolved | 1234 |
| Excluded — unresolved before 2026-08-01 | 11 |
| Date range | 2026-08-07 → 2026-08-07 |
| Authors | Felix (22) |

---

## Contents

- [English Design](#english-design) — 22 threads
  - [Page-level (unpinned)](#page-level-unpinned) — 12
  - [infinitools- craftwise-Home Page-V2](#infinitools-craftwise-home-page-v2) — 3
  - [infinitools- Consulting Page](#infinitools-consulting-page) — 2
  - [Book a Free Demo](#book-a-free-demo) — 1
  - [Craftwise is coming soon](#craftwise-is-coming-soon) — 1
  - [infinitools- CraftWise Pricing](#infinitools-craftwise-pricing) — 1
  - [News](#news) — 1
  - [Privacy Policy Page](#privacy-policy-page) — 1

---

## English Design

_22 unresolved threads across 8 frames._

### Page-level (unpinned)

_12 unresolved_

#### 1. OVERVIEW / WEBSITE PERFORMANCE

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> OVERVIEW / WEBSITE PERFORMANCE
>
> The Overview should focus on Sales Website performance and conversions, not CMS/admin activity. It should combine key GA4 metrics with actual CraftWise leads.
>
> Acceptance criteria
> * Visitors / sessions (incl. graph / trends)
> * Leads generated
> * Conversion rate
> * Consultation / Demo requests
> * Waitlist / product interest signups
> * Traffic sources
> * Top landing pages
> * Conversion trend over time
> * Simple conversion funnel
> * Date range + previous-period comparison
> * GA4 = traffic/behavior data
> * CraftWise = source of truth for actual leads
> * No admin activity statistics on Overview

---

#### 2. Admin Panel Navigation:

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> Admin Panel Navigation:
>
> Overview
> Content
> * Pricing & Plans
> * Testimonials
> * FAQs
> * Articles
> * Media Library
> * Banners
> Marketing
> * Leads
> * Messages
> * Email Templates
> * Forms
> * Newsletter & Waitlist
> Analytics
> * Website Analytics
> * Conversions
> SEO & Tracking
> Legal
> Settings
> * Integrations
> * Users & Roles
> * Audit Log

---

#### 3. Acceptance criteria

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> Acceptance criteria
> * All editable website content available through the CMS
> * Clear Save / Preview / Publish workflow
> * Draft changes must never automatically go live
> * German and English content supported
> * Clear validation and error messages
> * Warn users before leaving with unsaved changes
> * Responsive preview for Desktop / Tablet / Mobile
> * Role-based permissions respected throughout the CMS
> * Changes recorded in an audit log
> * No non-functional or placeholder controls

---

#### 4. Content changes should follow a safe Draft → Preview → Publish workflow. Previou…

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> Content changes should follow a safe Draft → Preview → Publish workflow. Previous published versions must remain recoverable.
> Acceptance criteria
> * Draft and Published state clearly visible
> * Preview before publishing
> * Date/time and editor shown for changes
> * Version history available
> * Previous version can be restored
> * Optional scheduled publishing supported for articles/banners

---

#### 5. MEDIA LIBRARY

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> MEDIA LIBRARY
>
> Images and other website media should be centrally managed and reusable. Editors should be able to understand where an asset is already being used.
>
> Acceptance criteria
> * Upload supported media files
> * Search/filter media
> * Thumbnail preview
> * File name and dimensions visible
> * Alt text supported
> * DE / EN alt text where needed
> * Show usage/reference where possible
> * Prevent or warn before deleting assets currently in use
> * Replace media without breaking pages

---

#### 6. FORMS & LEADS

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> FORMS & LEADS
>
> All important Sales Website enquiries should be captured reliably and visible in one lead area. A temporary integration failure must never cause a lead to disappear.
>
> Acceptance criteria
> * Contact requests captured
> * Consulting requests captured
> * Demo requests captured
> * Waitlist/interest submissions captured
> * Form type visible
> * Name/contact/company information visible where provided
> * Message/details visible
> * Timestamp
> * Language
> * Consent status
> * UTM/source information
> * Lead status such as New / Contacted / Closed
> * Search and filter
> * Export functionality
> * Reliable retry mechanism for downstream integrations

---

#### 7. WEBSITE ANALYTICS

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> WEBSITE ANALYTICS
>
> Google Analytics 4 should remain the primary analytics source. The CMS should only surface the most useful Sales Website metrics so users do not need to leave the admin panel for everyday checks.
>
> Acceptance criteria
> * GA4 integration supported
> * Selected date range
> * Users / sessions
> * Traffic sources
> * Top landing pages
> * Device split
> * Country/region where useful
> * Key website events/conversions
> * Link/open full Google Analytics for deeper analysis
> * Analytics failure must not affect website operation

---

#### 8. CONVERSIONS

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> CONVERSIONS
>
> This view should connect website traffic with actual CraftWise business outcomes. GA4 data can provide traffic information while CraftWise lead data remains the source of truth for submitted leads.
>
> Acceptance criteria
> * Contact form submissions
> * Consulting enquiries
> * Demo bookings
> * Waitlist signups
> * Newsletter signups
> * Conversion counts over time
> * Source / Medium / Campaign
> * Landing page attribution
> * UTM values retained with the lead
> * Clear distinction between GA events and actual stored leads

---

#### 9. SEO & TRACKING

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> SEO & TRACKING
>
> Editors should control the most important SEO and tracking settings without touching code. Advanced technical SEO can remain developer-managed.
>
> Acceptance criteria
> * Default SEO settings
> * Page-specific SEO override
> * Meta title
> * Meta description
> * Slug
> * Open Graph title/description/image
> * Canonical URL where required
> * Index/no-index control where appropriate
> * Google Analytics configuration
> * Google Tag Manager support if used
> * UTM tracking preserved
> * Tracking respects cookie consent

---

#### 10. INTEGRATIONS

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> INTEGRATIONS
> Comment
> This page should provide a simple overview of the services connected to the Sales Website. It should focus on connection status and essential configuration rather than exposing unnecessary technical settings.
> Acceptance criteria
> * Google Analytics status
> * Calendly status
> * Newsletter/email provider status
> * Lead/API integration status
> * Other active marketing integrations
> * Connected / Error / Not configured state
> * Last successful sync where relevant
> * Test connection where technically useful
> * No API secrets displayed in plain text

---

#### 11. USERS & ROLES --> Possible? If not for now its ok

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> USERS & ROLES --> Possible? If not for now its ok
> Comment
> Access to the CMS must follow role-based permissions so publishing and sensitive configuration can be restricted.
> Acceptance criteria
> * Admin role
> * Editor role
> * Viewer role
> * Clear permissions per role
> * Ability to invite/remove users
> * Publishing rights configurable
> * Legal/settings access restrictable
> * User activity identifiable in audit log

---

#### 12. AUDIT LOG

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10504) · node `2027:10504`

> AUDIT LOG
>
> Important CMS activity should remain traceable, especially publication, pricing, legal and configuration changes.
>
> Acceptance criteria
> * User
> * Action
> * Date/time
> * Affected content
> * Previous/new state where relevant
> * Filter by user/type/date
> * Publish/unpublish actions included
> * Pricing and legal changes included
> * Integration/settings changes included

---

### infinitools- craftwise-Home Page-V2

_3 unresolved_

#### 1. BANNERS

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10505) · node `2027:10505`

> BANNERS
>
> Editors should be able to create temporary website-wide or page-specific announcements without developer support.
>
> Acceptance criteria
> * Create/edit banner
> * DE / EN message
> * Optional CTA + link
> * Activate/deactivate
> * Start and end date/time
> * Select affected pages or global website
> * Preview before activation

---

#### 2. Changing The Review Section

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10505) · node `2027:10505`

> Changing The Review Section
> - Add new comments for each page with the section
> - Control where testimonial appears
> - Remove comments for the section
> - Edit existing comments
>
> - Date
> - Name
> - Job Position
> - Image
> - Review text
> - Review Stars

---

#### 3. FAQ

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2027-10505) · node `2027:10505`

> FAQ
>
> FAQs should use a central reusable library and be assignable to different pages or categories.
>
> Acceptance criteria
> * Add/edit/archive FAQ
> * Question + answer
> * DE / EN versions
> * Categories
> * Assign FAQs to pages
> * Manual ordering
> * Search/filter in CMS
> * Published/unpublished state

---

### infinitools- Consulting Page

_2 unresolved_

#### 1. MESSAGES (triggered through several forms and fields)

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2030-3736) · node `2030:3736`

> MESSAGES (triggered through several forms and fields)
>
> Sales communication with leads should be possible directly from the Admin Panel. Messages sent from the CMS must be delivered as normal emails from salesATCraft-wise.de and stored in the lead history.
>
> Acceptance criteria
> * Compose and send email from a lead
> * Sender: salesATCraft-wise.de
> * Sent messages stored in CMS
> * Messages linked to the relevant lead
> * Replies/history visible in chronological order
> * Support DE and EN
> * Message status/error visible if sending fails
> * No separate full email client required

---

#### 2. EMAIL TEMPLATES

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2030-3736) · node `2030:3736`

> EMAIL TEMPLATES
>
> Reusable bilingual sales templates should speed up common lead replies while still allowing manual editing before sending.
>
> Acceptance criteria
> * Templates for first reply, follow-up, demo link and consulting reply
> * German and English versions
> * Select template directly from a lead
> * Variables such as name, company, booking link and UTM source
> * Safe preview before sending
> * Template can be edited before sending
> * Template version history

---

### Book a Free Demo

_1 unresolved_

#### 1. LEADS

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2165-45) · node `2165:45`

> LEADS
>
> All leads from Book Demo, Consulting and other relevant website forms should be stored in one clear lead database with their full history and current sales status.
>
> Acceptance criteria
> * Central lead list
> * Lead source/type: Demo / Consulting / other
> * Name, email, company, message
> * UTM/source/campaign data
> * Created date and last activity
> * Internal notes
> * Tags
> * Sales status/stage
> * Search and filters
> * Full message/history visible per lead

---

### Craftwise is coming soon

_1 unresolved_

#### 1. NEWSLETTER & WAITLIST

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=4090-571) · node `4090:571`

> NEWSLETTER & WAITLIST
>
> Newsletter and product-interest signups should be clearly separated from direct sales enquiries while remaining visible in the CMS.
>
> Acceptance criteria
> * View newsletter subscriptions
> * View waitlist/product-interest registrations
> * Source/UTM captured
> * Signup date
> * Consent status and timestamp
> * Language
> * Search/filter/export
> * Integration status visible
> * Unsubscribe status respected

---

### infinitools- CraftWise Pricing

_1 unresolved_

#### 1. PRICING & PLANS

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2042-44) · node `2042:44`

> PRICING & PLANS
>
> Pricing must be manageable without a code release. Changes here should automatically update all website locations using the relevant plan information.
>
> Acceptance criteria
> * Edit plan names
> * Edit monthly and annual pricing
> * Edit pricing labels and descriptions
> * Edit included features
> * Edit highlighted/recommended plan
> * Control CTA text/link
> * DE / EN support
> * Preview changes before publishing
> * Pricing stored centrally and reused consistently

---

### News

_1 unresolved_

#### 1. ARTICLES / NEWS

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2178-5474) · node `2178:5474`

> ARTICLES / NEWS
>
> The CMS should support simple publishing of CraftWise articles, updates and SEO content without requiring a separate blogging system.
>
> Acceptance criteria
> * Create/edit article
> * Draft / Preview / Publish
> * Scheduled publication
> * Title, teaser and article content
> * Cover image
> * Content Images and Position
> * Categories/tags
> * Author/date
> * DE / EN support
> * SEO title/description/slug
> * Social sharing preview
> * Archive/unpublish article

---

### Privacy Policy Page

_1 unresolved_

#### 1. LEGAL

`2026-08-07` · **Felix** · [open in Figma](https://www.figma.com/design/9QeaG2Nj5GpcmlKRWGg3E2/infinitools--craftwise?node-id=2071-1064) · node `2071:1064`

> LEGAL
>
> Legal website information should be editable without a deployment while remaining protected from accidental changes.
>
> Acceptance criteria
> * Impressum editable
> * Privacy Policy editable
> * Legal Notice editable
> * Terms and Conditions editable
> * Data Processing Agreement editable
> * DE / EN versions
> * Draft / Preview / Publish
> * Version history
> * Last updated date
> * PDFs must update as well
> * Restricted editing permission recommended

---
