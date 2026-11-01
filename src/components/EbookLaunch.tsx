import Image from "next/image";
import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";
import { EBOOK_TITLE, EBOOK_IMAGE, EBOOK_PAGES } from "@/content/ebook";
import { SITE_URL, ORG_ID, DEFAULT_LOCALE } from "@/lib/seo";

export default function EbookLaunch() {
  const t = useTranslations("home");

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: EBOOK_TITLE,
    image: `${SITE_URL}${EBOOK_IMAGE}`,
    url: `${SITE_URL}/${DEFAULT_LOCALE}#ebook`,
    bookFormat: "https://schema.org/EBook",
    numberOfPages: EBOOK_PAGES,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };

  return (
    <section id="ebook" className="py-24 border-t border-border scroll-mt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Image
            src={EBOOK_IMAGE}
            alt={t("ebookImageAlt")}
            width={1024}
            height={1024}
            sizes="240px"
            className="w-full max-w-[240px] h-auto rounded-shape-sm mb-8"
          />
          <p className="text-label-lg text-lava uppercase tracking-widest mb-6">
            {t("ebookLabel")}
          </p>
          <h2 className="text-display-sm text-statement font-bold leading-tight mb-6 text-balance">
            {t("ebookHeading")}
          </h2>
          <p className="text-body-lg text-muted leading-relaxed max-w-xl mb-6 text-pretty">
            {t.rich("ebookBody", {
              title: (chunks) => (
                <strong className="font-medium text-foreground">{chunks}</strong>
              ),
            })}
          </p>
          <p className="text-body-md text-muted text-pretty">{t("ebookMeta")}</p>
        </div>
        <div className="lg:col-span-7">
          <ContactForm ebook heading={t("ebookFormHeading")} />
        </div>
      </div>
    </section>
  );
}
