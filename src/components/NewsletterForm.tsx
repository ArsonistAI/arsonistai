"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscribe failed");

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <div>
      <h3 className="text-label-lg font-bold mb-3">{t("heading")}</h3>
      <p className="text-body-sm text-muted mb-4">{t("description")}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          required
          className="flex-1 min-w-0 px-4 py-2.5 bg-surface border border-border rounded-shape-sm text-body-sm text-foreground placeholder-muted/50 focus:outline-none focus:border-lava focus:ring-1 focus:ring-lava/30 m3-transition transition-all"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="px-5 py-2.5 bg-lava text-background font-bold text-label-lg rounded-shape-full m3-button whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? t("submitting") : t("subscribe")}
        </button>
      </form>
      {status === "success" && (
        <p className="text-green-400 text-body-sm mt-2">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-body-sm mt-2">{t("error")}</p>
      )}
    </div>
  );
}
