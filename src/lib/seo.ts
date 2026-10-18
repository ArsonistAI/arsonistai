import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/** Canonical production origin. Single source of truth for every absolute URL. */
export const SITE_URL = "https://arsonistai.com";

/** Stable schema.org node ids so entities are declared once and referenced by id. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const LOCALES = routing.locales;
export const DEFAULT_LOCALE = routing.defaultLocale;

type Alternates = NonNullable<Metadata["alternates"]>;

/** Absolute, locale-prefixed URL. `path` is the route after the locale, e.g. "/services". */
export function absoluteUrl(locale: string, path = ""): string {
  return `${SITE_URL}/${locale}${path}`;
}

/**
 * Canonical + hreflang alternates for a page.
 * Always emits x-default alongside every locale so search engines have a fallback.
 */
export function alternatesFor(locale: string, path = ""): Alternates {
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [l, absoluteUrl(l, path)])
  );
  languages["x-default"] = absoluteUrl(DEFAULT_LOCALE, path);

  return {
    canonical: absoluteUrl(locale, path),
    languages,
  };
}

/** Site-wide Open Graph image. 1200x630, matching what the file actually is. */
export const OG_IMAGE = {
  url: `${SITE_URL}/images/og-image.jpg`,
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "ArsonistAI: AI Integration Firm",
};

type OpenGraph = NonNullable<Metadata["openGraph"]>;
type Twitter = NonNullable<Metadata["twitter"]>;

interface SocialOpts {
  locale: string;
  path?: string;
  title: string;
  description: string;
  /** Absolute URL of a page-specific image, replacing the site default. */
  image?: string;
}

/**
 * Open Graph block for a page.
 *
 * Next replaces a parent's `openGraph` object wholesale when a child sets one,
 * so a page declaring only { title, description } silently loses the site-wide
 * image. Going through this helper keeps the image and locale on every page.
 */
export function openGraphFor(opts: SocialOpts): OpenGraph {
  return {
    type: "website",
    siteName: "ArsonistAI",
    locale: opts.locale === "es" ? "es_ES" : "en_US",
    url: absoluteUrl(opts.locale, opts.path ?? ""),
    title: opts.title,
    description: opts.description,
    images: opts.image ? [{ url: opts.image }] : [OG_IMAGE],
  };
}

/**
 * Twitter card for a page. The root layout sets a site-wide card, and without
 * an override every page shares on X with the homepage title.
 */
export function twitterFor(opts: SocialOpts): Twitter {
  return {
    card: "summary_large_image",
    title: opts.title,
    description: opts.description,
    images: [opts.image ?? OG_IMAGE.url],
  };
}

/** Open Graph and Twitter together, so a page cannot set one and forget the other. */
export function socialFor(opts: SocialOpts): {
  openGraph: OpenGraph;
  twitter: Twitter;
} {
  return { openGraph: openGraphFor(opts), twitter: twitterFor(opts) };
}
