# CraftWise

Marketing site and admin CMS for CraftWise — Next.js 16 (App Router), React 19,
Tailwind v4, Prisma on Postgres, Auth.js v5, next-intl (DE/EN).

## Getting started

```bash
npm install                # runs `prisma generate` via postinstall
cp .env.example .env       # then fill in the values
npx prisma migrate deploy  # apply the schema
npm run dev                # http://localhost:3000
```

Optional, to populate the CMS from the content that ships in the repo:

```bash
node scripts/seed-cms-content.mjs --dry   # report only
npm run db:seed                           # apply
```

The seed is idempotent and upsert-only — it never deletes or overwrites edits.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (webpack) |
| `npm run build` | `prisma generate` then `next build` |
| `npm run start` | Serve the production build |
| `npm run db:deploy` | Apply pending migrations |
| `npm run db:seed` | Seed CMS content from `data/` + `messages/` |

## Deploying to Vercel

1. Import the repository in Vercel. Framework preset: **Next.js**. No build
   overrides needed — `npm run build` already regenerates the Prisma client,
   which matters because Vercel restores a dependency cache and can skip
   `postinstall`.
2. Add every variable from [`.env.example`](./.env.example) under
   **Settings → Environment Variables**. At minimum the app needs
   `DATABASE_URL`, `AUTH_SECRET` and `NEXT_PUBLIC_SITE_URL`.
   - `AUTH_SECRET`: generate with `openssl rand -base64 32`.
   - `DATABASE_URL`: use the **pooled** Neon host (`…-pooler…`) so serverless
     functions do not exhaust connections.
   - `NEXT_PUBLIC_SITE_URL`: the production origin, no trailing slash.
3. Run migrations against the production database once:
   `DATABASE_URL="…" npx prisma migrate deploy`
4. Deploy.

Notes:

- `trustHost` is enabled in `auth.js`. Auth.js sits behind Vercel's proxy and
  otherwise rejects sign-in with `UntrustedHost`.
- Uploaded media is served from `res.cloudinary.com`, which is allow-listed in
  `next.config.mjs`. Adding another image host means adding it there too.
- Marketing pages render dynamically because the announcement banner reads
  cookies, so CMS edits appear without a redeploy.

## Architecture

- `app/[locale]/**` — public marketing site, localised via next-intl.
  German is the default locale and is served unprefixed; paths are translated
  (`/pricing` → `/preise`).
- `app/dashboard/**` — admin CMS, gated by Auth.js in `proxy.js` and in the
  layout.
- `app/actions/*.actions.js` — server actions; all writes go through
  `lib/auth-guards.js` and record to the audit log.
- `lib/content-source.js` — public content reads. Every loader falls back to
  the static file that ships with the build if the CMS is empty or the database
  is unreachable, so an outage renders the previous content rather than nothing.
- `prisma/schema.prisma` — 25 models. Localised content uses sibling `*De` /
  `*En` columns; long documents use a row-per-locale plus a version table.
