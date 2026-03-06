import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { caseStudies } from "@/content/caseStudies";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import { Link } from "@/i18n/navigation";

const SITE_URL = "https://arsonistai.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.caseStudies" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/case-studies`,
      languages: {
        en: `${SITE_URL}/en/case-studies`,
        es: `${SITE_URL}/es/case-studies`,
      },
    },
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CaseStudiesContent locale={locale} />;
}

function CaseStudiesContent({ locale }: { locale: string }) {
  const t = useTranslations("caseStudies");

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "Home", path: "" },
          { name: t("heading"), path: "/case-studies" },
        ]}
      />
      <section className="py-36 md:py-44">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-display-sm md:text-display-md font-bold mb-14">
            {t("heading")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <article
                key={study.slug}
                className="bg-surface rounded-shape-lg overflow-hidden border border-border hover:border-lava/40 m3-card flex flex-col"
              >
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block flex-shrink-0"
                >
                  <div
                    className="w-full overflow-hidden bg-surface-light"
                    style={{ aspectRatio: "332/263" }}
                  >
                    <img
                      src={study.heroImage}
                      alt={study.displayName ?? study.title}
                      loading="lazy"
                      width={332}
                      height={263}
                      className="w-full h-full object-cover group-hover:scale-105 m3-transition-medium transition-transform"
                    />
                  </div>
                </a>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-title-md mb-2">
                    {study.displayName ?? study.title}
                  </h2>
                  <p className="text-body-sm text-muted mb-4 line-clamp-3 flex-1">
                    {study.summary}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-label-lg text-lava hover:underline"
                    >
                      {t("visitSite")} &rarr;
                    </a>
                    <Link
                      href={`/work/${study.slug}`}
                      className="text-label-lg text-muted hover:text-lava hover:underline"
                    >
                      {t("readCaseStudy")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
