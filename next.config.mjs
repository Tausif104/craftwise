import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        // Everything uploaded through the media library and article editor is
        // served from here. Without this entry next/image rejects the URL and
        // article banners fail in production.
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // Vercel builds run `next build` on a clean checkout where `generated/` is
  // gitignored, and the Prisma client lives outside node_modules. Tracing it
  // explicitly keeps it in the serverless bundle.
  outputFileTracingIncludes: {
    "/**": ["./generated/prisma/**"],
  },
};

export default withNextIntl(nextConfig);
