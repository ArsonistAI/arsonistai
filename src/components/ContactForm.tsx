"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function ContactForm() {
  const t = useTranslations("contact");
  const tn = useTranslations("newsletter");
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [subscribeNl, setSubscribeNl] = useState(false);

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
        }),
      });

      if (!res.ok) throw new Error("Request failed");

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

  return (
    <section className="py-24">
      <div className="max-w-xl mx-auto">
        <h2 className="text-headline-md font-bold mb-10 text-center">{t("heading")}</h2>
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
              {t("message")}*
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
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
            className="px-10 py-4 bg-lava text-background font-bold rounded-shape-full m3-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? t("sending") : t("submit")}
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
