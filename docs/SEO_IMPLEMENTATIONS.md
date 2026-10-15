# SEO Implementations — ArsonistAI

This document lists all SEO work implemented on the site and can be used as a reference or instruction set for optimizing other projects for search.

---

## 1. Root metadata (site-wide)

**Location:** `src/app/layout.tsx`

- **metadataBase** — Set to the production URL (`https://arsonistai.com`) so relative URLs in metadata resolve correctly.
- **Title** — Default title and template (`%s — ArsonistAI`) for consistent branding in tabs and search results.
- **Description** — Single, keyword-rich default description for the site.
- **Keywords** — Array of target phrases (e.g. "AI design firm", "AI design agency", "AI consulting") for discovery.
- **Authors / creator / publisher** — Set to the brand for attribution.
- **Icons** — Favicon path for browser tabs and bookmarks.
- **Open Graph** — Default `type`, `locale`, `alternateLocale`, `url`, `siteName`, `title`, `description`, and `images` (1200×630 OG image) for social sharing.
- **Twitter** — `summary_large_image` card with title, description, and image.
- **Alternates** — Root canonical and `languages` (en, es) for hreflang.
- **Robots** — `index: true`, `follow: true`, and Google-specific directives for snippets.
- **Manifest** — Link to `/manifest.json` for PWA.

**Best practice:** Keep one source of truth for the site URL and reuse it for canonicals, OG URLs, and sitemap.

---

## 2. robots.txt

**Location:** `src/app/robots.ts` (Next.js generates `/robots.txt`)

- **Allow** — `"/"` for all user agents.
- **Disallow** — `["/api/"]` (or any non-indexable paths).
- **Sitemap** — Absolute URL to `https://arsonistai.com/sitemap.xml`.

**Best practice:** Point crawlers to your sitemap and block only paths that should not be indexed (e.g. API, admin, internal tools).

---

## 3. Sitemap

**Location:** `src/app/sitemap.ts`

- **Static pages** — All locale-prefixed routes (home, about-us, services, products, partnerships, insights, privacy-policy, legal-terms) with `lastModified`, `changeFrequency`, `priority`, and `alternates.languages`.
- **Dynamic content** — Blog posts (`/insights/[slug]`) and case studies (`/work/[slug]`) with locale alternates.
- **Priorities** — Homepage `1.0`, main sections `0.8`, posts `0.6`, case studies `0.7`.

**Best practice:** Include every indexable URL, set realistic `changeFrequency` and `priority`, and provide `alternates.languages` for multi-language sites.

---

## 4. Per-page metadata (locale-aware)

**Locations:** All main pages under `src/app/[locale]/` (home, about-us, services, products, insights, partnerships, privacy-policy, legal-terms).

- **generateMetadata** — Used instead of static `export const metadata` so titles and descriptions can be translated.
- **Translations** — `meta.*` keys in `messages/en.json` and `messages/es.json` (e.g. `meta.services.title`, `meta.services.description`, `meta.services.ogTitle`, `meta.services.ogDescription`).
- **Per-page canonical** — Each page sets `alternates.canonical` to `https://arsonistai.com/{locale}/{path}`.
- **Language alternates** — Each page sets `alternates.languages: { en: "...", es: "..." }` for the same path in both locales.

**Best practice:** For localized sites, never hardcode English metadata on localized routes; use `getTranslations()` in `generateMetadata` and keep a single `SITE_URL` constant.

---

## 5. Canonical URLs

- **Root layout** — Default canonical is the site root; `alternates.languages` point to `/en` and `/es`.
- **Every other page** — Canonical is the current locale path (e.g. `https://arsonistai.com/en/services`). Language alternates point to the same path in the other locale.

**Best practice:** One canonical URL per logical page; use `alternates.canonical` and `alternates.languages` so search engines understand language variants and avoid duplicate-content issues.

---

## 6. Structured data (JSON-LD)

### 6.1 Organization & WebSite (global)

**Location:** `src/app/[locale]/layout.tsx` (in `<head>`)

