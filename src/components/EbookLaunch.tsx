import Image from "next/image";
import { useTranslations } from "next-intl";
import { EBOOK_TITLE, EBOOK_PDF, EBOOK_IMAGE, EBOOK_PAGES } from "@/content/ebook";
import { SITE_URL, ORG_ID } from "@/lib/seo";

export default function EbookLaunch() {
  const t = useTranslations("home");

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: EBOOK_TITLE,
    image: `${SITE_URL}${EBOOK_IMAGE}`,
    url: `${SITE_URL}${EBOOK_PDF}`,
    bookFormat: "https://schema.org/EBook",
    numberOfPages: EBOOK_PAGES,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-16 lg:py-12 border-b border-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        <div className="lg:col-span-7 xl:col-span-6">
          <p className="text-label-lg text-lava uppercase tracking-widest mb-6">
            {t("ebookLabel")}
          </p>
          <h2 className="text-display-sm text-statement font-bold leading-tight mb-6">
            {t("ebookHeading")}
          </h2>
          <p className="text-body-lg text-muted leading-relaxed max-w-xl mb-10">
            {t.rich("ebookBody", {
              title: (chunks) => (
                <strong className="font-medium text-foreground">{chunks}</strong>
              ),
            })}
          </p>
          <a
            href={EBOOK_PDF}
            download
            className="inline-flex items-center gap-3 px-10 py-4 bg-lava text-background font-bold rounded-shape-full m3-button"
          >
            {t("ebookCta")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0-5-5m5 5 5-5M4.5 20.5h15" />
            </svg>
          </a>
          <p className="text-body-md text-muted mt-5">{t("ebookMeta")}</p>
        </div>
        {/* The photo sits on black with a lit floor; lighten and the radial mask
            melt both into the page so no square edge shows. */}
        <div className="lg:col-span-5 xl:col-span-6 order-first lg:order-none flex justify-center">
          <Image
            src={EBOOK_IMAGE}
            alt={t("ebookImageAlt")}
            width={1024}
            height={1024}
            priority
            sizes="(max-width: 1023px) 280px, 560px"
            className="w-full max-w-[280px] lg:max-w-[560px] h-auto mix-blend-lighten [mask-image:radial-gradient(circle_closest-side,black_90%,transparent_100%)]"
          />
        </div>
      </div>
    </section>
  );
}
