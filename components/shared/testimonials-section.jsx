import { getTestimonials } from "@/lib/content-source";
import TestimonialSectionClient from "@/components/testimonial";

/**
 * Testimonials section, CMS-backed (server).
 *
 * Kept separate from `components/testimonial.jsx` on purpose: that file is a
 * client component and is imported by other client components (the about-us
 * section). Putting the database read there would pull Prisma — and therefore
 * `pg`/`dns` — into the client bundle and break the build.
 *
 * Server pages import this; it reads the CMS for the given page and locale and
 * falls back to the `data` passed in when the CMS has nothing placed there or
 * the database is unreachable.
 */
export default async function TestimonialsSection({
  data,
  bg,
  heading,
  subtext,
  pageKey,
  locale = "de",
}) {
  const cmsItems = pageKey ? await getTestimonials(pageKey, locale) : null;
  const resolved = cmsItems?.length ? { ...data, items: cmsItems } : data;

  if (!resolved?.items?.length) return null;

  return (
    <TestimonialSectionClient
      data={resolved}
      bg={bg}
      heading={heading}
      subtext={subtext}
    />
  );
}
