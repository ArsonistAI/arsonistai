import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { services } from "@/content/services";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import ContactForm from "@/components/ContactForm";

const SITE_URL = "https://arsonistai.com";

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
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/services`,
      languages: { en: `${SITE_URL}/en/services`, es: `${SITE_URL}/es/services` },
    },
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
  const t = useTranslations("services");
  const tAll = useTranslations();

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: tAll(service.titleKey),
        description: tAll(service.longDescriptionKey),
        provider: {
          "@type": "Organization",
          name: "ArsonistAI",
          url: "https://arsonistai.com",
        },
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
          { name: "Home", path: "" },
          { name: "Services", path: "/services" },
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

      {services.map((service) => (
        <section key={service.id} className="relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-border" />

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
                    {tAll(service.titleKey)}
                  </h2>
                </div>
              </div>

              <div className="flex items-start pt-0 md:pt-8">
                <p className="text-body-lg text-muted leading-relaxed">
                  {tAll(service.longDescriptionKey)}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
