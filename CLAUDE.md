# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server on localhost:3000
npm run build     # production build
npm run start     # serve production build
```

No test runner or linter configured.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** — config lives in `globals.css` via `@theme inline`, not `tailwind.config.js`
- **Plus Jakarta Sans** via `next/font/google` — available as `--font-jakarta` / `font-sans`
- **Radix UI** primitives + **Lucide React** + **react-icons** for UI
- **Swiper** for carousels, **Embla Carousel** for autoplay variants

## Architecture

### Routing & Pages (`app/`)

Each route follows Next.js App Router conventions. Page-specific components live in `_components/` subdirs alongside each `page.jsx`.

Key routes:
- `/` → `app/page.js` (redirects or home)
- `/landing-page` — marketing landing page
- `/features/[feature]` — 6 feature sub-pages (collaboration, planning-scheduling, project-file, quoting-invoicing, time-tracking, workflows-automation)
- `/industry/[trade]` — 6 trade verticals (carpenters, electricians, gardeners, painters, plumbers, roofers)
- `/news/[id]` — dynamic blog/news detail

### Global Layout Pattern

Every page wraps content in `<PageLayout>` from `components/global/page-layout.jsx`, which injects:
- `<BlogProvider>` (context for blog/news data)
- `<GoogleTranslate>` widget
- `<Header>` and `<Footer>`

`app/layout.js` is the root shell (font, global CSS imports only). Individual pages import `PageLayout` themselves.

### Component Organization

- `components/global/` — shared layout pieces: `header`, `footer`, `page-layout`, button variants (`primary-btn`, `outline-btn`, `border-btn`, `SecondaryBtn`), `Hero`, `footer-cta`
- `components/shared/` — reusable section components used across multiple pages: `faq`, `cta-section`, `challenge-solution`, `benifits-features`, `features-how-it-works`, `real-work`
- `components/shared/industry/` — shared sections for all industry pages: `common-challanges`, `carftwise-solves`, `key-benifits`, `workflow-steps`
- `components/AboutusPage/` — about-us page sections
- `components/*.jsx` (root level) — larger page-section components used on the home/landing page

### Data Layer (`data/`)

All content is static JS files exporting arrays/objects — no API, no database. Pages import data directly:
- `testimonials.js` — testimonial items with avatar paths under `public/images/testimonials/`
- `faqItems.js`, `ctaData.js`, `pricing-data.js`, `featureBenefitsData.js`, etc.
- Industry/feature pages pass data from these files into shared section components as props

### Styling Conventions

- Brand colors: `primary` = `#CC8640` (amber/gold), `secondary` = `#304C61` (dark teal)
- Dark navy backgrounds common: `#0A1B28`, `#012E33`
- Custom CSS utilities in `app/craftwise.css` (imported alongside `globals.css`)
- Use `bg-primary`, `text-secondary`, `bg-secondary` for brand colors — avoid hardcoded hex unless needed for gradients

### Path Aliases

`@/` maps to repo root. Use `@/components/...`, `@/data/...`, `@/lib/...`.

### Lib (`lib/`)

- `BlogContext.js` — React context for news/blog state (wraps all pages via `PageLayout`)
- `googleTranslateController.js` — Google Translate integration logic
- `pricing-utils.js` — pricing calculation helpers
- `utils.js` — general utilities (likely `cn()` for className merging)

### Images

Remote images allowed from `flagcdn.com`, `images.unsplash.com`, `source.unsplash.com`. Local images in `public/images/`.
