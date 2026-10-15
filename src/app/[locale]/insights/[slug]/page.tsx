import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { posts } from "@/content/posts";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import InsightCard from "@/components/InsightCard";
import {
  SITE_URL,
  ORG_ID,
  absoluteUrl,
  alternatesFor,
  openGraphFor,
} from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const t = await getTranslations({ locale });
  const title = t(post.titleKey);
  const excerpt = t(post.excerptKey);

  return {
    title,
    description: excerpt,
    openGraph: {
      ...openGraphFor({
        locale,
        path: `/insights/${slug}`,
        title: `${title} — ArsonistAI`,
        description: excerpt,
        image: `${SITE_URL}${post.image}`,
      }),
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified ?? post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images: post.image ? [`${SITE_URL}${post.image}`] : undefined,
    },
    alternates: alternatesFor(locale, `/insights/${slug}`),
  };
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <PostContent post={post} locale={locale} />;
}

function PostContent({ post, locale }: { post: (typeof posts)[number]; locale: string }) {
  const tn = useTranslations("nav");
  const ti = useTranslations("insights");
  const t = useTranslations();
  const tp = useTranslations("posts");

  // Two most recent other posts, so no article is a dead end for crawlers.
  const relatedPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const body = locale === "es" ? post.content.es : post.content.en;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: t(post.titleKey),
    description: t(post.excerptKey),
    image: `${SITE_URL}${post.image}`,
    inLanguage: locale,
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    articleSection: post.section ?? "AI Design",
    wordCount: body.trim().split(/\s+/).length,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      // Must follow the request locale. Hardcoding /en/ here told Spanish pages
      // their canonical entity was the English URL.
      "@id": absoluteUrl(locale, `/insights/${post.slug}`),
    },
  };

  function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];
    const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let idx = 0;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(text.slice(lastIndex, match.index));
      }

      if (match[1] !== undefined) {
        const label = match[1];
        const href = match[2];
        const isExternal = /^https?:\/\//.test(href);
        nodes.push(
          isExternal ? (
            <a
              key={`${keyPrefix}-inline-${idx}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lava hover:underline"
            >
              {label}
            </a>
          ) : (
            <Link
              key={`${keyPrefix}-inline-${idx}`}
              href={href}
              className="text-lava hover:underline"
            >
              {label}
            </Link>
          )
        );
      } else {
        nodes.push(
          <strong key={`${keyPrefix}-inline-${idx}`} className="text-foreground font-semibold">
            {match[3]}
          </strong>
        );
      }

      idx++;
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex));
    }

    return nodes;
  }

  function renderContent(content: string) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      if (!line) {
        i++;
        continue;
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${i}`}
            className="text-xl sm:text-2xl font-bold mt-12 mb-4 text-foreground"
          >
            {parseInline(line.replace("## ", ""), `h2-${i}`)}
          </h2>
        );
        i++;
        continue;
      }

      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={`h3-${i}`}
            className="text-lg sm:text-xl font-semibold mt-8 mb-3 text-foreground"
          >
            {parseInline(line.replace("### ", ""), `h3-${i}`)}
          </h3>
        );
        i++;
        continue;
      }

      if (line.startsWith("- ")) {
        const items: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("- ")) {
          items.push(lines[i].trim().replace("- ", ""));
          i++;
        }
        elements.push(
          <ul
            key={`ul-${i}`}
            className="list-disc list-inside space-y-2 my-4"
          >
            {items.map((item, j) => (
              <li key={j} className="text-muted leading-relaxed">
                {parseInline(item, `li-${i}-${j}`)}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      elements.push(
        <p key={`p-${i}`} className="text-muted leading-relaxed mb-6">
          {parseInline(line, `p-${i}`)}
        </p>
      );
      i++;
    }

    return elements;
  }

  return (
    <article className="py-32 md:py-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: tn("insights"), path: "/insights" },
          { name: t(post.titleKey), path: `/insights/${post.slug}` },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/insights"
          className="text-lava text-sm font-medium mb-8 inline-block hover:underline"
        >
          &larr; {ti("backToInsights")}
        </Link>

        <Image
          src={post.image}
          alt={t(post.titleKey)}
          width={960}
          height={540}
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full aspect-[16/9] object-cover rounded-xl mb-8"
        />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {t(post.titleKey)}
        </h1>

        <div className="flex items-center gap-3 text-muted text-sm mb-12">
          <span>
            {tp("by")} {post.author}
          </span>
          <span>&middot;</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <div className="prose prose-invert max-w-none">
          {renderContent(post.content[locale as "en" | "es"] ?? post.content.en)}
        </div>

        {post.slug === "introducing-product-kpis-bringing-measurable-impact-into-your-design-workflow" && (
          <a
            href="https://www.figma.com/community/plugin/1557583641770417133/product-kpis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 px-10 py-4 bg-lava text-background font-bold rounded-shape-full m3-button hover:bg-lava-dark transition-colors"
          >
            Test it out here
          </a>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-24 pt-16 border-t border-border">
          <h2 className="text-headline-sm font-bold mb-10">
            {ti("relatedHeading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((related) => (
              <InsightCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
