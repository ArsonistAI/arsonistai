import { absoluteUrl } from "@/lib/seo";

interface BreadcrumbItem {
  /** Visible crumb label. Pass a translated string, not a hardcoded English one. */
  name: string;
  /** Route after the locale prefix, e.g. "/services". Empty string for Home. */
  path: string;
}

export function BreadcrumbJsonLd({
  locale,
  items,
}: {
  locale: string;
  items: BreadcrumbItem[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
