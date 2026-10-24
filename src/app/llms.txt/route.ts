import { posts } from "@/content/posts";
import { caseStudies } from "@/content/caseStudies";
import { services, serviceMessageKey } from "@/content/services";
import { absoluteUrl, DEFAULT_LOCALE } from "@/lib/seo";
import messages from "../../../messages/en.json";

export const dynamic = "force-static";

/** Reads a dotted message key, e.g. "services.chatbotAudit.title". */
function msg(key: string): string {
  return key
    .split(".")
    .reduce<unknown>((node, part) => (node as Record<string, unknown>)[part], messages) as string;
}

/**
 * /llms.txt (llmstxt.org): a plain map of the site for AI assistants and
 * answer engines. Built from the same content files as the sitemap so it
 * cannot drift. Only articles tied to a service are listed, keeping the map
 * on the firm's current work.
 */
export function GET() {
  const url = (path: string) => absoluteUrl(DEFAULT_LOCALE, path);

  const serviceLines = services.map((service) => {
    const key = serviceMessageKey(service);
    return `- [${msg(`${key}.title`)}](${url(`/services/${service.id}`)}): ${msg(`${key}.short`)}`;
  });

  const caseStudyLines = caseStudies.map(
    (cs) => `- [${cs.title.en}](${url(`/work/${cs.slug}`)})`
  );

  const articleLines = posts
    .filter((post) => post.serviceId)
    .map(
      (post) =>
        `- [${msg(post.titleKey)}](${url(`/insights/${post.slug}`)}): ${msg(post.excerptKey)}`
    );

  const body = [
    "# ArsonistAI",
    "",
    `> ${msg("meta.home.description")}`,
    "",
    "Every page is available in English (/en) and Spanish (/es). Contact: hello@arsonistai.com",
    "",
    "## Services",
    "",
    ...serviceLines,
    "",
    "## Case studies",
    "",
    ...caseStudyLines,
    "",
    "## Guides",
    "",
    ...articleLines,
    "",
    "## Products",
    "",
    `- [${msg("products.startupSuite.title")}](${url("/products/startup-suite")}): ${msg("products.startupSuite.intro")}`,
    "",
    "## Company",
    "",
    `- [About](${url("/about-us")})`,
    `- [All services](${url("/services")})`,
    `- [All insights](${url("/insights")})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
