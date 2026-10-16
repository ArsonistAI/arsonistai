import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { caseStudies, localized } from "@/content/caseStudies";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import { Link } from "@/i18n/navigation";
import { alternatesFor, openGraphFor } from "@/lib/seo";

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
    openGraph: openGraphFor({
      locale,
      path: "/case-studies",
      title: t("ogTitle"),
      description: t("ogDescription"),
    }),
    alternates: alternatesFor(locale, "/case-studies"),
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
  const tn = useTranslations("nav");

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: t("heading"), path: "/case-studies" },
        ]}
      />
      <section className="py-36 md:py-44">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-display-sm md:text-display-md font-bold mb-14">
            {t("heading")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => {
              const title = study.displayName ?? localized(study.title, locale);
              return (
                <article
                  key={study.slug}
                  className="bg-surface rounded-shape-lg overflow-hidden border border-border hover:border-lava/40 m3-card flex flex-col"
                >
                  {/* Primary link is internal: the /work/[slug] page is what we
                      want crawled and ranked, not the client's site. */}
                  <Link
                    href={`/work/${study.slug}`}
                    className="group block flex-shrink-0"
                  >
                    <div
                      className="w-full overflow-hidden bg-surface-light"
                      style={{ aspectRatio: "332/263" }}
                    >
                      <Image
                        src={study.heroImage}
                        alt={title}
                        width={332}
                        height={263}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 332px"
                        className="w-full h-full object-cover group-hover:scale-105 m3-transition-medium transition-transform"
                      />
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-title-md mb-2">
                      <Link
                        href={`/work/${study.slug}`}
                        className="hover:text-lava m3-transition transition-colors"
                      >
                        {title}
                      </Link>
                    </h2>
                    <p className="text-body-sm text-muted mb-4 line-clamp-3 flex-1">
                      {localized(study.summary, locale)}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/work/${study.slug}`}
                        className="text-label-lg text-lava hover:underline"
                      >
                        {t("readCaseStudy")} &rarr;
                      </Link>
                      {study.url && (
                        <a
                          href={study.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-label-lg text-muted hover:text-lava hover:underline"
                        >
                          {t("visitSite")}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
