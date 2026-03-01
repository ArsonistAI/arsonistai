import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { posts } from "@/content/posts";
import { BreadcrumbJsonLd } from "@/lib/breadcrumbJsonLd";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

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
      title: `${title} — ArsonistAI`,
      description: excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images: post.image ? [post.image] : undefined,
    },
    alternates: {
      languages: {
        en: `/en/insights/${slug}`,
        es: `/es/insights/${slug}`,
      },
    },
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
  const t = useTranslations();
  const tp = useTranslations("posts");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: t(post.titleKey),
    description: t(post.excerptKey),
    image: `https://arsonistai.com${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ArsonistAI",
      logo: {
        "@type": "ImageObject",
        url: "https://arsonistai.com/Logo_Orange.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://arsonistai.com/en/insights/${post.slug}`,
    },
  };

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
            className="text-2xl font-bold mt-12 mb-4 text-foreground"
          >
            {line.replace("## ", "")}
          </h2>
        );
        i++;
        continue;
      }

      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={`h3-${i}`}
            className="text-xl font-semibold mt-8 mb-3 text-foreground"
          >
            {line.replace("### ", "")}
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
                {item}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      elements.push(
        <p key={`p-${i}`} className="text-muted leading-relaxed mb-6">
          {line}
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
          { name: "Home", path: "" },
          { name: "Insights", path: "/insights" },
          { name: t(post.titleKey), path: `/insights/${post.slug}` },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/insights"
          className="text-lava text-sm font-medium mb-8 inline-block hover:underline"
        >
          &larr; Back to Insights
        </Link>

        <img
          src={post.image}
          alt={t(post.titleKey)}
          loading="lazy"
          width={960}
          height={540}
          className="w-full aspect-[16/9] object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {t(post.titleKey)}
        </h1>

        <div className="flex items-center gap-3 text-muted text-sm mb-12">
          <span>
            {tp("by")} {post.author}
          </span>
          <span>&middot;</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <div className="prose prose-invert max-w-none">
          {renderContent(post.content)}
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
    </article>
  );
}
