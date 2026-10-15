import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { posts } from "@/content/posts";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import InsightCard from "@/components/InsightCard";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.insights" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: openGraphFor({
      locale,
      path: "/insights",
      title: t("ogTitle"),
      description: t("ogDescription"),
    }),
    alternates: alternatesFor(locale, "/insights"),
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <InsightsContent locale={locale} />;
}

function InsightsContent({ locale }: { locale: string }) {
  const tn = useTranslations("nav");
  const t = useTranslations("home");

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: tn("insights"), path: "/insights" },
        ]}
      />
      <section className="py-36 md:py-44">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-display-sm md:text-display-md font-bold mb-14">
            {t("insightsHeading")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <InsightCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