- **Organization** — `@type: "Organization"`, `name`, `url`, `logo`, `description`, `email`, `sameAs` (Instagram, LinkedIn), `knowsAbout` (topics).
- **WebSite** — `@type: "WebSite"`, `name`, `url`, `inLanguage` (from current locale), `description`.

**Best practice:** Keep `sameAs` in sync with the footer social links so brand and profiles are clearly connected.

### 6.2 BreadcrumbList (subpages)

**Location:** `src/lib/breadcrumbJsonLd.tsx`; used on about-us, services, products, insights, partnerships, insights/[slug], work/[slug].

- **BreadcrumbJsonLd** — Accepts `locale` and `items: { name, path }[]`. Builds full URLs as `SITE_URL/{locale}{path}`.
- **Items** — Home (path `""`), then section and optional detail (e.g. Home → Insights → Post title).

**Best practice:** Use the current request locale when generating breadcrumb URLs so the structured data matches the page language.

### 6.3 BlogPosting (insights)

**Location:** `src/app/[locale]/insights/[slug]/page.tsx`

- **@type** — `"BlogPosting"`.
- **Fields** — `headline`, `datePublished`, `author` (Person), `image`, `publisher` (Organization), `mainEntityOfPage`.

**Best practice:** Use the same headline and date as the visible content; reference a stable Organization ID if you use one.

### 6.4 Service (services page)

**Location:** `src/app/[locale]/services/page.tsx`

- Each service has `@type: "Service"`, `name`, `description`, `provider` (ArsonistAI Organization).
- Shown as an `ItemList` of services where appropriate.

**Best practice:** Descriptions should match or summarize the visible service copy so rich results stay accurate.

### 6.5 Product (products page)

**Location:** `src/app/[locale]/products/page.tsx`

- Each product has `@type: "Product"`, `name`, `image`, `url`, `brand` (ArsonistAI).
- Listed in an `ItemList` where appropriate.

**Best practice:** Use absolute image URLs and the exact product URL so product snippets can be generated correctly.

---

## 7. Open Graph & social

- **Default OG/Twitter** — Set in root `layout.tsx` (title, description, image).
- **OG image** — `public/images/og-image.jpg` (1200×630, 88 KB), branded (e.g. logo + “AI Design Firm”), dark theme and accent color.
- **Per-page OG** — Optional overrides in each page’s `generateMetadata` (e.g. `openGraph.title`, `openGraph.description`) using translated strings.

**Best practice:** Provide one high-quality OG image per site or section; use locale-aware titles/descriptions for shared links.

---

## 8. Custom 404

**Location:** `src/app/[locale]/not-found.tsx`

- Uses existing `notFound` translations (`notFound.heading`, `notFound.text`, `notFound.backHome`).
- Single clear heading, short message, and link back to home.
- Styling consistent with the rest of the site.

**Best practice:** Give 404s a proper title (e.g. “Page Not Found”) and a clear way back so users and crawlers understand the outcome.

---

## 9. Visible keyword content

- **Homepage hero** — The phrase “AI design firm” (and Spanish equivalent) appears in the visible hero tagline, not only in metadata (e.g. “Your AI design firm — scale your business with AI” / “Tu firma de diseño con IA — escala tu negocio con IA”).

**Best practice:** Include primary target phrases in the main body content (e.g. above the fold) so rankings and snippets align with what users see.

---

## 10. PWA manifest

**Location:** `public/manifest.json`

- **name / short_name** — “ArsonistAI”.
- **description** — One line describing the site.
- **start_url** — `/en` (or your default locale).
- **display** — `standalone`.
- **theme_color** — `#FF4000` (brand accent).
- **background_color** — `#0A0A0A` (background).
- **icons** — Reference to existing favicon (e.g. 192×192).

**Linked in:** `src/app/layout.tsx` via `manifest: "/manifest.json"`.

**Best practice:** Use brand colors and a sensible `start_url`; keep icon paths correct so “Add to Home Screen” works.

