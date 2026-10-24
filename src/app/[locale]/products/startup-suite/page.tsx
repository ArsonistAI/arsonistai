import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { suiteParts, STARTUP_SUITE_PATH } from "@/content/startupSuite";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import { SITE_URL, ORG_ID, absoluteUrl, alternatesFor, socialFor } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import StartupSuitePicker from "@/components/StartupSuitePicker";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.startupSuite" });
  return {
    title: t("title"),
    description: t("description"),
    ...socialFor({
      locale,
      path: STARTUP_SUITE_PATH,
      title: t("ogTitle"),
      description: t("ogDescription"),
    }),
    alternates: alternatesFor(locale, STARTUP_SUITE_PATH),
  };
}

export default async function StartupSuitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StartupSuiteContent locale={locale} />;
}

function StartupSuiteContent({ locale }: { locale: string }) {
  const t = useTranslations("products.startupSuite");
  const tn = useTranslations("nav");

  const how = t.raw("how") as { title: string; body: string }[];
  const pageUrl = absoluteUrl(locale, STARTUP_SUITE_PATH);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#product`,
    name: t("title"),
    description: t("intro"),
    url: pageUrl,
    image: `${SITE_URL}/images/products/startup-suite.svg`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: { "@id": ORG_ID },
    hasPart: suiteParts.map((part) => ({
      "@type": "SoftwareApplication",
      name: t(`items.${part.messageKey}.title`),
      description: t(`items.${part.messageKey}.body`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: tn("products"), path: "/products" },
          { name: t("title"), path: STARTUP_SUITE_PATH },
        ]}
      />

      <section className="pt-36 md:pt-44 pb-8">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/products"
            className="text-label-lg text-lava mb-8 inline-block hover:underline"
          >
            &larr; {t("back")}
          </Link>
          <p className="text-label-lg text-lava uppercase tracking-widest mb-4">
            {t("label")}
          </p>
          <h1 className="text-display-sm md:text-display-md font-bold mb-8 leading-tight text-balance">
            {t("heroTitle")}
          </h1>
          <p className="text-body-lg text-muted leading-relaxed text-pretty mb-6">
            {t("intro")}
          </p>
          <p className="text-body-lg text-foreground leading-relaxed text-pretty border-l-2 border-lava pl-5">
            {t("status")}
          </p>
        </div>
      </section>

      <StartupSuitePicker />

      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-headline-md font-bold mb-10">{t("howHeading")}</h2>
          <div className="space-y-10">
            {how.map((item, i) => (
              <div key={i}>
                <h3 className="text-title-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-body-lg text-muted leading-relaxed text-pretty">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
