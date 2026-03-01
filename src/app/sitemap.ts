import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { caseStudies } from "@/content/caseStudies";

const siteUrl = "https://arsonistai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "es"];

  const staticPages = [
    "",
    "/about-us",
    "/services",
    "/products",
    "/partnerships",
    "/insights",
    "/privacy-policy",
    "/legal-terms",
  ];

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}${page}`])
        ),
      },
    }))
  );

  const postEntries = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${siteUrl}/${locale}/insights/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}/insights/${post.slug}`])
        ),
      },
    }))
  );

  const caseStudyEntries = locales.flatMap((locale) =>
    caseStudies.map((cs) => ({
      url: `${siteUrl}/${locale}/work/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}/work/${cs.slug}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...postEntries, ...caseStudyEntries];
}
