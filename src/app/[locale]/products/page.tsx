import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { products } from "@/content/products";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import ProductCard from "@/components/ProductCard";
import { SITE_URL, ORG_ID, absoluteUrl, alternatesFor, openGraphFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.products" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: openGraphFor({
      locale,
      path: "/products",
      title: t("ogTitle"),
      description: t("ogDescription"),
    }),
    alternates: alternatesFor(locale, "/products"),
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsContent locale={locale} />;
}

function ProductsContent({ locale }: { locale: string }) {
  const tn = useTranslations("nav");
  const t = useTranslations("products");
  const tAll = useTranslations();

  const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        // SoftwareApplication rather than Product: these are Figma plugins and
        // toolkits sold elsewhere, so Product would demand `offers` we do not
        // have and would only earn "missing field" warnings in Search Console.
        "@type": "SoftwareApplication",
        "@id": `${absoluteUrl(locale, "/products")}#${product.id}`,
        name: tAll(product.titleKey),
        image: `${SITE_URL}${product.image}`,
        url: product.url,
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        publisher: { "@id": ORG_ID },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: tn("products"), path: "/products" },
        ]}
      />
      <section className="py-36 md:py-44">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-display-sm md:text-display-md font-bold mb-14">
          {t("heading")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
