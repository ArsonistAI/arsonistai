import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: cspDirectives },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // A stray lockfile higher up the tree makes Next guess the wrong workspace
  // root, so pin it to this project.
  turbopack: { root: __dirname },
  images: {
    // Vercel serves these through /_next/image, so modern formats and
    // responsive srcsets come for free. Leaving this unoptimized was shipping
    // multi-megabyte PNGs to every visitor.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // A permanent redirect, so search engines consolidate the bare origin
      // into /en. The redirect() in app/page.tsx answers 307, which is temporary.
      { source: "/", destination: "/en", permanent: true },
      // URLs from the old WordPress site, which had no locale prefix and kept
      // posts at the root. Google still crawls them and reports them as 404s.
      {
        source:
          "/:page(about-us|services|products|partnerships|insights|case-studies|privacy-policy|legal-terms)",
        destination: "/en/:page",
        permanent: true,
      },
      { source: "/:page(work|work-single)", destination: "/en/case-studies", permanent: true },
      {
        source:
          "/:slug(introducing-product-kpis-bringing-measurable-impact-into-your-design-workflow|why-choosing-the-right-kpis-makes-all-the-difference-in-product-success|containment-not-catastrophe-9-practical-ways-to-regulate-ai-before-it-regulates-us|10-ways-to-incorporate-ai-into-everyday-life|lean-product-canvas-interactive-figma-templates|would-you-date-an-ai|how-to-use-figma-to-manage-your-brand|what-designers-need-to-know-about-ai|excited-or-terrified-what-people-really-think-about-ai)",
        destination: "/en/insights/:slug",
        permanent: true,
      },
      // Retired services keep their indexed URLs pointing somewhere useful.
      {
        source:
          "/:locale(en|es)/services/:slug(product-design|content-generation|concept-visualization|exploration-scaling)",
        destination: "/:locale/services",
        permanent: true,
      },
      {
        source:
          "/services/:slug(product-design|content-generation|concept-visualization|exploration-scaling)",
        destination: "/en/services",
        permanent: true,
      },
      {
        source: "/:locale(en|es)/work/moneyball-ats",
        destination: "/:locale/work/evidence-based-ats",
        permanent: true,
      },
      {
        source: "/work/moneyball-ats",
        destination: "/en/work/evidence-based-ats",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
