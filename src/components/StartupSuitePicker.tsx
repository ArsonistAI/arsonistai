"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { suiteParts } from "@/content/startupSuite";
import ContactForm from "@/components/ContactForm";

export default function StartupSuitePicker() {
  const t = useTranslations("products.startupSuite");
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const names = suiteParts
    .filter((p) => picked.includes(p.id))
    .map((p) => t(`items.${p.messageKey}.title`));

  const message =
    names.length === 0 ? t("messageNone") : t("messageSome", { parts: names.join(", ") });

  return (
    <>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-headline-md font-bold mb-4">{t("pickHeading")}</h2>
          <p className="text-body-lg text-muted leading-relaxed text-pretty max-w-3xl mb-8">
            {t("pickIntro")}
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <p className="text-label-lg text-foreground" aria-live="polite">
              {t("counter", { count: picked.length, total: suiteParts.length })}
            </p>
            <button
              type="button"
              onClick={() => setPicked(suiteParts.map((p) => p.id))}
              className="text-label-lg text-lava hover:underline"
            >
              {t("selectAll")}
            </button>
            <button
              type="button"
              onClick={() => setPicked([])}
              className="text-label-lg text-lava hover:underline"
            >
              {t("clearAll")}
            </button>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suiteParts.map((part) => {
              const on = picked.includes(part.id);
              return (
                <li key={part.id}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => toggle(part.id)}
                    className={`w-full h-full flex flex-col justify-start text-left p-6 rounded-shape-lg border m3-card ${
                      on
                        ? "border-lava bg-primary-container"
                        : "border-border bg-surface hover:border-lava/40"
                    }`}
                  >
                    <span className="flex w-full items-start justify-between gap-4 mb-3">
                      <span className="text-label-lg text-lava uppercase tracking-widest">
                        {t(`items.${part.messageKey}.kicker`)}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex-shrink-0 w-6 h-6 rounded-shape-xs border flex items-center justify-center text-sm font-bold ${
                          on
                            ? "bg-lava border-lava text-background"
                            : "border-outline text-transparent"
                        }`}
                      >
                        &#10003;
                      </span>
                    </span>
                    <span className="block text-title-md mb-3">
                      {t(`items.${part.messageKey}.title`)}
                    </span>
                    <span className="block text-body-lg text-muted leading-relaxed text-pretty">
                      {t(`items.${part.messageKey}.body`)}
                    </span>
                    <span className="sr-only">{on ? t("selected") : t("select")}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="py-16 border-t border-border">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-body-lg text-muted leading-relaxed text-pretty">
            {t("requestIntro")}
          </p>
        </div>
        <div className="px-6">
          <ContactForm heading={t("requestHeading")} presetMessage={message} />
        </div>
      </section>
    </>
  );
}
