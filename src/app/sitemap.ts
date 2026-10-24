import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { caseStudies } from "@/content/caseStudies";
import { services } from "@/content/services";
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from "@/lib/seo";

/**
 * Last substantive edit per static route.
 * Kept as literal dates on purpose: deriving these from `new Date()` marks the
 * whole site as changed on every deploy, which teaches crawlers to ignore the
 * signal entirely. Update the date here when a page's content actually changes.
 */
const staticPages: { path: string; lastModified: string; priority: number }[] = [
  { path: "", lastModified: "2026-10-18", priority: 1.0 },
  { path: "/about-us", lastModified: "2026-10-18", priority: 0.8 },
  { path: "/services", lastModified: "2026-10-18", priority: 0.9 },
  { path: "/products", lastModified: "2026-10-23", priority: 0.8 },
  { path: "/products/startup-suite", lastModified: "2026-10-23", priority: 0.8 },
  { path: "/partnerships", lastModified: "2026-10-14", priority: 0.8 },
  { path: "/insights", lastModified: "2026-10-18", priority: 0.8 },
  { path: "/case-studies", lastModified: "2026-10-18", priority: 0.8 },
  { path: "/privacy-policy", lastModified: "2026-02-28", priority: 0.3 },
  { path: "/legal-terms", lastModified: "2026-02-28", priority: 0.3 },
];

/** hreflang alternates for one path across every locale, including x-default. */
function languagesFor(path: string) {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
    "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
  };
}

/** One sitemap entry per locale for a given path. */
function entriesFor(
  path: string,
  lastModified: string | Date,
  changeFrequency: "weekly" | "monthly",
  priority: number
) {
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
    alternates: { languages: languagesFor(path) },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPages.flatMap((page) =>
    entriesFor(
      page.path,
      page.lastModified,
      page.path === "" ? "weekly" : "monthly",
      page.priority
    )
  );

  const serviceEntries = services.flatMap((service) =>
    entriesFor(
      `/services/${service.id}`,
      service.lastModified ?? "2026-03-18",
      "monthly",
      0.8
    )
  );

  const postEntries = posts.flatMap((post) =>
    entriesFor(
      `/insights/${post.slug}`,
      post.lastModified ?? post.date,
      "monthly",
      0.6
    )
  );

  const caseStudyEntries = caseStudies.flatMap((cs) =>
    entriesFor(`/work/${cs.slug}`, cs.lastModified, "monthly", 0.7)
  );

  return [
    ...staticEntries,
    ...serviceEntries,
    ...postEntries,
    ...caseStudyEntries,
  ];
}
