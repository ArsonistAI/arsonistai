import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { caseStudies } from "@/content/caseStudies";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) return {};

  return {
    title: `${study.title} — Case Study`,
    description: study.summary,
    openGraph: {
      title: `${study.title} — ArsonistAI Case Study`,
      description: study.summary,
      images: study.heroImage ? [{ url: study.heroImage }] : undefined,
    },
    alternates: {
      languages: {
        en: `/en/work/${slug}`,
        es: `/es/work/${slug}`,
      },
    },
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

  return (
    <article className="py-36 md:py-44">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "Home", path: "" },
          { name: "Work", path: "" },
          { name: study.title, path: `/work/${study.slug}` },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/"
          className="text-label-lg text-lava mb-8 inline-block hover:underline"
        >
          &larr; Back
        </Link>

        <img
          src={study.heroImage}
          alt={study.title}
          loading="lazy"
          width={960}
          height={540}
          className="w-full aspect-[16/9] object-cover rounded-shape-lg mb-10"
        />

        <p className="text-label-lg text-lava uppercase tracking-wider mb-2">
          Case Study
        </p>
        <h1 className="text-headline-lg md:text-display-sm font-bold mb-4">{study.title}</h1>
        <p className="text-body-md text-muted mb-2">
          Client:{" "}
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lava hover:underline"
          >
            {study.client}
          </a>
        </p>

        <p className="text-body-lg text-muted leading-relaxed mt-10 mb-14">
          {study.summary}
        </p>

        {study.sections.map((section, i) => (
          <div key={i} className="mb-12">
            <h2 className="text-headline-sm font-bold mb-4">{section.heading}</h2>
            <p className="text-body-lg text-muted leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
