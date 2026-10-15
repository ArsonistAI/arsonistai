import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import ContactForm from "@/components/ContactForm";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.partnerships" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: openGraphFor({
      locale,
      path: "/partnerships",
      title: t("ogTitle"),
      description: t("ogDescription"),
    }),
    alternates: alternatesFor(locale, "/partnerships"),
  };
}

export default async function PartnershipsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PartnershipsContent locale={locale} />;
}

function PartnershipsContent({ locale }: { locale: string }) {
  const tn = useTranslations("nav");
  const t = useTranslations("partnerships");

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: tn("partnerships"), path: "/partnerships" },
        ]}
      />
      <section className="py-36 md:py-44">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-display-sm md:text-display-md font-bold mb-8">
            {t("heading")}
          </h1>
          <p className="text-body-lg text-muted leading-relaxed max-w-3xl">
            {t("text")}
          </p>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