---

## 11. Accessibility (SEO-adjacent)

- **Skip link** — “Skip to main content” before the navbar, targeting `#main-content`.
- **Main landmark** — `<main id="main-content">` in the locale layout.
- **Nav** — `aria-label="Main navigation"` on the main `<nav>`.
- **Mobile menu** — `aria-expanded` on the hamburger button.
- **Footer** — `aria-label="Back to top"` on the back-to-top control.
- **Language switcher** — `aria-label` per locale (e.g. “Switch to English”).
- **Client marquee** — `aria-label="Our clients"` on the section.

**Best practice:** Landmarks and labels help assistive tech and can support how crawlers interpret structure; keep nav and interactive elements clearly labeled.

---

## 12. Semantic HTML & headings

- **About page** — Primary page title is an `<h1>` (not a `<p>`) so the main topic is clear.
- **Cards** — Service, Product, and Insight cards use `<article>` (or equivalent) so each item is a distinct content unit.

**Best practice:** One logical `<h1>` per page; use `<article>`/`<section>` for list items and distinct blocks so structure supports snippets and clarity.

---

## 13. Images

- **Lazy loading** — `loading="lazy"` on below-the-fold images (e.g. post hero, case study hero, InsightCard, ProductCard).
- **Dimensions** — Explicit `width` and `height` on logos and key images to reduce CLS.
- **Alt text** — Descriptive `alt` for all content images (e.g. “Cognizant logo” for client logos).

**Best practice:** Lazy load non-critical images; always set dimensions and meaningful alt for accessibility and Core Web Vitals.

---

## 14. Performance hints

**Location:** `src/app/[locale]/layout.tsx` `<head>`

- **preconnect** — For critical third-party origins (e.g. `https://challenges.cloudflare.com` if using Turnstile).
- **dns-prefetch** — Same origins as preconnect for broader browser support.

**Best practice:** Preconnect to origins used early (forms, analytics, captcha); avoid preconnecting to too many domains.

---

## 15. Social links & sameAs

- **Footer** — Only the desired channels (e.g. Instagram, LinkedIn); no Facebook/X. Links use full URLs (e.g. `https://www.instagram.com/arsonistai/`, `https://www.linkedin.com/company/arsonistai/`).
- **Organization sameAs** — The same URLs are listed in the Organization JSON-LD so brand and profiles are tied together.

**Best practice:** Keep footer links and `sameAs` identical and up to date so search engines and users see one consistent set of profiles.

---

## Checklist for new pages or new sites

- [ ] Unique, translated `title` and `description` (via `generateMetadata` if localized).
- [ ] `alternates.canonical` and `alternates.languages` for the page.
- [ ] BreadcrumbList JSON-LD if the page is a subpage (with correct `locale` and paths).
- [ ] Article/Service/Product JSON-LD if the page type warrants it.
- [ ] One `<h1>` and logical heading hierarchy.
- [ ] Images: `loading="lazy"` where appropriate, `width`/`height`, and `alt`.
- [ ] Sitemap and robots.txt include the new URL and any locale variants.

---

---

## Fourth SEO pass

### 16. Shared SEO helpers (`src/lib/seo.ts`)

`SITE_URL` was previously redeclared in seven files. It now lives in one module alongside:

- `ORG_ID` / `WEBSITE_ID` — stable schema.org node ids.
- `absoluteUrl(locale, path)` — locale-prefixed absolute URLs for JSON-LD and breadcrumbs.
- `alternatesFor(locale, path)` — canonical plus `en`, `es`, and `x-default` hreflang.
- `openGraphFor({ locale, path, title, description, image })` — Open Graph with the site image, `og:url`, `og:locale`, and `siteName` filled in.
- `OG_IMAGE` — the site-wide 1200x630 card.

**Why it matters:** Next.js replaces a parent's `alternates` and `openGraph` objects wholesale when a child sets them; it does not deep-merge. Any page declaring a partial object silently loses everything the parent supplied. Routing both through helpers makes that failure impossible rather than merely unlikely.

