import { Link } from "@/i18n/navigation";
import type { Post } from "@/content/posts";
import { useTranslations } from "next-intl";

interface Props {
  post: Post;
}

export default function InsightCard({ post }: Props) {
  const t = useTranslations();
  const tHome = useTranslations("home");

  return (
    <article className="bg-surface rounded-shape-lg overflow-hidden border border-border hover:border-lava/40 m3-card">
      <Link
        href={`/insights/${post.slug}`}
        className="group block"
      >
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={post.image}
            alt={t(post.titleKey)}
            loading="lazy"
            width={640}
            height={360}
            className="w-full h-full object-cover group-hover:scale-105 m3-transition-medium transition-transform"
          />
        </div>
        <div className="p-6">
          <h3 className="text-title-lg mb-2 group-hover:text-lava m3-transition transition-colors leading-snug">
            {t(post.titleKey)}
          </h3>
          <p className="text-body-md text-muted leading-relaxed mb-4">
            {t(post.excerptKey)}
          </p>
          <span className="text-label-lg text-lava">
            {tHome("readMore")} &rarr;
          </span>
        </div>
      </Link>
    </article>
  );
}
