import type { Product } from "@/content/products";
import { useTranslations } from "next-intl";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const t = useTranslations();
  const tp = useTranslations("products");

  return (
    <article className="bg-surface rounded-shape-lg overflow-hidden border border-border hover:border-lava/40 m3-card">
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="aspect-[4/3] overflow-hidden bg-surface-light">
          <img
            src={product.image}
            alt={t(product.titleKey)}
            loading="lazy"
            width={480}
            height={360}
            className="w-full h-full object-cover group-hover:scale-105 m3-transition-medium transition-transform"
          />
        </div>
        <div className="p-6">
          <h3 className="text-title-md mb-3">{t(product.titleKey)}</h3>
          <span className="text-label-lg text-lava group-hover:underline">
            {tp("viewProduct")} &rarr;
          </span>
        </div>
      </a>
    </article>
  );
}
