import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { caseStudies, localized } from "@/content/caseStudies";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import {
  SITE_URL,
  ORG_ID,
  absoluteUrl,
  alternatesFor,
  openGraphFor,
} from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) return {};

  const t = await getTranslations({ locale, namespace: "work" });
  const title = localized(study.title, locale);
  const description = localized(study.metaDescription, locale);

  return {
    title,
    description,
    openGraph: {
      ...openGraphFor({
        locale,
        path: `/work/${slug}`,
        title: `${title} — ${t("label")}`,
        description,
        image: `${SITE_URL}${study.heroImage}`,
      }),
      type: "article",
    },
    alternates: alternatesFor(locale, `/work/${slug}`),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) notFound();

  return <CaseStudyContent study={study} locale={locale} />;
}

function CaseStudyContent({
  study,
  locale,
}: {
  study: (typeof caseStudies)[number];
  locale: string;
}) {
  const t = useTranslations("work");
  const tn = useTranslations("nav");

  const title = localized(study.title, locale);
  const summary = localized(study.summary, locale);

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: localized(study.metaDescription, locale),
    image: `${SITE_URL}${study.heroImage}`,
    inLanguage: locale,
    dateModified: study.lastModified,
    datePublished: study.lastModified,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: {
      "@type": "Organization",
      name: study.client,
      ...(study.url && { url: study.url }),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(locale, `/work/${study.slug}`),
    },
  };

  return (
    <article className="py-36 md:py-44">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: tn("caseStudies"), path: "/case-studies" },
          { name: title, path: `/work/${study.slug}` },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/case-studies"
          className="text-label-lg text-lava mb-8 inline-block hover:underline"
        >
          &larr; {t("backToCaseStudies")}
        </Link>

        <Image
          src={study.heroImage}
          alt={title}
          width={960}
          height={540}
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full aspect-[16/9] object-cover rounded-shape-lg mb-10"
        />

        <p className="text-label-lg text-lava uppercase tracking-wider mb-2">
          {t("label")}
        </p>
        <h1 className="text-headline-lg md:text-display-sm font-bold mb-4">
          {title}
        </h1>
        <p className="text-body-md text-muted mb-2">
          {t("client")}:{" "}
          {study.url ? (
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lava hover:underline"
            >
              {study.client}
            </a>
          ) : (
            study.client
          )}
        </p>

        <p className="text-body-lg text-muted leading-relaxed mt-10 mb-14">
          {summary}
        </p>

        {study.stats && (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {study.stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col-reverse gap-2 bg-surface border border-border rounded-shape-lg p-5"
              >
                <dt className="text-body-md text-muted">
                  {localized(stat.label, locale)}
                </dt>
                <dd className="text-headline-md font-bold text-lava">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {study.sections.map((section, i) => (
          <div key={i} className="mb-12">
            <h2 className="text-headline-sm font-bold mb-4">
              {localized(section.heading, locale)}
            </h2>
            <p className="text-body-lg text-muted leading-relaxed">
              {localized(section.body, locale)}
            </p>
            {section.image && (
              <figure className="mt-8">
                <Image
                  src={section.image.src}
                  alt={localized(section.image.alt, locale)}
                  width={section.image.width}
                  height={section.image.height}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="w-full h-auto rounded-shape-lg border border-border"
                />
                {section.image.caption && (
                  <figcaption className="text-body-md text-muted mt-3">
                    {localized(section.image.caption, locale)}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
