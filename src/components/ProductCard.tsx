import Image from "next/image";
import type { Product } from "@/content/products";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const t = useTranslations();
  const tp = useTranslations("products");

  const body = (
    <>
        <div
          className="w-full max-w-[332px] overflow-hidden bg-surface-light"
          style={{ aspectRatio: "332/263" }}
        >
          <Image
            src={product.image}
            alt={t(product.titleKey)}
            width={332}
            height={263}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 332px"
            className="w-full h-full object-cover group-hover:scale-105 m3-transition-medium transition-transform"
          />
        </div>
        <div className="p-6">
          <h3 className="text-title-md mb-3">{t(product.titleKey)}</h3>
          <span className="text-label-lg text-lava group-hover:underline">
            {tp("viewProduct")} &rarr;
          </span>
        </div>
    </>
  );

  return (
    <article className="bg-surface rounded-shape-lg overflow-hidden border border-border hover:border-lava/40 m3-card">
      {product.internal ? (
        <Link href={product.url as "/products/startup-suite"} className="group block">
          {body}
        </Link>
      ) : (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {body}
        </a>
      )}
    </article>
  );
}