### 17. Canonical and hreflang bugs fixed

- `insights/[slug]` and `work/[slug]` declared `alternates.languages` with no `canonical`, so every blog post and case study shipped with no canonical at all.
- The root canonical pointed at `https://arsonistai.com`, which redirects to `/en`. A canonical must never point at a redirect. It is now `/en`.
- No page emitted `x-default`. Every page now does.

### 18. Open Graph image restored site-wide

Every page setting `openGraph: { title, description }` was dropping the site-wide OG image, the homepage included. Sharing the site produced a bare link. All pages now emit `og:image`, with page-specific images on services, case studies, and blog posts.

### 19. Sitemap corrections

- `/case-studies` was missing entirely and is now included.
- `/services/[slug]` routes added (8 services x 2 locales).
- `lastModified` used `new Date()`, marking the whole site as changed on every deploy. It now reads real per-entry dates from `staticPages`, `post.lastModified`, and `CaseStudy.lastModified`.
- All 54 entries carry `x-default` alternates.

### 20. Structured data

- Organization declared once in `src/app/[locale]/layout.tsx` with `@id`, typed as `["Organization", "ProfessionalService"]`, with `contactPoint`, `areaServed`, and `serviceType`. Services, products, and articles reference it as `{ "@id": ORG_ID }` instead of restating partial copies.
- `BlogPosting.mainEntityOfPage` was hardcoded to `/en/`, so Spanish posts declared the English URL as their canonical entity. It now follows the request locale, and the node gained `inLanguage`, real `dateModified`, `wordCount`, and `articleSection`.
- Case studies emit `Article` with `about` pointing at the client organization.
- Products switched from `Product` to `SoftwareApplication`. They are sold off-site, so `Product` would demand `offers` we do not have and earn only "missing field" warnings.
- `FAQPage` on every service detail page.
- `VideoObject` for the demo reel, backed by a real poster frame.
- Breadcrumb labels were hardcoded English on Spanish pages. They now come from `nav.*` translations, and `work/[slug]` no longer emits a "Work" crumb pointing at the homepage.

### 21. Localization gaps closed

`work/[slug]` served English titles and descriptions on Spanish URLs while claiming a Spanish hreflang pair. `CaseStudy` now carries `LocalizedText` for title, summary, and section prose, matching the `content: { en, es }` shape in `posts.ts`. Post dates, the demo reel headings, and the "Back to Insights" link are also localized now.

### 22. Images and Core Web Vitals

- `images: { unoptimized: true }` removed. AVIF and WebP are enabled, so Vercel serves responsive srcsets.
- Content images converted to `next/image`. The three remaining raw `<img>` tags are SVG logos and the client marquee, where optimization gains nothing.
- `og-image.png` was **4.5 MB at 2848x1504**, despite the metadata declaring 1200x630. Replaced with an 88 KB JPEG at the correct dimensions.
- The demo reel gained a poster frame, replacing a bare CSS gradient.

### 23. 404 handling

`[locale]/not-found.tsx` had no metadata and inherited the root title. A root `app/not-found.tsx` was also added: URLs matching no route at all previously fell through to Next's unbranded default, which inherited the root layout's `index, follow` and emitted a conflicting pair of robots tags. Both paths now return HTTP 404 with a branded page and `noindex, follow`.

### 24. Search console verification

`verification.google` and `msvalidate.01` read from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION`. Tags are omitted when the variables are unset. Both are documented in `.env.local.example`.

### 25. Service detail pages

`/services` was a single URL carrying eight services, so no page could rank for any individual service term. Each service now has its own indexable route at `/services/[slug]` with unique metadata, an `h1`, a three-step process section, a deliverables list, four FAQs, `Service` and `FAQPage` schema, and links to sibling services. `/services` became the hub linking to all eight.

---

*Last updated to reflect the fourth SEO pass (shared helpers, canonical and OG merge bugs, sitemap accuracy, schema depth, image optimization, 404 handling, service detail pages).*
