import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { posts } from "@/content/posts";
import ServiceCard from "@/components/ServiceCard";
import ProductCard from "@/components/ProductCard";
import InsightCard from "@/components/InsightCard";
import ContactForm from "@/components/ContactForm";
import ClientMarquee from "@/components/ClientMarquee";
import DemoReel from "@/components/DemoReel";
import FadeInSection from "@/components/FadeInSection";

const SITE_URL = "https://arsonistai.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: { en: `${SITE_URL}/en`, es: `${SITE_URL}/es` },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  const latestPosts = posts.slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-36 lg:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lava/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 min-w-0">
            <p className="text-label-lg text-lava uppercase tracking-widest mb-6">
              {t("heroSubtitle")}
            </p>
            <h1 className="text-display-sm md:text-display-md lg:text-display-lg font-bold leading-tight max-w-4xl mb-10">
              {t("heroTitle")}
            </h1>
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <a
                href="#demo-reel"
                className="inline-flex items-center gap-3 px-10 py-4 bg-lava text-background font-bold rounded-shape-full m3-button"
              >
                {t("heroCta")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <DemoReel />

      <ClientMarquee />

      {/* Services */}
      <section className="py-24 bg-surface">
        <FadeInSection className="max-w-7xl mx-auto px-6">
          <h2 className="text-headline-lg font-bold mb-4">
            {t("servicesHeading")}
          </h2>
          <p className="text-body-lg text-muted mb-14 max-w-2xl">
            {t("servicesSubheading")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <FadeInSection className="max-w-7xl mx-auto px-6">
          <h2 className="text-headline-lg font-bold mb-14 text-center">
            {t("whyHeading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-8 bg-surface rounded-shape-xl border border-border text-center m3-card"
              >
                <h3 className="text-title-lg mb-3">
                  {t(`why${i}Title`)}
                </h3>
                <p className="text-body-md text-muted leading-relaxed">
                  {t(`why${i}Text`)}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* Products */}
      <section className="py-24 bg-surface">
        <FadeInSection className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-14">
            <h2 className="text-headline-lg font-bold">
              {t("productsHeading")}
            </h2>
            <Link
              href="/products"
              className="text-label-lg text-lava hover:underline"
            >
              {t("allProducts")} &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* Insights */}
      <section className="py-24 bg-surface">
        <FadeInSection className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-14">
            <h2 className="text-headline-lg font-bold">
              {t("insightsHeading")}
            </h2>
            <Link
              href="/insights"
              className="text-label-lg text-lava hover:underline"
            >
              {t("allInsights")} &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post) => (
              <InsightCard key={post.slug} post={post} />
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* Contact */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
