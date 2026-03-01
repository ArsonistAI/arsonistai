import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-8xl font-bold text-lava mb-6">404</p>
      <h1 className="text-headline-md font-bold mb-4">{t("heading")}</h1>
      <p className="text-body-lg text-muted mb-10 max-w-md">{t("text")}</p>
      <Link
        href="/"
        className="px-8 py-3 bg-lava text-background font-bold rounded-shape-full m3-button"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
