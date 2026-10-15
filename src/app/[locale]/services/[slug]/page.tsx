import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { services, serviceMessageKey } from "@/content/services";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import {
  SITE_URL,
  ORG_ID,
  absoluteUrl,
  alternatesFor,
  openGraphFor,
} from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import ContactForm from "@/components/ContactForm";

interface Step {
  title: string;
  body: string;
}

interface Faq {
  q: string;
  a: string;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return {};

  const t = await getTranslations({ locale });
  const key = serviceMessageKey(service);
  const title = t(`${key}.metaTitle`);
  const description = t(`${key}.metaDescription`);

  return {
    title,
    description,
    openGraph: openGraphFor({
      locale,
      path: `/services/${slug}`,
      title: `${title} — ArsonistAI`,
      description,
      image: `${SITE_URL}${service.image}`,
    }),
    alternates: alternatesFor(locale, `/services/${slug}`),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  return <ServiceDetailContent service={service} locale={locale} />;
}

function ServiceDetailContent({
  service,
  locale,
}: {
  service: (typeof services)[number];
  locale: string;
}) {
  const t = useTranslations();
  const tn = useTranslations("nav");
  const td = useTranslations("services.detail");

  const key = serviceMessageKey(service);
  const title = t(`${key}.title`);
  const intro = t(`${key}.detail.intro`);
  const body = t(`${key}.detail.body`);
  const steps = t.raw(`${key}.detail.steps`) as Step[];
  const deliverables = t.raw(`${key}.detail.deliverables`) as string[];
  const faq = t.raw(`${key}.detail.faq`) as Faq[];

  const pageUrl = absoluteUrl(locale, `/services/${service.id}`);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: title,
    description: t(`${key}.metaDescription`),
    image: `${SITE_URL}${service.image}`,
    url: pageUrl,
    inLanguage: locale,
    serviceType: title,
    areaServed: "Worldwide",
    provider: { "@id": ORG_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: td("deliverablesHeading"),
      itemListElement: deliverables.map((item, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: tn("services"), path: "/services" },
          { name: title, path: `/services/${service.id}` },
        ]}
      />

      <section className="pt-36 md:pt-44 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/services"
            className="text-label-lg text-lava mb-8 inline-block hover:underline"
          >
            &larr; {td("backToServices")}
          </Link>
          <p className="text-label-lg text-lava uppercase tracking-widest mb-4">
            {t("services.label")}
          </p>
          <h1 className="text-display-sm md:text-display-md font-bold mb-8 leading-tight">
            {title}
          </h1>
          <p className="text-body-lg text-muted leading-relaxed mb-6">{intro}</p>
          <p className="text-body-lg text-muted leading-relaxed">{body}</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <Image
            src={service.image}
            alt={title}
            width={1280}
            height={720}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full aspect-[16/9] object-cover rounded-shape-lg"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-headline-md font-bold mb-12">
            {td("processHeading")}
          </h2>
          <ol className="space-y-10">
            {steps.map((step, i) => (
              <li key={i} className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-10 h-10 rounded-shape-full bg-lava/15 text-lava font-bold flex items-center justify-center"
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-title-lg font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-body-lg text-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-headline-md font-bold mb-10">
            {td("deliverablesHeading")}
          </h2>
          <ul className="space-y-4">
            {deliverables.map((item, i) => (
              <li
                key={i}
                className="flex gap-4 text-body-lg text-muted leading-relaxed"
              >
                <span aria-hidden="true" className="text-lava flex-shrink-0">
                  &#9679;
                </span>
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-headline-md font-bold mb-12">
            {td("faqHeading")}
          </h2>
          <div className="space-y-10">
            {faq.map((item, i) => (
              <div key={i}>
                <h3 className="text-title-lg font-semibold mb-3">{item.q}</h3>
                <p className="text-body-lg text-muted leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-headline-sm font-bold mb-10">
            {t("services.heading")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {otherServices.map((other) => {
              const otherKey = serviceMessageKey(other);
              return (
                <Link
                  key={other.id}
                  href={`/services/${other.id}`}
                  className="block p-6 bg-surface rounded-shape-lg border border-border hover:border-lava/40 m3-card"
                >
                  <h3 className="text-title-md mb-2">{t(`${otherKey}.title`)}</h3>
                  <p className="text-body-sm text-muted leading-relaxed">
                    {t(`${otherKey}.short`)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
