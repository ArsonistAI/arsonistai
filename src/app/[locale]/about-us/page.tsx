import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import ContactForm from "@/components/ContactForm";
import CopyEmailButton from "@/components/CopyEmailButton";
import TrefoilViewerWrapper from "@/components/TrefoilViewerWrapper";

const SITE_URL = "https://arsonistai.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/about-us`,
      languages: { en: `${SITE_URL}/en/about-us`, es: `${SITE_URL}/es/about-us` },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent locale={locale} />;
}

function AboutContent({ locale }: { locale: string }) {
  const t = useTranslations("about");

  const values = [
    { title: t("value1Title"), text: t("value1Text") },
    { title: t("value2Title"), text: t("value2Text") },
    { title: t("value3Title"), text: t("value3Text") },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "Home", path: "" },
          { name: "About Us", path: "/about-us" },
        ]}
      />
      <section className="py-36 md:py-44 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 min-w-0">
            <h1 className="text-label-lg text-lava uppercase tracking-widest mb-6">
              {t("heading")}
            </h1>
            <p className="text-headline-sm md:text-headline-md text-muted leading-relaxed max-w-3xl">
              {t("intro")}
            </p>
          </div>
          <div className="flex-1 min-w-0 w-full lg:w-auto">
            <TrefoilViewerWrapper />
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-label-lg text-lava uppercase tracking-widest mb-6">
            {t("missionHeading")}
          </h2>
          <p className="text-headline-md md:text-headline-lg font-bold leading-tight max-w-3xl">
            {t("missionText")}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-label-lg text-lava uppercase tracking-widest mb-14">
            {t("valuesHeading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-8 bg-surface rounded-shape-xl border border-border m3-card"
              >
                <h3 className="text-title-lg mb-3">{v.title}</h3>
                <p className="text-body-md text-muted leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-headline-md font-bold mb-4">
            {t("careersHeading")}
          </h2>
          <p className="text-body-lg text-muted mb-8">{t("careersText")}</p>
          <CopyEmailButton />
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
