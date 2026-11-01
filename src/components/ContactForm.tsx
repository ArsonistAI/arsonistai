"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

interface Props {
  /** Replaces the default heading, e.g. on a request-access page. */
  heading?: string;
  /** Fills the message box and refills it whenever the value changes. */
  presetMessage?: string;
  /** Ebook mode: message optional, and a successful send reveals the PDF download link. */
  ebook?: boolean;
}

export default function ContactForm({ heading, presetMessage, ebook }: Props = {}) {
  const t = useTranslations("contact");
  const tn = useTranslations("newsletter");
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [subscribeNl, setSubscribeNl] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (presetMessage === undefined || !formRef.current) return;
    const box = formRef.current.querySelector<HTMLTextAreaElement>("[name='message']");
    if (box) box.value = presetMessage;
  }, [presetMessage]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    const honeypot = formRef.current.querySelector<HTMLInputElement>("[name='company_url']");
    if (honeypot?.value) return;

    if (!turnstileToken) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    try {
      const fd = new FormData(formRef.current);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          turnstileToken,
          subscribeNewsletter: subscribeNl,
          companyUrl: fd.get("company_url"),
          ...(ebook ? { requestEbook: true } : {}),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      if (ebook) {
        const data = (await res.json().catch(() => null)) as { downloadUrl?: string } | null;
        if (data?.downloadUrl) setDownloadUrl(data.downloadUrl);
      }

      setStatus("success");
      formRef.current.reset();
      setSubscribeNl(false);
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  if (ebook && downloadUrl) {
    return (
      <section>
        <div role="status" className="max-w-xl mx-auto text-center">
          <h2 className="text-headline-md font-bold mb-4">{t("ebookReadyHeading")}</h2>
          <p className="text-body-lg text-muted leading-relaxed mb-8 text-pretty">
            {t("ebookReadyBody")}
          </p>
          <a
            href={downloadUrl}
            className="inline-flex items-center gap-3 px-10 py-4 bg-lava text-background font-bold rounded-shape-full m3-button"
          >
            {t("ebookDownload")}
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
        </div>
      </section>
    );
  }

  return (
    <section className={ebook ? undefined : "py-24"}>
      <div className="max-w-xl mx-auto">
        <h2 className="text-headline-md font-bold mb-10 text-center">{heading ?? t("heading")}</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div aria-hidden="true" className="absolute overflow-hidden" style={{ left: "-9999px" }}>
            <label htmlFor="company_url">Website</label>
            <input type="text" id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <label htmlFor="name" className="text-label-lg block mb-2 text-muted">
              {t("name")}*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 bg-surface border border-border rounded-shape-sm text-foreground placeholder-muted/50 focus:outline-none focus:border-lava focus:ring-1 focus:ring-lava/30 m3-transition transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-label-lg block mb-2 text-muted">
              {t("email")}*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-surface border border-border rounded-shape-sm text-foreground placeholder-muted/50 focus:outline-none focus:border-lava focus:ring-1 focus:ring-lava/30 m3-transition transition-all"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-label-lg block mb-2 text-muted">
              {ebook ? t("messageOptional") : `${t("message")}*`}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required={!ebook}
              className="w-full px-4 py-3 bg-surface border border-border rounded-shape-sm text-foreground placeholder-muted/50 focus:outline-none focus:border-lava focus:ring-1 focus:ring-lava/30 m3-transition transition-all resize-none"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={subscribeNl}
              onChange={(e) => setSubscribeNl(e.target.checked)}
              className="w-5 h-5 rounded-shape-xs border-border accent-lava cursor-pointer"
            />
            <span className="text-body-sm text-muted">{tn("optIn")}</span>
          </label>

          {TURNSTILE_SITE_KEY && (
            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              options={{ theme: "dark", size: "flexible" }}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setTurnstileToken(null)}
            />
          )}

          <button
            type="submit"
            disabled={status === "sending" || (!turnstileToken && !!TURNSTILE_SITE_KEY)}
            className="px-10 py-4 bg-lava text-background font-bold rounded-shape-full m3-button disabled:bg-lava-dark disabled:cursor-not-allowed"
          >
            {status === "sending" ? t("sending") : ebook ? t("ebookSubmit") : t("submit")}
          </button>
          {status === "success" && (
            <p className="text-green-400 text-body-sm text-center">{t("success")}</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-body-sm text-center">{t("error")}</p>
          )}
        </form>
      </div>
    </section>
  );
}
