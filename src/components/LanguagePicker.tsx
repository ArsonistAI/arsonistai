"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useTransition } from "react";

const labels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

const ariaLabels: Record<Locale, string> = {
  en: "Switch to English",
  es: "Cambiar a Español",
};

export default function LanguagePicker() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(next: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => onChange(loc)}
          disabled={isPending}
          aria-label={ariaLabels[loc]}
          className={`px-2 py-1 rounded transition-colors ${
            loc === locale
              ? "text-lava font-semibold"
              : "text-muted hover:text-foreground"
          }`}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
