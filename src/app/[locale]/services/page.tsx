import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { services, serviceMessageKey } from "@/content/services";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import ContactForm from "@/components/ContactForm";
import { Link } from "@/i18n/navigation";
import { ORG_ID, absoluteUrl, alternatesFor, openGraphFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: openGraphFor({
      locale,
      path: "/services",
      title: t("ogTitle"),
      description: t("ogDescription"),
    }),
    alternates: alternatesFor(locale, "/services"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesContent locale={locale} />;
}

function ServicesContent({ locale }: { locale: string }) {
  const tn = useTranslations("nav");
  const t = useTranslations("services");
  const tAll = useTranslations();
  const td = useTranslations("services.detail");

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        // Same @id the detail page declares, so the hub listing and the detail
        // page describe one entity rather than two competing ones.
        "@id": `${absoluteUrl(locale, `/services/${service.id}`)}#service`,
        name: tAll(service.titleKey),
        description: tAll(`${serviceMessageKey(service)}.metaDescription`),
        url: absoluteUrl(locale, `/services/${service.id}`),
        provider: { "@id": ORG_ID },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: tn("services"), path: "/services" },
        ]}
      />
      <section className="py-36 md:py-44">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-display-sm md:text-display-md font-bold mb-4">
            {t("heading")}
          </h1>
          <p className="text-body-lg text-muted">{t("subheading")}</p>
        </div>
      </section>

      {services.map((service, index) => {
        const showSubsectionHeading =
          service.sectionKey &&
          (index === 0 || services[index - 1].sectionKey !== service.sectionKey);
        const subsectionHeadingKey =
          service.sectionKey === "applicationServices"
            ? "applicationServicesHeading"
            : null;

        return (
          <section key={service.id} className="relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="border-t border-border" />

              {showSubsectionHeading && subsectionHeadingKey && (
                <h2 className="text-headline-md font-bold pt-16 pb-4">
                  {t(subsectionHeadingKey)}
                </h2>
              )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 py-20 md:py-24 items-start">
              <div className="flex flex-col gap-6">
                <div className="relative w-full aspect-[332/263] rounded-shape-lg overflow-hidden bg-surface-container">
                  <Image
                    src={service.image}
                    alt={tAll(service.titleKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div>
                  <p className="text-label-lg text-lava uppercase tracking-wider mb-2">
                    {t("label")}
                  </p>
                  <h2 className="text-headline-md md:text-headline-lg font-bold">
                    <Link
                      href={`/services/${service.id}`}
                      className="hover:text-lava m3-transition transition-colors"
                    >
                      {tAll(service.titleKey)}
                    </Link>
                  </h2>
                </div>
              </div>

              <div className="flex flex-col items-start gap-6 pt-0 md:pt-8">
                <p className="text-body-lg text-muted leading-relaxed">
                  {tAll(service.longDescriptionKey)}
                </p>
                <Link
                  href={`/services/${service.id}`}
                  className="text-label-lg text-lava hover:underline"
                >
                  {td("readMore")} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
        );
      })}

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
